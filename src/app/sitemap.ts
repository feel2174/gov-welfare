import { MetadataRoute } from 'next'
import { getAllNotes } from '@/lib/notes'
import { CONTENT_REVIEWED_AT, SITE_URL } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = getAllNotes();
  const baseUrl = SITE_URL;
  const siteLastModified = new Date(CONTENT_REVIEWED_AT);

  const noteUrls = notes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(note.reviewedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: siteLastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: siteLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/checklist`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    ...noteUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteLastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteLastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
