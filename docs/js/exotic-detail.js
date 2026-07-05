const ExoticDetail = (function () {
    const GRAPH_COLOR = '#b91c1c';
    const POINT_COLOR = '#f87171';

    function initGraph(config) {
        const elt = document.getElementById('exotic-graph');
        if (!elt || typeof Desmos === 'undefined') return null;

        const calculator = Desmos.GraphingCalculator(elt, {
            expressions: false,
            settingsMenu: false,
            zoomButtons: true,
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

        calculator.setMathBounds(config.bounds || { left: -5, right: 5, bottom: -5, top: 5 });
        requestAnimationFrame(() => calculator.resize());
        return calculator;
    }

    function init(config) {
        document.addEventListener('DOMContentLoaded', () => {
            if (config.headerKatex) {
                const header = document.getElementById('header-expr');
                if (header && typeof katex !== 'undefined') {
                    if (window.CCKatex) {
                        window.CCKatex.render(header, config.headerKatex, { displayMode: true });
                    } else {
                        katex.render(config.headerKatex, header, { throwOnError: false, displayMode: true });
                    }
                }
            }
            initGraph(config);
        });
    }

    return { init };
})();