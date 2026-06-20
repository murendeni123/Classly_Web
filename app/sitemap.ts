import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://classlyempowering.co.za';

export const dynamic = 'force-static';

const routes = ['', '/features', '/how-it-works', '/pricing', '/for-schools', '/contact', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
