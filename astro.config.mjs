// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL of the site. Used for canonical links, the sitemap and the RSS feed.
// SITE_URL can override it, e.g. for a staging copy.
const SITE_URL = process.env.SITE_URL || 'https://alexercise.fit';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
