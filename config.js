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
    window.location.hash || ""
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

document.addEventListener("DOMContentLoaded", function () {
  let tab = window.location.hash.replace("#", "") || "homepage";
  if (document.getElementById(tab)) {
    openTab(null, tab, false); // Show tab even if no button found
  }
});

// Researchers 
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("memberGroup");
  if (!container) return;

  DATA.researchers.forEach((m) => {
    container.innerHTML += `
      <div class="member-card">
        <div onclick="openTab(event, '${m.id}')" style="cursor:pointer;">
          <img src="${m.img}" alt="${m.name}">
          <div class="member-name">${m.name}</div>
          <div class="member-role">${m.role}</div>
        </div>

        ${m.tags
          .map(
            (tag) => `
          <div class="member-role">
            <mark style="background-color:${tag.color};
                         color:white;
                         padding:0.1em 0.3em;
                         border-radius:0.25rem;">
              ${tag.text}
            </mark>
          </div>
        `
          )
          .join("")}

        <div class="member-links">
          <a href="mailto:${m.email}"><i class="fas fa-envelope"></i></a>
          <a href="${m.github}" target="_blank"><i class="fa-brands fa-github"></i></a>
          <a href="${m.linkedin}" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
        </div>
      </div>
    `;
  });
});

const DATA = {
  researchers: [
    {
      id: "MRM",
      name: "Mahmudur Rahman Mehraj",
      img: "images/mehraj.webp",
      role: "Under Graduate Teaching Assistant",
      tags: [
        { text: "Technical Lead", color: "rgb(179, 21, 21)" },
        { text: "PAUMIoT Lead", color: "#1e293b" },
      ],
      email: "2022-3-60-182@std.ewubd.edu",
      github: "https://github.com/MehrajRahman",
      linkedin: "https://www.linkedin.com/in/mehraj-rahman-8658611a9/",
    },
    {
      id: "SMNS",
      name: "S. M. Nafis Shahriar",
      img: "images/nafis.webp",
      role: "Assistant",
      tags: [{ text: "OppNDA Lead", color: "#1e293b" }],
      email: "2023-3-60-071@std.ewubd.edu",
      github: "https://github.com/nafisshahriar",
      linkedin: "https://www.linkedin.com/in/sm-nafis-shahriar/",
    },
    {
      id: "PA",
      name: "Pulok Akibuzzaman",
      img: "images/pulok.webp",
      role: "Assistant",
      tags: [{ text: "MapBD Lead", color: "#1e293b" }],
      email: "2023-3-60-051@std.ewubd.edu",
      github: "https://github.com/Pulok-Akibuzzaman",
      linkedin: "https://www.linkedin.com/in/pulok-akibuzzaman-73a21229a/",
    },
    {
      id: "MIO",
      name: "Mahdin Islam Ohi",
      img: "images/ohi.webp",
      role: "Assistant",
      tags: [{ text: "Pixie Lead", color: "#1e293b" }],
      email: "2023-3-60-151@std.ewubd.edu",
      github: "https://github.com/MahdinOhi",
      linkedin: "https://www.linkedin.com/in/mahdin-ohi-3b55a0280/",
    },
    {
      id: "FI",
      name: "Fayaza Islam",
      img: "images/fayaza.webp",
      role: "Assistant",
      tags: [{ text: "CCN-IoV Lead", color: "#1e293b" }],
      email: "2023-3-60-314@std.ewubd.edu",
      github: "https://github.com/Fayaza6",
      linkedin: "https://www.linkedin.com/in/fayaza-islam-365177371/",
    },
    {
      id: "MR",
      name: "Muin Ratul",
      img: "images/ratul.webp",
      role: "Assistant",
      tags: [],
      email: "2023-3-60-059@std.ewubd.edu",
      github: "https://github.com/MuinRatul",
      linkedin: "https://www.linkedin.com/in/mh-ratul-5201792a9/",
    },
    {
      id: "AS",
      name: "Abdullah Sajid",
      img: "images/sajid.webp",
      role: "Assistant",
      tags: [{ text: "PRTP Lead", color: "#1e293b" }],
      email: "2023-3-60-487@std.ewubd.edu",
      github: "https://github.com/AbdullahSajid007",
      linkedin: "https://www.linkedin.com/in/abdullah-sajid-089848363/",
    },
    {
      id: "HE",
      name: "Homayra Erin",
      img: "images/erin.webp",
      role: "Assistant",
      tags: [],
      email: "2023-3-60-359@std.ewubd.edu",
      github: "https://github.com/Erin0W0",
      linkedin: "https://www.linkedin.com/in/homayra-erin-9b72a4352",
    },
    {
      id: "MAUZ",
      name: "Md. Ashik-Uz-Zaman",
      img: "images/ashik.webp",
      role: "Assistant",
      tags: [],
      email: "2023-3-60-074@std.ewubd.edu",
      github: "https://github.com/ashikonik",
      linkedin: "https://www.linkedin.com/in/ashikonik",
    },
    {
      id: "SFI",
      name: "Sadia Fahmida Islam",
      img: "images/sfi.webp",
      role: "Assistant",
      tags: [],
      email: "2024-1-60-331@std.ewubd.edu",
      github: "https://github.com/sadiafahmida",
      linkedin: "https://www.linkedin.com/in/sadia-fahmida-islam-84734b287",
    },
    {
      id: "NRA",
      name: "Nusrat Rahman Aurna",
      img: "images/nra.webp",
      role: "Assistant",
      tags: [],
      email: "2023-3-60-057@std.ewubd.edu",
      github: "https://github.com/Nusrat60-057",
      linkedin: "https://www.linkedin.com/in/nusrat-rahman-aurna-292b16331/",
    },
    {
      id: "MASUM",
      name: "Masum",
      img: "images/masum.webp",
      role: "Assistant",
      tags: [],
      email: "2023-3-60-066@std.ewubd.edu",
      github: "https://github.com/masum-mir",
      linkedin: "https://www.linkedin.com/in/md-masum-mir/",
    },
  ],
};
