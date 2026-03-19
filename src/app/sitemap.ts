import { MetadataRoute } from 'next'
import { getAllPolicies, getCategories } from '@/lib/policies'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const policies = await getAllPolicies();
  const categories = await getCategories();
  const baseUrl = 'https://gov-welfare.com'; // 사용자 커스텀 도메인(예상)

  const policyUrls = policies.map((policy) => ({
    url: `${baseUrl}/policy/${policy.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...categoryUrls,
    ...policyUrls,
  ]
}
