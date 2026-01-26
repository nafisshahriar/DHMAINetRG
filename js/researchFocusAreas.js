// Function to create Research Focus Areas section
function createResearchFocusAreas() {
  return `
    <div class="research-focus-wrapper">
      <div class="section-head">
        <h2 class="focus-title">Research Focus Areas</h2>
        <p class="focus-subtitle">Exploring cutting-edge technologies in networking and IoT</p>
      </div>

      <section class="focus-grid" aria-label="Research focus area cards">
        <!-- Card 1 -->
        <article class="focus-card" tabindex="0">
          <div class="focus-icon-tile grad-purple" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 6h10M12 6v5M6 19h12" stroke="white" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="11" r="2.2" fill="white" opacity=".35"/>
              <rect x="4" y="4" width="6" height="4" rx="1.2" fill="#fff"/>
              <rect x="14" y="4" width="6" height="4" rx="1.2" fill="#fff" opacity=".85"/>
              <rect x="9" y="17" width="6" height="4" rx="1.2" fill="#fff" opacity=".9"/>
            </svg>
          </div>
          <h3>Future Internet</h3>
          <p>Information‑Centric Networking, Delay Tolerant Networks, and Opportunistic Networks</p>
        </article>

        <!-- Card 2 -->
        <article class="focus-card" tabindex="0">
          <div class="focus-icon-tile grad-pink" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 10c4.5-4.5 11.5-4.5 16 0M7 13c3-3 7-3 10 0" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="17.2" r="1.8" fill="#fff"/>
            </svg>
          </div>
          <h3>IoT &amp; IoV</h3>
          <p>Internet of Things protocols, Internet of Vehicles, and smart device communication</p>
        </article>

        <!-- Card 3 -->
        <article class="focus-card" tabindex="0">
          <div class="focus-icon-tile grad-cyan" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="7" width="14" height="12" rx="3" fill="#fff"/>
              <rect x="10.4" y="4" width="3.2" height="3" rx="1" fill="#fff" opacity=".9"/>
              <circle cx="10" cy="13" r="1.4" fill="#00b2ff"/>
              <circle cx="14" cy="13" r="1.4" fill="#00b2ff"/>
              <rect x="8" y="15.5" width="8" height="1.8" rx=".9" fill="#00b2ff"/>
            </svg>
          </div>
          <h3>Automation &amp; AI</h3>
          <p>Network simulation automation, big data analytics, and machine learning applications</p>
        </article>

        <!-- Card 4 -->
        <article class="focus-card" tabindex="0">
          <div class="focus-icon-tile grad-green" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8.5 8 5 12l3.5 4M15.5 8 19 12l-3.5 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3>Protocol Design</h3>
          <p>Novel transport protocols, middleware solutions, and embedded systems</p>
        </article>
      </section>
    </div>
  `;
}

// Function to initialize parallax tilt effect for research focus cards
function initResearchFocusInteractivity() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduce-motion: reduce)').matches;

  document.querySelectorAll('.focus-card').forEach(card => {
    if (prefersReducedMotion) return;

    let raf = null;

    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const cx = (e.clientX ?? (e.touches?.[0]?.clientX || 0));
      const cy = (e.clientY ?? (e.touches?.[0]?.clientY || 0));
      const x = (cx - r.left) / r.width;
      const y = (cy - r.top) / r.height;
      const rx = (0.5 - y) * 6;
      const ry = (x - 0.5) * 6;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
      });
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      card.style.transform = '';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchstart', onMove, { passive: true });
    card.addEventListener('touchmove', onMove, { passive: true });
    card.addEventListener('touchend', reset);
  });
}
