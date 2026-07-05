import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const BASE_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'layouts', 'base.html');

/** Footer HTML extracted from layouts/base.html (source of truth). */
export function loadSiteFooter() {
  const html = readFileSync(BASE_PATH, 'utf8');
  const match = html.match(/<!-- SITE_FOOTER -->\r?\n([\s\S]*?)\r?\n\s*<!-- \/SITE_FOOTER -->/);
  if (!match) {
    throw new Error('SITE_FOOTER markers not found in layouts/base.html');
  }
  return match[1];
}