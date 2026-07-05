const ExoticDetail = (function () {
    const GRAPH_COLOR = '#b91c1c';
    const POINT_COLOR = '#f87171';
    const DEFAULT_BOUNDS = { left: -5, right: 5, bottom: -5, top: 5 };

    function initGraph(config) {
        const elt = document.getElementById('exotic-graph');
        if (!elt || typeof Desmos === 'undefined') return null;

        const calculator = Desmos.GraphingCalculator(elt, {
            expressions: false,
            settingsMenu: false,
            zoomButtons: false,
            keypad: false,
            expressionsTopbar: false,
            border: false,
            lockViewport: false,
            showGrid: true,
            showXAxis: true,
            showYAxis: true
        });

        if (config.expressions && config.expressions.length) {
            config.expressions.forEach(expr => {
                calculator.setExpression({
                    id: expr.id,
                    latex: expr.latex,
                    color: expr.color || GRAPH_COLOR
                });
            });
        } else if (config.graphExpression) {
            calculator.setExpression({
                id: 'graph-main',
                latex: config.graphExpression,
                color: GRAPH_COLOR
            });
        }

        if (config.point) {
            calculator.setExpression({
                id: config.point.id || 'point-main',
                latex: config.point.latex,
                pointStyle: config.point.pointStyle,
                color: config.point.color || POINT_COLOR
            });
        }

        (config.points || []).forEach((point, i) => {
            calculator.setExpression({
                id: point.id || `point-${i}`,
                latex: point.latex,
                pointStyle: point.pointStyle,
                color: point.color || POINT_COLOR
            });
        });

        calculator.setMathBounds(config.bounds || DEFAULT_BOUNDS);
        requestAnimationFrame(() => calculator.resize());
        window.addEventListener('resize', () => calculator.resize());
        return calculator;
    }

    function init(config) {
        function run() {
            if (config.headerKatex) {
                const header = document.getElementById('header-expr');
                if (header) {
                    if (window.CCKatex) {
                        window.CCKatex.render(header, config.headerKatex, { displayMode: true });
                    } else if (typeof katex !== 'undefined') {
                        katex.render(config.headerKatex, header, { throwOnError: false, displayMode: true });
                    }
                }
            }
            initGraph(config);
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', run);
        } else {
            run();
        }
    }

    return { init };
})();