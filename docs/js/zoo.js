(function () {
    const GRAPH_COLOR = '#b91c1c';
    const POINT_COLOR = '#f87171';
    const BASIC_ZOO_COUNT = 20;

    function renderKatex(el, tex) {
        if (!el || typeof katex === 'undefined') return;
        if (window.CCKatex) {
            window.CCKatex.render(el, tex, { displayMode: false });
            return;
        }
        katex.render(tex, el, { throwOnError: false, displayMode: false });
    }

    function detailPageUrl(id) {
        return `function-${id}.html`;
    }

    function calculatorElementId(gridId, fnId) {
        return `calculator-${gridId}-${fnId}`;
    }

    function initDesmosGraph(gridId, fn) {
        const elt = document.getElementById(calculatorElementId(gridId, fn.id));
        if (!elt || typeof Desmos === 'undefined') return null;

        const interactive = fn.interactive === true;
        const calculator = Desmos.GraphingCalculator(elt, {
            expressions: false,
            settingsMenu: false,
            zoomButtons: interactive,
            keypad: false,
            expressionsTopbar: false,
            border: false,
            lockViewport: !interactive,
            showGrid: true,
            showXAxis: true,
            showYAxis: true
        });

        if (fn.expressions) {
            fn.expressions.forEach(expr => {
                calculator.setExpression({
                    id: expr.id,
                    latex: expr.latex,
                    color: expr.color || GRAPH_COLOR
                });
            });
        } else if (fn.graph_expression) {
            calculator.setExpression({
                id: `graph-${fn.id}`,
                latex: fn.graph_expression,
                color: GRAPH_COLOR
            });
        }

        if (fn.point) {
            calculator.setExpression({
                id: `point-${fn.id}`,
                latex: fn.point.latex,
                pointStyle: fn.point.pointStyle,
                color: fn.point.color || POINT_COLOR
            });
        }

        if (fn.points) {
            fn.points.forEach((point, pointIndex) => {
                calculator.setExpression({
                    id: point.id || `point-${fn.id}-${pointIndex}`,
                    latex: point.latex,
                    pointStyle: point.pointStyle,
                    color: point.color || POINT_COLOR
                });
            });
        }

        calculator.setMathBounds(fn.bounds || { left: -5, right: 5, bottom: -5, top: 5 });
        calculator.resize();
        return calculator;
    }

    function createFunctionCard(gridId, fn) {
        const card = document.createElement('a');
        card.href = detailPageUrl(fn.id);
        card.className = 'zoo-card';
        const graphId = calculatorElementId(gridId, fn.id);

        card.innerHTML = `
            <h3 class="zoo-card-title"></h3>
            <div class="zoo-card-meta">
                <div class="zoo-card-expr"></div>
                <div class="zoo-card-domain-row">
                    <span class="field-label">Domain</span>
                    <span class="zoo-card-domain"></span>
                </div>
            </div>
            <div class="zoo-graph-wrap">
                <div id="${graphId}" class="desmos-graph"></div>
            </div>
            <p class="zoo-card-desc"></p>
        `;

        card.querySelector('.zoo-card-title').textContent = fn.name.toUpperCase();
        card.querySelector('.zoo-card-desc').textContent = fn.description;
        renderKatex(card.querySelector('.zoo-card-expr'), fn.latex);
        renderKatex(card.querySelector('.zoo-card-domain'), fn.domain);

        if (fn.interactive) {
            const graphWrap = card.querySelector('.zoo-graph-wrap');
            graphWrap.classList.add('zoo-graph-wrap--interactive');
            graphWrap.addEventListener('click', (event) => event.stopPropagation());
            graphWrap.addEventListener('mousedown', (event) => event.stopPropagation());
            card.addEventListener('click', (event) => {
                if (event.target.closest('.zoo-graph-wrap--interactive')) {
                    event.preventDefault();
                }
            });
        }

        return card;
    }

    function renderSection(gridId, functions) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        grid.innerHTML = '';
        const calculators = [];

        functions.forEach(fn => {
            const card = createFunctionCard(gridId, fn);
            grid.appendChild(card);
            calculators.push({ fn, card });
        });

        requestAnimationFrame(() => {
            calculators.forEach(({ fn }) => initDesmosGraph(gridId, fn));
        });
    }

    function showError(gridId, message) {
        const grid = document.getElementById(gridId);
        if (grid) {
            grid.innerHTML = `<p class="zoo-grid-status zoo-grid-error">${message}</p>`;
        }
    }

    const ZOO_SECTIONS = [
        { gridId: 'basic-grid', dataPath: 'data/functions-v2.json', transform: (items) => items.slice(0, BASIC_ZOO_COUNT) },
        { gridId: 'exotic-grid', dataPath: 'data/functions-exotic.json' },
        { gridId: 'intermediate-grid', dataPath: 'data/functions-intermediate.json' },
        { gridId: 'trigonometric-grid', dataPath: 'data/functions-trigonometric.json' },
        { gridId: 'inverse-trig-grid', dataPath: 'data/functions-inverse-trig.json' },
        { gridId: 'hyperbolic-grid', dataPath: 'data/functions-hyperbolic.json' },
    ];

    async function loadZoo() {
        const msg = 'Could not load function data.';

        try {
            const responses = await Promise.all(
                ZOO_SECTIONS.map((section) => fetch(section.dataPath))
            );

            if (responses.some((res) => !res.ok)) {
                throw new Error('Failed to load function data');
            }

            const datasets = await Promise.all(responses.map((res) => res.json()));

            ZOO_SECTIONS.forEach((section, index) => {
                const functions = section.transform
                    ? section.transform(datasets[index])
                    : datasets[index];
                renderSection(section.gridId, functions);
            });
        } catch (err) {
            ZOO_SECTIONS.forEach((section) => showError(section.gridId, msg));
            console.error('Zoo load error:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadZoo);
    } else {
        loadZoo();
    }
})();