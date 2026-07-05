import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { PAGE_TITLES, renderPageTitle } from './site-layout.mjs';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const TITLE_REGEX = /<h1 class="section-heading[^"]*">[\s\S]*?<\/h1>/;

let patched = 0;

for (const [filename, { iconKey, title, sizeClass }] of Object.entries(PAGE_TITLES)) {
  const path = join(DOCS, filename);
  let html = readFileSync(path, 'utf8');
  const original = html;
  const replacement = renderPageTitle(iconKey, title, sizeClass);

  if (!TITLE_REGEX.test(html)) {
    console.warn('Skipped', filename, '(no page title h1 found)');
    continue;
  }

  html = html.replace(TITLE_REGEX, replacement);

  if (html !== original) {
    writeFileSync(path, html, 'utf8');
    patched++;
    console.log('Synced page title →', filename);
  }
}

console.log(`Page title sync complete (${patched} file${patched === 1 ? '' : 's'} updated).`);