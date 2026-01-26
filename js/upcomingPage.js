// Function to create "Coming Soon" page for upcoming projects
function createComingSoonPage(project) {
  const projectDiv = document.getElementById(project.id);
  if (!projectDiv) return;

  projectDiv.innerHTML = `
    <div class="coming-soon-container">
      <div class="coming-soon-content">
        <div class="icon-wrapper">
          <div class="icon-circle">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>
        
        <h1 class="coming-soon-title">Coming Soon</h1>
        <p class="coming-soon-subtitle">${project.name} Project</p>
        <p class="coming-soon-description">${project.shortDescription}</p>
        
        <div class="progress-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  `;
}

// Function to generate all upcoming project pages
function allUpcomingProjectPages() {
  if (websiteData.upcomingProjects && websiteData.upcomingProjects.length > 0) {
    websiteData.upcomingProjects.forEach(project => {
      createComingSoonPage(project);
    });
  }
}
 