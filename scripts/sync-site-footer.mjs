import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadSiteFooter } from './site-layout.mjs';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');
const FOOTER = loadSiteFooter();

const FOOTER_REGEX = /\s*<footer class="site-footer"[\s\S]*?<\/footer>\s*/;
const INSERT_BEFORE = /(\s*<script src="js\/site\.js"><\/script>)/;

let patched = 0;

for (const file of readdirSync(DOCS).filter((f) => f.endsWith('.html'))) {
  const path = join(DOCS, file);
  let html = readFileSync(path, 'utf8');
  const original = html;

  html = html.replace(FOOTER_REGEX, '\n');

  if (!html.includes('id="site-footer"')) {
    if (!INSERT_BEFORE.test(html)) {
      console.warn('Skipped', file, '(no site.js script tag found)');
      continue;
    }
    html = html.replace(INSERT_BEFORE, `\n${FOOTER}\n$1`);
  }

  if (html !== original) {
    writeFileSync(path, html, 'utf8');
    patched++;
    console.log('Synced footer →', file);
  }
}

console.log(`Footer sync complete (${patched} file${patched === 1 ? '' : 's'} updated).`);