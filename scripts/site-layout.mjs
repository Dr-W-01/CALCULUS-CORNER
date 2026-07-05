import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const BASE_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'layouts', 'base.html');

/** Function Zoo bird — shared across sidebar nav and home dashboard card. */
export function zooIconSvg({ size = 18, strokeWidth = 2, className = '' } = {}) {
  const classAttr = className ? ` class="${className}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${classAttr}><path d="M16 7h.01"/><path d="M3 7h3l3-4h4l2 3h3"/><path d="M4 7v9"/><path d="M20 7v9"/><path d="M7 16v5"/><path d="M17 16v5"/></svg>`;
}

export const ZOO_ICON_DASHBOARD = zooIconSvg({ className: 'w-5 h-5 text-red-400' });

const NAV_ICONS = {
  home: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  courses: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  zoo: zooIconSvg(),
  visualizers: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  profile: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
};

export const NAV_LINKS = [
  { href: 'index.html', label: 'Home', icon: NAV_ICONS.home },
  { href: 'courses.html', label: 'Courses', icon: NAV_ICONS.courses },
  { href: 'zoo.html', label: 'Function Zoo', icon: NAV_ICONS.zoo },
  { href: 'visualizers.html', label: 'Visualizers', icon: NAV_ICONS.visualizers },
  { href: 'profile.html', label: 'My Profile', icon: NAV_ICONS.profile },
];

/** Which nav href should be active for a given docs HTML filename. */
export function activeNavHref(filename) {
  if (filename === 'index.html') return 'index.html';
  if (filename === 'courses.html') return 'courses.html';
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