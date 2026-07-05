import { writeFileSync, unlinkSync, existsSync } from 'fs';
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
  const topics = course.topics
    .map(
      (topic) => `                            <li class="course-toc-item">
                                <a href="${topic.href}" class="course-toc-link">${topic.name}</a>
                            </li>`,
    )
    .join('\n');

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

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Topics</h2></div>
                    <div class="section-body">
                        <p class="course-section-intro">Table of contents — topic pages coming soon.</p>
                        <ul class="course-toc-list">
${topics}
                        </ul>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Definitions</h2></div>
                    <div class="section-body course-placeholder-body">
                        <p class="course-placeholder-title">Coming Soon</p>
                        <p class="course-placeholder-text">Key definitions and reference sheets for this course will appear here.</p>
                    </div>
                </section>

                <section class="content-card">
                    <div class="section-header"><h2 class="section-heading text-xl">Problems</h2></div>
                    <div class="section-body course-placeholder-body">
                        <p class="course-placeholder-title">Coming Soon</p>
                        <p class="course-placeholder-text">Practice problems and worked examples for this course will appear here.</p>
                    </div>
                </section>
            </div>`;

  return pageShell({
    title: course.title,
    activeHref: 'courses.html',
    mainContent: main,
  });
}

writeFileSync(join(DOCS, 'courses.html'), renderCoursesLanding(), 'utf8');
console.log('Wrote docs/courses.html');

for (const course of COURSES) {
  writeFileSync(join(DOCS, `course-${course.id}.html`), renderCoursePage(course), 'utf8');
  console.log('Wrote', `course-${course.id}.html`);

  for (const suffix of ['definitions', 'problems']) {
    const legacy = join(DOCS, `course-${course.id}-${suffix}.html`);
    if (existsSync(legacy)) {
      unlinkSync(legacy);
      console.log('Removed legacy', `course-${course.id}-${suffix}.html`);
    }
  }
}

console.log(`Generated Courses section (${1 + COURSES.length} pages).`);