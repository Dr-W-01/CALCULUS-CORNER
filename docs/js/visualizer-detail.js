const VisualizerDetail = (function () {
    async function initGraph(stateFile) {
        const elt = document.getElementById('visualizer-graph');
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

        try {
            const res = await fetch(stateFile);
            if (!res.ok) throw new Error('Failed to load graph state');
            const state = await res.json();
            calculator.setState(state);
        } catch (err) {
            console.error('Visualizer state load error:', err);
        }

        requestAnimationFrame(() => calculator.resize());
        return calculator;
    }

    function init(config) {
        document.addEventListener('DOMContentLoaded', () => {
            initGraph(config.stateFile);
        });
    }

    return { init };
})();