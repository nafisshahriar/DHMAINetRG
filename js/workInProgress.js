// // Function to create work in progress page
// function workInProgressPage() {
//   const workPage = document.getElementById('WorkinProg');
//   if (!workPage) return;

//   // ongoing projects list
//   const ongoingProjectsList = websiteData.projects
//     .map(project => {
//       const statusBadge = project.status
//   ? project.status.map(s =>
//       `<mark style="background-color:${s.color};color: white;padding: 0.1em;border-radius: 6px;margin-right: 4px;text-align: center">
//         ${s.text}
//        </mark>`
//       ).join('')
//       :'';
      
//       return `<li onclick="openTab(event, '${project.id}')" style="cursor: pointer;">
//         <strong><u>${project.name}:</u> ${project.shortDescription}</strong>${statusBadge}
//       </li>`;
//     })
//     .join('');

//   // upcoming projects list
//   const upcomingProjectsList = websiteData.upcomingProjects
//     .map(project => {
//       const statusBadge = project.status
//         ? `<mark style="background-color:${project.status.color}; color: white; padding: 0.1em 0.3em 0.1em 0.25em; margin-left: 1em; border-radius: 0.25rem;">${project.status.text}</mark>`
//         : '';
      
//       return `<li onclick="openTab(event, '${project.id}')" style="cursor: pointer;">
//         <strong><u>${project.name}:</u> ${project.shortDescription}</strong>${statusBadge}
//       </li>`;
//     })
//     .join('');

//   workPage.innerHTML = `
//     <div class="spacing"></div>
//     <div class="members-page">
//       <h1 style="color: #2c50b1;">Ongoing Research Projects</h1>
//       <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
//         <br>
//         <ul>
//           ${ongoingProjectsList}
//         </ul>
//         <br>
//       </div>

//       <h1 style="color: #2c50b1;">Upcoming Research Projects</h1>
//       <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
//         <br>
//         <ul>
//           ${upcomingProjectsList}
//         </ul>
//         <br>
//       </div>
//     </div>
//   `;
// }
 

// Create project status badges
function createProjectStatusBadges(status) {
  if (!status) {
    return "";
  }

  // Support both array and single-object status
  const statuses = Array.isArray(status) ? status : [status];

  return statuses
    .map((item) => {
      if (!item || !item.text) {
        return "";
      }

      return `
        <span
          class="project-status-badge"
          style="background-color: ${item.color || "#64748b"};"
        >
          ${item.text}
        </span>
      `;
    })
    .join("");
}

// Create individual project item
function createResearchProjectItem(project) {
  const statusBadges = createProjectStatusBadges(project.status);

  return `
    <li
      class="research-project-item"
      onclick="openTab(event, '${project.id}')"
      tabindex="0"
      role="button"
      onkeydown="
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openTab(event, '${project.id}');
        }
      "
    >
      <div class="research-project-content">

        <div class="research-project-information">
          <span class="research-project-name">
            ${project.name}:
          </span>

          <span class="research-project-description">
            ${project.shortDescription || ""}
          </span>
        </div>

        ${
          statusBadges
            ? `
              <div class="research-project-status">
                ${statusBadges}
              </div>
            `
            : ""
        }

      </div>
    </li>
  `;
}

// Create project section
function createResearchProjectSection({
  title,
  projects,
  sectionType,
  emptyMessage,
}) {
  const projectList =
    projects && projects.length > 0
      ? projects
          .map((project) => createResearchProjectItem(project))
          .join("")
      : `
          <li class="research-project-empty">
            ${emptyMessage}
          </li>
        `;

  return `
    <section
      class="research-project-section research-project-section-${sectionType}"
    >
      <h2 class="research-project-section-title">
        ${title}
      </h2>

      <ul class="research-project-list">
        ${projectList}
      </ul>
    </section>
  `;
}

// Function to create work in progress page
function workInProgressPage() {
  const workPage = document.getElementById("WorkinProg");

  if (!workPage) {
    return;
  }

  const ongoingProjects = websiteData.projects || [];
  const upcomingProjects = websiteData.upcomingProjects || [];

  const ongoingProjectsSection =
    createResearchProjectSection({
      title: "Ongoing Research Projects",
      projects: ongoingProjects,
      sectionType: "ongoing",
      emptyMessage: "No ongoing research projects available.",
    });

  const upcomingProjectsSection =
    createResearchProjectSection({
      title: "Upcoming Research Projects",
      projects: upcomingProjects,
      sectionType: "upcoming",
      emptyMessage: "No upcoming research projects available.",
    });

  workPage.innerHTML = `
    <div class="spacing"></div>

    <div class="members-page research-projects-page">

      <h1 class="research-projects-main-title">
        Research Projects
      </h1>

      <div class="research-project-sections">
        ${ongoingProjectsSection}
        ${upcomingProjectsSection}
      </div>

    </div>
  `;
}