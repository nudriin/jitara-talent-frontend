// FAQ Data
const faqs = [
    {
        id: 1,
        pertanyaan: "Test Pertanyaan",
        status: "published",
        posisi: 1,
    },
    {
        id: 2,
        pertanyaan: "Bagaimana cara mendaftar di Jitara Talent?",
        status: "published",
        posisi: 2,
    },
    {
        id: 3,
        pertanyaan: "Apa saja dokumen yang diperlukan?",
        status: "draft",
        posisi: 3,
    },
];

// Update stats cards
function updateStats() {
    const total = faqs.length;
    const published = faqs.filter(f => f.status === "published").length;
    const draft = faqs.filter(f => f.status === "draft").length;

    // Count FAQs from this month (assuming created date exists)
    // For now, we'll use a simple count
    const thisMonth = faqs.filter(f => f.status === "published").length;

    const statTotal = document.getElementById("stat-total");
    const statPublished = document.getElementById("stat-published");
    const statDraft = document.getElementById("stat-draft");
    const statThisMonth = document.getElementById("stat-this-month");

    if (statTotal) statTotal.textContent = total;
    if (statPublished) statPublished.textContent = published;
    if (statDraft) statDraft.textContent = draft;
    if (statThisMonth) statThisMonth.textContent = thisMonth;
}

// Render table
function renderTable() {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    // Sort by position
    const sortedFaqs = [...faqs].sort((a, b) => a.posisi - b.posisi);

    // Generate table rows
    tableBody.innerHTML = sortedFaqs.map((faq) => {
        const statusBadgeClass = faq.status === "published"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-yellow-500 hover:bg-yellow-600 text-white";

        const statusText = faq.status === "published" ? "Published" : "Draft";

        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200 cursor-move draggable-row transition-colors" 
                draggable="true" 
                data-id="${faq.id}"
                data-posisi="${faq.posisi}">
                <td class="px-4 py-3 font-medium">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing">
                            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                        ${faq.pertanyaan}
                    </div>
                </td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded-md text-xs font-medium ${statusBadgeClass}">
                        ${statusText}
                    </span>
                </td>
                <td class="px-4 py-3 text-center text-slate-500">${faq.posisi}</td>
                <td class="px-4 py-3 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <a href="faq-edit.html?id=${faq.id}"
                            class="px-3 py-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded-md transition-colors">
                            Edit
                        </a>
                        <button onclick="deleteFAQ(${faq.id})"
                            class="px-3 py-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm rounded-md transition-colors">
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
        paginationInfo.textContent = `Halaman 1 dari 1 - Menampilkan ${faqs.length} FAQ`;
    }

    // Initialize drag and drop
    initDragAndDrop();
}

// Delete FAQ
function deleteFAQ(id) {
    if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
        const index = faqs.findIndex(f => f.id === id);
        if (index > -1) {
            faqs.splice(index, 1);
            // Reorder positions after deletion
            reorderPositions();
            renderTable();
            updateStats();
        }
    }
}

// Reorder positions after drag and drop or deletion
function reorderPositions() {
    const sortedFaqs = [...faqs].sort((a, b) => a.posisi - b.posisi);
    sortedFaqs.forEach((faq, index) => {
        faq.posisi = index + 1;
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

        // Find FAQ items
        const draggedFaq = faqs.find(f => f.id === draggedId);
        const dropFaq = faqs.find(f => f.id === dropId);

        if (draggedFaq && dropFaq) {
            // Get current positions
            const draggedPosisi = draggedFaq.posisi;
            const dropPosisi = dropFaq.posisi;

            // Update positions
            draggedFaq.posisi = dropPosisi;
            dropFaq.posisi = draggedPosisi;

            // Reorder all positions to ensure sequential order (1, 2, 3, ...)
            reorderPositions();
            
            // Re-render table
            renderTable();
        }
    }

    this.classList.remove('bg-blue-200', 'border-blue-400', 'border-2');
    return false;
}

// Mobile menu toggle (if on faq.html page)
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
const faqForm = document.getElementById('faq-form');
if (faqForm && !document.getElementById('table-body')) {
    faqForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const pertanyaan = document.getElementById('pertanyaan').value;
        const jawaban = document.getElementById('jawaban').value;
        const status = document.getElementById('status').value;
        const posisi = parseInt(document.getElementById('posisi').value);

        // In a real app, you would send this to an API
        // For now, we'll just show an alert and redirect
        const isEdit = window.location.pathname.includes('edit');
        alert(`FAQ berhasil ${isEdit ? 'diperbarui' : 'ditambahkan'}!`);
        window.location.href = 'faq.html';
    });
}

// Initial render (only if on faq.html page)
if (document.getElementById("table-body")) {
    updateStats();
    renderTable();
}

// Load FAQ data (simulate from URL parameter)
function loadFAQData() {
    const urlParams = new URLSearchParams(window.location.search);
    const faqId = urlParams.get('id');

    if (faqId) {
        document.getElementById('pertanyaan').value = 'Test Pertanyaan';
        document.getElementById('jawaban').value = 'Jawaban untuk pertanyaan...';
        document.getElementById('status').value = 'published';
        document.getElementById('posisi').value = '1';
    }
}

// Load FAQ data on page load
loadFAQData();
