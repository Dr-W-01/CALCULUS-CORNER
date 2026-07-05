(function () {
    function createCard(v) {
        const card = document.createElement('a');
        card.href = v.page;
        card.className = 'visualizer-card';

        card.innerHTML = `
            <h3 class="visualizer-card-title"></h3>
            <div class="visualizer-card-preview">
                <img class="visualizer-card-thumb" alt="" loading="lazy">
            </div>
            <p class="visualizer-card-desc"></p>
        `;

        card.querySelector('.visualizer-card-title').textContent = v.title;
        card.querySelector('.visualizer-card-desc').textContent = v.description;
        const img = card.querySelector('.visualizer-card-thumb');
        img.src = v.thumbUrl;
        img.alt = `${v.title} preview`;

        return card;
    }

    function showError(message) {
        const grid = document.getElementById('visualizers-grid');
        if (grid) {
            grid.innerHTML = `<p class="visualizers-grid-status visualizers-grid-error">${message}</p>`;
        }
    }

    async function loadVisualizers() {
        const grid = document.getElementById('visualizers-grid');
        if (!grid) return;

        try {
            const res = await fetch('data/visualizers.json');
            if (!res.ok) throw new Error('Failed to load visualizers');
            const items = await res.json();

            grid.innerHTML = '';
            items.forEach(v => grid.appendChild(createCard(v)));
        } catch (err) {
            showError('Could not load visualizers.');
            console.error('Visualizers load error:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadVisualizers);
    } else {
        loadVisualizers();
    }
})();