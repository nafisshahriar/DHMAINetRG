function alumniPage() {
  const alumniPageElement = document.getElementById("AlumniPage");

  if (!alumniPageElement) {
    return;
  }

  const alumni = websiteData.team.researchers.filter(
    (researcher) => researcher.alumni,
  );

  alumniPageElement.innerHTML = `
    <div class="spacing"></div>
    <div class="members-page">
      <h1 class="section-title" style="color: #2c50b1;">Alumni</h1>
      <div class="member-group">
        ${alumni.map((member) => createMemberCard(member)).join("")}
      </div>
    </div>
  `;
}
