import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS = join(__dirname, '..', 'docs');

const TOP_BAR = `    <div class="top-bar px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <a href="index.html" class="site-title-link flex items-center gap-x-3 no-underline text-inherit hover:opacity-90 transition-opacity">
            <div class="w-9 h-9 bg-[#b91c1c] rounded-2xl flex items-center justify-center">
                <span class="font-bold text-white text-2xl tracking-tighter">CC</span>
            </div>
            <span class="font-semibold text-3xl tracking-tighter">Dr. W's Calculus Corner</span>
        </a>
        <div class="flex items-center gap-x-4">
            <input type="text" placeholder="Search..." class="bg-[#111111] border border-zinc-800 rounded-3xl px-5 py-2 text-sm w-80 focus:outline-none focus:border-zinc-600">
            <div class="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-medium">EW</div>
        </div>
    </div>`;

const SIDEBAR = `    <div class="page-layout flex">
        <div class="sidebar-toggle-float" aria-hidden="false">
            <button type="button" id="sidebar-expand" class="sidebar-toggle sidebar-expand-btn" aria-label="Open navigation" title="Open navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <button type="button" id="sidebar-collapse" class="sidebar-toggle sidebar-collapse-btn" aria-label="Close navigation" title="Close navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
        </div>
        <aside id="sidebar" class="sidebar">
            <nav class="sidebar-nav space-y-1 text-sm">
                <a href="index.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Home</a>
                <a href="courses.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Courses</a>
                <a href="zoo.html" class="nav-item nav-active flex items-center gap-x-3 px-4 py-3 rounded-2xl">Function Zoo</a>
                <a href="visualizers.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">Visualizers</a>
                <a href="profile.html" class="nav-item flex items-center gap-x-3 px-4 py-3 rounded-2xl">My Profile</a>
            </nav>
        </aside>

        <main class="main-content flex-1 p-8">`;

function signChartHtml(chart) {
  if (chart.uniform) {
    const vert = chart.uniform === '−' || chart.uniform === '-' ? 'below' : 'above';
    const val = chart.uniform === '-' ? '−' : chart.uniform;
    return `                                <div class="sign-line-wrap">
                                    <div class="sign-line-axis">
                                        <span class="sign-line-sign ${vert}" style="left: 50%;">${val}</span>
                                    </div>
                                </div>`;
  }
  const signs = chart.segments.map(s =>
    `                                        <span class="sign-line-sign ${s.vert || 'above'}" style="left: ${s.pos};">${s.val}</span>`
  ).join('\n');
  const pts = (chart.points || []).map(p => {
    const cls = p.kind === 'filled' ? 'sign-line-point filled' : 'sign-line-point open';
    const num = p.label ? `                                        <span class="sign-line-number" style="left: ${p.pos};">${p.label}</span>\n` : '';
    return `${num}                                        <span class="${cls}" style="left: ${p.pos};"></span>`;
  }).join('\n');
  return `                                <div class="sign-line-wrap">
                                    <div class="sign-line-axis">
${signs}
${pts}
                                    </div>
                                </div>`;
}

function factCell(label, value, katex = false) {
  if (katex) return `                                <div><p class="fact-label">${label}</p><div class="fact-value" data-katex="${value}"></div></div>`;
  return `                                <div><p class="fact-label">${label}</p><div class="fact-value">${value}</div></div>`;
}

function symmetryHtml(sym) {
  if (!sym || sym.type === 'None') {
    return `                                <div class="symmetry-fact" style="grid-column: 1 / -1;"><p class="fact-label">SYMMETRY</p><div class="symmetry-value"><span class="symmetry-type">None</span></div></div>`;
  }
  return `                                <div class="symmetry-fact" style="grid-column: 1 / -1;"><p class="fact-label">SYMMETRY</p><div class="symmetry-value"><span class="symmetry-type">${sym.type}</span><div class="symmetry-formula" data-katex="${sym.formula}"></div></div></div>`;
}

function behaviorCell(label, value, katex = false, full = false) {
  const inner = katex ? `<span data-katex="${value}"></span>` : value;
  const style = full ? ' style="grid-column: 1 / -1;"' : '';
  return `                            <div${style}><span class="meta-label">${label}</span><br>${inner}</div>`;
}

function limitsHtml(fn) {
  let html = '';
  html += `                        <div>
                            <p class="limit-subheading">End Behaviours</p>
                            <div class="text-center text-lg text-zinc-200 flex flex-wrap justify-center gap-x-4 gap-y-2">
${fn.endBehaviours.map(e => `                                <span data-katex="${e}"></span>`).join('\n')}
                            </div>
                            <p class="limit-blurb text-zinc-300 text-sm mt-3 text-center">${fn.endBehaviourBlurb}</p>
                        </div>`;

  if (fn.limitAtPoint) {
    html += `                        <div>
                            <p class="limit-subheading">Limit at a Point</p>
                            <div class="space-y-2 text-center text-lg text-zinc-200">
${fn.limitAtPoint.map(l => `                                <div data-katex="${l}"></div>`).join('\n')}
                            </div>
                            <p class="limit-blurb text-zinc-300 text-sm mt-3 text-center">${fn.limitAtPointBlurb}</p>
                        </div>`;
  }

  if (fn.generalLimit) {
    html += `                        <div>
                            <p class="limit-subheading">General Limit</p>
                            <div class="text-center text-lg text-zinc-200" data-katex="${fn.generalLimit}"></div>
                        </div>`;
  }

  html += `                        <p class="continuity-statement text-zinc-200 text-center text-base mt-4">${fn.continuityStatement}</p>`;
  return html;
}

const FUNCTIONS = [
  {
    id: 'cubic-x3', pageTitle: 'f(x) = x^3', heading: 'THE CUBIC FUNCTION', headerKatex: 'f(x) = x^3',
    graphs: ['y = x^3', 'y = 3x^2', 'y = 6x'],
    facts: [
      ['Domain', '(-\\infty, \\infty)', true], ['Range', '(-\\infty, \\infty)', true],
      ['x-intercepts', '(0, 0)', true], ['y-intercepts', '(0, 0)', true],
      ['Vertical Asymptotes', 'None'], ['Horizontal Asymptotes', 'None'],
      ['Continuity', 'Continuous for all real numbers'], ['Differentiability', 'Differentiable for all real numbers'],
    ],
    symmetry: { type: 'Odd', formula: 'f(-x) = -f(x)' },
    intro: 'The cubic function is our first example of a point of inflection. This point of inflection happens to also be a critical point, though that is not necessarily always the case. A function like <span data-katex="f(x) = x(x-1)(x-3)"></span> has a point of inflection which is not a critical point. This example is important because we have a critical point where the function is increasing at that critical point.',
    behavior: [
      ['Discontinuities', 'None'], ['Non-differentiability', 'None'],
      ['Absolute Maximum', 'None'], ['Absolute Minimum', 'None'],
      ['Relative Maximum', 'None'], ['Relative Minimum', 'None'],
      ['Increasing', '(-\\infty, \\infty)', true], ['Decreasing', 'None'],
      ['Concave Up', '(0, \\infty)', true], ['Concave Down', '(-\\infty, 0)', true],
      ['Inflection Points', '(0, 0)', true, true],
    ],
    endBehaviours: ['\\lim_{x \\to \\infty} x^3 = \\infty', '\\lim_{x \\to -\\infty} x^3 = -\\infty'],
    endBehaviourBlurb: 'The end behaviours grow without bound in opposite directions, so this function has no horizontal asymptote.',
    generalLimit: '\\lim_{x \\to a} x^3 = a^3',
    continuityStatement: 'This function is therefore continuous at all real numbers.',
    derivTitles: ['f(x) = x^3', "f'(x) = 3x^2", "f''(x) = 6x"],
    fChart: { segments: [{ pos: '25%', val: '−', vert: 'below' }, { pos: '75%', val: '+' }], points: [{ pos: '50%', label: '0', kind: 'filled' }] },
    fpChart: { uniform: '+' },
    fppChart: { segments: [{ pos: '25%', val: '−', vert: 'below' }, { pos: '75%', val: '+' }], points: [{ pos: '50%', label: '0', kind: 'filled' }] },
    fAnalysis: 'The original cubic passes through the origin. <span data-katex="f(x) < 0"></span> for <span data-katex="x < 0"></span> and <span data-katex="f(x) > 0"></span> for <span data-katex="x > 0"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> <span data-katex="(-\\infty, \\infty)"></span></p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Critical point at</strong> <span data-katex="x = 0"></span>: neither a relative max nor min — the function is increasing through the critical point.</p>',
    fppAnalysis: '<p><strong>Concave down:</strong> <span data-katex="(-\\infty, 0)"></span></p><p><strong>Concave up:</strong> <span data-katex="(0, \\infty)"></span></p><p><strong>Inflection point:</strong> <span data-katex="(0, 0)"></span></p>',
    integrals: ['\\int x^3 \\, dx = \\frac{x^4}{4} + C', '\\int_0^1 x^3 \\, dx = \\frac{1}{4}'],
  },
  {
    id: 'x-over-x', pageTitle: 'f(x) = \\frac{x}{x}', heading: '1 WITH A HOLE AT ZERO', headerKatex: 'f(x) = \\frac{x}{x}',
    graphs: [
      { latex: 'y = \\frac{x}{x}', points: [{ id: 'hole', latex: '(0, 1)', pointStyle: 'OPEN', color: '#f87171' }] },
      'y = 0',
      'y = 0',
    ],
    facts: [
      ['Domain', '(-\\infty, 0) \\cup (0, \\infty)', true], ['Range', '\\{1\\}', true],
      ['x-intercepts', 'None'], ['y-intercepts', 'None'],
      ['Vertical Asymptotes', 'None'], ['Horizontal Asymptotes', 'y = 1', true],
      ['Continuity', 'Removable discontinuity at x = 0'], ['Differentiability', 'Differentiable on its domain'],
    ],
    symmetry: { type: 'Even', formula: 'f(-x) = f(x)' },
    intro: 'This function looks like the constant function 1, but it is not. Its domain excludes zero. This is the simplest example of a removable discontinuity: the left- and right-hand limits at x = 0 both equal 1, but the function is undefined at that point.',
    behavior: [
      ['Discontinuities', 'Removable discontinuity at x = 0'], ['Non-differentiability', 'None on domain'],
      ['Absolute Maximum', '1 for all x in the domain'], ['Absolute Minimum', '1 for all x in the domain'],
      ['Relative Maximum', '1 for all x in the domain'], ['Relative Minimum', '1 for all x in the domain'],
      ['Increasing', 'None'], ['Decreasing', 'None'],
      ['Concave Up', 'None'], ['Concave Down', 'None'],
      ['Inflection Points', 'None', false, true],
    ],
    endBehaviours: ['\\lim_{x \\to \\infty} \\frac{x}{x} = 1', '\\lim_{x \\to -\\infty} \\frac{x}{x} = 1'],
    endBehaviourBlurb: 'Since the limit as x approaches ±∞ is 1, the function has a horizontal asymptote y = 1.',
    limitAtPoint: [
      '\\lim_{x \\to 0^+} \\frac{x}{x} = 1',
      '\\lim_{x \\to 0^-} \\frac{x}{x} = 1',
      'f(0) \\text{ is undefined (DNE)}',
    ],
    limitAtPointBlurb: 'The left- and right-hand limits both equal 1, but f(0) is undefined. This is a removable discontinuity at x = 0.',
    generalLimit: '\\lim_{x \\to a} \\frac{x}{x} = 1 \\text{ for } a \\neq 0',
    continuityStatement: 'This function is continuous on its domain, but has a removable discontinuity at x = 0.',
    derivTitles: ['f(x) = \\frac{x}{x}', "f'(x) = 0", "f''(x) = 0"],
    fChart: { uniform: '+' },
    fpChart: { uniform: '0' },
    fppChart: { uniform: '0' },
    fAnalysis: 'On its domain, <span data-katex="f(x) = 1"></span> everywhere — always positive.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> None</p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Derivative is zero</strong> on <span data-katex="(-\\infty, 0) \\cup (0, \\infty)"></span>.</p>',
    fppAnalysis: '<p><strong>Concave up:</strong> None</p><p><strong>Concave down:</strong> None</p><p><strong>Inflection points:</strong> None</p>',
    integrals: ['\\int \\frac{x}{x} \\, dx = x + C \\text{ on each interval of the domain}', '\\int_1^2 \\frac{x}{x} \\, dx = 1'],
  },
  {
    id: 'reciprocal', pageTitle: 'f(x) = \\frac{1}{x}', heading: 'THE RECIPROCAL FUNCTION', headerKatex: 'f(x) = \\frac{1}{x}',
    graphs: ['y = \\frac{1}{x}', 'y = -\\frac{1}{x^2}', 'y = \\frac{2}{x^3}'],
    facts: [
      ['Domain', '(-\\infty, 0) \\cup (0, \\infty)', true], ['Range', '(-\\infty, 0) \\cup (0, \\infty)', true],
      ['x-intercepts', 'None'], ['y-intercepts', 'None'],
      ['Vertical Asymptotes', 'x = 0', true], ['Horizontal Asymptotes', 'y = 0', true],
      ['Continuity', 'Infinite discontinuity at x = 0'], ['Differentiability', 'Differentiable on its domain'],
    ],
    symmetry: { type: 'Odd', formula: 'f(-x) = -f(x)' },
    intro: 'This is an important example of a function with no critical points. At x = 0 we have an infinite discontinuity: the limit from the right is +∞ and the limit from the left is −∞.',
    behavior: [
      ['Discontinuities', 'Infinite discontinuity at x = 0'], ['Non-differentiability', 'None on domain'],
      ['Absolute Maximum', 'None'], ['Absolute Minimum', 'None'],
      ['Relative Maximum', 'None'], ['Relative Minimum', 'None'],
      ['Increasing', 'None'], ['Decreasing', '(-\\infty, 0) \\cup (0, \\infty)', true],
      ['Concave Up', '(-\\infty, 0)', true], ['Concave Down', '(0, \\infty)', true],
      ['Inflection Points', 'None', false, true],
    ],
    endBehaviours: ['\\lim_{x \\to \\infty} \\frac{1}{x} = 0', '\\lim_{x \\to -\\infty} \\frac{1}{x} = 0'],
    endBehaviourBlurb: 'Since the limit as x approaches ±∞ is 0, the function has a horizontal asymptote y = 0.',
    limitAtPoint: [
      '\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty',
      '\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty',
      'f(0) \\text{ is undefined (DNE)}',
    ],
    limitAtPointBlurb: 'The one-sided limits are infinite and unequal, and f(0) is undefined. This is an infinite discontinuity at x = 0.',
    generalLimit: '\\lim_{x \\to a} \\frac{1}{x} = \\frac{1}{a} \\text{ for } a \\neq 0',
    continuityStatement: 'This function is continuous on its domain, but has an infinite discontinuity at x = 0.',
    derivTitles: ['f(x) = \\frac{1}{x}', "f'(x) = -\\frac{1}{x^2}", "f''(x) = \\frac{2}{x^3}"],
    fChart: { segments: [{ pos: '25%', val: '−', vert: 'below' }, { pos: '75%', val: '+' }], points: [{ pos: '50%', label: '0', kind: 'open' }] },
    fpChart: { uniform: '−' },
    fppChart: { segments: [{ pos: '25%', val: '+' }, { pos: '75%', val: '−', vert: 'below' }], points: [{ pos: '50%', label: '0', kind: 'open' }] },
    fAnalysis: '<span data-katex="f(x) < 0"></span> for <span data-katex="x < 0"></span> and <span data-katex="f(x) > 0"></span> for <span data-katex="x > 0"></span>. Undefined at <span data-katex="x = 0"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> None</p><p><strong>Intervals of decrease:</strong> <span data-katex="(-\\infty, 0) \\cup (0, \\infty)"></span></p><p><strong>Critical points:</strong> None</p>',
    fppAnalysis: '<p><strong>Concave up:</strong> <span data-katex="(-\\infty, 0)"></span></p><p><strong>Concave down:</strong> <span data-katex="(0, \\infty)"></span></p><p><strong>Inflection points:</strong> None</p>',
    integrals: ['\\int \\frac{1}{x} \\, dx = \\ln|x| + C', '\\int_1^e \\frac{1}{x} \\, dx = 1'],
  },
  {
    id: 'sign', pageTitle: 'f(x) = \\frac{|x|}{x}', heading: 'THE SIGN FUNCTION', headerKatex: 'f(x) = \\frac{|x|}{x}',
    graphs: [
      {
        expressions: [
          { id: 'pos', latex: 'y = 1 \\{x > 0\\}', color: '#b91c1c' },
          { id: 'neg', latex: 'y = -1 \\{x < 0\\}', color: '#b91c1c' },
        ],
        points: [
          { id: 'p1', latex: '(0, 1)', pointStyle: 'OPEN', color: '#f87171' },
          { id: 'p2', latex: '(0, -1)', pointStyle: 'OPEN', color: '#f87171' },
        ],
      },
      'y = 0',
      'y = 0',
    ],
    facts: [
      ['Domain', '(-\\infty, 0) \\cup (0, \\infty)', true], ['Range', '\\{-1, 1\\}', true],
      ['x-intercepts', 'None'], ['y-intercepts', 'None'],
      ['Vertical Asymptotes', 'None'], ['Horizontal Asymptotes', 'y = 1 and y = -1'],
      ['Continuity', 'Jump discontinuity at x = 0'], ['Differentiability', 'Differentiable on its domain; f\'(x) = 0 for x ≠ 0'],
    ],
    symmetry: { type: 'Odd', formula: 'f(-x) = -f(x)' },
    intro: 'This is an extremely important function. It has a jump discontinuity at x = 0, two distinct horizontal asymptotes, and illustrates how a value can be both a local maximum and local minimum on different parts of the domain.',
    behavior: [
      ['Discontinuities', 'Jump discontinuity at x = 0'], ['Non-differentiability', 'None on domain'],
      ['Absolute Maximum', '1 when x > 0'], ['Absolute Minimum', '-1 when x < 0'],
      ['Relative Maximum', '1 and -1 (both constant on their intervals)'], ['Relative Minimum', '1 and -1 (both constant on their intervals)'],
      ['Increasing', 'None'], ['Decreasing', 'None'],
      ['Concave Up', 'None'], ['Concave Down', 'None'],
      ['Inflection Points', 'None', false, true],
    ],
    endBehaviours: ['\\lim_{x \\to \\infty} \\frac{|x|}{x} = 1', '\\lim_{x \\to -\\infty} \\frac{|x|}{x} = -1'],
    endBehaviourBlurb: 'The function approaches y = 1 as x → ∞ and y = −1 as x → −∞, so it has two horizontal asymptotes.',
    limitAtPoint: [
      '\\lim_{x \\to 0^+} \\frac{|x|}{x} = 1',
      '\\lim_{x \\to 0^-} \\frac{|x|}{x} = -1',
      'f(0) \\text{ is undefined (DNE)}',
    ],
    limitAtPointBlurb: 'The left- and right-hand limits exist but are unequal, and f(0) is undefined. This is a jump discontinuity at x = 0.',
    generalLimit: 'f(x) = 1 \\text{ for } x > 0; \\; f(x) = -1 \\text{ for } x < 0',
    continuityStatement: 'This function is continuous on its domain, but has a jump discontinuity at x = 0.',
    derivTitles: ['f(x) = \\frac{|x|}{x}', "f'(x) = 0", "f''(x) = 0"],
    fChart: { segments: [{ pos: '25%', val: '−', vert: 'below' }, { pos: '75%', val: '+' }], points: [{ pos: '50%', label: '0', kind: 'open' }] },
    fpChart: { uniform: '0' },
    fppChart: { uniform: '0' },
    fAnalysis: '<span data-katex="f(x) = -1"></span> for <span data-katex="x < 0"></span> and <span data-katex="f(x) = 1"></span> for <span data-katex="x > 0"></span>.',
    fpAnalysis: '<p><strong>Intervals of increase:</strong> None</p><p><strong>Intervals of decrease:</strong> None</p><p><strong>Derivative is zero</strong> on each interval of the domain.</p>',
    fppAnalysis: '<p><strong>Concave up:</strong> None</p><p><strong>Concave down:</strong> None</p><p><strong>Inflection points:</strong> None</p>',
    integrals: ['\\text{Not integrable in the usual sense over intervals crossing } x = 0', '\\int_1^2 \\frac{|x|}{x} \\, dx = 1'],
  },
];

function renderPage(fn) {
  const factsHtml = fn.facts.map(([l, v, k]) => factCell(l, v, !!k)).join('\n') + '\n' + symmetryHtml(fn.symmetry);
  const behaviorHtml = fn.behavior.map(([l, v, k, full]) => behaviorCell(l, v, !!k, !!full)).join('\n');
  const integralsHtml = fn.integrals.map((tex, i) => {
    const label = i === 0 ? 'Indefinite Integral' : 'Definite Integral (example)';
    return `                        <div><p class="meta-label mb-1">${label}</p><div data-katex="${tex}"></div></div>`;
  }).join('\n');

  const analysis = (t) => t.startsWith('<p>') ? `<div class="chart-analysis">${t}</div>` : `<p class="chart-analysis">${t}</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fn.pageTitle} • Dr. W's Calculus Corner</title>
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
                    <div class="section-header"><h2 class="section-heading text-xl">Overview</h2></div>
                    <div class="section-body graph-facts-row">
                        <div class="w-full md:w-1/2 shrink-0">
                            <div class="graph-wrap-sm max-w-[22rem] mx-auto overflow-hidden rounded-xl border border-[#5c3838]">
                                <div id="graph-f-main" class="desmos-graph w-full h-full min-h-[12rem]"></div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 flex-1">
                            <div class="fact-pair">
${factsHtml}
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Description &amp; Behavior</h2></div>
                    <div class="section-body">
                        <p class="behavior-intro text-zinc-200 text-lg leading-relaxed mb-6">${fn.intro}</p>
                        <div class="behavior-grid text-sm text-zinc-300">
${behaviorHtml}
                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Limits and Continuity</h2></div>
                    <div class="section-body space-y-4">
${limitsHtml(fn)}
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Derivatives</h2></div>
                    <div class="section-body">
                        <div class="graph-trio">
                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="${fn.derivTitles[0]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#5c3838]">
                                    <div id="graph-f" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
${signChartHtml(fn.fChart)}
${analysis(fn.fAnalysis)}
                            </div>
                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="${fn.derivTitles[1]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#5c3838]">
                                    <div id="graph-fp" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
${signChartHtml(fn.fpChart)}
${analysis(fn.fpAnalysis)}
                            </div>
                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="${fn.derivTitles[2]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#5c3838]">
                                    <div id="graph-fpp" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
${signChartHtml(fn.fppChart)}
${analysis(fn.fppAnalysis)}
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Integrals</h2></div>
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
            bounds: ${JSON.stringify(fn.bounds || { left: -5, right: 5, bottom: -5, top: 5 })}
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