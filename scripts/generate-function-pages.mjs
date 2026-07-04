import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS = join(__dirname, '..', 'docs');

const TOP_BAR = `    <div class="top-bar px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div class="flex items-center gap-x-3">
            <div class="w-9 h-9 bg-[#b91c1c] rounded-2xl flex items-center justify-center">
                <span class="font-bold text-white text-2xl tracking-tighter">CC</span>
            </div>
            <span class="font-semibold text-3xl tracking-tighter">Calculus Corner</span>
        </div>
        <div class="flex items-center gap-x-4">
            <input type="text" placeholder="Search..." class="bg-[#111111] border border-zinc-800 rounded-3xl px-5 py-2 text-sm w-80 focus:outline-none focus:border-zinc-600">
            <div class="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-medium">EW</div>
        </div>
    </div>`;

const SIDEBAR = `    <div class="page-layout flex">
        <button type="button" id="sidebar-expand" class="sidebar-toggle sidebar-expand-btn" aria-label="Open navigation" title="Open navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <aside id="sidebar" class="sidebar">
            <button type="button" id="sidebar-collapse" class="sidebar-toggle sidebar-collapse-btn" aria-label="Close navigation" title="Close navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <nav class="sidebar-nav space-y-1 text-sm">
                <a href="index.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Home</a>
                <a href="courses.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Courses</a>
                <a href="zoo.html" class="nav-item nav-active flex items-center gap-x-3 px-4 py-3 rounded-2xl">Function Zoo</a>
                <a href="visualizers.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Visualizers</a>
                <a href="profile.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">My Profile</a>
            </nav>
        </aside>

        <main class="main-content flex-1 p-8">`;

const sign = (pos, val, vert = 'above') =>
  `                                        <span class="sign-line-sign ${vert}" style="left: ${pos};">${val}</span>`;

const point = (left, label, kind = 'filled') => {
  const cls = kind === 'filled' ? 'sign-line-point filled' : 'sign-line-point open';
  const num = label
    ? `                                        <span class="sign-line-number" style="left: ${left};">${label}</span>\n`
    : '';
  return `${num}                                        <span class="${cls}" style="left: ${left};"></span>`;
};

const signChart = (signs, points = '') => `                                <div class="sign-line-wrap">
                                    <div class="sign-line-axis">
${points}${signs}
                                    </div>
                                </div>`;

const FUNCTIONS = [
  {
    id: 'const-1', pageTitle: 'f(x) = 1', heading: 'THE CONSTANT FUNCTION', headerKatex: 'f(x) = 1',
    graphs: ['y = 1', 'y = 0', 'y = 0'], bounds: { left: -5, right: 5, bottom: -2, top: 4 },
    facts: [
      ['Domain', '(-\\infty, \\infty)', true], ['Range', '\\{1\\}', true],
      ['x-intercepts', 'None', false], ['y-intercepts', '(0, 1)', true],
      ['Vertical Asymptotes', 'None', false], ['Horizontal Asymptotes', 'y = 1', true],
      ['Continuity', 'Continuous for all real numbers', false],
      ['Differentiability', 'Differentiable for all real numbers', false],
      ['Symmetry', 'even <span data-katex="f(-x) = f(x)"></span>', false, true],
    ],
    intro: 'This seemingly very simple function is an important example of a function where every point is a critical point, and every point is the location of an absolute max, absolute min, local max, and local min. Because its slope is zero, it is neither increasing nor decreasing anywhere. Because it is a straight line, it has no concavity.',
    behavior: [
      ['Discontinuities', 'None'], ['Non-differentiability', 'None'],
      ['Absolute Maximum', 'f(x) = 1 for all x', true], ['Absolute Minimum', 'f(x) = 1 for all x', true],
      ['Relative Maximum', 'f(x) = 1 for all x', true], ['Relative Minimum', 'f(x) = 1 for all x', true],
      ['Increasing', 'None'], ['Decreasing', 'None'], ['Concave Up', 'None'], ['Concave Down', 'None'],
      ['Inflection Points', 'None', false, true],
    ],
    limits: [
      ['Limits as x → ±∞', ['\\lim_{x \\to \\infty} 1 = 1', '\\lim_{x \\to -\\infty} 1 = 1']],
      ['Limit at a point', ['\\lim_{x \\to 0} 1 = 1']],
      ['General limit', ['\\lim_{x \\to a} 1 = 1 \\text{ for all real numbers } a']],
    ],
    derivTitles: ['f(x) = 1', "f'(x) = 0", "f''(x) = 0"],
    fSign: [sign('25%', '+') + '\n' + sign('75%', '+'), ''],
    fpSign: [sign('50%', '0'), ''],
    fppSign: [sign('50%', '0'), ''],
    fAnalysis: 'The constant function equals 1 everywhere, so <span data-katex="f(x) > 0"></span> on <span data-katex="(-\\infty, \\infty)"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> None</p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Critical points:</strong> Every real number (since <span data-katex="f\'(x) = 0"></span> everywhere).</p>',
    fppAnalysis: '<p><strong>Concave up:</strong> None</p><p><strong>Concave down:</strong> None</p><p><strong>Inflection points:</strong> None</p>',
    integrals: ['\\int 1 \\, dx = x + C', '\\int_0^1 1 \\, dx = 1'],
  },
  {
    id: 'linear-x', pageTitle: 'f(x) = x', heading: 'THE LINEAR FUNCTION', headerKatex: 'f(x) = x',
    graphs: ['y = x', 'y = 1', 'y = 0'],
    facts: [
      ['Domain', '(-\\infty, \\infty)', true], ['Range', '(-\\infty, \\infty)', true],
      ['x-intercepts', '(0, 0)', true], ['y-intercepts', '(0, 0)', true],
      ['Vertical Asymptotes', 'None', false], ['Horizontal Asymptotes', 'None', false],
      ['Continuity', 'Continuous for all real numbers', false],
      ['Differentiability', 'Differentiable for all real numbers', false],
      ['Symmetry', 'odd <span data-katex="f(-x) = -f(x)"></span>', false, true],
    ],
    intro: 'The oblique line is an important example of a function which has no critical points and also no concavity.',
    behavior: [
      ['Discontinuities', 'None'], ['Non-differentiability', 'None'],
      ['Absolute Maximum', 'None'], ['Absolute Minimum', 'None'],
      ['Relative Maximum', 'None'], ['Relative Minimum', 'None'],
      ['Increasing', '(-\\infty, \\infty)', true], ['Decreasing', 'None'],
      ['Concave Up', 'None'], ['Concave Down', 'None'], ['Inflection Points', 'None', false, true],
    ],
    limits: [
      ['Limits as x → ±∞', ['\\lim_{x \\to \\infty} x = \\infty', '\\lim_{x \\to -\\infty} x = -\\infty']],
      ['Limit at a point', ['\\lim_{x \\to 0} x = 0']],
      ['General limit', ['\\lim_{x \\to a} x = a \\text{ for all real numbers } a']],
    ],
    derivTitles: ['f(x) = x', "f'(x) = 1", "f''(x) = 0"],
    fSign: [sign('25%', '−', 'below') + '\n' + sign('75%', '+') + '\n' + point('50%', '0', 'filled'), ''],
    fpSign: [sign('25%', '+') + '\n' + sign('75%', '+'), ''],
    fppSign: [sign('50%', '0'), ''],
    fAnalysis: 'The identity function passes through the origin. <span data-katex="f(x) < 0"></span> for <span data-katex="x < 0"></span> and <span data-katex="f(x) > 0"></span> for <span data-katex="x > 0"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> <span data-katex="(-\\infty, \\infty)"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Critical points:</strong> None</p>',
    fppAnalysis: '<p><strong>Concave up:</strong> None</p><p><strong>Concave down:</strong> None</p><p><strong>Inflection points:</strong> None</p>',
    integrals: ['\\int x \\, dx = \\frac{x^2}{2} + C', '\\int_0^1 x \\, dx = \\frac{1}{2}'],
  },
  {
    id: 'quadratic-x2', pageTitle: 'f(x) = x^2', heading: 'THE PARABOLA', headerKatex: 'f(x) = x^2',
    graphs: ['y = x^2', 'y = 2x', 'y = 2'],
    facts: [
      ['Domain', '(-\\infty, \\infty)', true], ['Range', '[0, \\infty)', true],
      ['x-intercepts', '(0, 0)', true], ['y-intercepts', '(0, 0)', true],
      ['Vertical Asymptotes', 'None', false], ['Horizontal Asymptotes', 'None', false],
      ['Continuity', 'Continuous for all real numbers', false],
      ['Differentiability', 'Differentiable for all real numbers', false],
      ['Symmetry', 'even <span data-katex="f(-x) = f(x)"></span>', false, true],
    ],
    intro: 'The parabola is our first example of a function with only one absolute extrema (its absolute minimum of 0) and where the absolute minimum is also a local minimum. This does not always have to coincide, as other examples will show.',
    behavior: [
      ['Discontinuities', 'None'], ['Non-differentiability', 'None'],
      ['Absolute Maximum', 'None'], ['Absolute Minimum', 'f(0) = 0 at x = 0', true],
      ['Relative Maximum', 'None'], ['Relative Minimum', 'f(0) = 0 at x = 0', true],
      ['Increasing', '(0, \\infty)', true], ['Decreasing', '(-\\infty, 0)', true],
      ['Concave Up', '(-\\infty, \\infty)', true], ['Concave Down', 'None'],
      ['Inflection Points', 'None', false, true],
    ],
    limits: [
      ['Limits as x → ±∞', ['\\lim_{x \\to \\infty} x^2 = \\infty', '\\lim_{x \\to -\\infty} x^2 = \\infty']],
      ['Limit at a point', ['\\lim_{x \\to 0} x^2 = 0']],
      ['General limit', ['\\lim_{x \\to a} x^2 = a^2 \\text{ for all real numbers } a']],
    ],
    derivTitles: ['f(x) = x^2', "f'(x) = 2x", "f''(x) = 2"],
    fSign: [sign('25%', '+') + '\n' + sign('75%', '+') + '\n' + point('50%', '0', 'filled'), ''],
    fpSign: [sign('25%', '−', 'below') + '\n' + sign('75%', '+') + '\n' + point('50%', '0', 'filled'), ''],
    fppSign: [sign('25%', '+') + '\n' + sign('75%', '+'), ''],
    fAnalysis: 'The parabola opens upward with vertex at the origin. <span data-katex="f(x) \\geq 0"></span> for all real <span data-katex="x"></span>, with <span data-katex="f(0) = 0"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> <span data-katex="(0, \\infty)"></span></p><p><strong>Intervals of decrease:</strong> <span data-katex="(-\\infty, 0)"></span></p><p><strong>Critical point at</strong> <span data-katex="x = 0"></span>: relative and absolute minimum.</p>',
    fppAnalysis: '<p><strong>Concave up:</strong> <span data-katex="(-\\infty, \\infty)"></span></p><p><strong>Concave down:</strong> None</p><p><strong>Inflection points:</strong> None</p>',
    integrals: ['\\int x^2 \\, dx = \\frac{x^3}{3} + C', '\\int_0^1 x^2 \\, dx = \\frac{1}{3}'],
  },
  {
    id: 'cubic-x3', pageTitle: 'f(x) = x^3', heading: 'THE CUBIC FUNCTION', headerKatex: 'f(x) = x^3',
    graphs: ['y = x^3', 'y = 3x^2', 'y = 6x'],
    facts: [
      ['Domain', '(-\\infty, \\infty)', true], ['Range', '(-\\infty, \\infty)', true],
      ['x-intercepts', '(0, 0)', true], ['y-intercepts', '(0, 0)', true],
      ['Vertical Asymptotes', 'None', false], ['Horizontal Asymptotes', 'None', false],
      ['Continuity', 'Continuous for all real numbers', false],
      ['Differentiability', 'Differentiable for all real numbers', false],
      ['Symmetry', 'odd <span data-katex="f(-x) = -f(x)"></span>', false, true],
    ],
    intro: 'The cubic function is our first example of a point of inflection. This point of inflection happens to also be a critical point, though that is not necessarily always the case. A function like <span data-katex="f(x) = x(x-1)(x-3)"></span> has a point of inflection which is not a critical point. This example is important because we have a critical point where the function is increasing at that critical point.',
    behavior: [
      ['Discontinuities', 'None'], ['Non-differentiability', 'None'],
      ['Absolute Maximum', 'None'], ['Absolute Minimum', 'None'],
      ['Relative Maximum', 'None'], ['Relative Minimum', 'None'],
      ['Increasing', '(-\\infty, \\infty)', true], ['Decreasing', 'None'],
      ['Concave Up', '(0, \\infty)', true], ['Concave Down', '(-\\infty, 0)', true],
      ['Inflection Points', '(0, 0)', true, true],
    ],
    limits: [
      ['Limits as x → ±∞', ['\\lim_{x \\to \\infty} x^3 = \\infty', '\\lim_{x \\to -\\infty} x^3 = -\\infty']],
      ['Limit at a point', ['\\lim_{x \\to 0} x^3 = 0']],
      ['General limit', ['\\lim_{x \\to a} x^3 = a^3 \\text{ for all real numbers } a']],
    ],
    derivTitles: ['f(x) = x^3', "f'(x) = 3x^2", "f''(x) = 6x"],
    fSign: [sign('25%', '−', 'below') + '\n' + sign('75%', '+') + '\n' + point('50%', '0', 'filled'), ''],
    fpSign: [sign('25%', '+') + '\n' + sign('75%', '+') + '\n' + point('50%', '0', 'filled'), ''],
    fppSign: [sign('25%', '−', 'below') + '\n' + sign('75%', '+') + '\n' + point('50%', '0', 'filled'), ''],
    fAnalysis: 'The original cubic passes through the origin. <span data-katex="f(x) < 0"></span> for <span data-katex="x < 0"></span> and <span data-katex="f(x) > 0"></span> for <span data-katex="x > 0"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> <span data-katex="(-\\infty, \\infty)"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Critical point at</strong> <span data-katex="x = 0"></span>: neither a relative max nor min — the function is increasing through the critical point.</p>',
    fppAnalysis: '<p><strong>Concave down:</strong> <span data-katex="(-\\infty, 0)"></span></p><p><strong>Concave up:</strong> <span data-katex="(0, \\infty)"></span></p><p><strong>Inflection point:</strong> <span data-katex="(0, 0)"></span></p>',
    integrals: ['\\int x^3 \\, dx = \\frac{x^4}{4} + C', '\\int_0^1 x^3 \\, dx = \\frac{1}{4}'],
  },
  {
    id: 'sqrt-x', pageTitle: 'f(x) = \\sqrt{x}', heading: 'THE SQUARE ROOT FUNCTION', headerKatex: 'f(x) = \\sqrt{x}',
    graphs: ['y = \\sqrt{x}', 'y = \\frac{1}{2\\sqrt{x}}', 'y = -\\frac{1}{4x^{3/2}}'],
    bounds: { left: -1, right: 5, bottom: -1, top: 4 },
    facts: [
      ['Domain', '[0, \\infty)', true], ['Range', '[0, \\infty)', true],
      ['x-intercepts', '(0, 0)', true], ['y-intercepts', '(0, 0)', true],
      ['Vertical Asymptotes', 'None', false], ['Horizontal Asymptotes', 'None', false],
      ['Continuity', 'Continuous on its domain; endpoint discontinuity at x = 0', false],
      ['Differentiability', 'Differentiable on (0, ∞); not differentiable at x = 0', false],
      ['Symmetry', 'None', false, true],
    ],
    intro: 'The square root function is an important example of an absolute minimum which is not a local minimum. Since the function has an endpoint at 0 we have a discontinuity and so the derivative does not exist. The function is not defined on the left of zero and so 0 is not a local minimum.',
    behavior: [
      ['Discontinuities', 'Endpoint discontinuity at x = 0 (left-hand limit does not exist)'],
      ['Non-differentiability', 'x = 0', true],
      ['Absolute Maximum', 'None'], ['Absolute Minimum', 'f(0) = 0 at x = 0', true],
      ['Relative Maximum', 'None'], ['Relative Minimum', 'None'],
      ['Increasing', '(0, \\infty)', true], ['Decreasing', 'None'],
      ['Concave Up', 'None'], ['Concave Down', '(0, \\infty)', true],
      ['Inflection Points', 'None', false, true],
    ],
    limits: [
      ['Limits as x → ±∞', ['\\lim_{x \\to \\infty} \\sqrt{x} = \\infty']],
      ['Limit at a point', ['\\lim_{x \\to 0^+} \\sqrt{x} = 0']],
      ['General limit', ['\\lim_{x \\to a} \\sqrt{x} = \\sqrt{a} \\text{ for } a > 0']],
    ],
    derivTitles: ['f(x) = \\sqrt{x}', "f'(x) = \\frac{1}{2\\sqrt{x}}", "f''(x) = -\\frac{1}{4x^{3/2}}"],
    fSign: [sign('35%', '0', 'below') + '\n' + sign('70%', '+') + '\n' + point('25%', '0', 'filled'), ''],
    fpSign: [sign('60%', '+') + '\n' + point('25%', '0', 'open'), ''],
    fppSign: [sign('60%', '−', 'below') + '\n' + point('25%', '0', 'open'), ''],
    fAnalysis: 'The square root starts at the origin and is defined only for <span data-katex="x \\geq 0"></span>. <span data-katex="f(0) = 0"></span> and <span data-katex="f(x) > 0"></span> for <span data-katex="x > 0"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> <span data-katex="(0, \\infty)"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>At</strong> <span data-katex="x = 0"></span>: derivative undefined (endpoint of domain).</p>',
    fppAnalysis: '<p><strong>Concave down:</strong> <span data-katex="(0, \\infty)"></span></p><p><strong>Concave up:</strong> None</p><p><strong>Inflection points:</strong> None</p>',
    integrals: ['\\int \\sqrt{x} \\, dx = \\frac{2}{3} x^{3/2} + C', '\\int_0^1 \\sqrt{x} \\, dx = \\frac{2}{3}'],
  },
  {
    id: 'cbrt-x', pageTitle: 'f(x) = \\sqrt[3]{x}', heading: 'THE CUBE ROOT FUNCTION', headerKatex: 'f(x) = \\sqrt[3]{x}',
    graphs: ['y = x^{1/3}', 'y = \\frac{1}{3x^{2/3}}', 'y = -\\frac{2}{9x^{5/3}}'],
    facts: [
      ['Domain', '(-\\infty, \\infty)', true], ['Range', '(-\\infty, \\infty)', true],
      ['x-intercepts', '(0, 0)', true], ['y-intercepts', '(0, 0)', true],
      ['Vertical Asymptotes', 'None', false], ['Horizontal Asymptotes', 'None', false],
      ['Continuity', 'Continuous for all real numbers', false],
      ['Differentiability', 'Differentiable for x ≠ 0; vertical tangent at x = 0', false],
      ['Symmetry', 'odd <span data-katex="f(-x) = -f(x)"></span>', false, true],
    ],
    intro: 'This is an important example of a vertical tangent line. This is a critical point where, geometrically, the tangent line is defined but the slope is not defined. This critical point also happens to be a point of inflection, so both kinds of critical points can be inflection points. This function is also the inverse of the cubic function.',
    behavior: [
      ['Discontinuities', 'None'], ['Non-differentiability', 'x = 0 \\text{ (vertical tangent)}', true],
      ['Absolute Maximum', 'None'], ['Absolute Minimum', 'None'],
      ['Relative Maximum', 'None'], ['Relative Minimum', 'None'],
      ['Increasing', '(-\\infty, \\infty)', true], ['Decreasing', 'None'],
      ['Concave Up', '(-\\infty, 0)', true], ['Concave Down', '(0, \\infty)', true],
      ['Inflection Points', '(0, 0)', true, true],
    ],
    limits: [
      ['Limits as x → ±∞', ['\\lim_{x \\to \\infty} \\sqrt[3]{x} = \\infty', '\\lim_{x \\to -\\infty} \\sqrt[3]{x} = -\\infty']],
      ['Limit at a point', ['\\lim_{x \\to 0} \\sqrt[3]{x} = 0']],
      ['General limit', ['\\lim_{x \\to a} \\sqrt[3]{x} = \\sqrt[3]{a} \\text{ for all real numbers } a']],
    ],
    derivTitles: ['f(x) = \\sqrt[3]{x}', "f'(x) = \\frac{1}{3x^{2/3}}", "f''(x) = -\\frac{2}{9x^{5/3}}"],
    fSign: [sign('25%', '−', 'below') + '\n' + sign('75%', '+') + '\n' + point('50%', '0', 'filled'), ''],
    fpSign: [sign('25%', '+') + '\n' + sign('75%', '+') + '\n' + point('50%', '0', 'open'), ''],
    fppSign: [sign('25%', '+') + '\n' + sign('75%', '−', 'below') + '\n' + point('50%', '0', 'open'), ''],
    fAnalysis: 'The cube root passes through the origin. <span data-katex="f(x) < 0"></span> for <span data-katex="x < 0"></span> and <span data-katex="f(x) > 0"></span> for <span data-katex="x > 0"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> <span data-katex="(-\\infty, \\infty)"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>At</strong> <span data-katex="x = 0"></span>: derivative undefined (vertical tangent).</p>',
    fppAnalysis: '<p><strong>Concave up:</strong> <span data-katex="(-\\infty, 0)"></span></p><p><strong>Concave down:</strong> <span data-katex="(0, \\infty)"></span></p><p><strong>Inflection point:</strong> <span data-katex="(0, 0)"></span></p>',
    integrals: ['\\int \\sqrt[3]{x} \\, dx = \\frac{3}{4} x^{4/3} + C', '\\int_0^1 \\sqrt[3]{x} \\, dx = \\frac{3}{4}'],
  },
];

function factCell([label, value, isKatex, full]) {
  if (full) return `                                <div style="grid-column: 1 / -1;"><p class="fact-label">${label}</p><div class="fact-value">${value}</div></div>`;
  if (isKatex) return `                                <div><p class="fact-label">${label}</p><div class="fact-value" data-katex="${value}"></div></div>`;
  return `                                <div><p class="fact-label">${label}</p><div class="fact-value">${value}</div></div>`;
}

function behaviorCell([label, value, isKatex, full]) {
  const inner = isKatex ? `<span data-katex="${value}"></span>` : value;
  const style = full ? ' style="grid-column: 1 / -1;"' : '';
  return `                            <div${style}><span class="meta-label">${label}</span><br>${inner}</div>`;
}

function analysisBlock(text) {
  if (text.startsWith('<p>')) return `                                <div class="chart-analysis">\n                                    ${text}\n                                </div>`;
  return `                                <p class="chart-analysis">${text}</p>`;
}

function renderPage(fn) {
  const bounds = fn.bounds || { left: -5, right: 5, bottom: -5, top: 5 };
  const limitsHtml = fn.limits.map(([sub, items]) => {
    if (items.length > 1) {
      const inner = items.map(it => `                                <span data-katex="${it}"></span>`).join('\n');
      return `                        <div>
                            <p class="limit-subheading">${sub}</p>
                            <div class="text-center text-lg text-zinc-200 flex flex-wrap justify-center gap-x-4 gap-y-2">
${inner}
                            </div>
                        </div>`;
    }
    return `                        <div>
                            <p class="limit-subheading">${sub}</p>
                            <div class="text-center text-lg text-zinc-200" data-katex="${items[0]}"></div>
                        </div>`;
  }).join('\n');

  const integralsHtml = fn.integrals.map((tex, i) => {
    const label = i === 0 ? 'Indefinite Integral' : 'Definite Integral (example)';
    return `                        <div>
                            <p class="meta-label mb-1">${label}</p>
                            <div data-katex="${tex}"></div>
                        </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fn.pageTitle} • Calculus Corner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
    <link rel="stylesheet" href="css/site.css">
</head>
<body>
${TOP_BAR}

${SIDEBAR}
            <div class="w-full max-w-4xl mx-auto space-y-8">

                <header class="text-center">
                    <a href="zoo.html" class="text-sm text-zinc-500 hover:text-red-400 mb-4 inline-block">&larr; Back to Function Zoo</a>
                    <h1 class="text-2xl font-bold tracking-wide text-[#c45050] mb-4">${fn.heading}</h1>
                    <div id="header-expr" class="text-3xl text-white"></div>
                </header>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Overview</h2>
                    </div>
                    <div class="section-body graph-facts-row">
                        <div class="w-full md:w-1/2 shrink-0">
                            <div class="graph-wrap-sm max-w-[22rem] mx-auto overflow-hidden rounded-xl border border-[#523030]">
                                <div id="graph-f-main" class="desmos-graph w-full h-full min-h-[12rem]"></div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 flex-1">
                            <div class="fact-pair">
${fn.facts.map(factCell).join('\n')}
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Description &amp; Behavior</h2>
                    </div>
                    <div class="section-body">
                        <p class="behavior-intro text-zinc-200 text-lg leading-relaxed mb-6">${fn.intro}</p>
                        <div class="behavior-grid text-sm text-zinc-300">
${fn.behavior.map(behaviorCell).join('\n')}
                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Limits</h2>
                    </div>
                    <div class="section-body space-y-4">
${limitsHtml}
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Derivatives</h2>
                    </div>
                    <div class="section-body">
                        <div class="graph-trio">
                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="${fn.derivTitles[0]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#523030]">
                                    <div id="graph-f" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
${signChart(fn.fSign[0], fn.fSign[1])}
${analysisBlock(fn.fAnalysis)}
                            </div>
                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="${fn.derivTitles[1]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#523030]">
                                    <div id="graph-fp" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
${signChart(fn.fpSign[0], fn.fpSign[1])}
${analysisBlock(fn.fpAnalysis)}
                            </div>
                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="${fn.derivTitles[2]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#523030]">
                                    <div id="graph-fpp" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
${signChart(fn.fppSign[0], fn.fppSign[1])}
${analysisBlock(fn.fppAnalysis)}
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header">
                        <h2 class="section-heading text-xl">Integrals</h2>
                    </div>
                    <div class="section-body space-y-4 text-lg text-zinc-200 text-center">
${integralsHtml}
                    </div>
                </section>

            </div>
        </main>
    </div>

    <script src="js/site.js"></script>
    <script src="js/function-detail.js"></script>
    <script>
        FunctionDetail.init({
            headerKatex: ${JSON.stringify(fn.headerKatex)},
            graphs: ${JSON.stringify(fn.graphs)},
            bounds: ${JSON.stringify(bounds)}
        });
    </script>
</body>
</html>`;
}

for (const fn of FUNCTIONS) {
  const path = join(DOCS, `function-${fn.id}.html`);
  writeFileSync(path, renderPage(fn), 'utf8');
  console.log('Wrote', path);
}