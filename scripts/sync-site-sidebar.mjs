import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { activeNavHref, renderSidebarNav } from './site-layout.mjs';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const NAV_REGEX = /<nav class="sidebar-nav[\s\S]*?<\/nav>/;

let patched = 0;

for (const file of readdirSync(DOCS).filter((f) => f.endsWith('.html'))) {
  const path = join(DOCS, file);
  let html = readFileSync(path, 'utf8');
  const original = html;

  if (!NAV_REGEX.test(html)) {
    console.warn('Skipped', file, '(no sidebar nav found)');
    continue;
  }

  const activeHref = activeNavHref(file);
  const nav = renderSidebarNav(activeHref);
  html = html.replace(NAV_REGEX, nav);

  if (html !== original) {
    writeFileSync(path, html, 'utf8');
    patched++;
    console.log('Synced sidebar →', file, activeHref ? `(active: ${activeHref})` : '');
  }
}

console.log(`Sidebar sync complete (${patched} file${patched === 1 ? '' : 's'} updated).`);