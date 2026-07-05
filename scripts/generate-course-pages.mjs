import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { COURSES } from './course-data.mjs';
import { loadSiteFooter, renderSidebarShell, renderPageTitle } from './site-layout.mjs';

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

function pageShell({ title, activeHref, mainContent }) {
  const sidebar = renderSidebarShell(activeHref);
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} • Dr. W's Calculus Corner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/site.css">
</head>
<body>
${TOP_BAR}

${sidebar}
${mainContent}

${SITE_FOOTER}
        </main>
    </div>
    <script src="js/site.js"></script>
</body>
</html>`;
}

function renderCoursesLanding() {
  const cards = COURSES.map(
    (c) => `                    <a href="course-${c.id}.html" class="course-card dashboard-card block">
                        <h2 class="course-card-title">${c.title}</h2>
                        <p class="course-card-desc">${c.landingDescription}</p>
                        <span class="course-card-enter">Enter course →</span>
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

                <div class="courses-grid">
${cards}
                </div>
            </div>`;

  return pageShell({
    title: 'Courses',
    activeHref: 'courses.html',
    mainContent: main,
  });
}

function renderCoursePage(course) {
  const topics = course.topics
    .map(
      (name) => `                        <li class="course-topic-item">
                            <span class="course-topic-name">${name}</span>
                            <div class="course-topic-actions">
                                <a href="course-${course.id}-definitions.html" class="course-topic-link">Definitions</a>
                                <a href="course-${course.id}-problems.html" class="course-topic-link course-topic-link--gold">Problems</a>
                            </div>
                        </li>`,
    )
    .join('\n');

  const main = `            <div class="w-full max-w-5xl mx-auto space-y-8">
                <header class="text-center">
                    <a href="courses.html" class="text-sm text-zinc-500 hover:text-red-400 mb-4 inline-block">&larr; Back to Courses</a>
                    <h1 class="text-2xl font-bold tracking-wide text-[#c45050] mb-4">${course.title.toUpperCase()}</h1>
                </header>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">About This Course</h2></div>
                    <div class="section-body">
                        <p class="exotic-description">${course.courseDescription}</p>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Topics</h2></div>
                    <div class="section-body">
                        <ul class="course-topic-list">
${topics}
                        </ul>
                    </div>
                </section>
            </div>`;

  return pageShell({
    title: course.title,
    activeHref: 'courses.html',
    mainContent: main,
  });
}

function renderPlaceholder(course, kind) {
  const isDefinitions = kind === 'definitions';
  const label = isDefinitions ? 'Definitions' : 'Problems';
  const blurb = isDefinitions
    ? 'Topic definitions and reference sheets will appear here.'
    : 'Practice problems and worked examples will appear here.';

  const main = `            <div class="w-full max-w-3xl mx-auto space-y-8">
                <header class="text-center">
                    <a href="course-${course.id}.html" class="text-sm text-zinc-500 hover:text-red-400 mb-4 inline-block">&larr; Back to ${course.title}</a>
                    <h1 class="text-2xl font-bold tracking-wide text-[#c45050] mb-4">${course.title.toUpperCase()} — ${label.toUpperCase()}</h1>
                </header>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Coming Soon</h2></div>
                    <div class="section-body text-center">
                        <p class="text-xl font-semibold text-white mb-3">Coming Soon</p>
                        <p class="text-zinc-400 text-sm leading-relaxed">${blurb}</p>
                    </div>
                </section>
            </div>`;

  return pageShell({
    title: `${course.title} — ${label}`,
    activeHref: 'courses.html',
    mainContent: main,
  });
}

writeFileSync(join(DOCS, 'courses.html'), renderCoursesLanding(), 'utf8');
console.log('Wrote docs/courses.html');

for (const course of COURSES) {
  writeFileSync(join(DOCS, `course-${course.id}.html`), renderCoursePage(course), 'utf8');
  console.log('Wrote', `course-${course.id}.html`);

  writeFileSync(
    join(DOCS, `course-${course.id}-definitions.html`),
    renderPlaceholder(course, 'definitions'),
    'utf8',
  );
  console.log('Wrote', `course-${course.id}-definitions.html`);

  writeFileSync(
    join(DOCS, `course-${course.id}-problems.html`),
    renderPlaceholder(course, 'problems'),
    'utf8',
  );
  console.log('Wrote', `course-${course.id}-problems.html`);
}

console.log(`Generated Courses section (${1 + COURSES.length * 3} pages).`);