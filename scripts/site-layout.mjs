import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const BASE_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'layouts', 'base.html');

/** Function Zoo fingerprint — shared across sidebar nav and home dashboard card. */
export function zooIconSvg({ size = 18, strokeWidth = 2, className = '' } = {}) {
  const classAttr = className ? ` class="${className}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${classAttr}><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5c.5-2.5 1.5-4.5 4-6"/><path d="M8.5 16c0-3 1-5.5 2.5-7.5"/><path d="M15 5.5c1 1 2 2.5 2 4.5"/></svg>`;
}

export const ZOO_ICON_DASHBOARD = zooIconSvg({ className: 'w-5 h-5 text-red-400' });

const NAV_ICONS = {
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  courses: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  zoo: zooIconSvg(),
  visualizers: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  profile: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
};

export const NAV_LINKS = [
  { href: 'index.html', label: 'Home', icon: NAV_ICONS.home },
  { href: 'courses.html', label: 'Courses', icon: NAV_ICONS.courses },
  { href: 'zoo.html', label: 'Function Zoo', icon: NAV_ICONS.zoo },
  { href: 'visualizers.html', label: 'Visualizers', icon: NAV_ICONS.visualizers },
  { href: 'profile.html', label: 'My Profile', icon: NAV_ICONS.profile },
];

/** Hub page main titles — icon key matches NAV_ICONS, synced into page-hero h1 headings. */
export const PAGE_TITLES = {
  'index.html': { iconKey: 'home', title: 'Welcome back' },
  'courses.html': { iconKey: 'courses', title: 'Courses' },
  'zoo.html': { iconKey: 'zoo', title: 'Function Zoo' },
  'visualizers.html': { iconKey: 'visualizers', title: 'Visualizers' },
  'profile.html': { iconKey: 'profile', title: 'My Profile' },
};

/** Main page title with the same icon used in the sidebar nav. */
export function renderPageTitle(iconKey, titleText) {
  const icon = NAV_ICONS[iconKey];
  if (!icon) {
    throw new Error(`Unknown nav icon key: ${iconKey}`);
  }
  return `<h1 class="section-heading page-title-heading"><span class="page-title-icon nav-icon" aria-hidden="true">${icon}</span>${titleText}</h1>`;
}

/** Which nav href should be active for a given docs HTML filename. */
export function activeNavHref(filename) {
  if (filename === 'index.html') return 'index.html';
  if (filename === 'courses.html' || filename.startsWith('course-')) return 'courses.html';
  if (filename === 'zoo.html' || filename.startsWith('function-')) return 'zoo.html';
  if (filename === 'visualizers.html' || filename.startsWith('visualizer-')) return 'visualizers.html';
  if (filename === 'profile.html') return 'profile.html';
  return null;
}

const SIDEBAR_TOGGLE = `        <div class="sidebar-toggle-float" aria-hidden="false">
            <button type="button" id="sidebar-expand" class="sidebar-toggle sidebar-expand-btn" aria-label="Open navigation" title="Open navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <button type="button" id="sidebar-collapse" class="sidebar-toggle sidebar-collapse-btn" aria-label="Close navigation" title="Close navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
        </div>`;

/** Page layout opening through <main>, with sidebar nav icons and active state. */
export function renderSidebarShell(activeHref) {
  return `    <div class="page-layout flex">
${SIDEBAR_TOGGLE}
        <aside id="sidebar" class="sidebar">
${renderSidebarNav(activeHref)}
        </aside>

        <main class="main-content flex-1 p-8">`;
}

/** Full <nav class="sidebar-nav">…</nav> block with the correct active link. */
export function renderSidebarNav(activeHref) {
  const links = NAV_LINKS.map((link) => {
    const active = link.href === activeHref ? ' nav-active' : '';
    return `                <a href="${link.href}" class="nav-item${active} flex items-center gap-x-3 px-4 py-3 rounded-2xl"><span class="nav-icon" aria-hidden="true">${link.icon}</span>${link.label}</a>`;
  }).join('\n');

  return `            <nav class="sidebar-nav space-y-1 text-sm">\n${links}\n            </nav>`;
}

/** Footer HTML extracted from layouts/base.html (source of truth). */
export function loadSiteFooter() {
  const html = readFileSync(BASE_PATH, 'utf8');
  const match = html.match(/<!-- SITE_FOOTER -->\r?\n([\s\S]*?)\r?\n\s*<!-- \/SITE_FOOTER -->/);
  if (!match) {
    throw new Error('SITE_FOOTER markers not found in layouts/base.html');
  }
  return match[1];
}