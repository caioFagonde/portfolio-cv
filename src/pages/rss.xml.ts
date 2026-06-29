import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const essays = await getCollection('essays');
  return rss({
    title: 'Caio Nahuel — Systems Atlas',
    description: 'Research notes and technical cases.',
    site: context.site,
    items: essays.map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: `/research/${entry.slug}/`
    }))
  });
}
