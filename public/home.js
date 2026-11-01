document.body.classList.add('home-ready');
(() => {
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (slides.length) {
    const captions = ['สวนป่าชายเลนทูลกระหม่อม', 'ผืนป่าชายเลนและคลองจากมุมสูง', 'ทางเดินศึกษาธรรมชาติ'];
    const subcaptions = ['เรียนรู้ระบบนิเวศจากพื้นที่จริง', 'มองเห็นความสัมพันธ์ของป่า น้ำ และชายฝั่ง', 'ค่อย ๆ สำรวจชีวิตเล็ก ๆ ใต้เรือนยอด'];
    const dots = [...document.querySelectorAll('[data-hero-dot]')];
    const current = document.querySelector('[data-slide-current]');
    const caption = document.querySelector('[data-hero-caption]');
    const subcaption = document.querySelector('[data-hero-subcaption]');
    const region = document.querySelector('[data-hero-image]');
    let active = 0;
    let timer;
    const show = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === active);
        slide.setAttribute('aria-hidden', String(i !== active));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === active);
        dot.setAttribute('aria-pressed', String(i === active));
      });
      if (current) current.textContent = String(active + 1).padStart(2, '0');
      if (caption) caption.textContent = captions[active];
      if (subcaption) subcaption.textContent = subcaptions[active];
    };
    const restart = () => {
      window.clearInterval(timer);
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = window.setInterval(() => show(active + 1), 7000);
    };
    document.querySelector('[data-hero-prev]')?.addEventListener('click', () => { show(active - 1); restart(); });
    document.querySelector('[data-hero-next]')?.addEventListener('click', () => { show(active + 1); restart(); });
    dots.forEach((dot) => dot.addEventListener('click', () => { show(Number(dot.dataset.heroDot)); restart(); }));
    region?.addEventListener('mouseenter', () => window.clearInterval(timer));
    region?.addEventListener('mouseleave', restart);
    region?.addEventListener('focusin', () => window.clearInterval(timer));
    region?.addEventListener('focusout', restart);
    show(0);
    restart();
  }
  const revealItems = document.querySelectorAll('.home-page [data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('revealed'));
})();
