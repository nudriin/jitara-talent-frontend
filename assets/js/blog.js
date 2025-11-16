// Blog Data
const blogs = [
    {
        id: 1,
        cover: "https://media.wired.com/photos/6517554f09807970da6567b8/3:2/w_2560%2Cc_limit/Tips-For-Remote-Work-Business-1441444285.jpg",
        title: "testtsaa",
        status: "published",
        terbit: "2025-11-13 11:01:00",
    },
    {
        id: 2,
        cover: "https://media.wired.com/photos/6517554f09807970da6567b8/3:2/w_2560%2Cc_limit/Tips-For-Remote-Work-Business-1441444285.jpg",
        title: "5 Tips Meningkatkan Peluang Diterima Kerja",
        status: "published",
        terbit: "2025-10-15 09:30:00",
    },
    {
        id: 3,
        cover: "https://media.wired.com/photos/6517554f09807970da6567b8/3:2/w_2560%2Cc_limit/Tips-For-Remote-Work-Business-1441444285.jpg",
        title: "Cara Membuat CV yang Menarik",
        status: "draft",
        terbit: null,
    },
];

// Update stats cards
function updateStats() {
    const total = blogs.length;
    const published = blogs.filter(b => b.status === "published").length;
    const draft = blogs.filter(b => b.status === "draft").length;

    // Count articles from this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = blogs.filter(b => {
        if (!b.terbit) return false;
        const terbitDate = new Date(b.terbit);
        return terbitDate.getMonth() === currentMonth && terbitDate.getFullYear() === currentYear;
    }).length;

    const statTotal = document.getElementById("stat-total");
    const statPublished = document.getElementById("stat-published");
    const statDraft = document.getElementById("stat-draft");
    const statThisMonth = document.getElementById("stat-this-month");

    if (statTotal) statTotal.textContent = total;
    if (statPublished) statPublished.textContent = published;
    if (statDraft) statDraft.textContent = draft;
    if (statThisMonth) statThisMonth.textContent = thisMonth;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
}

// Render table
function renderTable() {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    // Generate table rows
    tableBody.innerHTML = blogs.map((blog) => {
        const statusBadgeClass = blog.status === "published"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-yellow-500 hover:bg-yellow-600 text-white";

        const statusText = blog.status === "published" ? "Published" : "Draft";
        const terbitText = blog.terbit ? formatDate(blog.terbit) : "-";

        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="px-4 py-3">
                    <img src="${blog.cover}" alt="Cover" class="w-16 h-16 object-cover rounded-lg">
                </td>
                <td class="px-4 py-3 font-medium">${blog.title}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 rounded-md text-xs font-medium ${statusBadgeClass}">
                        ${statusText}
                    </span>
                </td>
                <td class="px-4 py-3 text-center text-slate-500">${terbitText}</td>
                <td class="px-4 py-3 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <a href="blog-edit.html?id=${blog.id}"
                            class="px-3 py-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded-md transition-colors">
                            Edit
                        </a>
                        <button onclick="deleteArticle(${blog.id})"
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
        paginationInfo.textContent = `Halaman 1 dari 1 - Menampilkan ${blogs.length} artikel`;
    }
}

// Delete article
function deleteArticle(id) {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
        const index = blogs.findIndex(b => b.id === id);
        if (index > -1) {
            blogs.splice(index, 1);
            renderTable();
            updateStats();
        }
    }
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
    updateStats();
    renderTable();
}

// Load article data 
function loadArticleData() {
    // Get article ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        document.getElementById('judul').value = 'testtsaa';
        document.getElementById('konten').value = 'Konten artikel...';
        document.getElementById('status').value = 'published';
        document.getElementById('tanggal-terbit').value = '2025-11-13T11:01';
    }
}

// Cover image preview
const coverInput = document.getElementById('cover');
const coverPreview = document.getElementById('cover-preview');

if (coverInput && coverPreview) {
    coverInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                coverPreview.src = e.target.result;
                coverPreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });
}

// Form submission
const form = document.getElementById('article-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        alert('Berhasil!');
        window.location.href = 'blog.html';
    });
}

loadArticleData();
