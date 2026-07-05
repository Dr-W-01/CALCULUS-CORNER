import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadSiteFooter } from './site-layout.mjs';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const FOOTER = loadSiteFooter();

const FOOTER_REGEX = /\s*<footer class="site-footer"[\s\S]*?<\/footer>\s*/g;
const INSERT_BEFORE_MAIN_CLOSE = /(\n\s*<\/main>)/;

let patched = 0;

for (const file of readdirSync(DOCS).filter((f) => f.endsWith('.html'))) {
  const path = join(DOCS, file);
  let html = readFileSync(path, 'utf8');
  const original = html;

  html = html.replace(FOOTER_REGEX, '\n');

  if (!INSERT_BEFORE_MAIN_CLOSE.test(html)) {
    console.warn('Skipped', file, '(no </main> tag found)');
    continue;
  }
  html = html.replace(INSERT_BEFORE_MAIN_CLOSE, `\n${FOOTER}$1`);

  if (html !== original) {
    writeFileSync(path, html, 'utf8');
    patched++;
    console.log('Synced footer →', file);
  }
}

console.log(`Footer sync complete (${patched} file${patched === 1 ? '' : 's'} updated).`);