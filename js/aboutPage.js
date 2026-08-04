
// // Function to create About page
// function aboutPage() {
//   const aboutPageDiv = document.getElementById('AboutPage');
//   if (!aboutPageDiv) return;

//   const about = websiteData.about;
//   const contact = websiteData.contact;
//   const pi = websiteData.team.principalInvestigator;

//   // research domains list
//   const researchDomainsList = about.researchDomains
//     .map(domain => `<li><strong>${domain}</strong></li>`)
//     .join('');

//   // ongoing projects list
//   const ongoingProjectsList = websiteData.projects
//     .map(project => {
//       const statusBadge = project.status
//   ? project.status.map(s =>
//       `<mark style="background-color:${s.color};color: white;padding: 0.1em;border-radius: 6px;margin-right: 4px;">
//         ${s.text}
//        </mark>`
//       ).join('')
//       :'';
      
//       return `<li onclick="openTab(event, '${project.id}')" style="cursor: pointer;">
//         <strong><u>${project.name}:</u> ${project.shortDescription}</strong>${statusBadge}
//       </li>`;
//     })
//     .join('');

//   aboutPageDiv.innerHTML = `
//     <div class="banner-wrapper">
//       <img src="${about.banner}" alt="DHMAI Banner" class="full-banner">
//     </div>
//     <div class="members-page">
//       <br>
//       <h2 class="section-title" style="color:#2c50b1; text-align: left;">${about.title}</h2>
//       <p style="text-align: left;">${about.description}</p>
      
//       <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
//         <h2 style="color: #2c50b1;">Research Domains:</h2>
//         <ul>
//           ${researchDomainsList}
//         </ul>
//         <br>
//         <br>
        
//         <h2 style="color: #2c50b1;">Publications:</h2>
//         <ul>
//           <div class="extlink">
//             <strong>For more information visit 
//               <a href="${about.scholarLinks.googleScholar}" target="_blank">Google Scholar</a>, 
//               <a href="${about.scholarLinks.dblp}" target="_blank">DBLP</a> or 
//               <a href="${about.scholarLinks.researchGate}" target="_blank">Research Gate</a>
//             </strong>
//           </div>
//         </ul>
//         <br>
//       </div>
      
//       <h2 class="section-title" style="color:#2c50b1; text-align: left;">Contact</h2>
//       <p style="text-align: left;">
//         <strong>${contact.name}</strong><br>
//         ${contact.title},<br>
//         ${contact.department},<br>
//         ${contact.institution}<br>
//         ${contact.location}<br>
//         Email: <a href="mailto:${contact.email}">${contact.email}</a><br>
//       </p>
//     </div>
//   `;
// }

// Function to create About page
function aboutPage() {
  const aboutPageDiv = document.getElementById("AboutPage");

  if (!aboutPageDiv) {
    return;
  }

  const about = websiteData.about || {};
  const contact = websiteData.contact || {};
  const researchDomains = about.researchDomains || [];

  // Research domains list
  const researchDomainsList =
    researchDomains.length > 0
      ? researchDomains
          .map((domain) => {
            return `
              <li class="about-domain-item">
                <span class="about-domain-icon">
                  <i class="fa-solid fa-flask"></i>
                </span>

                <strong>${domain}</strong>
              </li>
            `;
          })
          .join("")
      : `
          <li class="about-empty-message">
            No research domains available.
          </li>
        `;

  aboutPageDiv.innerHTML = `
    <div class="banner-wrapper">
      <img
        src="${about.banner || ""}"
        alt="${about.title || "Research group"} banner"
        class="full-banner"
      >
    </div>

    <div class="members-page about-page">

      <section class="about-introduction">

        <h1 class="about-main-title">
          ${about.title || "About Us"}
        </h1>

        <p class="about-description">
          ${about.description || ""}
        </p>

      </section>

      <div class="about-sections">

        <section class="about-card about-domains-card">

          <h2 class="about-section-title">
            Research Domains
          </h2>

          <ul class="about-domain-list">
            ${researchDomainsList}
          </ul>

        </section>

        <section class="about-card about-publications-card">

          <h2 class="about-section-title">
            Publications
          </h2>

          <p class="about-publications-text">
            For more information, visit our academic publication profiles.
          </p>

          <div class="about-scholar-links">

            ${
              about.scholarLinks?.googleScholar
                ? `
                  <a
                    href="${about.scholarLinks.googleScholar}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="about-scholar-link"
                  >
                    <i class="fa-brands fa-google-scholar"></i>
                    Google Scholar
                  </a>
                `
                : ""
            }

            ${
              about.scholarLinks?.dblp
                ? `
                  <a
                    href="${about.scholarLinks.dblp}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="about-scholar-link"
                  >
                    <i class="fa-solid fa-book"></i>
                    DBLP
                  </a>
                `
                : ""
            }

            ${
              about.scholarLinks?.researchGate
                ? `
                  <a
                    href="${about.scholarLinks.researchGate}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="about-scholar-link"
                  >
                    <i class="fa-brands fa-researchgate"></i>
                    ResearchGate
                  </a>
                `
                : ""
            }

          </div>

        </section>

        <section class="about-card about-contact-card">

          <h2 class="about-section-title">
            Contact
          </h2>

          <div class="about-contact-content">

            <p class="about-contact-name">
              ${contact.name || ""}
            </p>

            <p>${contact.title || ""}</p>

            <p>${contact.department || ""}</p>

            <p>${contact.institution || ""}</p>

            <p>${contact.location || ""}</p>

            ${
              contact.email
                ? `
                  <p class="about-contact-email">
                    <strong>Email:</strong>

                    <a href="mailto:${contact.email}">
                      ${contact.email}
                    </a>
                  </p>
                `
                : ""
            }

          </div>

        </section>

      </div>

    </div>
  `;
}