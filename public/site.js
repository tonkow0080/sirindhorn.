const byId = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const iconFor = (item, index) => ['♧', '☼', '⌁', '✳', '⌖'][index % 5];
const learningSources = {
  brochure: { label: 'หนังสือแนะนำอุทยานฯ (ททท.)', url: 'https://api.tat.or.th/upload/live/multimedia/9607/Book_Sirindhornpark.pdf' },
  rdpb: { label: 'สำนักงาน กปร. — โครงการอุทยานฯ', url: 'https://web.rdpb.go.th/th/Projects/%E0%B9%81%E0%B8%99%E0%B8%B0%E0%B8%99%E0%B8%B3%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3-c38/%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AD%E0%B8%B8%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%81%E0%B8%A7%E0%B8%94%E0%B8%A5%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%99%E0%B8%B2%E0%B8%99%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B8%AA%E0%B8%B4%E0%B8%A3%E0%B8%B4%E0%B8%99%E0%B8%98%E0%B8%A3%E0%B8%AD%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%99%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%A1%E0%B8%B2-v10877' },
  wma: { label: 'องค์การจัดการน้ำเสีย — ระบบบำบัดน้ำเสียอุทยานฯ', url: 'https://wma.or.th/773' }
};
const learningArticles = {
  'ศูนย์พลังงานเพื่อสิ่งแวดล้อม': {
    sections: [
      ['ศูนย์นี้เรียนรู้อะไร', 'หนังสือแนะนำอุทยานฯ อธิบายว่าศูนย์พลังงานเพื่อสิ่งแวดล้อมเป็นจุดเริ่มต้นการเรียนรู้เรื่องพลังงานและสิ่งแวดล้อม เนื้อหาครอบคลุมการอนุรักษ์ทรัพยากรธรรมชาติ พลังงาน และแนวทางใช้พลังงานอย่างรู้คุณค่า'],
      ['นิทรรศการและสื่อเรียนรู้', 'เอกสารระบุถึงนิทรรศการเฉลิมพระเกียรติ นิทรรศการพลังงานเพื่อสิ่งแวดล้อม และการนำเสนอเรื่องพลังงานรอบตัวหลายมิติ ศูนย์ยังถูกพัฒนาขึ้นเพื่อเผยแพร่ความรู้ผ่านค่ายฝึกอบรม การจัดแสดง การสาธิต และห้องสมุดพลังงาน'],
      ['มองพลังงานในชีวิตประจำวัน', 'หัวข้อจัดแสดงชวนให้เชื่อมโยงการใช้พลังงานกับกิจวัตร เช่น การใช้ไฟฟ้าและการเลือกใช้อุปกรณ์อย่างเหมาะสม หลักคิดสำคัญคือการประหยัดพลังงานเริ่มจากการสังเกตและปรับการใช้ของตนเอง โดยไม่จำเป็นต้องรอเทคโนโลยีขนาดใหญ่'],
      ['พลังงานทดแทนที่นำเสนอ', 'เอกสารของอุทยานกล่าวถึงพลังงานแสงอาทิตย์ พลังงานลม และพลังงานชีวมวล ตัวอย่างเหล่านี้ช่วยเปรียบเทียบแหล่งพลังงานและการแปรรูปพลังงาน เช่น แสงอาทิตย์เปลี่ยนเป็นไฟฟ้าด้วยเซลล์แสงอาทิตย์ และกังหันลมเปลี่ยนพลังงานการเคลื่อนที่ของลมเป็นพลังงานกล'],
      ['ชวนสังเกตเมื่อเข้าชม', 'ลองจดว่าแต่ละนิทรรศการกำลังตอบคำถามใด ใช้พลังงานรูปแบบไหน และเชื่อมโยงกับการใช้ทรัพยากรอย่างไร นิทรรศการหรือรอบเข้าชมอาจเปลี่ยนตามการให้บริการ ควรสอบถามอุทยานก่อนเดินทาง']
    ], sources: ['brochure','rdpb']
  },
  'สวนการเรียนรู้พลังงานเพื่อสิ่งแวดล้อมชุมชน': {
    sections: [
      ['แนวคิดของแหล่งเรียนรู้', 'เอกสารแนะนำอุทยานฯ เรียกพื้นที่นี้ว่า “สวนการเรียนรู้พลังงานเพื่อสิ่งแวดล้อมชุมชน” และอธิบายว่าเป็นตัวอย่างเทคโนโลยีพลังงานที่เรียบง่าย ซึ่งชุมชนสามารถเรียนรู้และพิจารณาปรับใช้ตามทรัพยากรที่มี'],
      ['พลังงานแสงอาทิตย์', 'พลังงานจากแสงอาทิตย์นำไปใช้ได้หลายทาง หนังสืออุทยานยกตัวอย่างการผลิตไฟฟ้าด้วยเซลล์แสงอาทิตย์ ซึ่งเปลี่ยนพลังงานแสงให้เป็นพลังงานไฟฟ้า การใช้งานจริงต้องพิจารณาความเหมาะสมของพื้นที่ อุปกรณ์ และรูปแบบการใช้พลังงาน'],
      ['พลังงานลม', 'กังหันลมใช้การเคลื่อนที่ของอากาศทำให้ใบพัดหมุน แล้วแปลงการหมุนนั้นไปใช้ผลิตไฟฟ้าหรือสูบน้ำได้ตามชนิดของอุปกรณ์ จึงเป็นตัวอย่างที่ช่วยให้เห็นความต่างระหว่างพลังงานต้นทางกับงานที่อุปกรณ์ทำได้'],
      ['ชีวมวลและของเหลือใช้', 'เอกสารอุทยานอธิบายชีวมวลว่าเป็นวัสดุจากสิ่งมีชีวิต เช่น เศษวัสดุการเกษตร มูลสัตว์ และเศษอาหาร ซึ่งสามารถนำไปใช้เป็นเชื้อเพลิงได้ อีกตัวอย่างคือระบบผลิตก๊าซชีวภาพจากเศษอาหารและขยะอินทรีย์เพื่อใช้เป็นเชื้อเพลิง'],
      ['ตัวอย่างเทคโนโลยีชุมชน', 'หนังสืออุทยานยกตัวอย่างตู้อบแห้งพลังงานแสงอาทิตย์ เตาชีวมวล และอุปกรณ์ใช้ประโยชน์จากวัสดุที่หาได้ในท้องถิ่น ตัวอย่างเหล่านี้สื่อให้เห็นการเลือกเทคโนโลยีให้เหมาะกับงาน เช่น การถนอมผลผลิตหรือการใช้เชื้อเพลิงอย่างมีประสิทธิภาพ ไม่ได้หมายความว่าอุปกรณ์ทุกชนิดเหมาะกับทุกครัวเรือน'],
      ['สิ่งที่ควรตั้งคำถาม', 'เมื่อดูอุปกรณ์ ให้พิจารณาว่าใช้พลังงานอะไร แก้ปัญหาใด ต้องใช้ทรัพยากรหรือการดูแลแบบไหน และจะประเมินความคุ้มค่าอย่างไร กิจกรรมสาธิตและอุปกรณ์ที่เปิดให้ชมอาจเปลี่ยนแปลงได้ ควรยืนยันกับอุทยานก่อนเข้าชม']
    ], sources: ['brochure']
  },
  'สวนป่าชายเลนทูลกระหม่อม': {
    sections: [
      ['ที่มาและการฟื้นฟู', 'สำนักงาน กปร. ระบุว่าเมื่อวันที่ 14 สิงหาคม พ.ศ. 2537 มีพระราชดำริให้จัดหาพื้นที่เพื่อทดลองปลูกและฟื้นฟูป่าชายเลน ต่อมามีการปลูกป่าชายเลนบริเวณคลองบางตราใหญ่และคลองบางตราน้อย หนังสือแนะนำอุทยานฯ อธิบายการฟื้นฟูด้วยการขุดลอกคูน้ำเพื่อให้น้ำทะเลขึ้นลงหมุนเวียนตามธรรมชาติ'],
      ['ป่าชายเลนเป็นห้องเรียนธรรมชาติ', 'เอกสารอุทยานนำเสนอพื้นที่นี้ในฐานะห้องเรียนธรรมชาติและแหล่งเรียนรู้ระบบนิเวศ ผู้มาเยือนสามารถสังเกตความสัมพันธ์ระหว่างน้ำขึ้นลง พื้นดินชุ่มน้ำ พืชชายเลน และสัตว์ที่ใช้พื้นที่เป็นที่อยู่อาศัย'],
      ['พืชที่เอกสารอุทยานบันทึก', 'หนังสือแนะนำอุทยานฯ ยกตัวอย่างพรรณไม้ เช่น โกงกางใบเล็ก โกงกางใบใหญ่ แสมทะเล โพทะเล ปอทะเล ขลู่ ฝาด โปรง พังกาหัวสุมดอกแดง และผักเบี้ย รวมถึงพืชชายหาดบางชนิด รายชื่อนี้เป็นตัวอย่างจากเอกสาร ไม่ใช่การสำรวจยืนยันว่าพืชทุกชนิดพบได้ตลอดเวลา'],
      ['สัตว์และแหล่งอาศัย', 'เอกสารอุทยานกล่าวถึงดินชุ่มน้ำซึ่งเป็นแหล่งวางไข่ อนุบาล และหลบภัยของสัตว์น้ำหลายกลุ่ม เช่น กุ้ง หอย ปู และปลา หนังสือแนะนำอุทยานฯ ยังรายงานนกมากกว่า 100 ชนิด ทั้งนกประจำถิ่นและนกอพยพ โดยเป็นข้อมูลตามเอกสารฉบับนั้น'],
      ['บทบาทต่อชายฝั่ง', 'หนังสืออุทยานอธิบายว่าป่าชายเลนมีส่วนช่วยดูแลดินและน้ำ และเป็นแนวธรรมชาติที่ช่วยลดแรงปะทะจากลมพายุและการกัดเซาะชายฝั่ง ผลที่เกิดขึ้นขึ้นกับสภาพพื้นที่และความสมบูรณ์ของระบบนิเวศ จึงควรอ่านป้ายความรู้และสังเกตสภาพจริงประกอบ'],
      ['ข้อควรคำนึงระหว่างเรียนรู้', 'ควรเดินตามเส้นทางที่เปิดให้ใช้ ไม่รบกวนสัตว์หรือเก็บพืช และตรวจสอบการเปิดเส้นทางกับอุทยานก่อนมา เพราะพื้นที่และกิจกรรมอาจมีข้อจำกัดตามการดูแลรักษา']
    ], sources: ['brochure','rdpb']
  },
  'ระบบบำบัดน้ำเสีย': {
    sections: [
      ['ระบบนี้ทำหน้าที่อะไร', 'หนังสือแนะนำอุทยานฯ ระบุว่าใช้ระบบบำบัดน้ำเสียแบบควบรวมบึงประดิษฐ์ เพื่อบำบัดน้ำเสียก่อนปล่อยออกสู่แหล่งน้ำธรรมชาติ ระบบพัฒนาจากองค์ความรู้ของโครงการศึกษาวิจัยและพัฒนาสิ่งแวดล้อมแหลมผักเบี้ยอันเนื่องมาจากพระราชดำริ'],
      ['พื้นที่ที่ระบุในเอกสาร', 'เอกสารอุทยานกล่าวถึงการจัดการน้ำเสียจากพื้นที่อุทยาน ค่ายพระรามหก และพระราชนิเวศน์มฤคทายวัน โดยระบุว่าระบบประกอบด้วยบ่อบำบัด 6 บ่อ และอาศัยกระบวนการธรรมชาติในการบำบัดอย่างต่อเนื่อง'],
      ['ทำไมจึงเรียกว่าบึงประดิษฐ์', 'บึงประดิษฐ์เป็นระบบที่ออกแบบพื้นที่ชุ่มน้ำและองค์ประกอบการบำบัดให้ทำงานร่วมกัน แนวคิดในเอกสารอุทยานคือใช้กระบวนการธรรมชาติช่วยปรับคุณภาพน้ำ ก่อนปล่อยน้ำที่ผ่านการบำบัดแล้วออกสู่แหล่งน้ำธรรมชาติ รายละเอียดการทำงานและมาตรฐานคุณภาพน้ำไม่ควรอนุมานจากภาพถ่ายเพียงอย่างเดียว'],
      ['ประเด็นสำหรับผู้เรียน', 'ลองติดตามเส้นทางน้ำเข้าและน้ำออกจากระบบ สังเกตว่ามีบ่อหรือพื้นที่ชุ่มน้ำส่วนใดบ้าง และถามผู้ดูแลว่ามีการตรวจวัดคุณภาพน้ำอย่างไร การดูระบบช่วยเชื่อมเรื่องการใช้น้ำในชุมชนเข้ากับการป้องกันมลพิษทางน้ำ'],
      ['ข้อมูลการเข้าพื้นที่', 'ระบบบำบัดเป็นพื้นที่ปฏิบัติงานและแหล่งเรียนรู้ การเข้าถึงจุดต่าง ๆ อาจมีข้อจำกัดเพื่อความปลอดภัยและการดูแลระบบ กรุณาติดต่ออุทยานหรือหน่วยงานที่รับผิดชอบก่อนเข้าชม']
    ], sources: ['brochure','wma']
  },
  'ทางเดินและสะพาน': {
    sections: [
      ['ใช้เส้นทางเป็นห้องเรียน', 'สำนักงาน กปร. บันทึกการพัฒนาเส้นทางเดินศึกษาธรรมชาติ ป้ายสื่อความหมาย ศาลาเรียนรู้ และหอศึกษาเรือนยอดพรรณไม้ในบริเวณสวนป่าชายเลนทูลกระหม่อม ส่วนหนังสือแนะนำอุทยานฯ ใช้แนวคิด “ห้องเรียนธรรมชาติ” เพื่อให้เรียนรู้จากพื้นที่จริง'],
      ['สิ่งที่สังเกตได้ระหว่างทาง', 'บนเส้นทางสามารถใช้ป้ายและจุดหยุดพักประกอบการสังเกตชนิดพืช ลักษณะราก พื้นเลน ระดับน้ำ และร่องน้ำ โดยควรแยกสิ่งที่เห็นด้วยตาออกจากข้อสรุป เช่น การพบสัตว์หนึ่งครั้งไม่ได้บอกจำนวนประชากรทั้งหมด'],
      ['อ่านเส้นทางควบคู่กับระบบนิเวศ', 'สะพานและทางเดินช่วยให้ผู้เรียนเข้าถึงพื้นที่โดยลดการเดินเหยียบพื้นป่าบางส่วน แต่การใช้เส้นทางต้องทำตามป้ายและคำแนะนำของเจ้าหน้าที่ เพราะสภาพทางเดินและระดับน้ำเปลี่ยนได้'],
      ['ก่อนเดินชม', 'รายงานโครงการระบุการพัฒนาเส้นทางในช่วงเวลาที่จัดทำรายงาน จึงไม่ใช่การยืนยันว่าทุกช่วงเปิดใช้งานในปัจจุบัน ตรวจสอบเส้นทางที่เปิดจริงและข้อจำกัดกับอุทยานก่อนเดินทาง']
    ], sources: ['rdpb','brochure']
  },
  'ป้ายพันธุ์ไม้และสื่อความรู้': {
    sections: [
      ['ใช้ป้ายเพื่อสังเกต ไม่ใช่แค่จำชื่อ', 'หนังสือแนะนำอุทยานฯ ระบุพรรณไม้หลายชนิดในพื้นที่ เช่น โกงกางใบเล็ก โกงกางใบใหญ่ แสมทะเล โพทะเล ปอทะเล ขลู่ ฝาด โปรง และผักเบี้ย ป้ายช่วยเชื่อมชื่อกับตำแหน่งและลักษณะของพืชที่เห็นจริง'],
      ['วิธีอ่านข้อมูลภาคสนาม', 'ลองเทียบชื่อไทยกับลักษณะใบ ลำต้น ราก หรือสภาพดินที่ต้นไม้อยู่ แล้วจดวันที่และบริเวณที่พบ การบันทึกเช่นนี้ช่วยให้กลับมาเปรียบเทียบข้อมูลได้ โดยไม่สรุปชนิดพืชจากภาพหรือใบเพียงอย่างเดียว'],
      ['ทำความเข้าใจความหลากหลาย', 'เอกสารอุทยานอธิบายว่าพื้นที่มีทั้งสังคมพืชป่าชายเลนและพืชชายหาดผสมกัน ความแตกต่างของพื้นที่ น้ำ และดินทำให้เกิดสภาพแวดล้อมย่อยหลายแบบ ซึ่งรองรับสิ่งมีชีวิตต่างกัน'],
      ['ดูแลป้ายและธรรมชาติ', 'ป้ายเป็นสื่อเรียนรู้ของผู้มาเยือนหลายกลุ่ม ควรช่วยกันรักษาให้อ่านได้ ไม่ขีดเขียนหรือเด็ดส่วนของพืช และหากป้ายชำรุดหรืออ่านไม่ชัด ให้สอบถามเจ้าหน้าที่แทนการคาดเดาข้อมูล']
    ], sources: ['brochure']
  },
  'คลองและระบบนิเวศชายเลน': {
    sections: [
      ['น้ำขึ้นลงกับการฟื้นฟูป่าชายเลน', 'สำนักงาน กปร. และหนังสือแนะนำอุทยานฯ บันทึกแนวทางฟื้นฟูโดยขุดลอกคูน้ำเพื่อให้น้ำทะเลขึ้นลงหมุนเวียนตามธรรมชาติ การเชื่อมต่อของทางน้ำจึงเป็นส่วนหนึ่งของการดูแลสภาพแวดล้อมให้เอื้อต่อการเติบโตของพืชชายเลน'],
      ['คลองเป็นส่วนหนึ่งของถิ่นอาศัย', 'เอกสารอุทยานกล่าวถึงร่องน้ำและดินชุ่มน้ำในฐานะบริเวณที่สัตว์น้ำใช้วางไข่ อนุบาลตัวอ่อน และหลบภัย เมื่อสังเกตคลอง ให้มองทั้งแนวตลิ่ง รากพืช ระดับน้ำ และสิ่งมีชีวิต โดยไม่ลงไปจับหรือรบกวนสัตว์'],
      ['ความสัมพันธ์ของป่า น้ำ และชายฝั่ง', 'ป่าชายเลนเชื่อมพื้นที่บกกับทะเล หนังสืออุทยานอธิบายบทบาทต่อดิน น้ำ และการเป็นแนวธรรมชาติช่วยลดผลกระทบจากลมพายุและการกัดเซาะ ข้อสังเกตจากคลองหนึ่งจุดเป็นเพียงภาพของบริเวณนั้น ไม่ใช่ข้อสรุปแทนชายฝั่งทั้งหมด'],
      ['สังเกตอย่างรับผิดชอบ', 'หลีกเลี่ยงการทิ้งขยะลงคลองหรือเดินออกนอกทาง หากพบกลิ่น สี หรือขยะผิดปกติ ให้แจ้งเจ้าหน้าที่ การประเมินคุณภาพน้ำต้องอาศัยการตรวจวัด ไม่สามารถยืนยันจากสีหรือภาพถ่ายอย่างเดียว']
    ], sources: ['brochure','rdpb']
  },
  'ป้ายเรียนรู้เรื่องสัตว์ชายเลน': {
    sections: [
      ['สัตว์น้ำในระบบนิเวศชายเลน', 'หนังสือแนะนำอุทยานฯ ระบุว่าสภาพดินชุ่มน้ำในสวนป่าชายเลนเป็นแหล่งวางไข่ แหล่งผสมพันธุ์ แหล่งอนุบาลตัวอ่อน และที่หลบภัยของสัตว์น้ำ เช่น กุ้ง หอย ปู และปลา'],
      ['นกประจำถิ่นและนกอพยพ', 'เอกสารฉบับเดียวกันรายงานว่าพบมีนกอาศัยอยู่มากกว่า 100 ชนิด ทั้งนกประจำถิ่นและนกอพยพตามฤดูกาล ตัวเลขนี้เป็นข้อมูลตามหนังสือแนะนำอุทยานฯ ไม่ใช่ผลสำรวจแบบเรียลไทม์ของปีปัจจุบัน'],
      ['เรียนรู้จากป้ายและการสังเกต', 'ป้ายช่วยให้ผู้เยี่ยมชมรู้จักชนิดสัตว์และลักษณะการปรับตัว แต่การพบเห็นจริงขึ้นกับฤดูกาล เวลา สภาพอากาศ และพฤติกรรมสัตว์ การไม่พบสัตว์ในช่วงสั้น ๆ ไม่ได้หมายความว่าสัตว์ชนิดนั้นไม่มีอยู่ในพื้นที่'],
      ['ดูสัตว์โดยไม่รบกวน', 'สังเกตจากระยะห่าง ไม่ให้อาหาร ไม่จับสัตว์ และลดเสียงรบกวน วิธีนี้ช่วยให้สัตว์ใช้พื้นที่ตามธรรมชาติและทำให้ผู้เข้าชมคนถัดไปมีโอกาสเรียนรู้เช่นกัน']
    ], sources: ['brochure']
  }
};
const safeImage = (value) => {
  if (/^\/(?:uploads|images)\/[a-zA-Z0-9._-]+$/.test(value)) return location.protocol === 'file:' ? value.slice(1) : value;
  return /^https:\/\//i.test(value) ? value : '';
};
function openLearningDetail(group) {
  const item = group[0];
  let dialog = byId('learning-detail-dialog');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'learning-detail-dialog';
    dialog.className = 'learning-detail-dialog';
    document.body.appendChild(dialog);
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  }
  const title = group.length > 1 ? (item.location || item.title) : item.title;
  const article = learningArticles[title];
  const images = group.map((entry) => ({ entry, image: safeImage(entry.image_url) })).filter(({ image }) => image);
  const hero = images.length ? '<div class="learning-detail-media"><img class="learning-detail-hero" src="' + escapeHtml(images[0].image) + '" alt="' + escapeHtml(images[0].entry.title || title) + '">' + (images.length > 1 ? '<button type="button" class="learning-photo-arrow learning-photo-prev" aria-label="ดูรูปก่อนหน้า">‹</button><button type="button" class="learning-photo-arrow learning-photo-next" aria-label="ดูรูปถัดไป">›</button><span class="learning-photo-count" aria-live="polite">1 / ' + images.length + '</span>' : '') + '<span class="learning-photo-caption">' + escapeHtml(images[0].entry.title || title) + '</span></div>' : '';
  const articleText = article ? article.sections.map(([heading, body]) => '<section class="learning-detail-section"><h3>' + escapeHtml(heading) + '</h3><p>' + escapeHtml(body) + '</p></section>').join('') : [...new Set(group.map((entry) => entry.body).filter(Boolean))].map((body) => '<p>' + escapeHtml(body) + '</p>').join('');
  const sources = article?.sources?.length ? '<aside class="learning-detail-sources"><strong>แหล่งข้อมูลอ้างอิง</strong><ul>' + article.sources.map((key) => learningSources[key]).filter(Boolean).map((source) => '<li><a href="' + escapeHtml(source.url) + '" target="_blank" rel="noreferrer">' + escapeHtml(source.label) + ' ↗</a></li>').join('') + '</ul><small>สรุปและเรียบเรียงจากเอกสารอ้างอิง ข้อมูลบริการหรือสภาพพื้นที่อาจเปลี่ยนแปลง</small></aside>' : '';
  dialog.innerHTML = '<div class="learning-detail-panel"><header class="learning-detail-header"><div><span class="eyebrow">LEARNING AREA</span><span class="card-category">' + escapeHtml(item.category || 'แหล่งเรียนรู้') + '</span></div><button type="button" class="learning-detail-close" aria-label="ปิดหน้าต่าง">×</button></header>' + hero + '<div class="learning-detail-copy"><h2>' + escapeHtml(title) + '</h2><p class="learning-detail-summary">' + escapeHtml(item.summary) + '</p>' + articleText + sources + '</div></div>';
  dialog.querySelector('.learning-detail-close').addEventListener('click', () => dialog.close());
  if (images.length > 1) {
    let activeImage = 0;
    const image = dialog.querySelector('.learning-detail-hero');
    const caption = dialog.querySelector('.learning-photo-caption');
    const count = dialog.querySelector('.learning-photo-count');
    const showImage = (direction) => {
      activeImage = (activeImage + direction + images.length) % images.length;
      image.src = images[activeImage].image;
      image.alt = images[activeImage].entry.title || title;
      caption.textContent = images[activeImage].entry.title || title;
      count.textContent = (activeImage + 1) + ' / ' + images.length;
    };
    dialog.querySelector('.learning-photo-prev').addEventListener('click', () => showImage(-1));
    dialog.querySelector('.learning-photo-next').addEventListener('click', () => showImage(1));
  }
  dialog.showModal();
}
let mapPlaces = [];
function renderMap(places, selected = 0) {
  mapPlaces = places.slice(0, 4);
  const detail = document.getElementById('place-detail');
  const list = document.getElementById('poi-list');
  if (!mapPlaces.length) {
    detail.innerHTML = '<span class="place-number">PARK GUIDE</span><h3>กำลังเตรียมข้อมูลจุดเรียนรู้</h3><p>เพิ่มจุดแนะนำได้จากหน้าแอดมิน ในหมวดแหล่งเรียนรู้</p>';
    list.innerHTML = '';
    document.querySelectorAll('.map-pin').forEach((pin) => pin.classList.add('hidden-pin'));
    return;
  }
  selected = Math.min(selected, mapPlaces.length - 1);
  const place = mapPlaces[selected];
  const query = place.title + ' ' + (place.location || '') + ' อุทยานสิ่งแวดล้อมนานาชาติสิรินธร';
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  const photo = safeImage(place.image_url);
  detail.innerHTML = '<span class="place-number">จุดเรียนรู้ 0' + (selected + 1) + '</span><span class="place-category">' + escapeHtml(place.category || 'แหล่งเรียนรู้') + '</span>' + (photo ? '<img class="place-photo" src="' + escapeHtml(photo) + '" alt="ภาพประกอบ ' + escapeHtml(place.title) + '" loading="lazy">' : '') + '<h3>' + escapeHtml(place.title) + '</h3><p>' + escapeHtml(place.summary) + '</p>' + (place.body ? '<small class="place-extra">' + escapeHtml(place.body) + '</small>' : '') + '<a class="map-link" href="' + mapUrl + '" target="_blank" rel="noreferrer">ค้นหาจุดนี้ใน Google Maps <span>↗</span></a>';
  list.innerHTML = mapPlaces.map((item, index) => '<button class="poi-button ' + (selected === index ? 'active' : '') + '" data-place="' + index + '"><span>' + (index + 1) + '</span><strong>' + escapeHtml(item.title) + '</strong><i>→</i></button>').join('');
  list.querySelectorAll('[data-place]').forEach((button) => button.addEventListener('click', () => renderMap(mapPlaces, Number(button.dataset.place))));
  document.querySelectorAll('.map-pin').forEach((pin, index) => {
    pin.classList.toggle('hidden-pin', index >= mapPlaces.length);
    pin.classList.toggle('active', index === selected);
    if (mapPlaces[index]) pin.setAttribute('aria-label', mapPlaces[index].title);
    pin.onclick = () => renderMap(mapPlaces, Number(pin.dataset.place));
  });
}

function renderLearning(items) {
  const target = byId('learning-grid');
  if (!target) return;
  const learningOnly = items;
  if (!learningOnly.length) { target.innerHTML = '<div class="empty-state">ยังไม่มีข้อมูลแหล่งเรียนรู้</div>'; return; }
  const groups = new Map();
  learningOnly.forEach((item) => {
    const key = item.location || item.title;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  target.innerHTML = [...groups.values()].map((group, index) => {
    const item = group[0];
    const query = encodeURIComponent((item.location || item.title) + ' สวนป่าชายเลนทูลกระหม่อม อุทยานสิ่งแวดล้อมนานาชาติสิรินธร');
    const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + query;
    const coverImage = safeImage(item.image_url);
    const photos = group.map((photo, photoIndex) => {
      const image = safeImage(photo.image_url);
      return image ? '<figure class="learning-slide"' + (photoIndex ? ' hidden' : '') + '><img src="' + escapeHtml(image) + '" alt="' + escapeHtml(photo.title) + '" loading="lazy"><figcaption>' + escapeHtml(photo.title) + '</figcaption></figure>' : '';
    }).join('');
    const singleImage = group.length === 1 && coverImage ? '<img class="learning-photo" src="' + escapeHtml(coverImage) + '" alt="ภาพประกอบ ' + escapeHtml(item.title) + '" loading="lazy">' : '';
    const carousel = group.length > 1 ? '<div class="learning-carousel" aria-label="ภาพประกอบ ' + escapeHtml(item.location || item.title) + '"><div class="learning-carousel-window">' + photos + '</div><div class="learning-carousel-controls"><button type="button" data-slide="-1" aria-label="ดูภาพก่อนหน้า">‹</button><span aria-live="polite">1 / ' + group.length + '</span><button type="button" data-slide="1" aria-label="ดูภาพถัดไป">›</button></div></div>' : '';
    const detailTitle = group.length > 1 ? (item.location || item.title) : item.title;
    return '<article class="info-card learning-card' + (group.length > 1 ? ' learning-group-card' : '') + '">' + (carousel || singleImage) + '<div class="card-top"><span class="card-icon">' + iconFor(item,index) + '</span><span class="card-category">' + escapeHtml(item.category || 'แหล่งเรียนรู้') + '</span></div><h3>' + escapeHtml(detailTitle) + '</h3><p>' + escapeHtml(item.summary) + '</p>' + (item.body ? '<small class="learning-extra">' + escapeHtml(item.body) + '</small>' : '') + '<button type="button" class="learning-read-button">อ่านรายละเอียด <span>↗</span></button><a class="card-link" href="' + mapUrl + '" target="_blank" rel="noreferrer">ดูบริเวณนี้ใน Google Maps ↗</a></article>';
  }).join('');
  target.querySelectorAll('.learning-card').forEach((card, index) => card.querySelector('.learning-read-button').addEventListener('click', () => openLearningDetail([...groups.values()][index])));
  target.querySelectorAll('.learning-carousel').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('.learning-slide')];
    const counter = carousel.querySelector('.learning-carousel-controls span');
    let current = 0;
    carousel.querySelectorAll('button[data-slide]').forEach((button) => button.addEventListener('click', () => {
      current = (current + Number(button.dataset.slide) + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== current; });
      counter.textContent = (current + 1) + ' / ' + slides.length;
    }));
  });
}
function renderActivities(items) {
  const target = byId('activity-grid');
  if (!target) return;
  if (!items.length) { target.innerHTML = '<div class="empty-state">ยังไม่มีข้อมูลกิจกรรม</div>'; return; }
  target.innerHTML = items.map((item) => {
    const image = safeImage(item.image_url);
    return '<article class="activity-card"><div class="activity-image">' + (image ? '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy">' : '') + '</div><div class="activity-body"><small>' + escapeHtml(item.category || 'กิจกรรม') + '</small><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.summary) + '</p><div class="activity-meta">' + escapeHtml(item.location || 'สอบถามอุทยานเพื่อยืนยันรอบกิจกรรม') + '</div></div></article>';
  }).join('');
}
function renderActivityGallery(items) {
  const target = byId('activity-gallery');
  if (!target) return;
  const duplicatePhotos = new Set([
    '/images/field-02-entrance-overview.jpg',
    '/images/field-08-narrow-creek.jpg',
    '/images/field-16-tower-through-trees.jpg',
    '/images/field-18-boardwalk-to-tower.jpg'
  ]);
  const fieldPhotos = items.filter((item) => /^\/images\/field-/.test(item.image_url || '') && !duplicatePhotos.has(item.image_url));
  const addedFieldPhotos = [
    { title: 'พลังงานแสงอาทิตย์บนน้ำ', caption: 'แผงโซลาร์เซลล์ลอยน้ำท่ามกลางพื้นที่สีเขียว', image_url: '/images/field-28-floating-solar-panels.png', category: 'พลังงานสะอาด' },
    { title: 'นิทรรศการตามแนวพระราชดำริ', caption: 'มุมจัดแสดงเรื่องพระราชกรณียกิจและพลังของแผ่นดิน', image_url: '/images/field-30-learning-exhibit.png', category: 'นิทรรศการ' },
    { title: 'พายเรือชมป่าชายเลน', caption: 'ผู้ร่วมกิจกรรมพายเรือคายัคไปตามลำน้ำในแนวป่า', image_url: '/images/field-31-kayak-group.png', category: 'กิจกรรมกลางแจ้ง' }
  ];
  const photos = [...fieldPhotos, ...addedFieldPhotos];
  const count = byId('activity-photo-count');
  if (count) count.textContent = photos.length + ' ภาพ';
  target.innerHTML = photos.map((item) => {
    const image = safeImage(item.image_url);
    if (!image) return '';
    const caption = item.caption ? '<span class="activity-photo-note">' + escapeHtml(item.caption) + '</span>' : '';
    return '<figure class="activity-photo"><img src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy"><figcaption><small>' + escapeHtml(item.category || 'ภาพจากพื้นที่') + '</small><strong>' + escapeHtml(item.title) + '</strong>' + caption + '</figcaption></figure>';
  }).join('');
}
function renderNews(items) {
  const target = byId('news-list');
  if (!target) return;
  if (!items.length) { target.innerHTML = '<div class="empty-state">ยังไม่มีข่าวประชาสัมพันธ์</div>'; return; }
  target.innerHTML = items.map((item) => '<article class="news-item"><div class="news-date">' + escapeHtml(item.date_text || item.category || 'ประกาศ') + '</div><div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.summary) + '</p></div></article>').join('');
}
async function loadSite() {
  try {
    let data;
    if (location.protocol === 'file:' && window.SIRINDHORN_PREVIEW) data = window.SIRINDHORN_PREVIEW;
    else {
      const response = await fetch('/api/site');
      if (!response.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');
      data = await response.json();
    }
    if (byId('place-detail')) renderMap(data.learning || []);
    if (byId('learning-grid')) renderLearning(data.learning || []);
    if (byId('activity-grid')) renderActivities(data.activities || []);
    if (byId('activity-gallery')) renderActivityGallery(data.gallery || []);
    if (byId('news-list')) renderNews(data.news || []);
  } catch {
    if (byId('place-detail')) byId('place-detail').innerHTML = '<span class="place-number">PARK GUIDE</span><h3>โหลดข้อมูลจุดเรียนรู้ไม่สำเร็จ</h3><p>กรุณาลองรีเฟรชอีกครั้ง</p>';
    for (const id of ['learning-grid', 'activity-grid', 'news-list']) if (byId(id)) byId(id).innerHTML = '<div class="empty-state">โหลดข้อมูลไม่สำเร็จ กรุณาลองรีเฟรชอีกครั้ง</div>';
  }
}
const QUEUE_KEY = 'siep-queue-visitor-v1';
function getVisitorKey() {
  let key = localStorage.getItem(QUEUE_KEY);
  if (!key) {
    key = globalThis.crypto?.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
    localStorage.setItem(QUEUE_KEY, key);
  }
  return key;
}
function showQueue(data, message = '') {
  const issued = byId('queue-issued');
  if (!issued) return;
  issued.textContent = data.issued;
  byId('queue-progress').style.width = (data.issued / data.capacity * 100) + '%';
  byId('queue-status').textContent = data.remaining ? `เหลือ ${data.remaining} คิว · คิวถัดไปคือหมายเลข ${data.nextNumber}` : 'คิวกิจกรรมวันนี้เต็มแล้ว';
  const button = byId('take-ticket');
  const mine = data.myTicket;
  button.disabled = Boolean(mine) || !data.remaining;
  button.textContent = mine ? `วันนี้คุณได้คิวที่ ${mine}` : data.remaining ? 'รับคิวของฉัน →' : 'คิวเต็มแล้ว';
  if (mine) byId('queue-result').innerHTML = `<strong>คิวของคุณคือ ${mine}</strong><span>บันทึกไว้ในเบราว์เซอร์นี้แล้ว · ${data.date}</span>`;
  else if (message) byId('queue-result').textContent = message;
}
async function refreshQueue() {
  if (!byId('queue-issued')) return;
  if (location.protocol === 'file:') {
    byId('queue-issued').textContent = '—';
    byId('queue-status').textContent = 'พรีวิวไฟล์แสดงหน้าตาเท่านั้น';
    byId('take-ticket').disabled = true;
    byId('take-ticket').textContent = 'เปิดระบบคิวเมื่อขึ้นเว็บไซต์';
    byId('queue-result').textContent = 'การรับคิวร่วมต้องเปิดผ่านเซิร์ฟเวอร์ เพื่อให้ทุกคนเห็นหมายเลขชุดเดียวกัน';
    return;
  }
  try {
    const response = await fetch('/api/queue/status?visitorKey=' + encodeURIComponent(getVisitorKey()));
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'โหลดคิวไม่สำเร็จ');
    showQueue(data);
  } catch (error) {
    byId('queue-status').textContent = 'ยังเชื่อมต่อระบบคิวไม่ได้';
    byId('take-ticket').disabled = true;
    byId('queue-result').textContent = error.message;
  }
}
async function takeQueue() {
  const button = byId('take-ticket');
  button.disabled = true;
  button.textContent = 'กำลังรับคิว…';
  try {
    const response = await fetch('/api/queue/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visitorKey: getVisitorKey() }) });
    const data = await response.json();
    if (!response.ok && response.status !== 409) throw new Error(data.error || 'รับคิวไม่สำเร็จ');
    showQueue(data, data.error || data.message || '');
    if (data.myTicket) byId('queue-result').innerHTML = `<strong>คิวของคุณคือ ${data.myTicket}</strong><span>บันทึกไว้ในเบราว์เซอร์นี้แล้ว · ${data.date}</span>`;
    else if (data.error) byId('queue-result').textContent = data.error;
  } catch (error) {
    byId('queue-result').textContent = error.message;
    await refreshQueue();
  }
}
const menuButton = document.querySelector('.menu-button');
if (menuButton) menuButton.addEventListener('click', (event) => {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const isOpen = links.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(isOpen));
});
if (byId('year')) byId('year').textContent = new Date().getFullYear();





const currentPage = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
});
loadSite();
if (byId('take-ticket')) {
  byId('take-ticket').addEventListener('click', takeQueue);
  refreshQueue();
  if (location.protocol !== 'file:') window.setInterval(refreshQueue, 20000);
}
