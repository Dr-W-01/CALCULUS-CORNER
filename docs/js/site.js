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
        const render = window.CCKatex ? window.CCKatex.render : (el, tex) => {
            katex.render(tex, el, { throwOnError: false });
        };
        document.querySelectorAll('[data-katex]').forEach(el => {
            render(el, el.getAttribute('data-katex'));
        });
    }

    function initTypoReportForm() {
        const form = document.getElementById('typo-report-form');
        if (!form) return;

        const pageUrlInput = document.getElementById('typo-page-url');
        if (pageUrlInput) {
            pageUrlInput.value = window.location.href;
        }

        const successEl = document.getElementById('typo-form-success');
        const errorEl = document.getElementById('typo-form-error');
        const submitBtn = form.querySelector('.typo-form-submit');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (successEl) successEl.hidden = true;
            if (errorEl) errorEl.hidden = true;
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';
            }

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });

                if (response.ok) {
                    form.reset();
                    if (pageUrlInput) {
                        pageUrlInput.value = window.location.href;
                    }
                    if (successEl) successEl.hidden = false;
                } else if (errorEl) {
                    errorEl.hidden = false;
                }
            } catch (err) {
                if (errorEl) errorEl.hidden = false;
                console.error('Typo report submit error:', err);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit';
                }
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        initSidebar();
        renderKatex();
        initTypoReportForm();
    });
})();