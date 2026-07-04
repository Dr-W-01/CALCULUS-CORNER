import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const DOCS = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs');

const TOP_INNER_OLD = `        <div class="flex items-center gap-x-3">
            <div class="w-9 h-9 bg-[#b91c1c] rounded-2xl flex items-center justify-center">
                <span class="font-bold text-white text-2xl tracking-tighter">CC</span>
            </div>
            <span class="font-semibold text-3xl tracking-tighter">Dr. W's Calculus Corner</span>
        </div>`;

const TOP_INNER_NEW = `        <a href="index.html" class="site-title-link flex items-center gap-x-3 no-underline text-inherit hover:opacity-90 transition-opacity">
            <div class="w-9 h-9 bg-[#b91c1c] rounded-2xl flex items-center justify-center">
                <span class="font-bold text-white text-2xl tracking-tighter">CC</span>
            </div>
            <span class="font-semibold text-3xl tracking-tighter">Dr. W's Calculus Corner</span>
        </a>`;

const SIDEBAR_OLD = `    <div class="page-layout flex">
        <button type="button" id="sidebar-expand" class="sidebar-toggle sidebar-expand-btn" aria-label="Open navigation" title="Open navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <aside id="sidebar" class="sidebar">
            <button type="button" id="sidebar-collapse" class="sidebar-toggle sidebar-collapse-btn" aria-label="Close navigation" title="Close navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <nav class="sidebar-nav space-y-1 text-sm">`;

const SIDEBAR_NEW = `    <div class="page-layout flex">
        <div class="sidebar-toggle-float" aria-hidden="false">
            <button type="button" id="sidebar-expand" class="sidebar-toggle sidebar-expand-btn" aria-label="Open navigation" title="Open navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <button type="button" id="sidebar-collapse" class="sidebar-toggle sidebar-collapse-btn" aria-label="Close navigation" title="Close navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
        </div>
        <aside id="sidebar" class="sidebar">
            <nav class="sidebar-nav space-y-1 text-sm">`;

for (const file of readdirSync(DOCS).filter(f => f.endsWith('.html'))) {
  const path = join(DOCS, file);
  let html = readFileSync(path, 'utf8');
  const orig = html;

  if (html.includes(TOP_INNER_OLD)) {
    html = html.replace(TOP_INNER_OLD, TOP_INNER_NEW);
  }
  if (html.includes(SIDEBAR_OLD)) {
    html = html.replace(SIDEBAR_OLD, SIDEBAR_NEW);
  }

  if (html !== orig) {
    writeFileSync(path, html, 'utf8');
    console.log('Patched', file);
  }
}