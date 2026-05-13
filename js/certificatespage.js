console.log("certificates");

// Category registry  
const CERT_CATEGORIES = {
  appreciation  : { label: "Certificate of Appreciation", color: "#0d9488" },
  best_paper    : { label: "Best Paper Award",             color: "#d97706" },
  presentation  : { label: "Certificate of Presentation", color: "#2563eb" },
  participation : { label: "Certificate of Participation", color: "#7c3aed" },
  other         : { label: "Other",                        color: "#64748b" },
};

// Data 
const certificates = [
  {
    title     : "The Impact of Pedestrian Movement on IoV Performance and Simulation",
    event     : "28th International Conference on Computer and Information Technology, IEEE (ICCIT 2025)",
    recipient : "S. M. Nafis Shahriar, Pulok Akibuzzaman, Md Ashik Uz Zaman, Mahamudur Rahman Maharaz, Hasan Mahmood Aminul Islam",
    date      : "19–21 December 2025",
    category  : "appreciation",
    image     : "images/certificates/844.jpg",
  },
  {
    title     : "Integration and Validation of Map Data in the ONE Simulator: IoV in Dhaka City Perspective. 28th International Conference on Computer and Information Technology",
    event     : "28th International Conference on Computer and Information Technology, IEEE (ICCIT 2025)",
    recipient : "Pulok Akibuzzaman, S. M. Nafis Shahriar, Md. Ashik-Uz-Zaman, Mahmudur Rahman Mehraj, Hasan Mahmood Aminul Islam",
    date      : "19–21 December 2025",
    category  : "appreciation",
    image     : "images/certificates/1980.jpg",
  },
  {
    title     : "Design and Implementation of a Generative Pre-Trained Transformer for Universities of Bangladesh.",
    event     : "2nd International Conference on Quantum Photonics, Artificial Intelligence, and Networking, IEEE (QPAIN 2026)",
    recipient : "Mahdin Islam Ohi, Abdullah Sajid, Pulok Akibuzzaman, S. M. Nafis Shahriar, Md. Ashik-Uz-Zaman, Hasan Mahmood Aminul Islam, Mahmudur Rahman Mehraj",
    date      : "16–18 December 2026",
    category  : "presentation",
    image     : "images/certificates/4862.jpg",
  },
  {
    title     : "CCBP: Towards Content-Centric Abstraction for Bundle Protocol of DTN Architecture",
    event     : "2nd International Conference on Quantum Photonics, Artificial Intelligence, and Networking, IEEE (QPAIN 2026)",
    recipient : "Fayaza Islam, Muin Hossain Ratul, Sadia Fahmida Islam, Pulok Akibuzzaman, S. M. Nafis Shahriar, Mahmudur Rahman Mehraj, Hasan Mahmood Aminul Islam",
    date      : "16–18 December 2026",
    category  : "presentation",
    image     : "images/certificates/4887.jpg",
  },
  {
    title     : "Emulating Sensor Profile Towards IoT Simulator Development",
    event     : "2nd International Conference on Quantum Photonics, Artificial Intelligence, and Networking, IEEE (QPAIN 2026)",
    recipient : "Md. Mahamudur Rahman, Faisal Ahmed, Mahir Faysal Haque Dipto, Md. Minhajul Haque Shafin, S. M. Nafis Shahriar, Pulok Akibuzzaman, Dr. Hasan Mahmood Aminul Islam",
    date      : "16–18 December 2026",
    category  : "presentation",
    image     : "images/certificates/4865.png",
  },
];

// certificatesPage() 
function certificatesPage() {
  const container = document.getElementById("CertificatesPage");
  if (!container) return;

  // Build unique category list from data
  const usedCats = ["all", ...new Set(certificates.map((c) => c.category))];

  container.innerHTML = `
    <div class="members-page">
      <h2 class="section-title">Certificates</h2>

      <!-- Category filter tabs -->
      <div class="cert-filter-bar" id="certFilterBar">
        ${usedCats
          .map(
            (cat) => `
          <button
            class="cert-filter-btn ${cat === "all" ? "active" : ""}"
            data-cat="${cat}"
            onclick="_certFilter('${cat}', this)"
          >
            ${cat === "all" ? "All" : (CERT_CATEGORIES[cat]?.label ?? cat)}
          </button>`
          )
          .join("")}
      </div>

      <!-- Card list -->
      <div class="cert-list" id="certList"></div>

      <!-- Empty state -->
      <p class="cert-empty" id="certEmpty" style="display:none;">
        No certificates found in this category.
      </p>
    </div>

    <!-- Lightbox Modal -->
    <div id="certModal" class="cert-modal-overlay" style="display:none;">
      <div class="cert-modal-box">
        <button class="cert-modal-close" id="certModalClose">&times;</button>
        <img id="certModalImg" class="cert-modal-img" src="" alt="Certificate" />
      </div>
    </div>
  `;

  _buildCertList("all");
  _bindModalEvents();
}

// Filter 
function _certFilter(cat, btn) {
  document.querySelectorAll(".cert-filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  _buildCertList(cat);
}

// Build card list 
function _buildCertList(cat) {
  const list  = document.getElementById("certList");
  const empty = document.getElementById("certEmpty");
  if (!list) return;

  const filtered = cat === "all"
    ? certificates
    : certificates.filter((c) => c.category === cat);

  if (filtered.length === 0) {
    list.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  list.innerHTML = filtered
    .map((c, i) => {
      const idx      = certificates.indexOf(c);
      const catMeta  = CERT_CATEGORIES[c.category] ?? CERT_CATEGORIES.other;
      const tagStyle = `background:${catMeta.color}22; color:${catMeta.color}; border:1px solid ${catMeta.color}55;`;

      return `
        <div class="cert-card-h">

          <!-- Thumbnail -->
          <div class="cert-thumb-h" onclick="_openCertModal(${idx})">
            ${
              c.image
                ? `<img src="${_esc(c.image)}" alt="${_esc(c.title)}"
                        onerror="this.parentElement.innerHTML='${_phHTML()}'" />
                   <div class="cert-overlay-h"><i class="fas fa-expand-alt"></i></div>`
                : _phHTML()
            }
          </div>

          <!-- Info -->
          <div class="cert-info-h">
            <div class="cert-tag-row">
              <span class="cert-tag" style="${tagStyle}">${catMeta.label}</span>
            </div>

            <div class="cert-title-h" onclick="_openCertModal(${idx})">${_esc(c.title)}</div>
            <div class="cert-event-h">
              <i class="fas fa-university"></i> ${_esc(c.event)}
            </div>
            <div class="cert-recipient-h">
              <i class="fas fa-users"></i> ${_esc(c.recipient)}
            </div>
            <div class="cert-date-h">
              <i class="fas fa-calendar-alt"></i> ${_esc(c.date)}
            </div>

            <!-- Action buttons -->
            <div class="cert-actions">
              <button class="cert-view-btn" onclick="_openCertModal(${idx})">
                <i class="fas fa-eye"></i> View
              </button>
              ${
                c.image
                  ? `<a class="cert-download-btn" href="${_esc(c.image)}" download target="_blank">
                       <i class="fas fa-download"></i> Download
                     </a>`
                  : `<span class="cert-download-btn disabled">
                       <i class="fas fa-download"></i> No file
                     </span>`
              }
            </div>
          </div>

        </div>`;
    })
    .join("");
}

// Modal 
function _openCertModal(i) {
  const c     = certificates[i];
  const modal = document.getElementById("certModal");
  const img   = document.getElementById("certModalImg");

  // image
  if (c.image) {
    img.src = c.image;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  modal.style.display = "flex";
}

function _bindModalEvents() {
  document.addEventListener("click", function (e) {
    const modal = document.getElementById("certModal");
    if (!modal) return;
    if (e.target === modal || e.target.id === "certModalClose") {
      modal.style.display = "none";
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modal = document.getElementById("certModal");
      if (modal) modal.style.display = "none";
    }
  });
}

// Helpers 
function _esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function _phHTML() {
  return `<div class='cert-placeholder'><i class='fas fa-certificate'></i><span>No image</span></div>`;
}