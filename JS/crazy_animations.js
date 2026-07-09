const IS_MOBILE =
  window.innerWidth <= 900 ||
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* ── Scroll-reveal base state ── */
    .anim-hidden {
      opacity: 0;
      transform: translateY(48px) scale(0.96);
      transition: opacity 0.65s cubic-bezier(.22,.68,0,1.2),
                  transform 0.65s cubic-bezier(.22,.68,0,1.2);
      will-change: opacity, transform;
    }
    .anim-visible {
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
    }

    /* Stagger siblings */
    .anim-hidden:nth-child(2) { transition-delay: 0.08s; }
    .anim-hidden:nth-child(3) { transition-delay: 0.16s; }
    .anim-hidden:nth-child(4) { transition-delay: 0.24s; }

    /* ── Mobile hero animated gradient ── */
    @media (max-width: 900px) {
      .hero {
        position: relative;
        overflow: hidden;
      }
      .hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          135deg,
          #0a0a0a 0%,
          #1a0800 30%,
          #ff4500 50%,
          #1a0800 70%,
          #0a0a0a 100%
        );
        background-size: 300% 300%;
        animation: heroGradientShift 8s ease infinite;
        z-index: 0;
        opacity: 0.55;
      }
      .hero > * { position: relative; z-index: 1; }
    }
    @keyframes heroGradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* ── Floating particle canvas (mobile only) ── */
    #mobile-particles {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.18;
    }

    /* ── Mobile card hover: subtle glow instead of tilt ── */
    @media (max-width: 900px) {
      .product {
        transition: box-shadow 0.3s ease, transform 0.3s ease !important;
      }
      .product:active {
        box-shadow: 0 0 22px 4px rgba(255,69,0,0.5);
        transform: scale(0.97);
      }
    }

    /* ── Scroll-progress bar ── */
    #scroll-bar {
      position: fixed;
      top: 0; left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg, #ff4500, #ff8c00);
      z-index: 9999;
      transition: width 0.05s linear;
      box-shadow: 0 0 8px #ff4500;
    }

    /* ── Hero text reveal on load ── */
    .hero h2 {
      animation: heroTextReveal 1.1s cubic-bezier(.22,.68,0,1.1) both;
    }
    @keyframes heroTextReveal {
      from { opacity: 0; transform: translateY(30px) skewY(3deg); }
      to   { opacity: 1; transform: translateY(0) skewY(0deg); }
    }

    /* ── See-more button pulse ── */
    .see-more-btn {
      animation: btnPulse 3s ease-in-out infinite;
    }
    @keyframes btnPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(255,69,0,0); }
      50%       { box-shadow: 0 0 14px 4px rgba(255,69,0,0.35); }
    }
  `;
  document.head.appendChild(style);
})();

function initScrollBar() {
  const bar = document.createElement('div');
  bar.id = 'scroll-bar';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled =
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.product, .see-more-container, .hero');

  // Start hidden
  targets.forEach(el => el.classList.add('anim-hidden'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          observer.unobserve(entry.target); 
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

function initMobileParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'mobile-particles';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.6 + 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      drift: (Math.random() - 0.5) * 0.4,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,${Math.floor(69 + p.opacity * 60)},0,${p.opacity})`;
      ctx.fill();

      p.y -= p.speed;
      p.x += p.drift;

      if (p.y < -5) {
        p.y = H + 5;
        p.x = Math.random() * W;
      }
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
}

function initMobileParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const offset = window.scrollY * 0.3;
    hero.style.backgroundPositionY = offset + 'px';
  }, { passive: true });
}

function initDesktop() {
  window.addEventListener('load', () => {
    // Vanta
    if (typeof VANTA !== 'undefined') {
      VANTA.NET({
        el: 'body',
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        color: 0xff4500,
        backgroundColor: 0x000000,
        points: 14.00,
        maxDistance: 22.00,
        spacing: 16.00,
      });
    }

    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll('.product'), {
        max: 20,
        speed: 350,
        glare: true,
        'max-glare': 0.4,
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollBar();
  initScrollReveal();

  if (IS_MOBILE) {
    initMobileParticles();
    initMobileParallax();
  } else {
    initDesktop();
  }
});
