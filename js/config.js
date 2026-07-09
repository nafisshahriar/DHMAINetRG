function toggleSidebar() {
  document.getElementById("tabs").classList.toggle("show");
  document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("tabs");
    const hamburger = document.getElementById("hamburger");
    // Only run on mobile
    if (window.innerWidth <= 768) {
      if (
        sidebar.classList.contains("show") &&
        !sidebar.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        sidebar.classList.remove("show");
      }
    }
  });
}

function openTab(evt, tabName, pushState = true) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  // Save scroll position for current tab before switching
  history.replaceState(
    Object.assign({}, history.state, { scrollY: window.scrollY }),
    "",
    window.location.hash || "",
  );

  // Always scroll to top when switching tab normally
  if (pushState) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  if (evt && evt.currentTarget) {
    evt.currentTarget.className += " active";
  }
  // Only push state if not handling popstate
  if (pushState) {
    history.pushState({ tab: tabName }, "", "#" + tabName);
  }
}

window.addEventListener("popstate", function (event) {
  let tab =
    (event.state && event.state.tab) ||
    window.location.hash.replace("#", "") ||
    "homepage";
  if (document.getElementById(tab)) {
    openTab(null, tab, false); // Show tab even if no button found
    // Restore previous scroll position if available
    setTimeout(function () {
      window.scrollTo({
        top: (event.state && event.state.scrollY) || 0,
        behavior: "instant",
      });
    }, 0);
  }
});

// Function to create member card
function createMemberCard(member, onClick = true) {
  const clickable = onClick
    ? `onclick="openTab(event, '${member.id}')" style="cursor: pointer;"`
    : "";

  const badges = member.badges
    ? member.badges
        .map(
          (badge) =>
            `<div class="member-role"><mark style="background-color:${badge.color}; color: white; padding: 0.1em 0.3em 0.1em 0.25em; border-radius: 0.25rem;">${badge.text}</mark></div>`,
        )
        .join("")
    : "";

  const institution = member.institution
    ? `<div class="member-role">${member.institution}</div>`
    : "";

  return `
        <div class="member-card">
            <div ${clickable}>
                <img src="${member.image}" alt="${member.name}">
                <div class="member-name">${member.name}</div>
            </div>
            <div class="member-role">${member.role}</div>
            ${institution}
            ${badges}
            <div class="member-links">
                <a href="mailto:${member.email}" target="_blank" rel="noopener"><i class="fas fa-envelope"></i></a>
                ${member.scholar ? `<a href="${member.scholar}" target="_blank" rel="noopener"><i class="fa-brands fa-google-scholar"></i></a>` : ""}
                ${member.github ? `<a href="${member.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i></a>` : ""}
                ${member.linkedin ? `<a href="${member.linkedin}" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i></a>` : ""}
                ${member.website ? `<a href="${member.website}" target="_blank" rel="noopener"><i class="fa-solid fa-globe"></i></a>` : ""}
            </div>
        </div>
    `;
}

// Function to homepage
function homePage() {
  const homepage = document.getElementById("homepage");
  if (!homepage) return;

  const pi = websiteData.team.principalInvestigator;
  const advisors = websiteData.team.externalAdvisors;
  const researchers = websiteData.team.researchers;

  homepage.innerHTML = `
        <div class="spacing"></div>
        <div class="members-page">
            <h1 class="section-title" style="color:#2c50b1;">Meet the Team</h1>
            
            <h2 class="subsection-title">Principal Investigator</h2>
            <br>
            <div class="member-group">
                ${createMemberCard(pi)}
            </div>
            
            <br>
            <h2 class="subsection-title">External Advisor</h2>
            <br>
            <div class="member-group">
                ${advisors.map((advisor) => createMemberCard(advisor)).join("")}
            </div>
            
            <br>
            <h2 class="subsection-title">Researchers</h2>
            <br>
            <div class="member-group">
                ${researchers
                  .filter((r) => !r.hideFromHome)
                  .map((researcher) => createMemberCard(researcher))
                  .join("")}
            </div>
        </div>
    `;
}

// Function to create project list
function createProjectList(projects) {
  return projects
    .map((projectId) => {
      const project = websiteData.projects.find((p) => p.id === projectId);
      if (!project) return "";
      console.log("project : ", project.status);

      const status = project.status
        ? project.status
            .map(
              (st) =>
                `<mark style="background-color:${st.color}; color: white; padding: 0.1em 0.3em 0.1em 0.25em; margin-left: 0.5em; border-radius: 0.25rem;">${st.text}</mark>`,
            )
            .join("")
        : "";

      return `<li onclick="openTab(event, '${project.id}')" style="cursor: pointer;"><strong><u>${project.name}:</u> ${project.shortDescription}</strong>${status}</li>`;
    })

    .join("");
}

// Function to individual member detail page
function memberDetailPage(member) {
  const detailPage = document.getElementById(member.id);
  if (!detailPage) return;

  const isPrincipal = member.id === "DHMAI";
  const isAdvisor = ["DRI", "DMG"].includes(member.id);

  let roleTitle = "Research Assistant";
  if (isPrincipal) roleTitle = "Principal Investigator";
  else if (isAdvisor) roleTitle = "External Advisor";

  const badges = member.badges
    ? member.badges
        .map(
          (badge) =>
            `<div class="member-role"><mark style="background-color:${badge.color}; color: white; padding: 0.1em 0.3em 0.1em 0.25em; border-radius: 0.25rem;">${badge.text}</mark></div>`,
        )
        .join("")
    : "";

  const institution = member.institution
    ? `<div class="member-role">${member.institution}</div>`
    : "";

  const projectsSection =
    member.projects && member.projects.length > 0
      ? `
        <h3 style="color: #2c50b1;" class="subsection-title">📚 ${isPrincipal || isAdvisor ? "Current Projects" + (isAdvisor ? " with DHMAINetRG" : "") : "Projects"}:</h3>
        <ul>
            ${createProjectList(member.projects)}
        </ul>
        <br>
    `
      : "";

  const experienceSection =
    member.experience && member.experience.length > 0
      ? `
        <h3 style="color: #2c50b1;" class="subsection-title">💼 Professional Experience:</h3>
        <ul>
            ${member.experience.map((exp) => `<li>${exp}</li>`).join("")}
        </ul>
        <br>
    `
      : "";

  const recognitionsSection =
    member.recognitions && member.recognitions.length > 0
      ? `
        <h3 style="color: #2c50b1;" class="subsection-title">🏆 Recognitions:</h3>
        <ul>
            ${member.recognitions.map((rec) => `<li>${rec}</li>`).join("")}
        </ul>
        <br>
    `
      : "";

  const publicationsSection = `
  <h3 style="color: #2c50b1;" class="subsection-title">
    📄 Publications:
  </h3>

  <div class="papers" data-name="${member.name}"></div>
`;

  detailPage.innerHTML = `
        <div class="spacing"></div>
        <div class="members-page">
            <h2 class="subsection-title" style="color: #2c50b1;">${roleTitle}</h2>
            <br>
            <div class="member-group">
                <div class="member-card">
                    <img src="${member.image}" alt="${member.name}">
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                    ${institution}
                    ${badges}
                    <div class="member-links">
                        <a href="mailto:${member.email}"><i class="fas fa-envelope"></i></a>
                        ${member.scholar ? `<a href="${member.scholar}"><i class="fa-brands fa-google-scholar"></i></a>` : ""}
                        ${member.github ? `<a href="${member.github}"><i class="fa-brands fa-github"></i></a>` : ""}
                        ${member.linkedin ? `<a href="${member.linkedin}"><i class="fa-brands fa-linkedin"></i></a>` : ""}
                        ${member.website ? `<a href="${member.website}"><i class="fa-solid fa-globe"></i></a>` : ""}
                    </div>
                </div>
            </div>

            <br>
            <p style="text-align: left;">${member.bio}</p>

            <div class="manual-section" style="text-align: left; max-width: 95vw; margin: 2em auto; background: #f8f9fa; border-radius: 8px; padding: 2em; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                ${projectsSection}
                ${experienceSection}
                ${recognitionsSection}
                ${publicationsSection}
            </div>
        </div>
    `;
}

function loadPapers() {
  fetch("js/dynamic.json")
    .then((res) => res.json())
    .then((data) => {
      const containers = document.querySelectorAll(".papers");

      containers.forEach((container) => {
        const memberName = container.getAttribute("data-name");

        const filtered = data.filter((paper) =>
          paper.authors.includes(memberName),
        );

        if (filtered.length === 0) {
          container.innerHTML = "<p>No publications yet</p>";
          return;
        }

        const byYear = {};
        filtered.forEach((paper) => {
          if (!byYear[paper.year]) byYear[paper.year] = [];
          byYear[paper.year].push(paper);
        });

        const sortedYears = Object.keys(byYear).sort((a, b) => b - a);

        let html = "";
        let counter = 1;

        sortedYears.forEach((year) => {
          html += `<h4 style="margin-top:1em;">${year} :</h4><ul>`;
          byYear[year].forEach((paper) => {
            let title = paper.title;
            if (
              paper.highlightForMember &&
              paper.highlightForMember[memberName]
            ) {
              paper.highlightForMember[memberName].forEach((name) => {
                title = title.replace(name, `<strong>${name}</strong>`);
              });
            }

            const linkPart =
              paper.link && paper.link !== "#"
                ? `<a href="${paper.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">View</a>`
                : "";

            html += `<li>[${counter++}] ${title}${linkPart ? ` — ${linkPart}` : ""}</li>`;
          });
          html += `</ul>`;
        });

        container.innerHTML = html;
      });
    });
}

// all member detail pages
function allMemberPage() {
  const pi = websiteData.team.principalInvestigator;
  const advisors = websiteData.team.externalAdvisors;
  const researchers = websiteData.team.researchers;

  memberDetailPage(pi);

  advisors.forEach((advisor) => memberDetailPage(advisor));

  researchers.forEach((researcher) => memberDetailPage(researcher));

  loadPapers();
}

const websiteData = {
  team: {
    principalInvestigator: {
      id: "DHMAI",
      name: "Hasan Mahmood Aminul Islam",
      image: "images/dhmai.webp",
      role: "Assistant Professor",
      institution: "East West University",
      email: "hasan.mahmood@ewubd.edu",
      scholar: "https://scholar.google.com/citations?user=M0oP3RMAAAAJ&hl=en",
      github: "https://github.com/hmaislam",
      linkedin:
        "https://www.linkedin.com/in/hasan-mahmood-aminul-islam-ph-d-02a4ab30/",
      bio: "DR. HASAN MAHMOOD AMINUL ISLAM is currently working as an Assistant Professor in the department of CSE, East West University, Dhaka, Bangladesh. Presently, his research group(<a href='https://dhmairg.net'>DHMAINetRG</a>) is mostly focusing on the innovation of lightweight IoT testbed for the Future IoT Architecture. Previously, he worked as a Specialist in system-on-chip (SoC) Software at Nokia headquarters, Espoo, Finland, where the key responsibility was to develop Layer1-Low (l1low) System-on-Chip (SoC) Software driver development for 5G (2019-2022). He received a Doctor of Science in Technology (CSE) from the School of Science, Aalto University, Finland in 2018. As part of his doctoral studies, he worked on Future Internet Architecture (ICN) in the EU-H2020 POINT project. He received a Masters Degree in Networking and Services majoring in Distributed Systems and Data Communication, from the University of Helsinki, Finland. As part of his Master's thesis, he worked in the Nomadic Lab, L M Ericsson, Finland, where he closely worked with the IETF community on the data channel protocol options of the RTCWeb. His research interest includes Data Communications and Distributed System, Internet protocols, IoT protocols, Future Internet Architecture, Information-Centric Networking Architecture, and Delay Tolerant Networking. Presently, he is also focusing on Machine Learning",
      projects: [
        "CCNDA",
        // "MapBD",
        "PAUMIoT",
        "OppNDA",
        "PixieGPT",
        "STGen",
        "PRIoTP",
      ],
      experience: [
        "Principal Investigator at DHMAINetRG <strong>(Jan 2024 – Present)</strong>",
        "Assistant Professor at East West University <strong>(Feb 2023 – Present)</strong>",
        "Specialist of SoC SW at Nokia, Espoo, Finland <strong>(Jul 2019 – Dec 2021)</strong>",
        "D.Sc in Technology from Aalto University School of Science and Technology, Aalto, Finland <strong>(Apr 2013 – Dec 2018)</strong>",
        "Master's Thesis from Nomadic Lab, L M Ericsson, Jorvas, Finland <strong>(Oct 2011 – Jul 2012)</strong>",
        "Lecturer at University of Asia Pacific, Dhaka <strong>(Oct 2008 – Sep 2010)</strong>",
        "Lecturer at Northern University Bangladesh, Dhaka <strong>(Jan 2008 – Oct 2008)</strong>",
      ],
      recognitions: [
        "Funding from EU-H2020 POINT Project (Focused on a viable migration path to the Internet that supports Information-Centric Networking as well as IP-based services)",
        "ACM ICN 2017 - <strong>Best Demo Award</strong>",
      ],
    },

    externalAdvisors: [
      {
        id: "DRI",
        name: "Riadul Islam",
        image: "images/riadul_islam.webp",
        role: "Assistant Professor",
        institution: "University of Maryland Baltimore County",
        email: "riaduli@umbc.edu",
        scholar: "https://scholar.google.com/citations?hl=en&user=y1x9Hx8AAAAJ",
        website: "https://sites.google.com/view/umbc-vlsi-soc/home?authuser=0",
        linkedin: "https://www.linkedin.com/in/riadul-islam-38baa350/",
        bio: "Riadul Islam is currently a tenure-track Assistant Professor at the University of Maryland Baltimore County (UMBC) Computer Science and Electrical Engineering Department. Before joining UMBC, he was with the University of Michigan (UM), Dearborn from 2017 to 2019. In his Ph.D. dissertation work at UCSC, Dr. Riadul has designed the first current-pulsed flip-flop/register that resulted first ever one-to-many current-mode clock distribution networks for high-performance microprocessors. From 2007 to 2009, he worked as a full-time faculty in the Department of Electrical and Electronic Engineering of the University of Asia Pacific, Dhaka, Bangladesh. He is a Senior member of the IEEE, IEEE Circuits, Systems (CAS) society, and member of ACM. He is an editorial board member of <a href='http://ojs.bilpublishing.com/index.php/ssid'>Semiconductor Science and Information Devices</a> Journal. Here is Riadul's updated (<a href='https://drive.google.com/file/d/1Ok0jmyOueWlMNbJxc0K7uAREhAhYGIYl/view?usp=drive_link'>CV</a>) (Last updated July 2025).",
        projects: ["STGen"],
        experience: [
          "Associate Editor at Springer Circuits, Systems and Signal Processing Journal <strong>(Jan 2022 – Present)</strong>",
          "Principal Investigator at UMBC VLSI-SOC GROUP, USA <strong>(Sep 2019 – Present)</strong>",
          "Assistant Professor at University of Maryland Baltimore County <strong>(Aug 2019 – Present)</strong>",
          "Assistant Professor at University of Michigan-Dearborn <strong>(Sept 2017 – Aug 2019)</strong>",
          "Ph.D. in Computer Engineering from University of California Santa Cruz, USA <strong>(Apr 2013 – Aug 2017)</strong>",
          "Research Internship at ISR Technologies, Canada <strong>(May 2012 – Aug 2012)</strong>",
          "Research Assistant at École Polytechnique de Montréal, Canada <strong>(Jan 2012 – Aug 2012)</strong>",
          "Research Assistant at Concordia University, Canada <strong>(Sep 2009 – Aug 2011)</strong>",
          "Lecturer at University of Asia Pacific, Dhaka <strong>(Oct 2007 – Aug 2009)</strong>",
        ],
      },
      {
        id: "DMG",
        name: "Michael Georgiades",
        image: "images/michael.webp",
        role: "Assistant Professor",
        institution: "Neapolis University of Pafos",
        email: "m.georgiades@nup.ac.cy",
        scholar: "https://scholar.google.com/citations?user=Ft1MZlsAAAAJ&hl=el",
        website: "https://www.nup.ac.cy/faculty/michael-georgiades/",
        linkedin: "https://www.linkedin.com/in/mgeorgiades/",
        bio: "Michael Georgiades is an Assistant Professor in the field of Communication Networks in the Department of Computer Science, Neapolis University. He received a B.Eng. in Communications and Radio Engineering with First Class Honors from King's College London in 2000, an M.Sc. in Telecommunications from University College London in 2001, and a Ph.D. in Wireless and Mobile Networks from the University of Surrey in 2008. He is also currently pursuing an M.Sc. Machine Learning and Data Science at Imperial College London (MLDS'25). Positions held include Assistant Professor at Neapolis University Pafos, R&D Manager at Infostrada Communications, Adjunct Lecturer at the Cyprus University of Technology and Open University of Cyprus, R&D Manager at Primetel PLC, Research Fellow at the Centre of Communication Systems Research (CCSR) University of Surrey (UK) and Systems Development Engineer at INSIG Ltd (UK). Dr. Georgiades, has been involved in more than 20 EU funded projects and is also an active expert evaluator for the EUREKA Eurostars international funding program. He is a patent holder and has authored more than 70 publications in international journals, conferences, book chapters, and IETF. He has received several awards in the past, including Primetel Excellence and Appreciation Awards, Nokia Research Excellence Award and EPSRC Fellowship. As a distinguished IEEE member, he actively contributes as a reviewer for prestigious journals, magazines, and conferences within the IEEE community. Areas of research interest include: Tactile Internet, Mobile Edge Computing, Vehicular Networks, Internet of Things, Edge Intelligence, and Federated Learning.",
        projects: ["OppNDA"],
        experience: [
          "Assistant Professor at Neapolis University Pafos, Cyprus <strong>(Jan 2022 – Present)</strong>",
          "Adjunct Lecturer at Cyprus University of Technology, Cyprus <strong>(Sep 2018 – Present)</strong>",
          "R&D Manager at Infostrada Communications, Cyprus <strong>(Nov 2009 – Feb 2024)</strong>",
          "R&D Manager at PrimeTel, Cyprus <strong>(Oct 2010 – Mar 2022)</strong>",
          "Adjunct Lecturer at Open University of Cyprus, Cyprus <strong>(Jan 2015 – Aug 2018)</strong>",
          "Research Associate at Cyprus University of Technology, Cyprus <strong>(Nov 2008 – Oct 2009)</strong>",
          "Research Fellow at University of Surrey, UK <strong>(Jul 2002 – Jun 2008)</strong>",
        ],
      },
    ],

    researchers: [
      {
        id: "MRM",
        name: "Mahmudur Rahman Mehraj",
        image: "images/mehraj.webp",
        role: "Under Graduate Teaching Assistant",
        badges: [
          { text: "Technical Lead", color: "#72A276" },
          { text: "PAUMIoT Lead", color: "#1e293b" },
        ],
        email: "2022-3-60-182@std.ewubd.edu",
        github: "https://github.com/MehrajRahman",
        linkedin: "https://www.linkedin.com/in/mehraj-rahman-8658611a9/",
        bio: "MD. Mahmudur Rahman Mehraj is currently pursuing his B.Sc. in Computer Science and Engineering (CSE) at East West University (EWU), Dhaka, Bangladesh. He is a passionate problem-solving enthusiast with a strong research interest. His academic and personal pursuits are centered on exploring innovative solutions and contributing to advancements in computer science. Currently, he has been working as a research trainee under the supervision of Dr. Hasan Mahmood Aminul Islam since 2024. His responsibility mostly includes feature development, experimentation, and verification of IoT protocols.",
        projects: [
          "PAUMIoT",
          "OppNDA",
          // "PixieGPT",
          "STGen",
          "CCN-IoV",
          // "PRIoTP",
        ],
        experience: [
          "Research Assistant (Technical Lead) at DHMAINetRG, Dhaka <strong>(Jan 2024 – Present)</strong>",
          "Undergraduate Teaching Assistant at East West University, Dhaka <strong>(Jun 2025 – Present)</strong>",
          "Intern at Brain Code LTD, Dhaka <strong>(Jan 2021 – Dec 2022)</strong>",
        ],
        recognitions: [
          "ACM ICPC 2024, Rank: 116 - <strong>Honorable Mention</strong>",
          "National Collegiate Programming Contest 2023, Rank: 128 - <strong>Honorable Mention</strong>",
          "UAP Inter University Collaborative Programming Contest, Rank: 9 - <strong>Honorable Mention</strong>",
          "EWU Intra University Programming Contest 2023, <strong>Rank: 1 (Junior Category)</strong>",
          "Merit Scholarship & Dean List, East West University - Fall 2023",
        ],
      },
      {
        id: "SMNS",
        name: "S. M. Nafis Shahriar",
        image: "images/nafis.webp",
        role: "Assistant",
        badges: [
          { text: "Project Manager", color: "#72A276" },
          { text: "OppNDA Lead", color: "#1e293b" },
        ],
        email: "2023-3-60-071@std.ewubd.edu",
        github: "https://github.com/nafisshahriar",
        linkedin: "https://www.linkedin.com/in/sm-nafis-shahriar/",
        bio: "S. M. Nafis Shahriar is currently pursuing a B.Sc. in Computer Science and Engineering at East West University, Dhaka, Bangladesh. He is a research assistant in DHMAINetRG working under the supervision of Dr. Hasan Mahmood Aminul Islam. He is interested in various domains of computer science, including distributed computing, edge intelligence, big data analytics, and software development. Previously, he worked part-time as a front-end and back-end developer for several startups. He was also closely involved with competitive programming since his high school days.",
        projects: ["OppNDA", "CCN-IoV", "STGen"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jan 2025 – Present)</strong>",
          "Back End Developer at EduKonnect Inc., Pennsylvania <strong>(Dec 2024 – Jul 2025)</strong>",
          "Front End Developer at AK Digital International PTY LTD, Sydney <strong>(May 2024 – Sep 2024)</strong>",
          "Front End Developer at Electronic Source BD, Dhaka <strong>(Oct 2020 – Feb 2022)</strong>",
        ],
        recognitions: [
          "IBM DevOps and Software Engineering Professional Certificate",
          "CUMUN 2025 - Security Council - <strong>Verbal Mention</strong>",
          "EWU Intra MUN 2024 – World Bank – <strong>Outstanding Delegate</strong>",
          "EWU CSE Fest Intra University Programming Contest 2024 – <strong>4th in Freshman Category</strong>",
          "SCB-PA Inter School and College Programming Contest 2018 - <strong>39th in National Round</strong>",
          "National High School Programming Contest 2017 - <strong>14th in Dhaka Regional Round</strong>",
        ],
      },
      {
        id: "PA",
        name: "Pulok Akibuzzaman",
        image: "images/pulok.webp",
        role: "Assistant",
        badges: [{ text: "CCN-IoV Lead", color: "#1e293b" }],
        email: "2023-3-60-051@std.ewubd.edu",
        github: "https://github.com/Pulok-Akibuzzaman",
        linkedin: "https://www.linkedin.com/in/pulok-akibuzzaman-73a21229a/",
        bio: "Pulok Akibuzzaman is currently pursuing a B.Sc in Computer Science and Engineering (CSE) at East West University (EWU), Dhaka, Bangladesh. He has a real love for programming, system development and emerging fields such as cybersecurity. During his academic journey, he has worked on notable projects, including the development of a Metro Rail Ticketing System. He has strong proficiency in C, C++, Java and Python. Capture The Flag (CTF) challenges are also proving to be an excellent way to build hands-on cybersecurity skills for him. Currently, he has been working as a research trainee under the supervision of Dr. Hasan Mahmood Aminul Islam since 2025.",
        projects: ["OppNDA", "CCN-IoV", "STGen"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jan 2025 – Present)</strong>",
        ],
      },
      {
        id: "MIO",
        name: "Mahdin Islam Ohi",
        image: "images/ohi.webp",
        role: "Assistant",
        badges: [{ text: "PixieGPT Lead", color: "#1e293b" }],
        email: "2023-3-60-151@std.ewubd.edu",
        github: "https://github.com/MahdinOhi",
        linkedin: "https://www.linkedin.com/in/mahdin-ohi-3b55a0280/",
        bio: "Mahdin Islam Ohi is a dedicated Software Developer and a Computer Science & Engineering student at East West University, Dhaka. He is currently contributing to innovative projects at Level7 (2024 - present) and XSRS IT (2023 - present). With a strong foundation in C, C++, Java, and Python, he specializes in developing AI/ML-powered web applications using Django and the MERN stack. His core interests include networking, computational theory, AI/ML, and quantum computing. Mahdin thrives on solving complex problems, creating practical solutions, and continuously expanding his expertise in cutting-edge technologies. He has been working as a research assistant and technical lead under the guidance of DR. Hasan Mahmood Aminul Islam since 2025.",
        projects: ["PRIoTP", "STGen"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Mar 2025 – Present)</strong>",
          "Developer at Level7, Dhaka <strong>(Mar 2025 – Present)</strong>",
          "Developer at XSRS IT, Dhaka <strong>(Feb 2023 – Present)</strong>",
        ],
      },
      /*{
        id: "MR",
        name: "Muin Ratul",
        image: "images/ratul.webp",
        role: "Assistant",
        email: "2023-3-60-059@std.ewubd.edu",
        github: "https://github.com/MuinRatul",
        linkedin: "https://www.linkedin.com/in/mh-ratul-5201792a9/",
        bio: "Muin Hossain Ratul is pursuing a Bachelor of Science in Computer Science and Engineering (CSE) at East West University (EWU), Dhaka, Bangladesh. He has a strong foundation in programming languages such as C, Java, and Python, and is currently learning Java-based frameworks like Spring Boot to build efficient and scalable applications. He enjoys programming and building practical systems and tools to explore real-world challenges in diverse areas of software development. He is also passionate about developing impactful research projects and exploring emerging fields such as cybersecurity and machine learning. Since early 2025, he has been actively engaged in research as a member of the DHMAINet Research Group under the supervision of Dr. Hasan Mahmood Aminul Islam.",
        // projects: ["CCN-DA", "OppNDA", "PixieGPT", "PAUMIoT", "STGen"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jan 2025 – Present)</strong>",
        ],
      },*/
      {
        id: "AS",
        name: "Abdullah Sajid",
        image: "images/sajid.webp",
        role: "Assistant",
        badges: [{ text: "PRIoTP Lead", color: "#1e293b" }],
        email: "2023-3-60-487@std.ewubd.edu",
        github: "https://github.com/AbdullahSajid007",
        linkedin: "https://www.linkedin.com/in/abdullah-sajid-089848363/",
        bio: "Abdullah Sajid is currently pursuing a Bachelor of Science in Computer Science and Engineering at East West University (EWU), Dhaka, Bangladesh. He is a research assistant in the DHMAINet Research Group (DHMAINetRG) under the supervision of Dr. Hasan Mahmood Aminul Islam. His academic and research interests include distributed computing, machine learning, and big data analytics.",
        projects: ["PRIoTP"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Mar 2025 – Present)</strong>",
        ],
      },
      /*{
        id: "HE",
        name: "Homayra Erin",
        image: "images/erin.webp",
        role: "Assistant",
        email: "2023-3-60-359@std.ewubd.edu",
        github: "https://github.com/Erin0W0",
        linkedin: "https://www.linkedin.com/in/homayra-erin-9b72a4352",
        bio: "Homayra Erin is currently pursuing a B.Sc in Computer Science and Engineering (CSE) at East West University (EWU), Dhaka, Bangladesh. She has interest in programming, system development and emerging fields such as Data Science. During her academic journey, she has worked on notable projects, including an automated cafeteria system. She is proficient in C, C++ & Java.She also participated in Olympiads. Since 2025, she has been working as a research trainee under the supervision of Dr. Hasan Mahmood Aminul Islam.",
        projects: ["PRIoTP"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Mar 2025 – Present)</strong>",
        ],
      },*/
      {
        id: "MAUZ",
        name: "Md. Ashik-Uz-Zaman",
        image: "images/ashik.webp",
        role: "Assistant",
        email: "2023-3-60-074@std.ewubd.edu",
        github: "https://github.com/ashikonik",
        linkedin: "https://www.linkedin.com/in/ashikonik",
        bio: "Md. Ashik-Uz-Zaman is working towards his goal of studying Computer Science and Engineering at East West University, Dhaka, Bangladesh. He is very keen about learning, developing, and conducting research in the field of computer science. His primary career focus is Network Security, and he is currently honing his skills in research and professionalism under the mentorship of Dr. Hasan Mahmood Aminul Islam.",
        projects: ["PRIoTP"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jun 2025 – Present)</strong>",
        ],
      },
      {
        id: "SFI",
        name: "Sadia Fahmida Islam",
        image: "images/sfi.webp",
        role: "Assistant",
        email: "2024-1-60-331@std.ewubd.edu",
        github: "https://github.com/sadiafahmida",
        linkedin: "https://www.linkedin.com/in/sadia-fahmida-islam-84734b287",
        bio: "Sadia Fahmida Islam is pursuing a B.Sc. in Computer Science and Engineering at East West University, Dhaka, Bangladesh. She has completed several projects in UI/UX design and programming with C, C++, Java script, and Python, and completed the Headstarter Fellowship in AI. Her interest has recently grown in Cybersecurity and its applications in technology and research. Alongside her studies, she has worked as a Research and Development Assistant and Academic Coordinator at non-profit organizations, gaining valuable leadership experience as the Best Academic Coordinator and mentoring students in various science and Olympiad programs. She is also an active public speaker, contributing to awareness and education initiatives.",
        projects: ["PRIoTP", "CCN-IoV"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Oct 2025 – Present)</strong>",
        ],
      },
      {
        id: "NRA",
        name: "Nusrat Rahman Aurna",
        image: "images/nra.webp",
        role: "Assistant",
        email: "2023-3-60-057@std.ewubd.edu",
        github: "https://github.com/Nusrat60-057",
        linkedin: "https://www.linkedin.com/in/nusrat-rahman-aurna-292b16331/",
        bio: "Nusrat Rahman Aurna is currently pursuing a Bachelor's degree in Computer Science and Engineering at East West University in Dhaka, Bangladesh. Her studies include courses in Data Structures, Object-Oriented Programming, Discrete Mathematics, and Linear Algebra, which have improved her analytical and technical skills. Before this, she finished her Higher Secondary education at Viqarunnisa Noon School and College, where she earned top grades in the Science stream. She is enthusiastic about learning new technologies and applying what she learns to real projects. Her interests lie in Software Development, Algorithms. She is also eager to explore opportunities in IoT, Machine Learning, and Distributed Systems in the future. She is fluent in both Bangla and English.",
        projects: ["PRIoTP", "CCN-IoV"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Nov 2025 – Present)</strong>",
        ],
      },
      {
        id: "MASUM",
        name: "Masum",
        image: "images/masum.webp",
        role: "Assistant",
        email: "2023-3-60-066@std.ewubd.edu",
        github: "https://github.com/masum-mir",
        linkedin: "https://www.linkedin.com/in/md-masum-mir/",
        bio: "Masum is an undergraduate student of Computer Science and Engineering at East West University, Dhaka, Bangladesh. Alongside his studies, he works as a Research Assistant in DHMAINetRG under the supervision of Dr. Hasan Mahmood Aminul Islam.",
        projects: ["PRIoTP", "CCN-IoV"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jan 2026 – Present)</strong>",
        ],
      },
      //Members below will not be shown on the homepage but on specific projects
      {
        id: "FI",
        name: "Fayaza Islam",
        image: "images/fayaza.webp",
        role: "Assistant",
        hideFromHome: true,
        // badges: [{ text: "CCN-DA Lead", color: "#1e293b" }],
        email: "2023-3-60-314@std.ewubd.edu",
        github: "https://github.com/Fayaza6",
        linkedin: "https://www.linkedin.com/in/fayaza-islam-365177371/",
        bio: "Fayaza Islam is currently pursuing her BSc in CSE at East West University. Since early 2025, she has been actively engaged in research as a member of the DHMAINet Research Group under the supervision of Dr. Hasan Mahmood Aminul Islam.",
        projects: ["OppNDA"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jan 2025 – Present)</strong>",
        ],
      },
      {
        id: "MFHD",
        name: "Mahir Faysal Haque Dipto",
        image: "images/mfhd.webp",
        role: "Assistant",
        hideFromHome: true,
        // badges: [{ text: "CCN-DA Lead", color: "#1e293b" }],
        email: "2022-2-60-044@std.ewubd.edu",
        github: "https://github.com/",
        linkedin:
          "https://www.linkedin.com/in/mahir-faysal-haque-dipto-6911a4245?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        bio: "Mahir Faysal Haque Dipto is currently pursuing his BSc in CSE at East West University. Since early 2025, he has been actively engaged in research as a member of the DHMAINet Research Group under the supervision of Dr. Hasan Mahmood Aminul Islam.",
        projects: ["PAUMIoT"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jan 2025 – Present)</strong>",
        ],
      },
      {
        id: "FA",
        name: "Faisal Ahmad",
        image: "images/faisal.webp",
        role: "Assistant",
        hideFromHome: true,
        // badges: [{ text: "CCN-DA Lead", color: "#1e293b" }],
        email: "2022-2-60-065@std.ewubd.edu",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/in/minhaj-shafin-0b206a252/",
        bio: "Faisal Ahmad is currently pursuing his BSc in CSE at East West University. Since early 2025, he has been actively engaged in research as a member of the DHMAINet Research Group under the supervision of Dr. Hasan Mahmood Aminul Islam.",
        projects: ["PAUMIoT"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jan 2025 – Present)</strong>",
        ],
      },
      {
        id: "MS",
        name: "Minhaj Shafin",
        image: "images/minhaj.webp",
        role: "Assistant",
        hideFromHome: true,
        // badges: [{ text: "CCN-DA Lead", color: "#1e293b" }],
        email: "2022-2-60-065@std.ewubd.edu",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/in/minhaj-shafin-0b206a252/",
        bio: "Minhaj Shafin is currently pursuing his BSc in CSE at East West University. Since early 2025, he has been actively engaged in research as a member of the DHMAINet Research Group under the supervision of Dr. Hasan Mahmood Aminul Islam.",
        projects: ["PAUMIoT"],
        experience: [
          "Research Assistant at DHMAINetRG, Dhaka <strong>(Jan 2025 – Present)</strong>",
        ],
      },
    ],
  },

  projects: [
    {
      id: "CCN-IoV",
      name: "CCN-DA",
      shortDescription:
        "Network Data Analytics in Information-Based Internet of Vehicles",
      banner: "images/banner8.png",
      description:
        "Content centric internet of vehicles is a project that aims to enhance data analytics in information based network where nodes are Intermittently connected. The ONE simulator enables CCN simulation and acts as the facilitator of experimentation environment.",
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["PA"],
        teamMembers: ["SFI", "NRA", "MASUM"],
      },
    },
    {
      id: "PAUMIoT",
      name: "PAUMIoT",
      shortDescription: "Protocol Agnostic Universal Middleware for IoT",
      banner: "images/banner6.png",
      description:
        "PAUMIoT is a research project that aims to develop a middleware for IoT devices to offers seamless communication and interoperability regardless of the underlying network technologies.",
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["MRM"],
        teamMembers: ["MFHD", "FA", "MS"],
      },
    },
    // {
    //   id: "OppNDA",
    //   name: "OppNDA",
    //   shortDescription:
    //     "Opportunistic Network Simulation Automation and Big Data Analytics ",
    //   banner: "images/banner3.png",
    //   description:
    //     "OppNDA is a research project focused on simulation automation and big data analytics with data visualization. It aims to assist researchers in analyzing and visualizing data from opportunistic network simulations. OppNDA offers GUI that simplifies the simulation and post-processing configuration. It is a one-click solution to streamline simulation and visualization pipeline",
    //   status: [{ text: "Under Review", color: "#B31515" }],
    //   team: {
    //     principalInvestigator: ["DHMAI"],
    //     externalAdvisors: ["DMG"],
    //     teamLeads: ["MRM", "SMNS"],
    //     teamMembers: ["PA", "FI"],
    //   },
    // },
    {
      id: "STGen",
      name: "STGen",
      shortDescription: "Sensor Traffic Generator for IoT Testbed ",
      banner: "images/banner4.png",
      description:
        "STGen is a research project that aims to generate realistic synthetic sensor traffic for testing and evaluating networks in different environments. By simulating various traffic patterns and scenarios, STGen provides a valuable, lightweight, and scalable tool for researchers and developers working on IoT and smart city applications. ",
      status: [
        // { text: "Under Review", color: "#B31515" },
      ],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: ["DRI"],
        teamLeads: ["MRM"],
        teamMembers: ["SMNS", "PA", "MIO"],
      },
    },
    // {
    //   id: "PRIoTP",
    //   name: "PRIoTP",
    //   shortDescription:
    //     "Novel Partially Reliable Application Protocol for IoT devices ",
    //   banner: "images/banner5.png",
    //   description:
    //     "PRIoTP is a research project focused on creating a novel transport protocol for IoT devices. It offers a partially reliable transport protocol that allows fast and efficient data transmission over networks. PRIoTP can facilitate seamless communication between IoT devices, ensuring data integrity and reducing latency.",
    //   status: [
    //     // { text:  "Under Review", color: "#B31515" },
    //   ],
    //   team: {
    //     principalInvestigator: ["DHMAI"],
    //     externalAdvisors: [],
    //     teamLeads: ["AS", "MIO"],
    //     teamMembers: ["MAUZ", "MASUM", "HE", "NRA", "SFI"],
    //   },
    // },
    {
      id: "CTRBM",
      name: "CTRBM",
      shortDescription:
        "Cross-tier routing and bundle management enable resilient data transmission in UAV networks by overcoming frequent link disruptions and topological changes.",
      banner: "images/default_banner4.png",
      description:
        "Cross-tier routing and bundle management in disruption-tolerant UAV networks utilize hierarchical architectures and store-carry-forward mechanisms. They combine satellite, high-altitude platform, and low-altitude UAV layers with Delay/Disruption-Tolerant Networking (DTN) protocols to ensure reliable communication despite intermittent connectivity and resource constraints.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["PA"],
        teamMembers: ["SMNS", "MASUM", "NRA", "MAUZ"],
      },
    },
    {
      id: "ECCN",
      name: "ECCN",
      shortDescription:
        "Energy efficiency relies on balancing router caching with retrieval distances in Content-Centric Networks.",
      banner: "images/default_banner1.jpg",
      description:
        "This research investigates energy-aware caching and forwarding strategies in Content-Centric Networking (CCN). The objective is to reduce energy consumption while maintaining efficient content delivery by optimizing cache placement and retrieval paths.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["MASUM"],
        teamMembers: ["PA", "SMNS", "NRA"],
      },
    },
    {
      id: "GDINMT",
      name: "GDINMT",
      shortDescription:
        "Analyzing how malicious traffic distorts the geometric structure of IoT network manifolds.",
      banner: "images/default_banner4.png",
      description:
        "This project investigates the impact of adversarial and malicious traffic patterns on the underlying manifold representation of IoT networks. The goal is to identify distortion patterns and develop robust mechanisms for anomaly detection and network resilience.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["SMNS"],
        teamMembers: ["MAUZ", "SFI", "AS"],
      },
    },
    {
      id: "PRIoTPS",
      name: "PRIoTPS",
      shortDescription:
        "A multi-layer security architecture designed for resource-constrained IoT environments.",
      banner: "images/banner5.png",
      description:
        "PRIoTPS introduces adaptive security mechanisms across multiple layers of IoT communication stacks. The framework balances security requirements with limited computational and energy resources, ensuring secure and efficient operation in constrained environments.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["MIO"],
        teamMembers: ["MAUZ", "SFI"],
      },
    },
    {
      id: "CCNI",
      name: "CCNI",
      shortDescription:
        "Detection and mitigation of cache poisoning, content injection, and interest flooding attacks in CCN.",
      banner: "images/default_banner1.jpg",
      description:
        "This research focuses on identifying and mitigating major security threats in Content-Centric Networking, including cache poisoning, content injection, and interest flooding attacks. The project aims to improve network resilience and content integrity.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["SFI"],
        teamMembers: ["HE", "MAUZ", "AS", "MIO"],
      },
    },
    {
      id: "NASE",
      name: "NASE",
      shortDescription:
        "A framework for emulating authenticated sensor behavior within network environments.",
      banner: "images/default_banner4.png",
      description:
        "The project develops authentication-aware sensor emulation techniques to support testing, validation, and security evaluation of IoT infrastructures and networked sensing systems.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["AS"],
        teamMembers: [],
      },
    },
    {
      id: "RDAMS",
      name: "RDAMS",
      shortDescription:
        "Strategies for detecting and mitigating resource depletion attacks in network systems.",
      banner: "images/default_banner4.png",
      description:
        "This project investigates techniques to identify and prevent resource depletion attacks that exhaust computational, memory, or communication resources. The objective is to improve system availability and resilience.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["MAUZ"],
        teamMembers: ["SFI", "AS", "MIO"],
      },
    },
    {
      id: "CCIP",
      name: "CCIP",
      shortDescription:
        "A content-centric IP routing architecture for delay-tolerant networking environments.",
      banner: "images/default_banner1.jpg",
      description:
        "CCIP integrates content-centric networking concepts with IP routing to improve data delivery in delay-tolerant and intermittently connected environments. The architecture emphasizes efficient content dissemination and resilience to disruptions.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["PA"],
        teamMembers: ["SMNS", "NRA", "SFI", "MASUM"],
      },
    },
    {
      id: "PECCIV",
      name: "PECCIV",
      shortDescription:
        "Improving content delivery efficiency in vehicular networks through cooperative caching.",
      banner: "images/default_banner4.png",
      description:
        "This research explores cooperative caching strategies in Content-Centric Internet of Vehicles (CC-IoV) environments. The goal is to reduce latency, improve content availability, and enhance overall network performance.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["NRA"],
        teamMembers: ["PA", "MASUM"],
      },
    },
    {
      id: "CCFL",
      name: "CCFL",
      shortDescription:
        "Optimizing federated learning through content-centric caching in mobile and intermittently connected environments.",
      banner: "images/default_banner1.jpg",
      description:
        "This project investigates caching mechanisms that support federated learning across mobile and intermittently connected networks. The objective is to reduce communication overhead, improve model dissemination, and enhance learning efficiency.",
      status: [],
      team: {
        principalInvestigator: ["DHMAI"],
        externalAdvisors: [],
        teamLeads: ["MRM"],
        teamMembers: [],
      },
    },

    // {
    //   id: "MapBD",
    //   name: "MapBD",
    //   shortDescription: "Generating Map Data for Opportunistic Network",
    //   banner: "images/banner2.png",
    //   description:
    //     "MapBD is a research project focused on creating map data for opportunistic networks. It focuses primarily on Dhaka city but it is adaptable to other regions as well. MapBD aims to create map data for all the districts and major cities of Bangladesh to give researchers resources for conducting experiments and simulations",
    // },

    //     Mehraj:  MRM
    // Pulok:  PA
    // Nafis:  SMNS
    // Onik:  MAUZ
    // Ohi:  MIO
    // Sajid:  AS
    // Erin:  HE
    // Sadia:  SFI
    // Masum:  MASUM
    // Aurna:  NRA
  ],
  upcomingProjects: [
    // {
    //   id: "PRIoTPS",
    //   name: "PRIoTPS",
    //   shortDescription:
    //     "Secured and Partially Reliable Application Protocol for IoT devices",
    //   banner: "images/banner3.png",
    //   description: "",
    // },
    {
      id: "FL-ORCH",
      name: "FL-ORCH",
      shortDescription:
        "DRL-Assisted Orchestration of Hierarchical Federated Learning in Dynamic Edge Networks",
      banner: "images/banner4.png",
      description: "",
      // status: { text: "Under Review", color: "#B31515" },
    },
  ],
  publications: {
    years: [
      {
        year: "2026",
        items: [
          {
            text: "Hasan MA Islam, Md MR Maharaz, F Ahmed, Mahir FH Dipto, Md MH Shafin, and Michael Georgiades. Towards A Protocol-Agnostic Universal Middleware For IoT With Edge Intelligence. The 22nd Annual International Conference on Distributed Computing in Smart Systems and the Internet of Things (DCOSS-IoT 2026).",
            link: null,
          },
          {
            text: "Md MR Maharaz, MI Ohi, MAU Zaman, A Sajid, Sadia FI, P Akibuzzaman, Md Masum, SMN Shahriar, NR Aurna, Hasan MA Islam, and Michael Georgiades. PRIoTP: Towards Context-Aware Partial Reliable Application-LayerIoT Protocol with Edge Intelligence. The 22nd Annual International Conference on Distributed Computing in Smart Systems and the Internet of Things (DCOSS-IoT 2026).",
            link: null,
          },
          {
            text: "Michael Georgiades, Charalambia Varnava, Andreas Gregoriades, Iacovos Ioannou, Lakis Christodoulou, Hasan Mahmood Aminul Islam, Kin-Hon Ho and Yun Hou. From Correlation to Causation in Intrusion Detection Systems: A Double Machine Learning Approach for IoT Network Behaviour Analysis. The 22nd Annual International Conference on Distributed Computing in Smart Systems and the Internet of Things (DCOSS-IoT 2026).",
            link: null,
          },
          {
            text: "Michael Georgiades, Iacovos Ioanno, Hasan Mahmood Aminul Islam, Kin-Hon Ho, Yun Hou, Andreas Gregoriades. Intrinsic Explanation Stability under Adversarial Perturbations in Self-Explaining Neural Networks for IoT Firmware Malware Detection. IFIP Networking Conference (IFIP Networking 2026).",
            link: "https://ieeexplore.ieee.org/document/11579092",
          },
          {
            text: "P. Akibuzzaman, S.M.N. Shahriar, M.A.U. Zaman, M.R. Maharaz, H.M.A. Islam, J.T. Maowa, M. Rahman, 2026. Integration and Validation of Map Data in the ONE Simulator: IoV in Dhaka City Perspective. The 28th International Conference on Computer and Information Technology (ICCIT 2026).",
            link: null,
          },
          {
            text: "S.M.N. Shahriar, P. Akibuzzaman, M.A.U. Zaman, M.R. Maharaz, H.M.A. Islam, 2026. The Impact of Pedestrian Movement on IoV Performance and Simulation. The 28th International Conference on Computer and Information Technology (ICCIT 2026).",
            link: null,
          },
          {
            text: "F. Islam, M.H. Ratul, S.F. Islam, A.H. Irani, P. Akibuzzaman, S.M.N. Shahriar, M.R. Maharaz, H.M.A. Islam. CCBP: Towards Content-Centric Abstraction for Bundle Protocol of DTN Architecture. The 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN 2026).",
            link: "https://ieeexplore.ieee.org/document/11545753",
          },
          {
            text: "M.I. Ohi, A. Sajid, P. Akibuzzaman, S.M.N. Shahriar, M.A.U. Zaman, H.M.A. Islam, M.R. Maharaz. Design and Implementation of a Generative Pre-Trained Transformer for Universities of Bangladesh. The 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN 2026).",
            link: "https://ieeexplore.ieee.org/document/11545594/authors#authors ",
          },
          {
            text: "M.R. Maharaz, F. Ahmad, M.F.H. Dipto, M.M.H Shafin, S.M.N. Shahriar, P. Akibuzzaman, H.M.A. Islam. Emulating Sensor Profile Towards IoT Simulator Development. The 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN 2026).",
            link: "https://ieeexplore.ieee.org/document/11546398",
          },
          // {
          //   text: "M.I. Ohi, A. Sajid, M.R. Maharaz, M.A.U. Zaman, P.Akibuzzaman, S.M.N. Shahriar, M. Masum, H.M.A. Islam and M.Georgiades. PRIOTP: Towards Partially Reliable Application Protocol for the Internet of Things, 2026. 22nd International Conference on Distributed Computing in Smart Systems and Internet of Things, IEEE (DCOSS-IoT)",
          //   link: null,
          // },
          {
            text: "Hasan Mahmood Aminul Islam, Mahamudur Rahman Maharaz, Faisal Ahmed, Mahir Faysal Haque Dipto and Md. Minhajul Haque Shafin, Michael Georgiades. Towards a Protocol-Agnostic Universal Middleware for IoT with Edge Intelligence. The 22nd Annual International Conference on Distributed Computing in Smart Systems and the Internet of Things (DCOSS-IoT 2026).",
            link: null,
          },
        ],
      },
      {
        year: "2025",
        items: [
          {
            text: "Hasan Ma Islam, Md Khalid M Khan, M Rahman, Angon Antu, Md Farhad Billah, Shishir Majumder, Md AI Khan. Revisiting ONE Simulator in IoV Research: Seeing the Forest Through the Trees. IEEE Access 13: 50727-50740 (2025)",
            link: null,
          },
        ],
      },
      {
        year: "2019",
        items: [
          {
            text: "Islam, H.M.A., Lagutin, D., Ylä-Jääski, A., Fotiou, N. and Gurtov, A., 2019. Transparent coap services to iot endpoints through icn operator networks. Sensors, 19(6), p.1339. (Impact Factor: 3.847)",
            link: null,
          },
        ],
      },
      {
        year: "2017",
        items: [
          {
            text: "Islam, H.M., Chatzopoulos, D., Lagutin, D., Hui, P. and Ylä-Jääski, A., 2017. Boosting the performance of content centric networking using delay tolerant networking mechanisms. IEEE Access, 5, pp.23858-23870. (Impact Factor: 3.367)",
            link: null,
          },
          {
            text: "Islam, H.M., Lagutin, D., Lukyanenko, A., Gurtov, A. and Ylä-Jääski, A., 2017, October. CIDOR: Content distribution and retrieval in disaster networks for public protection. In 2017 IEEE 13th international conference on wireless and mobile computing, networking and communications (WiMob) (pp. 324-333). IEEE.",
            link: null,
          },
          {
            text: "Islam, H.M., Lagutin, D. and Fotiou, N., 2017, June. Observing IoT resources over ICN. In 2017 IFIP Networking Conference (IFIP Networking) and Workshops (pp. 1-8). IEEE",
            link: null,
          },
          {
            text: "Fotiou, N., Xylomenos, G., Polyzos, G.C., Islam, H., Lagutin, D., Hakala, T. and Hakala, E., 2017, September. ICN enabling CoAP Extensions for IP based IoT devices. In Proceedings of the 4th ACM Conference on Information-Centric Networking (pp. 218-219)",
            link: null,
          },
        ],
      },
      {
        year: "2016",
        items: [
          {
            text: 'N. Fotiou, H. Islam, D. Lagutin, T. Hakala and G. C. Polyzos, "CoAP over ICN", 2016 8th IFIP International Conference on New Technologies Mobility and Security (NTMS), pp. 1-4, Nov 2016',
            link: null,
          },
        ],
      },
      {
        year: "2015",
        items: [
          {
            text: 'Islam, Hasan MA, Andrey Lukyanenko, Sasu Tarkoma, and Antti Yla-Jaaski. "Towards disruption tolerant ICN." In 2015 IEEE Symposium on Computers and Communication (ISCC), pp. 212-219. IEEE',
            link: null,
          },
        ],
      },
      {
        year: "2009",
        items: [
          {
            text: "Afroze, T., Sarkar, S., Islam, A. and Rahman, A., 2009, May. More stable Ad-hoc on-demand distance vector routing protocol. In 2009 4th IEEE Conference on Industrial Electronics and Applications (pp. 150-155). IEEE",
            link: null,
          },
        ],
      },
    ],
  },
  submittedPublications: {
    years: [
      {
        year: "2026",
        items: [
          "H.M.A. Islam, M.R. Maharaz, S.M.N. Shahriar, P.Akibuzzaman, S.Nath, M.I. Ohi, M.Georgiades, and R.Islam. STGen: A Lightweight Protocol-Agnostic Sensor Testbed for Scenario-Based IoT Protocol Evaluation, Elsevier (JSA)",
          "H.M.A. Islam, S.M.N. Shahriar, P.Akibuzzaman, M.R. Maharaz, A.Sajid, N.R. Aurna, F.Islam, M.I. Ohi, M.K.M. Khan, and M.Georgiades. OppNDA: A Modular and Scalable Automation Framework for Streamlining DTN Research with the ONE Simulator, IEEE Access",
        ],
      },
    ],
  },
  about: {
    banner: "images/banner1.webp",
    title: "Computer Networking and Pervasive Computing Research Group",
    description:
      "The research interests of DHMAINetRG range from the effective organization of Internet protocols and wireless communication to the Future Internet. The focus areas range from traditional IP Internet to Future Internet, e.g., Intermittently Connected network, Delay Tolerant Networks, Information-Centric Networking, and their enablers: interoperability (e.g., interoperability among different Network architectures), context awareness, and ubiquitous computing. This research group focuses on the transition of traditional IP networks to Future Internet and solving application layer challenges in terms of services to the end users.",
    researchDomains: [
      "Internet Protocol",
      "Opportunistic Network",
      "Information-Centric-Networking",
      "Embedded Systems and Software",
      "IoT (Internet of Things)",
      "IoV (Internet of Vehicles)",
      "Automation: Opportunistic Network Simulation",
      "Sensor Traffic Generator and Automation for IoT research",
    ],
    scholarLinks: {
      googleScholar:
        "https://scholar.google.com/citations?user=M0oP3RMAAAAJ&hl=en",
      dblp: "https://dblp.org/pid/29/4927.html",
      researchGate: "https://www.researchgate.net/profile/Hasan-Islam-3",
    },
  },

  contact: {
    name: "Dr. Hasan Mahmood Aminul Islam",
    title: "Assistant Professor",
    department: "Department of Computer Science and Engineering",
    institution: "East West University",
    location: "Dhaka, Bangladesh",
    email: "hasan.mahmood@ewubd.edu",
  },
};
