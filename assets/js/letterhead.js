// Letterhead Data
const letterheads = [
    {
        id: 1,
        key: "assignment",
        image: "https://jitara.id/assets/uploads/media-uploader/jitara-logo16392494721640294490.png",
    },
    {
        id: 2,
        key: "contract",
        image: "https://jitara.id/assets/uploads/media-uploader/jitara-logo16392494721640294490.png",
    },
    {
        id: 3,
        key: "placement",
        image: "https://jitara.id/assets/uploads/media-uploader/jitara-logo16392494721640294490.png",
    },
];

// Render table
function renderTable() {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    // Generate table rows
    tableBody.innerHTML = letterheads.map((letterhead) => {
        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200">
                <td class="px-4 py-3 font-medium">${letterhead.key}</td>
                <td class="px-4 py-3">
                    <img src="${letterhead.image}" 
                         alt="Preview ${letterhead.key}" 
                         id="preview-${letterhead.id}"
                         class="max-w-xs h-32 object-contain border border-slate-300 rounded-lg">
                </td>
                <td class="px-4 py-3">
                    <input type="file" 
                           id="upload-${letterhead.id}" 
                           name="upload-${letterhead.id}"
                           accept="image/*"
                           class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-jitara-orange file:text-white hover:file:bg-jitara-blue transition-colors cursor-pointer"
                           onchange="handleFileUpload(${letterhead.id}, this)">
                    <p class="mt-1 text-xs text-slate-500">Format: JPG, PNG. Maksimal 5MB</p>
                </td>
                <td class="px-4 py-3 text-center">
                    <button onclick="saveLetterhead(${letterhead.id})"
                        class="px-4 py-2 bg-jitara-orange text-white rounded-xl font-medium hover:bg-jitara-blue transition-colors duration-300 hover:scale-105 cursor-pointer">
                        Simpan
                    </button>
                </td>
            </tr>
        `;
    }).join("");
}

// Handle file upload and preview
function handleFileUpload(letterheadId, input) {
    const file = input.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar!');
        input.value = '';
        return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB!');
        input.value = '';
        return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        const previewImg = document.getElementById(`preview-${letterheadId}`);
        if (previewImg) {
            previewImg.src = e.target.result;
        }
    };
    reader.readAsDataURL(file);
}

// Save letterhead
function saveLetterhead(letterheadId) {
    const input = document.getElementById(`upload-${letterheadId}`);
    const file = input.files[0];

    if (!file) {
        alert('Pilih file gambar terlebih dahulu!');
        return;
    }

    // Find letterhead
    const letterhead = letterheads.find(l => l.id === letterheadId);
    if (!letterhead) return;

    // In a real app, you would upload the file to a server
    // For now, we'll just update the preview and show a success message
    const reader = new FileReader();
    reader.onload = (e) => {
        letterhead.image = e.target.result;
        alert(`Kop surat "${letterhead.key}" berhasil disimpan!`);
        // Optionally re-render the table
        // renderTable();
    };
    reader.readAsDataURL(file);
}

// Mobile menu toggle (if on letterhead.html page)
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

// Initial render (only if on letterhead.html page)
if (document.getElementById("table-body")) {
    renderTable();
}

