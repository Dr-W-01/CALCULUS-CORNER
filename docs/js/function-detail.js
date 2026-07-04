const FunctionDetail = (function () {
    const GRAPH_COLOR = '#b91c1c';

    function initGraph(elementId, expression, bounds) {
        const elt = document.getElementById(elementId);
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

        calculator.setExpression({ id: 'graph', latex: expression, color: GRAPH_COLOR });
        calculator.setMathBounds(bounds);
    }

    function init(config) {
        const bounds = config.bounds || { left: -5, right: 5, bottom: -5, top: 5 };
        const graphs = config.graphs || [];

        document.addEventListener('DOMContentLoaded', () => {
            if (config.headerKatex) {
                const header = document.getElementById('header-expr');
                if (header) {
                    katex.render(config.headerKatex, header, { throwOnError: false, displayMode: true });
                }
            }

            const mapping = [
                ['graph-f-main', 0],
                ['graph-f', 0],
                ['graph-fp', 1],
                ['graph-fpp', 2]
            ];
            mapping.forEach(([id, index]) => {
                if (graphs[index]) initGraph(id, graphs[index], bounds);
            });
        });
    }

    return { init };
})();