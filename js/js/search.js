// Advanced search with fuzzy matching and suggestions
(function() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    // Debounce search for performance
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                // Trigger search via app's render function
                if (window.renderTools) {
                    window.renderTools();
                }
            }, 200);
        });

        // Keyboard shortcut: Ctrl+K to focus search
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        // Auto-suggest feature (simple)
        searchInput.addEventListener('focus', function() {
            this.select();
        });
    }
})();
