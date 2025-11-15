// Data
const talents = [
    {
        name: "test",
        email: "test@gmail.com",
        profile: "Lengkap",
        pending: 0,
        verified: 0,
        interview: null,
    },
    {
        name: "test123",
        email: "test123@gmail.com",
        profile: "Lengkap",
        pending: 0,
        verified: 2,
        interview: null,
    },
    {
        name: "test1234",
        email: "test1234@gmail.com",
        profile: "Lengkap",
        pending: 0,
        verified: 4,
        interview: "Diterima",
    },
    {
        name: "coba",
        email: "coba@gmail.com",
        profile: "Belum lengkap",
        pending: 0,
        verified: 0,
        interview: null,
    },
    {
        name: "taufikas",
        email: "taufikasidz@gmail.com",
        profile: "Belum lengkap",
        pending: 0,
        verified: 0,
        interview: null,
    },
    {
        name: "Aryadi",
        email: "aryadigunawan@gmail.com",
        profile: "Belum lengkap",
        pending: 0,
        verified: 0,
        interview: null,
    },
];

let activeTab = "semua";
let searchQuery = "";

// Update stats cards
function updateStats() {
    const totalTalent = talents.length;
    const profilLengkap = talents.filter(t => t.profile === "Lengkap").length;
    const totalPending = talents.reduce((sum, t) => sum + t.pending, 0);
    const totalVerified = talents.reduce((sum, t) => sum + t.verified, 0);

    document.getElementById("stat-talent").textContent = totalTalent;
    document.getElementById("stat-profil-lengkap").textContent = profilLengkap;
    document.getElementById("stat-berkas-pending").textContent = totalPending;
    document.getElementById("stat-berkas-verified").textContent = totalVerified;
}

// Render table
function renderTable() {
    const tableBody = document.getElementById("table-body");
    let filteredTalents = talents;

    // Filter by tab
    if (activeTab === "lengkap") {
        filteredTalents = filteredTalents.filter(t => t.profile === "Lengkap");
    } else if (activeTab === "belum-lengkap") {
        filteredTalents = filteredTalents.filter(t => t.profile === "Belum lengkap");
    }

    // Filter by search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredTalents = filteredTalents.filter(t =>
            t.name.toLowerCase().includes(query) ||
            t.email.toLowerCase().includes(query)
        );
    }

    // Generate table rows
    tableBody.innerHTML = filteredTalents.map((talent, index) => {
        const profileBadgeClass = talent.profile === "Lengkap"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-yellow-500 hover:bg-yellow-600 text-white";

        const pendingBadgeClass = "bg-yellow-500 hover:bg-yellow-600 text-white";
        const verifiedBadgeClass = "bg-green-500 hover:bg-green-600 text-white";
        const interviewBadgeClass = talent.interview
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-slate-200 text-slate-600";

        return `
                    <tr class="hover:bg-slate-50 border-b border-slate-200">
                        <td class="px-4 py-3 font-medium">${talent.name}</td>
                        <td class="px-4 py-3 text-slate-500">${talent.email}</td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-1 rounded-md text-xs font-medium ${profileBadgeClass}">
                                ${talent.profile}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="px-2 py-1 rounded-md text-xs font-medium ${pendingBadgeClass}">
                                ${talent.pending}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="px-2 py-1 rounded-md text-xs font-medium ${verifiedBadgeClass}">
                                ${talent.verified}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <span class="px-2 py-1 rounded-md text-xs font-medium ${interviewBadgeClass}">
                                ${talent.interview || "-"}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-center">
                            <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                                Detail
                            </button>
                        </td>
                    </tr>
                `;
    }).join("");

    // Update pagination info
    const paginationInfo = document.getElementById("pagination-info");
    paginationInfo.textContent = `Menampilkan ${filteredTalents.length} dari ${talents.length} talent`;
}

// Tab click handler
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        // Update active tab
        activeTab = btn.dataset.tab;

        // Update tab styles
        document.querySelectorAll(".tab-btn").forEach(b => {
            if (b.dataset.tab === activeTab) {
                b.className = "tab-btn px-4 py-2 rounded-md text-sm font-medium transition-colors bg-jitara-orange text-white";
            } else {
                b.className = "tab-btn px-4 py-2 rounded-md text-sm font-medium transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200";
            }
        });

        // Re-render table
        renderTable();
    });
});

// Search input handler
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderTable();
});

// Initial render
updateStats();
renderTable();

// Mobile menu toggle
const btn = document.getElementById('mobileMenuBtn');
const menuWrapper = document.getElementById('mobileMenu');
const menuCard = menuWrapper.querySelector('div'); // inner card
const iconOpen = document.getElementById('iconOpen');
const iconClose = document.getElementById('iconClose');

btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));

    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');

    menuCard.classList.toggle('scale-y-0');
    menuCard.classList.toggle('scale-y-100');
    menuCard.classList.toggle('opacity-0');
    menuCard.classList.toggle('opacity-100');

    menuCard.classList.toggle('pointer-events-none');
    menuCard.classList.toggle('pointer-events-auto');
});