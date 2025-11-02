/* script.js — AUVRA
   Includes:
    - Instagram deep-link + fallback
    - Image fallback to elegant SVG placeholders
    - Smooth scroll & entrance animations
*/

const INSTAGRAM_USERNAME = 'byauvra._'; // <-- your handle

function openInstagram() {
  const app = `instagram://user?username=${INSTAGRAM_USERNAME}`;
  const web = `https://instagram.com/${INSTAGRAM_USERNAME}`;
  window.location.href = app;
  setTimeout(() => window.open(web, '_blank'), 650);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="instagram"]');
  if (btn) {
    e.preventDefault();
    openInstagram();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const email = document.getElementById('emailFallback');
  if (email) {
    email.addEventListener('click', (ev) => {
      ev.preventDefault();
      window.location.href = 'mailto:sarahmushtaq130@gmail.com?subject=Order%20Request%20-%20AUVRA%20Shine%20Elixir';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        ev.preventDefault();
        const t = document.querySelector(href);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));
});

function dataUriSVG(text, accent = '#b58b2b', sub = '#f7efe6', w = 1200, h = 800) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
    <defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
      <stop offset='0' stop-color='${sub}'/><stop offset='1' stop-color='#ffffff'/>
    </linearGradient></defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <g transform='translate(${w*0.08}, ${h*0.12})'>
      <rect x='0' y='0' width='${w*0.84}' height='${h*0.76}' rx='28' fill='rgba(255,255,255,0.85)' stroke='${accent}' stroke-opacity='0.12' stroke-width='8'/>
      <text x='50%' y='52%' font-family='Playfair Display, serif' font-size='48' text-anchor='middle' fill='${accent}' font-weight='700'>${text}</text>
    </g></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const applyImageFallback = (el, label) => {
  if (!el) return;
  el.onerror = () => {
    el.src = dataUriSVG(label);
    el.style.objectFit = 'cover';
  };
  el.style.objectFit = 'cover';
};

document.addEventListener('DOMContentLoaded', () => {
  applyImageFallback(document.getElementById('logoImg'), 'AUVRA');
  applyImageFallback(document.getElementById('productImage'), 'AUVRA Shine Elixir');
  applyImageFallback(document.getElementById('asideImage'), 'AUVRA Ritual');
});

(function () {
  const img = document.querySelector('.product-image');
  if (!img) return;
  let timeout;
  document.addEventListener('mousemove', (e) => {
    const w = window.innerWidth, h = window.innerHeight;
    const x = (e.clientX - w / 2) / (w / 2);
    const y = (e.clientY - h / 2) / (h / 2);
    img.style.transform = `translate(${x * 8}px, ${y * 8}px) scale(1.02) rotate(${x * 1.5}deg)`;
    clearTimeout(timeout);
    timeout = setTimeout(() => img.style.transform = '', 1800);
  });
})();


// Mobile navigation toggle
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.toggle('show');
});