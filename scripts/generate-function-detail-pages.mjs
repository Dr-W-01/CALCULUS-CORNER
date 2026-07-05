import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { FUNCTIONS } from './function-detail-data.mjs';
import { loadSiteFooter, renderSidebarShell } from './site-layout.mjs';

const SITE_FOOTER = loadSiteFooter();

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

const SIDEBAR = renderSidebarShell('zoo.html');

function signChartHtml(chart) {
  if (!chart || chart.na) {
    return `                                <p class="chart-analysis text-zinc-500">Sign chart not applicable.</p>`;
  }
  const renderPoints = (points) => (points || []).map(p => {
    const cls = p.kind === 'filled' ? 'sign-line-point filled' : 'sign-line-point open';
    const num = p.label ? `                                        <span class="sign-line-number" style="left: ${p.pos};">${p.label}</span>\n` : '';
    return `${num}                                        <span class="${cls}" style="left: ${p.pos};"></span>`;
  }).join('\n');
  if (chart.uniform) {
    const vert = chart.uniform === '−' || chart.uniform === '-' ? 'below' : 'above';
    const val = chart.uniform === '-' ? '−' : chart.uniform;
    const pts = renderPoints(chart.points);
    return `                                <div class="sign-line-wrap">
                                    <div class="sign-line-axis">
                                        <span class="sign-line-sign ${vert}" style="left: 50%;">${val}</span>
${pts}
                                    </div>
                                </div>`;
  }
  const signs = chart.segments.map(s =>
    `                                        <span class="sign-line-sign ${s.vert || 'above'}" style="left: ${s.pos};">${s.val}</span>`
  ).join('\n');
  const pts = renderPoints(chart.points);
  return `                                <div class="sign-line-wrap">
                                    <div class="sign-line-axis">
${signs}
${pts}
                                    </div>
                                </div>`;
}

function factCell(label, value, katex = false, suffix = '') {
  if (katex && suffix) {
    return `                                <div><p class="fact-label">${label}</p><div class="fact-value"><span data-katex="${value}"></span>${suffix}</div></div>`;
  }
  if (katex) return `                                <div><p class="fact-label">${label}</p><div class="fact-value" data-katex="${value}"></div></div>`;
  return `                                <div><p class="fact-label">${label}</p><div class="fact-value">${value}</div></div>`;
}

function symmetryHtml(sym) {
  if (!sym || sym.type === 'None') {
    return `                                <div class="symmetry-fact" style="grid-column: 1 / -1;"><p class="fact-label">SYMMETRY</p><div class="symmetry-value"><span class="symmetry-type">None</span></div></div>`;
  }
  const extra = sym.note ? ` <span class="text-zinc-400 text-sm">(${sym.note})</span>` : '';
  return `                                <div class="symmetry-fact" style="grid-column: 1 / -1;"><p class="fact-label">SYMMETRY</p><div class="symmetry-value"><span class="symmetry-type">${sym.type}</span>${extra}<div class="symmetry-formula" data-katex="${sym.formula}"></div></div></div>`;
}

function behaviorCell(label, value, katex = false, full = false, suffix = '') {
  let inner;
  if (katex && suffix) inner = `<span data-katex="${value}"></span>${suffix}`;
  else if (katex) inner = `<span data-katex="${value}"></span>`;
  else inner = value;
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
                            <p class="limit-blurb mt-3 text-center">${fn.endBehaviourBlurb}</p>
                        </div>`;

  if (fn.limitAtPoint) {
    html += `                        <div>
                            <p class="limit-subheading">Limit at a Point</p>
                            <div class="space-y-2 text-center text-lg text-zinc-200">
${fn.limitAtPoint.map(l => `                                <div data-katex="${l}"></div>`).join('\n')}
                            </div>
                            <p class="limit-blurb mt-3 text-center">${fn.limitAtPointBlurb}</p>
                        </div>`;
  }

  if (fn.generalLimit) {
    html += `                        <div>
                            <p class="limit-subheading">General Limit</p>
                            <div class="text-center text-lg text-zinc-200" data-katex="${fn.generalLimit}"></div>
                        </div>`;
  }

  html += `                        <p class="continuity-statement text-center mt-4">${fn.continuityStatement || 'Continuity information is not applicable for this expression.'}</p>`;
  return html;
}

function valHtml(value, katex = false, suffix = '') {
  if (katex && suffix) return `<span data-katex="${value}"></span>${suffix}`;
  return katex ? `<span data-katex="${value}"></span>` : value;
}

function fSignAnalysisHtml(sign) {
  if (!sign) return '<p class="chart-analysis">Sign analysis not applicable.</p>';
  const lines = [];
  (sign.above || []).forEach(iv => {
    lines.push(`f(x) is above the x-axis on the interval ${valHtml(iv, true)}`);
  });
  (sign.below || []).forEach(iv => {
    lines.push(`f(x) is below the x-axis on the interval ${valHtml(iv, true)}`);
  });
  (sign.intercepts || []).forEach(pt => {
    lines.push(`f(x) has intercepts ${valHtml(pt, true)}`);
  });
  (sign.undefinedAt || []).forEach(x => {
    lines.push(`f(x) is not defined at x = ${valHtml(x, true)}`);
  });
  if (!lines.length) return '<p class="chart-analysis">No sign information available.</p>';
  return `<div class="chart-analysis">${lines.map(line => `<p>${line}</p>`).join('')}</div>`;
}

function fpAnalysisHtml(info) {
  if (!info) return '<p class="chart-analysis">Derivative analysis not applicable.</p>';
  return `<div class="chart-analysis">
                                    <p><strong>Critical points:</strong> ${valHtml(info.criticalPoints, info.criticalKatex)}</p>
                                    <p><strong>Intervals of increase:</strong> ${valHtml(info.increasing, info.increasingKatex)}</p>
                                    <p><strong>Intervals of decrease:</strong> ${valHtml(info.decreasing, info.decreasingKatex)}</p>
                                </div>`;
}

function fppAnalysisHtml(info) {
  if (!info) return '<p class="chart-analysis">Second derivative analysis not applicable.</p>';
  return `<div class="chart-analysis">
                                    <p><strong>Concave up:</strong> ${valHtml(info.concaveUp, info.concaveUpKatex)}</p>
                                    <p><strong>Concave down:</strong> ${valHtml(info.concaveDown, info.concaveDownKatex)}</p>
                                    <p><strong>Inflection points:</strong> ${valHtml(info.inflection, info.inflectionKatex)}</p>
                                </div>`;
}

function renderPage(fn) {
  const factsHtml = fn.facts.map(([l, v, k, s]) => factCell(l, v, !!k, s || '')).join('\n') + '\n' + symmetryHtml(fn.symmetry);
  const behaviorHtml = fn.behavior.map(([l, v, k, full, s]) => behaviorCell(l, v, !!k, !!full, s || '')).join('\n');
  const integralsHtml = fn.integrals.map((tex, i) => {
    const label = i === 0 ? 'Indefinite Integral' : 'Definite Integral (example)';
    return `                        <div><p class="meta-label mb-1">${label}</p><div data-katex="${tex}"></div></div>`;
  }).join('\n');

  const blurb = fn.derivativesBlurb
    ? `                        <div class="derivatives-summary">
                            <h3 class="derivatives-summary-heading">What the Derivatives Tell Us</h3>
                            <p class="derivatives-summary-text">${fn.derivativesBlurb}</p>
                        </div>`
    : '';

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
                            <div class="graph-wrap-sm${fn.interactive ? ' graph-wrap-interactive' : ''} max-w-[22rem] mx-auto overflow-hidden rounded-xl border border-[#5c3838]">
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
                        <p class="behavior-intro mb-6">${fn.intro}</p>
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
${fSignAnalysisHtml(fn.fSign)}
                            </div>
                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="${fn.derivTitles[1]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#5c3838]">
                                    <div id="graph-fp" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
${signChartHtml(fn.fpChart)}
${fpAnalysisHtml(fn.fpInfo)}
                            </div>
                            <div class="deriv-col">
                                <div class="deriv-title" data-katex="${fn.derivTitles[2]}"></div>
                                <div class="graph-wrap-sm overflow-hidden rounded-xl border border-[#5c3838]">
                                    <div id="graph-fpp" class="desmos-graph w-full h-full min-h-[8rem]"></div>
                                </div>
${signChartHtml(fn.fppChart)}
${fppAnalysisHtml(fn.fppInfo)}
                            </div>
                        </div>
${blurb}
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Integrals</h2></div>
                    <div class="section-body space-y-4 text-lg text-zinc-200 text-center">
${integralsHtml}
                    </div>
                </section>
            </div>

${SITE_FOOTER}
        </main>
    </div>

    <script src="js/site.js"></script>
    <script src="js/function-detail.js"></script>
    <script>
        FunctionDetail.init({
            headerKatex: ${JSON.stringify(fn.headerKatex)},
            graphs: ${JSON.stringify(fn.graphs)},
            bounds: ${JSON.stringify(fn.bounds || { left: -5, right: 5, bottom: -5, top: 5 })}${fn.interactive ? ',\n            interactive: true' : ''}
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

console.log(`Generated ${FUNCTIONS.length} function detail pages.`);