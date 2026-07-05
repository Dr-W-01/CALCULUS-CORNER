import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ZOO_ICON_DASHBOARD } from './site-layout.mjs';

const INDEX_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'index.html');

const ZOO_CARD_SVG_REGEX =
  /(<a href="zoo\.html" class="dashboard-card[\s\S]*?<div class="w-10 h-10[^"]*">\s*)<svg[\s\S]*?<\/svg>/;

let html = readFileSync(INDEX_PATH, 'utf8');
const original = html;

if (!ZOO_CARD_SVG_REGEX.test(html)) {
  console.error('Could not find Function Zoo dashboard card SVG in docs/index.html');
  process.exit(1);
}

html = html.replace(ZOO_CARD_SVG_REGEX, `$1${ZOO_ICON_DASHBOARD}`);

if (html === original) {
  console.log('Function Zoo home card icon already up to date.');
} else {
  writeFileSync(INDEX_PATH, html, 'utf8');
  console.log('Updated Function Zoo icon on docs/index.html');
}