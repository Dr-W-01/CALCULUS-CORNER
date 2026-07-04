(function () {
    const GRAPH_COLOR = '#b91c1c';
    const POINT_COLOR = '#f87171';
    const BASIC_ZOO_COUNT = 20;

    function renderKatex(el, tex) {
        if (!el || typeof katex === 'undefined') return;
        katex.render(tex, el, { throwOnError: false, displayMode: false });
    }

    function detailPageUrl(id) {
        return `function-${id}.html`;
    }

    function initDesmosGraph(fn) {
        const elt = document.getElementById(`calculator-${fn.id}`);
        if (!elt || typeof Desmos === 'undefined') return null;

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

    function createFunctionCard(fn) {
        const card = document.createElement('a');
        card.href = detailPageUrl(fn.id);
        card.className = 'zoo-card';

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
                <div id="calculator-${fn.id}" class="desmos-graph"></div>
            </div>
            <p class="zoo-card-desc"></p>
        `;

        card.querySelector('.zoo-card-title').textContent = fn.name.toUpperCase();
        card.querySelector('.zoo-card-desc').textContent = fn.description;
        renderKatex(card.querySelector('.zoo-card-expr'), fn.latex);
        renderKatex(card.querySelector('.zoo-card-domain'), fn.domain);

        return card;
    }

    function renderSection(gridId, functions) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        grid.innerHTML = '';
        const calculators = [];

        functions.forEach(fn => {
            const card = createFunctionCard(fn);
            grid.appendChild(card);
            calculators.push({ fn, card });
        });

        requestAnimationFrame(() => {
            calculators.forEach(({ fn }) => initDesmosGraph(fn));
        });
    }

    function showError(gridId, message) {
        const grid = document.getElementById(gridId);
        if (grid) {
            grid.innerHTML = `<p class="zoo-grid-status zoo-grid-error">${message}</p>`;
        }
    }

    async function loadZoo() {
        try {
            const [basicRes, intermediateRes, exoticRes] = await Promise.all([
                fetch('data/functions-v2.json'),
                fetch('data/functions-intermediate.json'),
                fetch('data/functions-exotic.json')
            ]);

            if (!basicRes.ok || !intermediateRes.ok || !exoticRes.ok) {
                throw new Error('Failed to load function data');
            }

            const basicFunctions = (await basicRes.json()).slice(0, BASIC_ZOO_COUNT);
            const intermediateFunctions = await intermediateRes.json();
            const exoticFunctions = await exoticRes.json();

            renderSection('basic-grid', basicFunctions);
            renderSection('intermediate-grid', intermediateFunctions);
            renderSection('exotic-grid', exoticFunctions);
        } catch (err) {
            const msg = 'Could not load function data.';
            showError('basic-grid', msg);
            showError('intermediate-grid', msg);
            showError('exotic-grid', msg);
            console.error('Zoo load error:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadZoo);
    } else {
        loadZoo();
    }
})();