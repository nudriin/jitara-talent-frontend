// Reports Data
let reports = [
    {
        id: 1,
        tanggal: "2025-11-16",
        talent: {
            nama: "Taufik As BARU",
            email: "taufikas031@gmail.com"
        },
        clientProyek: {
            client: "Disdik Kalteng",
            proyek: "nama projectx"
        },
        ringkasan: "test",
        kendala: "tetstst",
        hasFoto: false
    },
    {
        id: 2,
        tanggal: "2025-11-15",
        talent: {
            nama: "test1234",
            email: "test1234@gmail.com"
        },
        clientProyek: {
            client: "-",
            proyek: "-"
        },
        ringkasan: "qwdqw",
        kendala: "dqwdqw",
        hasFoto: true
    },
    {
        id: 3,
        tanggal: "2025-11-15",
        talent: {
            nama: "test1234",
            email: "test1234@gmail.com"
        },
        clientProyek: {
            client: "-",
            proyek: "-"
        },
        ringkasan: "kerjanan",
        kendala: "eqjdiqwdq",
        hasFoto: true
    },
    {
        id: 4,
        tanggal: "2025-11-15",
        talent: {
            nama: "test1234",
            email: "test1234@gmail.com"
        },
        clientProyek: {
            client: "-",
            proyek: "-"
        },
        ringkasan: "dqwqwdqw",
        kendala: "wdqdqqw",
        hasFoto: true
    }
];

let filteredReports = [...reports];

// Format date
function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Render table
function renderTable(data = null) {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    const dataToRender = data || filteredReports;

    if (dataToRender.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="px-4 py-8 text-center text-slate-500">
                    Tidak ada data laporan
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = dataToRender.map((report) => {
        const clientProyekText = report.clientProyek.client === "-" 
            ? "-" 
            : `${report.clientProyek.client}, ${report.clientProyek.proyek}`;
        
        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="px-4 py-3">${formatDate(report.tanggal)}</td>
                <td class="px-4 py-3">
                    <div class="flex flex-col">
                        <span class="font-medium">${report.talent.nama}</span>
                        <span class="text-sm text-slate-500">${report.talent.email}</span>
                    </div>
                </td>
                <td class="px-4 py-3">${clientProyekText}</td>
                <td class="px-4 py-3">${report.ringkasan || "-"}</td>
                <td class="px-4 py-3">${report.kendala || "-"}</td>
                <td class="px-4 py-3 text-center">
                    ${report.hasFoto 
                        ? `<button onclick="viewFoto(${report.id})" 
                            class="px-4 py-1 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors text-sm">
                            Lihat
                        </button>`
                        : '<span class="text-slate-400">-</span>'
                    }
                </td>
            </tr>
        `;
    }).join("");
}

// View foto
function viewFoto(id) {
    const report = reports.find(r => r.id === id);
    if (!report) return;
    
    // In a real application, this would open a modal with the photo
    alert(`Melihat foto bukti untuk laporan ID: ${id}`);
}

// Filter reports
function filterReports() {
    const dateFrom = document.getElementById("date-from")?.value;
    const dateTo = document.getElementById("date-to")?.value;
    const searchTerm = document.getElementById("search-input")?.value.toLowerCase() || "";

    filteredReports = reports.filter(report => {
        // Date filter
        if (dateFrom && report.tanggal < dateFrom) return false;
        if (dateTo && report.tanggal > dateTo) return false;

        // Search filter
        if (searchTerm) {
            const searchableText = `
                ${report.talent.nama} 
                ${report.talent.email} 
                ${report.clientProyek.client} 
                ${report.clientProyek.proyek}
                ${report.ringkasan}
                ${report.kendala}
            `.toLowerCase();
            
            if (!searchableText.includes(searchTerm)) return false;
        }

        return true;
    });

    renderTable(filteredReports);
    updatePagination();
}

// Update pagination
function updatePagination() {
    const paginationInfo = document.getElementById("pagination-info");
    if (!paginationInfo) return;
    
    const total = filteredReports.length;
    paginationInfo.textContent = `Total: ${total} data`;
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    const iconOpen = document.getElementById("iconOpen");
    const iconClose = document.getElementById("iconClose");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    if (!mobileMenu || !iconOpen || !iconClose || !mobileMenuBtn) return;

    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
        mobileMenu.classList.remove("scale-y-100", "opacity-100");
        mobileMenu.classList.add("scale-y-0", "opacity-0");
        mobileMenu.classList.remove("pointer-events-auto");
        mobileMenu.classList.add("pointer-events-none");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
    } else {
        mobileMenu.classList.remove("scale-y-0", "opacity-0");
        mobileMenu.classList.add("scale-y-100", "opacity-100");
        mobileMenu.classList.remove("pointer-events-none");
        mobileMenu.classList.add("pointer-events-auto");
        iconOpen.classList.add("hidden");
        iconClose.classList.remove("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "true");
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderTable();
    updatePagination();

    // Filter button
    const filterBtn = document.getElementById("filter-btn");
    if (filterBtn) {
        filterBtn.addEventListener("click", filterReports);
    }

    // Search input (filter on enter)
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                filterReports();
            }
        });
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        const mobileMenu = document.getElementById("mobileMenu");
        const mobileMenuBtn = document.getElementById("mobileMenuBtn");
        
        if (mobileMenu && mobileMenuBtn && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
            if (isExpanded) {
                toggleMobileMenu();
            }
        }
    });
});

