import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { activeNavHref, renderSidebarNav, navPrefixForPath } from './site-layout.mjs';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const NAV_REGEX = /<nav class="sidebar-nav[\s\S]*?<\/nav>/;

function listHtmlFiles(dir, relativeBase = '') {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = relativeBase ? `${relativeBase}/${entry.name}` : entry.name;
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listHtmlFiles(abs, rel));
    } else if (entry.name.endsWith('.html')) {
      files.push({ rel, abs });
    }
  }
  return files;
}

let patched = 0;

for (const { rel, abs } of listHtmlFiles(DOCS)) {
  let html = readFileSync(abs, 'utf8');
  const original = html;

  if (!NAV_REGEX.test(html)) {
    console.warn('Skipped', rel, '(no sidebar nav found)');
    continue;
  }

  const activeHref = activeNavHref(rel);
  const nav = renderSidebarNav(activeHref, navPrefixForPath(rel));
  html = html.replace(NAV_REGEX, nav);

  if (html !== original) {
    writeFileSync(abs, html, 'utf8');
    patched++;
    console.log('Synced sidebar →', rel, activeHref ? `(active: ${activeHref})` : '');
  }
}

console.log(`Sidebar sync complete (${patched} file${patched === 1 ? '' : 's'} updated).`);