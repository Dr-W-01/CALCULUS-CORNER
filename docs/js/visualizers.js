(function () {
    const GRAPH_COLOR = '#b91c1c';
    const REFERENCE_COLOR = '#52525b';

    function initSineExplorer() {
        const elt = document.getElementById('explorer-sine');
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

        calculator.setExpression({ id: 'reference', latex: 'y=\\sin(x)', color: REFERENCE_COLOR });
        calculator.setExpression({ id: 'transformed', latex: 'y=A\\sin(B(x-C))+D', color: GRAPH_COLOR });
        calculator.setMathBounds({ left: -7, right: 7, bottom: -5, top: 5 });

        const sliders = {
            a: document.getElementById('slider-amplitude'),
            b: document.getElementById('slider-frequency'),
            c: document.getElementById('slider-phase'),
            d: document.getElementById('slider-vertical')
        };

        const labels = {
            a: document.getElementById('label-amplitude'),
            b: document.getElementById('label-frequency'),
            c: document.getElementById('label-phase'),
            d: document.getElementById('label-vertical')
        };

        const exprEl = document.getElementById('explorer-sine-expr');

        function formatNum(n) {
            return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, '');
        }

        function buildLatex(A, B, C, D) {
            const phase = C === 0 ? 'x' : `(x-${formatNum(C)})`;
            const inner = B === 1 ? phase : `${formatNum(B)}${phase}`;
            const trig = `\\sin\\left(${inner}\\right)`;
            const scaled = A === 1 ? trig : `${formatNum(A)}${trig}`;
            if (D === 0) return `f(x)=${scaled}`;
            const sign = D > 0 ? '+' : '-';
            return `f(x)=${scaled}${sign}${formatNum(Math.abs(D))}`;
        }

        function update() {
            const A = parseFloat(sliders.a.value);
            const B = parseFloat(sliders.b.value);
            const C = parseFloat(sliders.c.value);
            const D = parseFloat(sliders.d.value);

            labels.a.textContent = formatNum(A);
            labels.b.textContent = formatNum(B);
            labels.c.textContent = formatNum(C);
            labels.d.textContent = formatNum(D);

            calculator.setExpression({
                id: 'transformed',
                latex: `y=${formatNum(A)}\\sin(${formatNum(B)}(x-${formatNum(C)}))+${formatNum(D)}`,
                color: GRAPH_COLOR
            });

            if (exprEl && typeof katex !== 'undefined') {
                katex.render(buildLatex(A, B, C, D), exprEl, { throwOnError: false, displayMode: true });
            }
        }

        Object.values(sliders).forEach(slider => {
            slider.addEventListener('input', update);
        });

        update();
        requestAnimationFrame(() => calculator.resize());
        return calculator;
    }

    function init() {
        initSineExplorer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();