(function () {
    function desmosEmbedUrl(graphId) {
        return 'https://www.desmos.com/calculator/' + graphId + '?embed';
    }

    function createCard(v) {
        const card = document.createElement('a');
        card.href = v.page;
        card.className = 'visualizer-card zoo-card';

        card.innerHTML = `
            <h3 class="visualizer-card-title zoo-card-title"></h3>
            <p class="visualizer-card-desc"></p>
            <div class="visualizer-card-preview">
                <iframe class="visualizer-card-embed" title="" loading="lazy" tabindex="-1"></iframe>
            </div>
        `;

        card.querySelector('.visualizer-card-title').textContent = v.title.toUpperCase();
        card.querySelector('.visualizer-card-desc').textContent = v.description;

        const iframe = card.querySelector('.visualizer-card-embed');
        iframe.src = desmosEmbedUrl(v.desmosEmbedId);
        iframe.title = v.title + ' preview';

        return card;
    }

    function showError(message) {
        const grid = document.getElementById('visualizers-grid');
        if (grid) {
            grid.innerHTML = '<p class="visualizers-grid-status visualizers-grid-error">' + message + '</p>';
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
            items.forEach(function (v) {
                grid.appendChild(createCard(v));
            });
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