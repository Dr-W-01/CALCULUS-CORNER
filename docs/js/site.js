(function () {
    const STORAGE_KEY = 'cc-sidebar-collapsed';

    function initSidebar() {
        const collapseBtn = document.getElementById('sidebar-collapse');
        const expandBtn = document.getElementById('sidebar-expand');
        if (!collapseBtn || !expandBtn) return;

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'true') {
            document.body.classList.add('sidebar-collapsed');
        }

        function setCollapsed(collapsed) {
            document.body.classList.toggle('sidebar-collapsed', collapsed);
            localStorage.setItem(STORAGE_KEY, collapsed ? 'true' : 'false');
        }

        collapseBtn.addEventListener('click', () => setCollapsed(true));
        expandBtn.addEventListener('click', () => setCollapsed(false));
    }

    function renderKatex() {
        if (typeof katex === 'undefined') return;
        document.querySelectorAll('[data-katex]').forEach(el => {
            katex.render(el.getAttribute('data-katex'), el, { throwOnError: false });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initSidebar();
        renderKatex();
    });
})();