/* main.js
   - Instagram deep link (opens native app if possible, then web)
   - Scroll reveal (IntersectionObserver) for [data-animate]
   - Mobile nav toggle
   - Image fallback placeholders (if 1.jpg/2.jpg/3.jpg missing)
   - Email fallback link
*/

const INSTAGRAM_HANDLE = 'byauvra._';
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

// open Instagram (attempt app deep link then fallback web)
function openInstagram() {
  const app = `instagram://user?username=${INSTAGRAM_HANDLE}`;
  const web = INSTAGRAM_URL;
  // attempt to open native app
  window.location.href = app;
  // fallback after short delay
  setTimeout(() => {
    window.open(web, '_blank', 'noopener');
  }, 600);
}

// Attach click handler to all elements with data-action="instagram"
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action="instagram"]');
  if (!btn) return;
  e.preventDefault();
  openInstagram();
});

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
  });
}

// Smooth reveal animations for elements with [data-animate]
document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('[data-animate]');
  if (elems.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elems.forEach(el => io.observe(el));
  }

  // Email fallback
  const email = document.getElementById('emailFallback');
  if (email) {
    email.addEventListener('click', (ev) => {
      ev.preventDefault();
      window.location.href = 'mailto:hello@auvra.example?subject=Order%20Request%20-%20AUVRA%20Shine%20Elixir';
    });
  }

  // Image fallbacks for logo/product/aside images
  function svgDataUri(text, accent = '#b58b2b', bg = '#fff8f1', w = 1200, h = 800) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
      <rect width='100%' height='100%' fill='${bg}'/>
      <text x='50%' y='52%' font-family='Playfair Display, serif' font-size='48' text-anchor='middle' fill='${accent}' font-weight='700'>${text}</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function applyFallback(id, label) {
    const img = document.getElementById(id);
    if (!img) return;
    img.onerror = () => { img.src = svgDataUri(label); img.style.objectFit = 'cover'; };
    img.style.objectFit = 'cover';
  }

  applyFallback('logoImg', 'AUVRA');
  applyFallback('productImage', 'AUVRA Shine Elixir');
  applyFallback('asideImage', 'AUVRA Ritual');
});
