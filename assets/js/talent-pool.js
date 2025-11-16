// Talent Pool Data
const talentPool = [
    {
        id: 1,
        nama: "test1234",
        email: "test1234@gmail.com",
        bergabung: "2025-11-14 23:52:08",
    },
    {
        id: 2,
        nama: "Taufik As BARU",
        email: "taufikas031@gmail.com",
        bergabung: "2025-11-16 07:42:28",
    },
];

// Assignment History Data
const assignmentHistory = [
    {
        id: 1,
        client: "Disdik Kalteng",
        peran: "Web Development",
        judul: "nama project",
        tanggal: "2025-11-15 17:02:29",
        status: "active",
        documents: {
            penempatan: "#",
            kontrak: "#",
            tugas: "#",
        },
    },
];

// Render table for talent pool
function renderTalentPoolTable() {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    tableBody.innerHTML = talentPool.map((talent) => {
        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="px-4 py-3 font-medium">${talent.nama}</td>
                <td class="px-4 py-3 text-slate-500">${talent.email}</td>
                <td class="px-4 py-3 text-slate-500">${talent.bergabung}</td>
                <td class="px-4 py-3 text-center">
                    <a href="talent-pool-detail.html?id=${talent.id}"
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors inline-block">
                        Detail
                    </a>
                </td>
            </tr>
        `;
    }).join("");

    // Update pagination info
    const paginationInfo = document.getElementById("pagination-info");
    if (paginationInfo) {
        paginationInfo.textContent = `Halaman 1 dari 1 - Menampilkan ${talentPool.length} talent`;
    }
}

// Render assignment history table
function renderAssignmentHistory() {
    const tableBody = document.getElementById("history-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = assignmentHistory.map((assignment) => {
        const statusBadgeClass = assignment.status === "active"
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-slate-500 hover:bg-slate-600 text-white";

        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="px-4 py-3 font-medium">${assignment.client}</td>
                <td class="px-4 py-3">${assignment.peran}</td>
                <td class="px-4 py-3">${assignment.judul}</td>
                <td class="px-4 py-3 text-slate-500">${assignment.tanggal}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded-md text-xs font-medium ${statusBadgeClass}">
                        ${assignment.status}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <div class="flex flex-col gap-2">
                        <div class="flex gap-2 flex-wrap">
                            <a href="${assignment.documents.penempatan}" target="_blank"
                                class="px-3 py-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs rounded-md transition-colors">
                                Penempatan
                            </a>
                            <a href="${assignment.documents.kontrak}" target="_blank"
                                class="px-3 py-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs rounded-md transition-colors">
                                Surat Kontrak
                            </a>
                            <a href="${assignment.documents.tugas}" target="_blank"
                                class="px-3 py-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs rounded-md transition-colors">
                                Surat Tugas
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

// Load talent data for detail page
function loadTalentData() {
    const urlParams = new URLSearchParams(window.location.search);
    const talentId = urlParams.get('id');

    if (talentId && document.getElementById('talent-info')) {
        const talent = talentPool.find(t => t.id === parseInt(talentId));
        if (talent) {
            document.getElementById('talent-info').textContent = `${talent.nama} ${talent.email}`;
        }
    }
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById('koordinat-lat').value = position.coords.latitude.toFixed(6);
                document.getElementById('koordinat-lng').value = position.coords.longitude.toFixed(6);
                alert('Lokasi berhasil didapatkan!');
            },
            (error) => {
                alert('Gagal mendapatkan lokasi. Pastikan izin lokasi sudah diberikan.');
                console.error('Geolocation error:', error);
            }
        );
    } else {
        alert('Browser tidak mendukung geolocation.');
    }
}

// Upload final document
function uploadFinal() {
    const docType = document.getElementById('doc-type').value;
    const docCategory = document.getElementById('doc-category').value;
    const docFile = document.getElementById('doc-file').files[0];

    if (!docFile) {
        alert('Pilih file terlebih dahulu!');
        return;
    }

    // Validate file
    if (docFile.size > 10 * 1024 * 1024) {
        alert('Ukuran file maksimal 10MB!');
        return;
    }

    // In a real app, you would upload to server
    alert(`File berhasil diupload! Jenis: ${docType}, Kategori: ${docCategory}`);
    
    // Reset form
    document.getElementById('doc-file').value = '';
}

// Form submission handler
const assignmentForm = document.getElementById('assignment-form');
if (assignmentForm) {
    assignmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            client: document.getElementById('client').value,
            namaProject: document.getElementById('nama-project').value,
            koordinatLat: document.getElementById('koordinat-lat').value,
            koordinatLng: document.getElementById('koordinat-lng').value,
            durasiMulai: document.getElementById('durasi-mulai').value,
            durasiSelesai: document.getElementById('durasi-selesai').value,
            nilaiKontrak: document.getElementById('nilai-kontrak').value,
            peran: document.getElementById('peran').value,
            lokasiPenempatan: document.getElementById('lokasi-penempatan').value,
            nomorSurat: document.getElementById('nomor-surat').value,
            catatan: document.getElementById('catatan').value,
        };

        // In a real app, you would send this to an API
        alert('Penugasan berhasil disimpan dan dokumen telah di-generate!');
        
        // Reload assignment history
        renderAssignmentHistory();
    });
}

// Mobile menu toggle
const btn = document.getElementById('mobileMenuBtn');
const menuWrapper = document.getElementById('mobileMenu');

if (btn && menuWrapper) {
    const menuCard = menuWrapper.querySelector('div');
    const iconOpen = document.getElementById('iconOpen');
    const iconClose = document.getElementById('iconClose');

    if (menuCard && iconOpen && iconClose) {
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
    }
}

// Initial render
if (document.getElementById("table-body")) {
    renderTalentPoolTable();
}

if (document.getElementById("history-table-body")) {
    renderAssignmentHistory();
    loadTalentData();
}

