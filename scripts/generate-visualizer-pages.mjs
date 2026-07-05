import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { VISUALIZERS } from './visualizer-detail-data.mjs';
import { loadSiteFooter, renderSidebarShell } from './site-layout.mjs';

const SITE_FOOTER = loadSiteFooter();
const DESMOS_API = '    <script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>';

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

const SIDEBAR = renderSidebarShell('visualizers.html');

function renderPage(v) {
  const initConfig = JSON.stringify({
    stateFile: v.stateFile,
    bounds: v.bounds,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${v.pageTitle} • Dr. W's Calculus Corner</title>
    <script src="https://cdn.tailwindcss.com"></script>
${DESMOS_API}
    <link rel="stylesheet" href="css/site.css">
</head>
<body>
${TOP_BAR}

${SIDEBAR}
            <div class="w-full max-w-5xl mx-auto space-y-8">
                <header class="text-center">
                    <a href="visualizers.html" class="text-sm text-zinc-500 hover:text-red-400 mb-4 inline-block">&larr; Back to Visualizers</a>
                    <h1 class="text-2xl font-bold tracking-wide text-[#c45050] mb-4">${v.heading}</h1>
                </header>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Description</h2></div>
                    <div class="section-body">
                        <p class="exotic-description">${v.description}</p>
                    </div>
                </section>

                <section class="content-card exotic-graph-card">
                    <div class="section-body exotic-graph-body">
                        <p class="exotic-graph-hint">Scroll to zoom &middot; Drag to pan &middot; Use sliders to explore</p>
                        <div class="visualizer-page-graph-wrap">
                            <div id="visualizer-graph" class="desmos-explorer"></div>
                        </div>
                    </div>
                </section>
            </div>

${SITE_FOOTER}
        </main>
    </div>

    <script src="js/site.js"></script>
    <script src="js/visualizer-detail.js"></script>
    <script>
        VisualizerDetail.init(${initConfig});
    </script>
</body>
</html>`;
}

for (const v of VISUALIZERS) {
  const path = join(DOCS, `visualizer-${v.id}.html`);
  writeFileSync(path, renderPage(v), 'utf8');
  console.log('Wrote', path, '→ Desmos API +', v.stateFile);
}

console.log(`Generated ${VISUALIZERS.length} visualizer detail pages.`);