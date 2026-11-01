const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { db, UPLOAD_DIR } = require('./lib/database');

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const PORT = Number(process.env.PORT) || 3000;
const QUEUE_CAPACITY = Math.max(1, Math.min(100, Number(process.env.QUEUE_CAPACITY) || 100));
const resources = new Set(['news', 'activities', 'learning', 'gallery']);
const MIME = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.avif':'image/avif', '.ico':'image/x-icon' };

function send(res, status, data, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers });
  res.end(JSON.stringify(data));
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''; let size = 0;
    req.setEncoding('utf8');
    req.on('data', chunk => { size += Buffer.byteLength(chunk); if (size > 4096) { reject(Object.assign(new Error('ข้อมูลมีขนาดใหญ่เกินกำหนด'), { status: 413 })); req.destroy(); } else body += chunk; });
    req.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch { reject(Object.assign(new Error('รูปแบบข้อมูลไม่ถูกต้อง'), { status: 400 })); } });
    req.on('error', reject);
  });
}
function parkDate() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}
function getContent(type) {
  return db.prepare('SELECT * FROM content WHERE type = ? AND published = 1 ORDER BY sort_order, id DESC').all(type);
}
function publicData() {
  return { site: {
    name: 'อุทยานสิ่งแวดล้อมนานาชาติสิรินธร', englishName: 'Sirindhorn International Environmental Park',
    address: '1281 ค่ายพระรามหก ตำบลชะอำ อำเภอชะอำ จังหวัดเพชรบุรี 76120', phone: '032 508 352', email: 'siep@sirindhornpark.or.th',
    officialUrl: 'https://home.sirindhornpark.or.th/', facebookUrl: 'https://www.facebook.com/siepchaam'
  }, news: getContent('news'), activities: getContent('activities'), learning: getContent('learning'), gallery: getContent('gallery') };
}
function queueStatus(visitorKey = '') {
  const date = parkDate();
  const issued = db.prepare('SELECT COALESCE(MAX(ticket_number), 0) AS n FROM queue_tickets WHERE service_date=?').get(date).n;
  const mine = visitorKey ? db.prepare('SELECT ticket_number FROM queue_tickets WHERE service_date=? AND visitor_key=?').get(date, visitorKey) : null;
  return { date, issued, capacity: QUEUE_CAPACITY, remaining: Math.max(0, QUEUE_CAPACITY - issued), nextNumber: issued < QUEUE_CAPACITY ? issued + 1 : null, myTicket: mine?.ticket_number || null };
}
function serveFile(res, file, type) {
  fs.readFile(file, (error, data) => {
    if (error) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" });
    res.end(data);
  });
}
async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.startsWith('/api/')) {
    if (req.method === 'GET' && pathname === '/api/site') return send(res, 200, publicData());
    if (req.method === 'GET' && pathname.startsWith('/api/public/')) {
      const type = pathname.slice('/api/public/'.length);
      if (!resources.has(type)) return send(res, 404, { error: 'ไม่พบข้อมูล' });
      return send(res, 200, getContent(type));
    }
    if (pathname === '/api/queue/status' && req.method === 'GET') {
      const visitorKey = url.searchParams.get('visitorKey') || '';
      if (visitorKey && !/^[a-f0-9-]{36}$/i.test(visitorKey)) return send(res, 400, { error: 'รหัสผู้เข้าชมไม่ถูกต้อง' });
      return send(res, 200, queueStatus(visitorKey));
    }
    if (pathname === '/api/queue/tickets' && req.method === 'POST') {
      const visitorKey = String((await readBody(req)).visitorKey || '');
      if (!/^[a-f0-9-]{36}$/i.test(visitorKey)) return send(res, 400, { error: 'ไม่พบรหัสสำหรับรับคิว กรุณาลองใหม่' });
      const date = parkDate();
      db.exec('BEGIN IMMEDIATE');
      try {
        const existing = db.prepare('SELECT ticket_number FROM queue_tickets WHERE service_date=? AND visitor_key=?').get(date, visitorKey);
        if (existing) { db.exec('COMMIT'); return send(res, 200, { ...queueStatus(visitorKey), message: 'เบราว์เซอร์นี้รับคิววันนี้แล้ว' }); }
        const issued = db.prepare('SELECT COALESCE(MAX(ticket_number), 0) AS n FROM queue_tickets WHERE service_date=?').get(date).n;
        if (issued >= QUEUE_CAPACITY) { db.exec('COMMIT'); return send(res, 409, { ...queueStatus(), error: 'คิวกิจกรรมวันนี้เต็มแล้ว' }); }
        db.prepare('INSERT INTO queue_tickets (service_date,ticket_number,visitor_key) VALUES (?,?,?)').run(date, issued + 1, visitorKey);
        db.exec('COMMIT');
        return send(res, 201, { ...queueStatus(visitorKey), message: 'รับคิวเรียบร้อย' });
      } catch (error) { db.exec('ROLLBACK'); throw error; }
    }
    return send(res, 404, { error: 'ไม่พบ API นี้' });
  }
  if (pathname.startsWith('/uploads/')) {
    const filename = path.basename(pathname.slice('/uploads/'.length));
    const ext = path.extname(filename).toLowerCase();
    if (!filename || !MIME[ext] || !['.png','.jpg','.jpeg','.webp','.avif'].includes(ext)) { res.writeHead(404); return res.end('Not found'); }
    return serveFile(res, path.join(UPLOAD_DIR, filename), MIME[ext]);
  }
  const route = pathname === '/' ? '/index.html' : pathname;
  const file = path.resolve(PUBLIC_DIR, '.' + route);
  if (!file.startsWith(PUBLIC_DIR + path.sep) && file !== path.join(PUBLIC_DIR, 'index.html')) { res.writeHead(403); return res.end('Forbidden'); }
  serveFile(res, file, MIME[path.extname(file).toLowerCase()] || 'application/octet-stream');
}

const server = http.createServer((req, res) => {
  handle(req, res).catch(error => {
    if (!res.headersSent) send(res, error.status || 500, { error: error.status ? error.message : 'ระบบมีข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' });
    else res.destroy();
    if (!error.status) console.error(error);
  });
});
server.listen(PORT, '0.0.0.0', () => console.log(`Sirindhorn Park is running on port ${PORT} · queue capacity ${QUEUE_CAPACITY}`));
process.on('SIGINT', () => { server.close(() => { db.close(); process.exit(0); }); });
process.on('SIGTERM', () => { server.close(() => { db.close(); process.exit(0); }); });
