// Main application logic
const toolsGrid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
let currentCategory = 'all';
let currentSearch = '';

// Render tools
function renderTools() {
    const filtered = toolsData.filter(tool => {
        const matchesCategory = currentCategory === 'all' || tool.category === currentCategory;
        const matchesSearch = tool.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                             tool.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
                             tool.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        toolsGrid.innerHTML = `
            <div class="empty-state">
                <span style="font-size:48px;">🔍</span>
                <p style="color:var(--text-secondary);font-size:18px;margin-top:12px;">No tools found.</p>
                <p style="color:var(--text-muted);">Try adjusting your search or filter.</p>
            </div>
        `;
        return;
    }

    toolsGrid.innerHTML = filtered.map(tool => `
        <div class="tool-card" data-id="${tool.id}">
            <div class="tool-icon">${tool.icon || '🛠️'}</div>
            <div class="tool-category">${tool.category}</div>
            <div class="tool-name">${tool.name}</div>
            <div class="tool-desc">${tool.description}</div>
            <div class="tool-tags">
                ${tool.tags.slice(0, 3).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                ${tool.tags.length > 3 ? `<span class="tag">+${tool.tags.length - 3}</span>` : ''}
            </div>
        </div>
    `).join('');

    // Update count
    document.querySelector('.logo-badge').textContent = `${filtered.length}/${toolsData.length}`;
}

// Category filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.category;
        renderTools();
    });
});

// Search
searchInput.addEventListener('input', function() {
    currentSearch = this.value;
    renderTools();
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light');
    this.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// Initial render
renderTools();
