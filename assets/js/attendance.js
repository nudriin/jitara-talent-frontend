// Attendance Data
let attendances = [
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
        checkIn: "2025-11-16 07:44:53",
        checkOut: "2025-11-16 10:53:51",
        lokasi: "-2.2695112,113.9300459",
        hasSelfie: true
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
        checkIn: "2025-11-15 17:08:00",
        checkOut: "2025-11-15 17:08:06",
        lokasi: "-2.2052864,113.8950144",
        hasSelfie: true
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
        checkIn: "2025-11-15 17:03:38",
        checkOut: "2025-11-15 17:03:41",
        lokasi: "-2.2052864,113.8950144",
        hasSelfie: true
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
        checkIn: "2025-11-15 17:02:57",
        checkOut: "2025-11-15 17:03:23",
        lokasi: "-2.2052864,113.8950144",
        hasSelfie: true
    }
];

let filteredAttendances = [...attendances];

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

// Format datetime
function formatDateTime(dateTimeString) {
    if (!dateTimeString) return "-";
    const date = new Date(dateTimeString);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Render table
function renderTable(data = null) {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    const dataToRender = data || filteredAttendances;

    if (dataToRender.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-4 py-8 text-center text-slate-500">
                    Tidak ada data absensi
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = dataToRender.map((attendance) => {
        const clientProyekText = attendance.clientProyek.client === "-" 
            ? "-" 
            : `${attendance.clientProyek.client}, ${attendance.clientProyek.proyek}`;
        
        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="px-4 py-3">${formatDate(attendance.tanggal)}</td>
                <td class="px-4 py-3">
                    <div class="flex flex-col">
                        <span class="font-medium">${attendance.talent.nama}</span>
                        <span class="text-sm text-slate-500">${attendance.talent.email}</span>
                    </div>
                </td>
                <td class="px-4 py-3">${clientProyekText}</td>
                <td class="px-4 py-3">${formatDateTime(attendance.checkIn)}</td>
                <td class="px-4 py-3">${formatDateTime(attendance.checkOut)}</td>
                <td class="px-4 py-3 text-sm text-slate-600">${attendance.lokasi}</td>
                <td class="px-4 py-3 text-center">
                    ${attendance.hasSelfie 
                        ? `<button onclick="viewSelfie(${attendance.id})" 
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

// View selfie
function viewSelfie(id) {
    const attendance = attendances.find(a => a.id === id);
    if (!attendance) return;
    
    // In a real application, this would open a modal with the selfie image
    alert(`Melihat selfie untuk absensi ID: ${id}`);
}

// Filter attendances
function filterAttendances() {
    const dateFrom = document.getElementById("date-from")?.value;
    const dateTo = document.getElementById("date-to")?.value;
    const searchTerm = document.getElementById("search-input")?.value.toLowerCase() || "";

    filteredAttendances = attendances.filter(attendance => {
        // Date filter
        if (dateFrom && attendance.tanggal < dateFrom) return false;
        if (dateTo && attendance.tanggal > dateTo) return false;

        // Search filter
        if (searchTerm) {
            const searchableText = `
                ${attendance.talent.nama} 
                ${attendance.talent.email} 
                ${attendance.clientProyek.client} 
                ${attendance.clientProyek.proyek}
            `.toLowerCase();
            
            if (!searchableText.includes(searchTerm)) return false;
        }

        return true;
    });

    renderTable(filteredAttendances);
    updatePagination();
}

// Update pagination
function updatePagination() {
    const paginationInfo = document.getElementById("pagination-info");
    if (!paginationInfo) return;
    
    const total = filteredAttendances.length;
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
        filterBtn.addEventListener("click", filterAttendances);
    }

    // Search input (filter on enter)
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                filterAttendances();
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

