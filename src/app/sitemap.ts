import { MetadataRoute } from 'next'
import { getIndexableGuides } from '@/lib/policies'
import { SITE_URL } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = await getIndexableGuides();
  const baseUrl = SITE_URL;

  const guideUrls = guides.map((guide) => ({
    url: `${baseUrl}/guide/${guide.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/checklist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/application-documents`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/income-check`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/duplicate-support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/rejection-reasons`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    ...guideUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
