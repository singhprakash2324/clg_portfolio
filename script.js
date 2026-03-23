/**
 * Prakash Singh Portfolio - Core Logic
 * Merged with advanced interactive features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core System Initializations
  initTheme();
  initNavbar();
  initScrollProgress();
  initParticles();
  
  // 2. Interactive Components
  initMagneticElements();
  initTiltElements();
  initTypewriter();
  initInfiniteSliders();
  generateActivityChart();
  
  // 3. Scroll & Entrance Animations
  initIntersectionObserver();
});

// --- 1. CORE SYSTEM ---

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.onclick = () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    };
  }
}

function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    
    // Active link highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-icon-link');
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 150;
      if (window.scrollY >= top) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
    });
  });
}

function initScrollProgress() {
  const prog = document.getElementById('scroll-progress');
  if (!prog) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    prog.style.width = pct + '%';
  });
}

function initParticles() {
  const container = document.querySelector('.bg-glow-container');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'bg-particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      background: var(--accent);
      opacity: ${Math.random() * 0.2};
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      pointer-events: none;
      animation: floatParticle ${10 + Math.random() * 20}s infinite linear;
    `;
    container.appendChild(p);
  }
}

// --- 2. INTERACTIVE COMPONENTS ---

function initMagneticElements() {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

function initTiltElements() {
  // Use VanillaTilt if available, otherwise manual fallback
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt], .project-card, .stat-card, .cert-card, .about-card, .skill-category, .platforms-container"), {
      max: 8, speed: 400, glare: true, "max-glare": 0.15,
    });
  } else {
    document.querySelectorAll('[data-tilt]').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }
}

function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;
  const texts = ["Computer Science Engineer.", "AI & ML Enthusiast.", "Full Stack Developer."];
  let count = 0, index = 0, currentText = "", letter = "", isDeleting = false;

  (function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = isDeleting ? currentText.slice(0, --index) : currentText.slice(0, ++index);
    target.textContent = letter;
    
    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && letter.length === currentText.length) {
      speed = 2000; isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
      isDeleting = false; count++; speed = 500;
    }
    setTimeout(type, speed);
  })();
}

function initInfiniteSliders() {
  ['projects', 'certs'].forEach(id => {
    const track = document.getElementById(`${id}-track`);
    const wrapper = document.querySelector(`.${id}-wrapper`);
    if (!track || !wrapper) return;
    track.innerHTML += track.innerHTML;
    let isPaused = false;
    const step = () => {
      if (!isPaused) {
        wrapper.scrollLeft += 0.5;
        if (wrapper.scrollLeft >= wrapper.scrollWidth / 2) wrapper.scrollLeft -= wrapper.scrollWidth / 2;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    wrapper.addEventListener('mouseenter', () => isPaused = true);
    wrapper.addEventListener('mouseleave', () => isPaused = false);
  });
}

// --- 3. ANIMATIONS & UTILS ---

function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        e.target.classList.add('visible'); // Support reveal class
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate], .reveal').forEach(el => observer.observe(el));
}

// Charts and Other Globals
function generateActivityChart() {
  const container = document.getElementById('activity-chart');
  if (!container) return;
  
  const data = [15, 35, 52, 70, 70, 70, 58, 42, 60, 80, 95, 100];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const width = container.offsetWidth;
  const height = 200;
  const paddingX = 40;
  const paddingY = 20;
  const chartWidth = width - paddingX - 20;
  const chartHeight = height - paddingY * 2;
  
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("class", "activity-svg");
  
  const defs = document.createElementNS(svgNS, "defs");
  const gradient = document.createElementNS(svgNS, "linearGradient");
  gradient.setAttribute("id", "activity-gradient");
  gradient.setAttribute("x1", "0%"); gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "0%"); gradient.setAttribute("y2", "100%");
  const stops = [{ offset: "0%", opacity: "0.3" }, { offset: "100%", opacity: "0" }];
  stops.forEach(s => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", s.offset);
    stop.setAttribute("stop-color", "var(--accent)");
    stop.setAttribute("stop-opacity", s.opacity);
    gradient.appendChild(stop);
  });
  defs.appendChild(gradient);
  svg.appendChild(defs);

  const points = data.map((val, i) => ({
    x: paddingX + (i * (chartWidth / (months.length - 1))),
    y: height - paddingY - (val / 100 * chartHeight),
    val, month: months[i]
  }));

  const getPath = (pts) => {
    let d = `M ${pts[0].x} ${pts[0].y} `;
    for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i], p2 = pts[i + 1];
        const cpx = (p1.x + p2.x) / 2;
        d += `Q ${p1.x} ${p1.y}, ${cpx} ${(p1.y + p2.y) / 2} T ${p2.x} ${p2.y} `;
    }
    return d;
  };

  const linePath = document.createElementNS(svgNS, "path");
  linePath.setAttribute("d", getPath(points));
  linePath.setAttribute("class", "activity-line");
  linePath.style.fill = "none";
  linePath.style.stroke = "var(--accent)";
  linePath.style.strokeWidth = "3";
  svg.appendChild(linePath);
  
  container.appendChild(svg);
}

function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('active');
}

function moveSlider(id, direction) {
  const wrapper = document.querySelector(`.${id}-wrapper`);
  if (wrapper) wrapper.scrollLeft += direction * 350;
}

function handleSubmit() {
  const btn = document.querySelector('.form-submit');
  if (!btn) return;
  btn.textContent = 'Message sent! ✓'; btn.style.background = '#26a641';
  setTimeout(() => { btn.textContent = 'Send Message ↗'; btn.style.background = ''; }, 3000);
}
