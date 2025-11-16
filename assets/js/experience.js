// Experience Data
const experiences = [
    {
        id: 1,
        key: "ui-ux-design",
        label: "UI UX Design",
        status: "active",
        posisi: 1,
    },
    {
        id: 2,
        key: "web-development",
        label: "Web Development",
        status: "active",
        posisi: 2,
    },
    {
        id: 3,
        key: "mobile-development",
        label: "Mobile Development",
        status: "inactive",
        posisi: 3,
    },
];

// Update stats cards
function updateStats() {
    const total = experiences.length;
    const active = experiences.filter(e => e.status === "active").length;
    const inactive = experiences.filter(e => e.status === "inactive").length;

    // Count experiences from this month (assuming created date exists)
    // For now, we'll use a simple count
    const thisMonth = experiences.filter(e => e.status === "active").length;

    const statTotal = document.getElementById("stat-total");
    const statActive = document.getElementById("stat-active");
    const statInactive = document.getElementById("stat-inactive");
    const statThisMonth = document.getElementById("stat-this-month");

    if (statTotal) statTotal.textContent = total;
    if (statActive) statActive.textContent = active;
    if (statInactive) statInactive.textContent = inactive;
    if (statThisMonth) statThisMonth.textContent = thisMonth;
}

// Render table
function renderTable() {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    // Sort by position
    const sortedExperiences = [...experiences].sort((a, b) => a.posisi - b.posisi);

    // Generate table rows
    tableBody.innerHTML = sortedExperiences.map((experience, index) => {
        const statusBadgeClass = experience.status === "active"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-red-500 hover:bg-red-600 text-white";

        const statusText = experience.status === "active" ? "Active" : "Tidak Aktif";

        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200 cursor-move draggable-row transition-colors" 
                draggable="true" 
                data-id="${experience.id}"
                data-posisi="${experience.posisi}">
                <td class="px-4 py-3 text-center text-slate-500">${index + 1}</td>
                <td class="px-4 py-3 font-medium">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing">
                            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                        ${experience.key}
                    </div>
                </td>
                <td class="px-4 py-3 font-medium">${experience.label}</td>
                <td class="px-4 py-3 text-center text-slate-500">${experience.posisi}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded-md text-xs font-medium ${statusBadgeClass}">
                        ${statusText}
                    </span>
                </td>
                <td class="px-4 py-3 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <a href="experience-edit.html?id=${experience.id}"
                            class="px-3 py-1 border-2 border-jitara-blue text-jitara-blue hover:bg-jitara-blue hover:text-white text-sm rounded-md transition-colors">
                            Edit
                        </a>
                        <button onclick="deleteExperience(${experience.id})"
                            class="cursor-pointer px-3 py-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm rounded-md transition-colors">
                            Hapus
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");

    // Update pagination info
    const paginationInfo = document.getElementById("pagination-info");
    if (paginationInfo) {
        paginationInfo.textContent = `Halaman 1 dari 1 - Menampilkan ${experiences.length} pengalaman`;
    }

    // Initialize drag and drop
    initDragAndDrop();
}

// Delete Experience
function deleteExperience(id) {
    if (confirm('Apakah Anda yakin ingin menghapus pengalaman ini?')) {
        const index = experiences.findIndex(e => e.id === id);
        if (index > -1) {
            experiences.splice(index, 1);
            // Reorder positions after deletion
            reorderPositions();
            renderTable();
            updateStats();
        }
    }
}

// Reorder positions after drag and drop or deletion
function reorderPositions() {
    const sortedExperiences = [...experiences].sort((a, b) => a.posisi - b.posisi);
    sortedExperiences.forEach((experience, index) => {
        experience.posisi = index + 1;
    });
}

// Drag and Drop functionality
let draggedElement = null;
let draggedIndex = null;

function initDragAndDrop() {
    const rows = document.querySelectorAll('.draggable-row');

    rows.forEach((row, index) => {
        row.addEventListener('dragstart', handleDragStart);
        row.addEventListener('dragend', handleDragEnd);
        row.addEventListener('dragover', handleDragOver);
        row.addEventListener('drop', handleDrop);
        row.addEventListener('dragenter', handleDragEnter);
        row.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    draggedIndex = parseInt(this.dataset.posisi) - 1;
    this.classList.add('opacity-50', 'bg-blue-100');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    const rows = document.querySelectorAll('.draggable-row');
    rows.forEach(row => {
        row.classList.remove('bg-blue-200', 'border-blue-400', 'border-2');
    });
    this.classList.remove('opacity-50', 'bg-blue-100');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('bg-blue-200', 'border-blue-400', 'border-2');
    }
}

function handleDragLeave(e) {
    this.classList.remove('bg-blue-200', 'border-blue-400', 'border-2');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (draggedElement !== this) {
        const draggedId = parseInt(draggedElement.dataset.id);
        const dropId = parseInt(this.dataset.id);

        // Find Experience items
        const draggedExperience = experiences.find(e => e.id === draggedId);
        const dropExperience = experiences.find(e => e.id === dropId);

        if (draggedExperience && dropExperience) {
            // Get current positions
            const draggedPosisi = draggedExperience.posisi;
            const dropPosisi = dropExperience.posisi;

            // Update positions
            draggedExperience.posisi = dropPosisi;
            dropExperience.posisi = draggedPosisi;

            // Reorder all positions to ensure sequential order (1, 2, 3, ...)
            reorderPositions();

            // Re-render table
            renderTable();
        }
    }

    this.classList.remove('bg-blue-200', 'border-blue-400', 'border-2');
    return false;
}

// Mobile menu toggle (if on experience.html page)
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

// Form submission handler for add/edit pages
const experienceForm = document.getElementById('experience-form');
if (experienceForm && !document.getElementById('table-body')) {
    experienceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const key = document.getElementById('key').value;
        const label = document.getElementById('label').value;
        const posisi = parseInt(document.getElementById('posisi').value);
        const status = document.getElementById('status').value;

        // In a real app, you would send this to an API
        // For now, we'll just show an alert and redirect
        const isEdit = window.location.pathname.includes('edit');
        alert(`Pengalaman berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
        window.location.href = 'experience.html';
    });
}

// Initial render (only if on experience.html page)
if (document.getElementById("table-body")) {
    updateStats();
    renderTable();
}

// Load Experience data (simulate from URL parameter)
function loadExperienceData() {
    const urlParams = new URLSearchParams(window.location.search);
    const experienceId = urlParams.get('id');

    if (experienceId && document.getElementById('key')) {
        // Find experience in experiences array
        const experience = experiences.find(e => e.id === parseInt(experienceId));
        if (experience) {
            document.getElementById('key').value = experience.key;
            document.getElementById('label').value = experience.label;
            document.getElementById('posisi').value = experience.posisi;
            document.getElementById('status').value = experience.status;
        }
    }
}

// Load experience data on page load
loadExperienceData();

