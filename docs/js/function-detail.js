const FunctionDetail = (function () {
    const GRAPH_COLOR = '#b91c1c';
    const POINT_COLOR = '#f87171';

    function initGraph(elementId, graphDef, bounds) {
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

        if (typeof graphDef === 'string') {
            calculator.setExpression({ id: 'graph', latex: graphDef, color: GRAPH_COLOR });
        } else if (graphDef) {
            if (graphDef.latex) {
                calculator.setExpression({ id: 'graph', latex: graphDef.latex, color: GRAPH_COLOR });
            }
            if (graphDef.expressions) {
                graphDef.expressions.forEach(expr => {
                    calculator.setExpression({
                        id: expr.id,
                        latex: expr.latex,
                        color: expr.color || GRAPH_COLOR
                    });
                });
            }
            if (graphDef.points) {
                graphDef.points.forEach((point, i) => {
                    calculator.setExpression({
                        id: point.id || `point-${elementId}-${i}`,
                        latex: point.latex,
                        pointStyle: point.pointStyle,
                        color: point.color || POINT_COLOR
                    });
                });
            }
        }

        calculator.setMathBounds(bounds);
        requestAnimationFrame(() => calculator.resize());
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
                if (graphs[index] !== undefined) initGraph(id, graphs[index], bounds);
            });
        });
    }

    return { init };
})();