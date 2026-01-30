function publicationsPage() {
    const pubPage = document.getElementById('ListPub');
    if (!pubPage) return;


    let publicationsList = '';
    websiteData.publications.years.forEach(yearData => {
        publicationsList += `<strong>${yearData.year} :</strong>`;
        yearData.items.forEach((pub, index) => {
            publicationsList += `<li>[${index + 1}] ${pub}</li>`;
        });
        publicationsList += '<br>';
    });


    pubPage.innerHTML = `
        <div class="spacing"></div>
        <div class="members-page">
            <h1 style="color: #2c50b1;">Publications</h1>
            <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <ul>
                    ${publicationsList}
                </ul>
            </div>
        </div>
    `;
}

function submissionsPage() {
    const pubPage1 = document.getElementById('ListSub');
    if (!pubPage1) return;


    let submissionsList = '';
    websiteData.submittedPublications.years.forEach(yearData => {
        submissionsList += `<strong>${yearData.year} :</strong>`;
        yearData.items.forEach((pub, index) => {
            submissionsList += `<li>[${index + 1}] ${pub}</li>`;
        });
        submissionsList += '<br>';
    });


    pubPage1.innerHTML = `
        <div class="spacing"></div>
        <div class="members-page">
            <h1 style="color: #2c50b1;">Submissions</h1>
            <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <ul>
                    ${submissionsList}
                </ul>
            </div>
        </div>
    `;
}
