(function () {
    const DEFAULT_BOUNDS = { left: -5, right: 5, bottom: -5, top: 5 };

    async function initPreviewGraph(v, containerId) {
        const elt = document.getElementById(containerId);
        if (!elt || typeof Desmos === 'undefined') return;

        const calculator = Desmos.GraphingCalculator(elt, {
            expressions: false,
            settingsMenu: false,
            zoomButtons: false,
            keypad: false,
            expressionsTopbar: false,
            border: false,
            lockViewport: true,
            showGrid: true,
            showXAxis: true,
            showYAxis: true
        });

        try {
            const res = await fetch(v.stateFile);
            if (res.ok) {
                const state = await res.json();
                calculator.setState(state);
            }
        } catch (err) {
            console.error('Visualizer preview load error:', v.id, err);
        }

        calculator.setMathBounds(v.bounds || DEFAULT_BOUNDS);
        requestAnimationFrame(() => calculator.resize());
    }

    function initCanvasPreview(v, containerId) {
        const canvas = document.getElementById(containerId);
        if (!canvas) return;
        const level = v.previewLevel != null ? v.previewLevel : 4;

        if (v.previewRenderer === 'archimedes-pi' && typeof ArchimedesPi !== 'undefined') {
            ArchimedesPi.drawPreview(canvas, level);
            return;
        }
        if (typeof FakePiProof !== 'undefined') {
            FakePiProof.drawPreview(canvas, level);
        }
    }

    function createCard(v) {
        const card = document.createElement('a');
        card.href = v.page;
        card.className = 'visualizer-card zoo-card';

        const previewId = 'visualizer-preview-' + v.id;
        const isCanvas = v.previewType === 'canvas';

        card.innerHTML = `
            <h3 class="visualizer-card-title zoo-card-title"></h3>
            <p class="visualizer-card-desc"></p>
            <div class="visualizer-card-preview">
                ${isCanvas
                    ? `<canvas id="${previewId}" class="visualizer-card-preview-canvas" width="340" height="340" aria-hidden="true"></canvas>`
                    : `<div id="${previewId}" class="desmos-graph"></div>`}
            </div>
        `;

        card.querySelector('.visualizer-card-title').textContent = v.title.toUpperCase();
        card.querySelector('.visualizer-card-desc').textContent = v.description;

        return { card, previewId, visualizer: v, isCanvas: isCanvas };
    }

    function renderSection(section) {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'zoo-page-section visualizers-page-section';
        sectionEl.setAttribute('aria-label', section.title);

        sectionEl.innerHTML = `
            <h2 class="zoo-section-header"></h2>
            <p class="zoo-section-subtitle"></p>
            <div class="visualizers-grid" data-section="${section.id}"></div>
        `;

        sectionEl.querySelector('.zoo-section-header').textContent = section.title;
        sectionEl.querySelector('.zoo-section-subtitle').textContent = section.subtitle;

        const grid = sectionEl.querySelector('.visualizers-grid');
        const previews = [];

        if (!section.visualizers || section.visualizers.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'visualizers-section-empty';
            empty.textContent = 'No visualizers in this section yet — check back soon.';
            grid.appendChild(empty);
            return sectionEl;
        }

        section.visualizers.forEach(function (v) {
            const { card, previewId, visualizer, isCanvas } = createCard(v);
            grid.appendChild(card);
            previews.push({ previewId, visualizer, isCanvas: isCanvas });
        });

        requestAnimationFrame(function () {
            previews.forEach(function (item) {
                if (item.isCanvas) {
                    initCanvasPreview(item.visualizer, item.previewId);
                } else {
                    initPreviewGraph(item.visualizer, item.previewId);
                }
            });
        });

        return sectionEl;
    }

    function showError(message) {
        const container = document.getElementById('visualizers-sections');
        if (container) {
            container.innerHTML = '<p class="visualizers-grid-status visualizers-grid-error">' + message + '</p>';
        }
    }

    async function loadVisualizers() {
        const container = document.getElementById('visualizers-sections');
        if (!container) return;

        try {
            const res = await fetch('data/visualizers.json');
            if (!res.ok) throw new Error('Failed to load visualizers');
            const data = await res.json();

            container.innerHTML = '';
            (data.sections || []).forEach(function (section) {
                container.appendChild(renderSection(section));
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