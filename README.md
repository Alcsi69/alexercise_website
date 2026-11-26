# Alexercise website

The marketing site and blog for **Alexercise**, built with [Astro](https://astro.build).
It is a fully static site: plain HTML and CSS, almost no JavaScript, and it can be hosted anywhere.

## Run it locally

Needs Node.js 22.23 or newer.

```bash
npm install
npm run dev       # http://localhost:4321, live reload, drafts visible
npm run build     # production build into dist/
npm run preview   # serve the built dist/ locally
```

## Write a blog post

Every post is one Markdown file in `src/content/blog/`. The file name becomes the URL:
`src/content/blog/heti-edzesterv.md` → `/blog/heti-edzesterv`.

The quickest way to start one:

```bash
npm run new-post -- "A bejegyzés címe"
```

This creates the file with the header already filled in. Or copy an existing post. The header looks like this:

```markdown
---
title: 'A bejegyzés címe'
description: 'Egy-két mondat, ez jelenik meg a listában és a Google-ben.'
pubDate: 2026-11-26
updatedDate: 2026-12-01   # optional
tags: ['kezdőknek']        # optional
draft: true                # optional; drafts only show in `npm run dev`
---

A szöveg Markdownban: **félkövér**, *dőlt*, [link](/kapcsolat), listák, táblázatok, idézetek.
```

Images: put them in `public/blog/` and use `![leírás](/blog/kep.jpg)`.

You can also add a post straight from GitHub: open `src/content/blog/`, click **Add file → Create new file**, paste the header and text, and commit. If the host builds from the repo, the post goes live on its own.

New posts automatically appear on the blog page, on the home page (latest three), in the RSS feed (`/rss.xml`) and in the sitemap.

## Where things live

| What | Where |
| --- | --- |
| Name, email, phone, Instagram, app links, contact-form endpoint | `src/site.ts` |
| Navigation menu | `NAV` in `src/site.ts` |
| Colours, fonts, buttons | `src/styles/global.css` |
| Pages (Főoldal, Szolgáltatások, Alkalmazás, Blog, Rólam, Kapcsolat) | `src/pages/` |
| Blog posts | `src/content/blog/` |
| Shared header, footer, logo | `src/components/` |

Brand palette (same as the app): `#2563eb` blue, `#ccff00` lime (primary buttons, always with dark text),
`#d81159` magenta (accents), `#f7f7ff` off-white, `#131112` near-black.

## Before going live

- Fill in the real contact details in `src/site.ts` (the email is a placeholder).
- Replace the bio on `src/pages/rolam.astro` and add a photo.
- Optionally add prices in `src/pages/szolgaltatasok.astro`.
- Set the `SITE_URL` repository variable in GitHub to the final domain (used for canonical links, the sitemap and RSS).
- The contact form opens the visitor's email app by default. To receive submissions directly, set `formAction` in `src/site.ts` to a form service endpoint.

## Hosting

Hosted on the VPS behind Caddy, deployed automatically by GitHub Actions on every push to `main`.
Setup and details: [deploy/README.md](deploy/README.md).
