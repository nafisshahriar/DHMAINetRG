
// function publicationsPage() {
//   const pubPage = document.getElementById("ListPub");
//   if (!pubPage) return;

//   const publicationsHTML = websiteData.publications.years
//     .map((yearData) => {
//       return `
//         <h2 style="margin-top: 1em; color:#2c50b1;">
//           ${yearData.year}
//         </h2>

//         <ul>
//           ${yearData.items
//             .map((item, i) => {
//               const linkPart =
//                 item.link && item.link !== "#"
//                   ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
//                        ${item.link}
//                      </a>`
//                   : "";

//               return `
//                 <li>
//                   [${i + 1}] ${item.text}
//                   ${linkPart ? "" + linkPart : ""}
//                 </li>
//               `;
//             })
//             .join("")}
//         </ul>
//       `;
//     })
//     .join("");

//   pubPage.innerHTML = `
//     <div class="spacing"></div>
//     <div class="members-page">
//       <h1 style="color: #2c50b1;">Publications</h1>

//       <div class="manual-section"
//         style="text-align: left; max-width: 95vw; margin: 2em auto;
//         background: #f8f9fa; border-radius: 8px; padding: 2em;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

//         ${publicationsHTML}

//       </div>
//     </div>
//   `;
// }

// function submissionsPage() {
//     const pubPage1 = document.getElementById('ListSub');
//     if (!pubPage1) return;


//     let submissionsList = '';
//     websiteData.submittedPublications.years.forEach(yearData => {
//         submissionsList += `<strong>${yearData.year} :</strong>`;
//         yearData.items.forEach((pub, index) => {
//             submissionsList += `<li>[${index + 1}] ${pub}</li>`;
//         });
//         submissionsList += '<br>';
//     });


//     pubPage1.innerHTML = `
//         <div class="spacing"></div>
//         <div class="members-page">
//             <h1 style="color: #2c50b1;">Submissions</h1>
//             <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
//                 <ul>
//                     ${submissionsList}
//                 </ul>
//             </div>
//         </div>
//     `;
// }


function createPublicationLink(link) {
  if (!link || link === "#") {
    return "";
  }

  const cleanLink = link.trim();

  return `
    <a
      href="${cleanLink}"
      target="_blank"
      rel="noopener noreferrer"
      class="publication-link"
    >
      ${cleanLink}
    </a>
  `;
}

function renderPublicationSection(years, type, title) {
  let counter = 1;
  let sectionContent = "";

  years.forEach((yearData) => {
    const filteredPapers = yearData.items.filter(
      (paper) => paper.type === type,
    );

    if (filteredPapers.length === 0) {
      return;
    }

    const papersHTML = filteredPapers
      .map((paper) => {
        return `
          <li class="publication-item">
            <span class="publication-number">
              [${counter++}]
            </span>

            <span class="publication-text">
              ${paper.text}
              ${createPublicationLink(paper.link)}
            </span>
          </li>
        `;
      })
      .join("");

    sectionContent += `
      <div class="publication-year-group">
        <h2 class="publication-year">
          ${yearData.year}
        </h2>

        <ul class="publication-list">
          ${papersHTML}
        </ul>
      </div>
    `;
  });

  return `
    <section class="publication-category publication-category-${type}">
      <h1 class="publication-section-title">
        ${title}
      </h1>

      ${
        sectionContent ||
        `
          <p class="publication-empty">
            No ${title.toLowerCase()} available.
          </p>
        `
      }
    </section>
  `;
}

function publicationsPage() {
  const publicationPage = document.getElementById("ListPub");

  if (!publicationPage) {
    return;
  }

  const publicationYears =
    websiteData.publications?.years || [];

  const journalPapers = renderPublicationSection(
    publicationYears,
    "journal",
    "Journal Papers",
  );

  const conferencePapers = renderPublicationSection(
    publicationYears,
    "conference",
    "Conference Papers",
  );

  publicationPage.innerHTML = `
    <div class="spacing"></div>

    <div class="members-page publications-page">
      <h1 class="publications-main-title">
        Publications
      </h1>

      <div class="publication-categories">
        ${journalPapers}
        ${conferencePapers}
      </div>
    </div>
  `;
}

function renderSubmissionSection(years, type, title) {
  let counter = 1;
  let sectionContent = "";

  years.forEach((yearData) => {
    const filteredSubmissions = yearData.items.filter(
      (submission) => submission.type === type,
    );

    if (filteredSubmissions.length === 0) {
      return;
    }

    const submissionsHTML = filteredSubmissions
      .map((submission) => {
        return `
          <li class="publication-item">
            <span class="publication-number">
              [${counter++}]
            </span>

            <span class="publication-text">
              ${submission.text}
              ${createPublicationLink(submission.link)}
            </span>
          </li>
        `;
      })
      .join("");

    sectionContent += `
      <div class="publication-year-group">
        <h2 class="publication-year">
          ${yearData.year}
        </h2>

        <ul class="publication-list">
          ${submissionsHTML}
        </ul>
      </div>
    `;
  });

  return `
    <section class="publication-category publication-category-${type}">
      <h1 class="publication-section-title">
        ${title}
      </h1>

      ${
        sectionContent ||
        `
          <p class="publication-empty">
            No ${title.toLowerCase()} available.
          </p>
        `
      }
    </section>
  `;
}

function submissionsPage() {
  const submissionPage = document.getElementById("ListSub");

  if (!submissionPage) {
    return;
  }

  const submissionYears =
    websiteData.submittedPublications?.years || [];

  const journalSubmissions = renderSubmissionSection(
    submissionYears,
    "journal",
    "Journal Submissions",
  );

  const conferenceSubmissions = renderSubmissionSection(
    submissionYears,
    "conference",
    "Conference Submissions",
  );

  submissionPage.innerHTML = `
    <div class="spacing"></div>

    <div class="members-page publications-page">
      <h1 class="publications-main-title">
        Submissions
      </h1>

      <div class="publication-categories">
        ${journalSubmissions}
        ${conferenceSubmissions}
      </div>
    </div>
  `;
}