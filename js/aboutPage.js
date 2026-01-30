
// Function to create About page
function aboutPage() {
  const aboutPageDiv = document.getElementById('AboutPage');
  if (!aboutPageDiv) return;

  const about = websiteData.about;
  const contact = websiteData.contact;
  const pi = websiteData.team.principalInvestigator;

  // research domains list
  const researchDomainsList = about.researchDomains
    .map(domain => `<li><strong>${domain}</strong></li>`)
    .join('');

  // ongoing projects list
  const ongoingProjectsList = websiteData.projects
    .map(project => {
      const statusBadge = project.status
  ? project.status.map(s =>
      `<mark style="background-color:${s.color};color: white;padding: 0.1em;border-radius: 6px;margin-right: 4px;">
        ${s.text}
       </mark>`
      ).join('')
      :'';
      
      return `<li onclick="openTab(event, '${project.id}')" style="cursor: pointer;">
        <strong><u>${project.name}:</u> ${project.shortDescription}</strong>${statusBadge}
      </li>`;
    })
    .join('');

  aboutPageDiv.innerHTML = `
    <div class="banner-wrapper">
      <img src="${about.banner}" alt="DHMAI Banner" class="full-banner">
    </div>
    <div class="members-page">
      <br>
      <h2 class="section-title" style="color:#2c50b1; text-align: left;">${about.title}</h2>
      <p style="text-align: left;">${about.description}</p>
      
      <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h2 style="color: #2c50b1;">Research Domains:</h2>
        <ul>
          ${researchDomainsList}
        </ul>
        <br>
        <br>
        
        <h2 style="color: #2c50b1;">Publications:</h2>
        <ul>
          <div class="extlink">
            <strong>For more information visit 
              <a href="${about.scholarLinks.googleScholar}" target="_blank">Google Scholar</a>, 
              <a href="${about.scholarLinks.dblp}" target="_blank">DBLP</a> or 
              <a href="${about.scholarLinks.researchGate}" target="_blank">Research Gate</a>
            </strong>
          </div>
        </ul>
        <br>
      </div>
      
      <h2 class="section-title" style="color:#2c50b1; text-align: left;">Contact</h2>
      <p style="text-align: left;">
        <strong>${contact.name}</strong><br>
        ${contact.title},<br>
        ${contact.department},<br>
        ${contact.institution}<br>
        ${contact.location}<br>
        Email: <a href="mailto:${contact.email}">${contact.email}</a><br>
      </p>
    </div>
  `;
}