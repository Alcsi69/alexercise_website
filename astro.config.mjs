// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL of the site. Used for canonical links, the sitemap and the RSS feed.
// Set SITE_URL in the hosting provider's build settings once the domain is decided.
const SITE_URL = process.env.SITE_URL ?? 'https://www.example.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
