// Creates a new blog post skeleton: npm run new-post -- "A bejegyzés címe"
import { existsSync, writeFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Használat: npm run new-post -- "A bejegyzés címe"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const file = `src/content/blog/${slug}.md`;
if (existsSync(file)) {
  console.error(`Már létezik: ${file}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  file,
  `---
title: '${title.replace(/'/g, "''")}'
description: 'Egy-két mondatos összefoglaló, ez jelenik meg a listában és a keresőkben.'
pubDate: ${today}
tags: []
draft: true
---

Ide jön a bejegyzés szövege. Markdownban írhatsz: **félkövér**, *dőlt*, [link](/kapcsolat), listák, táblázatok.
`,
);
console.log(`Létrehozva: ${file}\nHa kész, töröld a "draft: true" sort, és a bejegyzés megjelenik az oldalon.`);
