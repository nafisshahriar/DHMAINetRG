// Count-up animation function
function initStatsAnimation() {
  const easeOutQuad = t => t * (2 - t);

  function animateCount(el, target, suffix = "", duration = 900) {
    const startTime = performance.now();
    function tick(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const val = Math.round(target * easeOutQuad(p));
      el.textContent = `${val}${p === 1 ? suffix : ""}`;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const cards = document.querySelectorAll(".stats-card");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const numEl = entry.target.querySelector(".stats-number");
      const target = Number(numEl.dataset.target || "0");
      const suffix = numEl.dataset.suffix || "";
      if (!numEl.dataset.done) {
        animateCount(numEl, target, suffix);
        numEl.dataset.done = "1";
      }
    });
  }, { threshold: 0.35 });

  cards.forEach(card => obs.observe(card));
}

// Function to create Research Statistics section
function researchStatistics() {
  return `
    <section class="stats-wrapper" aria-labelledby="stats-title">
      <h2 id="stats-title" class="stats-title">Research Statistics</h2>

      <div class="stats-grid">
        <!-- Card 1 -->
        <article class="stats-card">
          <div class="stats-icon icon-blue">
            <i class="fas fa-book" aria-hidden="true"></i>
          </div>
          <div class="stats-number" data-target="9">9</div>
          <div class="stats-label">Publications</div>
        </article>

        <!-- Card 2 -->
        <article class="stats-card">
          <div class="stats-icon icon-green">
            <i class="fas fa-project-diagram" aria-hidden="true"></i>
          </div>
          <div class="stats-number" data-target="6">6</div>
          <div class="stats-label">Active Projects</div>
        </article>

        <!-- Card 3 -->
        <article class="stats-card">
          <div class="stats-icon icon-purple">
            <i class="fas fa-users" aria-hidden="true"></i>
          </div>
          <div class="stats-number" data-target="15">15</div>
          <div class="stats-label">Team Members</div>
        </article>

        <!-- Card 4 -->
        <article class="stats-card">
          <div class="stats-icon icon-red">
            <i class="fas fa-calendar" aria-hidden="true"></i>
          </div>
          <div class="stats-number" data-target="17" data-suffix="+">17+</div>
          <div class="stats-label">Years Active</div>
        </article>
      </div>
    </section>
  `;
}
