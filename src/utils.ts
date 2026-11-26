import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts show up only in `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

const dateFormat = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
export const formatDate = (d: Date) => dateFormat.format(d);

/** Rough reading time for Hungarian prose (~200 words/minute). */
export function readingTime(body = ''): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}
