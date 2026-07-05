const VisualizerDetail = (function () {
    const DEFAULT_BOUNDS = { left: -5, right: 5, bottom: -5, top: 5 };

    async function initGraph(config) {
        const elt = document.getElementById('visualizer-graph');
        if (!elt || typeof Desmos === 'undefined') return null;

        const calculator = Desmos.GraphingCalculator(elt, {
            expressions: true,
            expressionsCollapsed: true,
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

        try {
            const res = await fetch(config.stateFile);
            if (!res.ok) throw new Error('Failed to load graph state');
            const state = await res.json();
            calculator.setState(state);
        } catch (err) {
            console.error('Visualizer state load error:', err);
        }

        calculator.setMathBounds(config.bounds || DEFAULT_BOUNDS);
        requestAnimationFrame(() => calculator.resize());
        return calculator;
    }

    function init(config) {
        document.addEventListener('DOMContentLoaded', () => {
            initGraph(config);
        });
    }

    return { init };
})();