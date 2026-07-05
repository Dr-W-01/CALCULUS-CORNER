import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { COURSES, SECTION_TILES } from './course-data.mjs';
import { loadSiteFooter, renderSidebarShell, renderPageTitle, navPrefixForPath } from './site-layout.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS = join(__dirname, '..', 'docs');
const SITE_FOOTER = loadSiteFooter();

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

function pageShell({ title, activeHref, mainContent, assetPrefix = '', extraScripts = '', navPrefix = '' }) {
  const sidebar = renderSidebarShell(activeHref, navPrefix);
  const cssHref = `${assetPrefix}css/site.css`;
  const siteJs = `${assetPrefix}js/site.js`;
  const indexHref = `${assetPrefix}index.html`;

  const topBar = TOP_BAR.replace('href="index.html"', `href="${indexHref}"`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} • Dr. W's Calculus Corner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="${cssHref}">
</head>
<body>
${topBar}

${sidebar}
${mainContent}

${SITE_FOOTER}
        </main>
    </div>
    <script src="${siteJs}"></script>${extraScripts}
</body>
</html>`;
}

function renderAccordionItems(items) {
  return items
    .map(
      (item) => `                        <details class="course-accordion-item">
                            <summary class="course-accordion-trigger">${item.summary}</summary>
                            <div class="course-accordion-panel">
                                <p>${item.body}</p>
                            </div>
                        </details>`,
    )
    .join('\n');
}

function renderCoursesLanding() {
  const cards = COURSES.map(
    (c) => `                    <a href="course-${c.id}.html" class="course-card zoo-card block">
                        <div class="course-card-visual ${c.visualClass}" aria-hidden="true"></div>
                        <div class="course-card-body">
                            <h2 class="course-card-title zoo-card-title">${c.title.toUpperCase()}</h2>
                            <p class="course-card-desc zoo-card-desc">${c.landingDescription}</p>
                        </div>
                    </a>`,
  ).join('\n');

  const main = `            <div class="page-content-full space-y-8">
                <header class="page-hero content-card">
                    <div class="section-header">
                        ${renderPageTitle('courses', 'Courses')}
                    </div>
                    <div class="section-body">
                        <p>Structured lessons across precalculus and calculus. Choose a course below to explore topics, definitions, and practice problems.</p>
                    </div>
                </header>

                <section class="courses-page-section" aria-label="Course catalog">
                    <div class="courses-grid">
${cards}
                    </div>
                </section>
            </div>`;

  return pageShell({
    title: 'Courses',
    activeHref: 'courses.html',
    mainContent: main,
  });
}

function renderCoursePage(course) {
  const tiles = SECTION_TILES.map(
    (section) => `                    <a href="course-${course.id}/${section.id}.html" class="course-section-tile zoo-card block">
                        <div class="course-tile-visual ${section.visualClass}" aria-hidden="true"></div>
                        <div class="course-tile-body">
                            <h2 class="course-tile-title zoo-card-title">${section.title.toUpperCase()}</h2>
                            <p class="course-tile-desc zoo-card-desc">${section.description}</p>
                        </div>
                    </a>`,
  ).join('\n');

  const main = `            <div class="page-content-full space-y-8">
                <p class="text-center mb-0">
                    <a href="courses.html" class="text-sm text-zinc-500 hover:text-red-400 inline-block">&larr; Back to Courses</a>
                </p>

                <header class="page-hero content-card">
                    <div class="section-header">
                        <h1 class="section-heading text-xl">${course.title.toUpperCase()}</h1>
                    </div>
                    <div class="section-body">
                        <p>${course.courseDescription}</p>
                    </div>
                </header>

                <section class="courses-page-section" aria-label="Course sections">
                    <div class="course-section-tiles-grid">
${tiles}
                    </div>
                </section>
            </div>`;

  return pageShell({
    title: course.title,
    activeHref: 'courses.html',
    mainContent: main,
  });
}

function renderSectionPage(course, sectionId) {
  const section = SECTION_TILES.find((s) => s.id === sectionId);
  const items = course.accordion[sectionId];
  const accordion = renderAccordionItems(items);
  const intro =
    sectionId === 'topics'
      ? 'Expand a unit below to preview lesson outlines. Full content coming soon.'
      : sectionId === 'definitions'
        ? 'Expand a term below to read a short reference definition. Full glossary coming soon.'
        : 'Expand a problem set below to see what will be included. Full problem sets coming soon.';

  const main = `            <div class="page-content-full space-y-8">
                <p class="text-center mb-0">
                    <a href="../course-${course.id}.html" class="text-sm text-zinc-500 hover:text-red-400 inline-block">&larr; Back to ${course.title}</a>
                </p>

                <header class="page-hero content-card">
                    <div class="section-header">
                        <h1 class="section-heading text-xl">${course.title.toUpperCase()} — ${section.title.toUpperCase()}</h1>
                    </div>
                    <div class="section-body">
                        <p>${intro}</p>
                    </div>
                </header>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">${section.title}</h2></div>
                    <div class="section-body">
                        <div class="course-accordion">
${accordion}
                        </div>
                    </div>
                </section>
            </div>`;

  const extraScripts = '\n    <script src="../js/course-accordion.js"></script>';

  return pageShell({
    title: `${course.title} — ${section.title}`,
    activeHref: 'courses.html',
    mainContent: main,
    assetPrefix: '../',
    navPrefix: '../',
    extraScripts,
  });
}

writeFileSync(join(DOCS, 'courses.html'), renderCoursesLanding(), 'utf8');
console.log('Wrote docs/courses.html');

for (const course of COURSES) {
  writeFileSync(join(DOCS, `course-${course.id}.html`), renderCoursePage(course), 'utf8');
  console.log('Wrote', `course-${course.id}.html`);

  const courseDir = join(DOCS, `course-${course.id}`);
  mkdirSync(courseDir, { recursive: true });

  for (const section of SECTION_TILES) {
    const path = join(courseDir, `${section.id}.html`);
    writeFileSync(path, renderSectionPage(course, section.id), 'utf8');
    console.log('Wrote', `course-${course.id}/${section.id}.html`);
  }
}

console.log(`Generated Courses section (${1 + COURSES.length * (1 + SECTION_TILES.length)} pages).`);