// Function to get member data by ID
function getMemberById(memberId) {
  const pi = websiteData.team.principalInvestigator;
  const advisors = websiteData.team.externalAdvisors;
  const researchers = websiteData.team.researchers;
  
  if (pi.id === memberId) return pi;
  
  const advisor = advisors.find(a => a.id === memberId);
  if (advisor) return advisor;
  
  const researcher = researchers.find(r => r.id === memberId);
  if (researcher) return researcher;
  
  return null;
}

// Function to create project detail page
function createProjectDetailPage(project) {
  console.log("project: ", project);
  const projectDiv = document.getElementById(project.id);
  if (!projectDiv) return;

  const contact = websiteData.contact;

  // Get team members data
  const piMembers = project.team.principalInvestigator.map(id => getMemberById(id)).filter(Boolean);
  const advisorMembers = project.team.externalAdvisors.map(id => getMemberById(id)).filter(Boolean);
  const leadMembers = project.team.teamLeads.map(id => getMemberById(id)).filter(Boolean);
  const teamMembers = project.team.teamMembers.map(id => getMemberById(id)).filter(Boolean);

  // Generate PI section
  const piSection = piMembers.length > 0 ? `
    <h2 class="subsection-title">Principal Investigator</h2>
    <br>
    <div class="member-group">
      ${piMembers.map(member => createMemberCard(member, true)).join('')}
    </div>
  ` : '';

  // Generate External Advisors section
  const advisorsSection = advisorMembers.length > 0 ? `
    <br>
    <h2 class="subsection-title">External Advisor</h2>
    <br>
    <div class="member-group">
      ${advisorMembers.map(member => createMemberCard(member, true)).join('')}
    </div>
  ` : '';

  // Generate Team Leads section
  const leadsSection = leadMembers.length > 0 ? `
    <br><br>
    <h2 class="subsection-title">Team Lead</h2>
    <br>
    <div class="member-group">
      ${leadMembers.map(member => createMemberCard(member, true)).join('')}
    </div>
  ` : '';

  // Generate Team Members section
  const membersSection = teamMembers.length > 0 ? `
    <br>
    <h2 class="subsection-title">Team Members</h2>
    <br>
    <div class="member-group">
      ${teamMembers.map(member => createMemberCard(member, true)).join('')}
    </div>
  ` : '';

  // Status badge for title
  const statusBadge = project.status
  ? project.status.map(s =>
      `<mark style="background-color:${s.color};color: white;padding: 0.1em;border-radius: 6px;margin-right: 4px;">
        ${s.text}
       </mark>`
      ).join('')
      :'';

  projectDiv.innerHTML = `
    <div class="banner-wrapper">
      <img src="${project.banner}" alt="${project.name} Banner" class="full-banner">
    </div>
    <div class="members-page">
      <br>
      <h2 class="section-title" style="color:#2c50b1; text-align: left;">${project.name}</h2>
      <p style="text-align: left;">${project.description}${statusBadge}</p>
      
      <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div class="members-page">
          <h1 class="section-title" style="color:#2c50b1;">Team ${project.name}</h1>
          ${piSection}
          ${advisorsSection}
          ${leadsSection}
          ${membersSection}
        </div>
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

// Function to generate all project detail pages
function allProjectPages() {
  websiteData.projects.forEach(project => {
    console.log("hi");
    createProjectDetailPage(project);
  });
   
}