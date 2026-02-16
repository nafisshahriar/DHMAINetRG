// Function to create work in progress page
function workInProgressPage() {
  const workPage = document.getElementById('WorkinProg');
  if (!workPage) return;

  // ongoing projects list
  const ongoingProjectsList = websiteData.projects
    .map(project => {
      const statusBadge = project.status
  ? project.status.map(s =>
      `<mark style="background-color:${s.color};color: white;padding: 0.1em;border-radius: 6px;margin-right: 4px;text-align: center">
        ${s.text}
       </mark>`
      ).join('')
      :'';
      
      return `<li onclick="openTab(event, '${project.id}')" style="cursor: pointer;">
        <strong><u>${project.name}:</u> ${project.shortDescription}</strong>${statusBadge}
      </li>`;
    })
    .join('');

  // upcoming projects list
  const upcomingProjectsList = websiteData.upcomingProjects
    .map(project => {
      const statusBadge = project.status
        ? `<mark style="background-color:${project.status.color}; color: white; padding: 0.1em 0.3em 0.1em 0.25em; margin-left: 1em; border-radius: 0.25rem;">${project.status.text}</mark>`
        : '';
      
      return `<li onclick="openTab(event, '${project.id}')" style="cursor: pointer;">
        <strong><u>${project.name}:</u> ${project.shortDescription}</strong>${statusBadge}
      </li>`;
    })
    .join('');

  workPage.innerHTML = `
    <div class="spacing"></div>
    <div class="members-page">
      <h1 style="color: #2c50b1;">Ongoing Research Projects</h1>
      <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <br>
        <ul>
          ${ongoingProjectsList}
        </ul>
        <br>
      </div>

      <h1 style="color: #2c50b1;">Upcoming Research Projects</h1>
      <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <br>
        <ul>
          ${upcomingProjectsList}
        </ul>
        <br>
      </div>
    </div>
  `;
}
 