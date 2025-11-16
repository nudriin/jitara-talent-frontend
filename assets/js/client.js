// Client Data
let clients = [
    {
        id: 1,
        nama: "Disdik Kalteng",
        jenis: "Pemerintah",
        provinsi: "Kalimantan Tengah",
        kabKota: "Palangka Raya",
        alamat: "Jalan DI Panjaitan, Nomor 4, Kota Palangka Raya, Kalimantan Tengah"
    }
];

let editingClientId = null;

// Render table
function renderTable(filteredClients = null) {
    const tableBody = document.getElementById("table-body");
    if (!tableBody) return;

    const dataToRender = filteredClients || clients;

    tableBody.innerHTML = dataToRender.map((client) => {
        return `
            <tr class="hover:bg-slate-50 border-b border-slate-200" data-id="${client.id}">
                <td class="px-4 py-3 font-medium">${client.nama}</td>
                <td class="px-4 py-3">${client.jenis}</td>
                <td class="px-4 py-3">${client.provinsi}</td>
                <td class="px-4 py-3">${client.kabKota}</td>
                <td class="px-4 py-3 text-slate-600">${client.alamat}</td>
                <td class="px-4 py-3">
                    <div class="flex flex-col gap-2 items-center">
                        <button onclick="openEditModal(${client.id})"
                            class="cursor-pointer px-4 py-1 border-2 border-jitara-blue text-jitara-blue hover:bg-jitara-blue hover:text-white text-sm rounded-md transition-colors w-full">
                            Edit
                        </button>
                        <button onclick="deleteClient(${client.id})"
                            class="cursor-pointer px-4 py-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm rounded-md transition-colors w-full">
                            Hapus
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

// Open edit modal
function openEditModal(id) {
    const client = clients.find(c => c.id === id);
    if (!client) return;

    editingClientId = id;

    // Fill form with client data
    document.getElementById('edit-nama').value = client.nama;
    document.getElementById('edit-jenis').value = client.jenis;
    document.getElementById('edit-provinsi').value = client.provinsi;
    document.getElementById('edit-kab-kota').value = client.kabKota;
    document.getElementById('edit-alamat').value = client.alamat;

    // Show modal
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Close edit modal
function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
    editingClientId = null;
}

// Save edit client
const editClientForm = document.getElementById('edit-client-form');
if (editClientForm) {
    editClientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!editingClientId) return;

        const formData = {
            nama: document.getElementById('edit-nama').value.trim(),
            jenis: document.getElementById('edit-jenis').value.trim(),
            provinsi: document.getElementById('edit-provinsi').value.trim(),
            kabKota: document.getElementById('edit-kab-kota').value.trim(),
            alamat: document.getElementById('edit-alamat').value.trim()
        };

        // Validate
        if (!formData.nama || !formData.jenis || !formData.provinsi || !formData.kabKota || !formData.alamat) {
            alert('Semua field harus diisi!');
            return;
        }

        // Update client
        const clientIndex = clients.findIndex(c => c.id === editingClientId);
        if (clientIndex !== -1) {
            clients[clientIndex] = { ...clients[clientIndex], ...formData };
            closeEditModal();
            renderTable();
            alert('Client berhasil diperbarui!');
        }
    });
}

// Close modal when clicking outside
const editModal = document.getElementById('edit-modal');
if (editModal) {
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeEditModal();
    }
});

// Delete client
function deleteClient(id) {
    if (confirm('Apakah Anda yakin ingin menghapus client ini?')) {
        clients = clients.filter(c => c.id !== id);
        if (editingClientId === id) {
            editingClientId = null;
        }
        renderTable();
        alert('Client berhasil dihapus!');
    }
}

// Add new client
const addClientForm = document.getElementById('add-client-form');
if (addClientForm) {
    addClientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            nama: document.getElementById('nama-client').value.trim(),
            jenis: document.getElementById('jenis-client').value.trim(),
            provinsi: document.getElementById('provinsi').value.trim(),
            kabKota: document.getElementById('kab-kota').value.trim(),
            alamat: document.getElementById('alamat-lengkap').value.trim()
        };

        // Validate
        if (!formData.nama || !formData.jenis || !formData.provinsi || !formData.kabKota || !formData.alamat) {
            alert('Semua field harus diisi!');
            return;
        }

        // Add new client
        const newClient = {
            id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
            ...formData
        };
        
        clients.push(newClient);
        renderTable();
        
        // Reset form
        addClientForm.reset();
        alert('Client berhasil ditambahkan!');
    });
}

// Search functionality
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        renderTable();
        return;
    }
    
    const filtered = clients.filter(client => 
        client.nama.toLowerCase().includes(searchTerm) ||
        client.jenis.toLowerCase().includes(searchTerm) ||
        client.provinsi.toLowerCase().includes(searchTerm) ||
        client.kabKota.toLowerCase().includes(searchTerm)
    );
    
    renderTable(filtered);
}

// Search on input change
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            renderTable();
        }
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
    renderTable();
}

