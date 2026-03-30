import { getGuideById, getAllGuides } from '@/lib/policies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const guides = await getAllGuides();
    return guides.map((g) => ({
        id: g.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const guide = await getGuideById(id);
    if (!guide) return { title: '가이드를 찾을 수 없습니다.' };
    return {
        title: `${guide.title} - 복지 가이드`,
        description: guide.description,
    };
}

export default async function GuideDetailPage({ params }: Props) {
    const { id } = await params;
    const guide = await getGuideById(id);

    if (!guide) {
        notFound();
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      datePublished: guide.date,
      author: {
        '@type': 'Organization',
        name: '정부복지 알리미',
      },
      publisher: {
        '@type': 'Organization',
        name: '정부복지 알리미',
      }
    };

    return (
        <article style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            padding: '4rem 3rem', 
            backgroundColor: '#ffffff', 
            borderRadius: '32px', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            fontFamily: '"Pretendard Variable", -apple-system, sans-serif', 
            color: '#374151', 
            lineHeight: '1.8' 
        }}>
            {/* SEO 구조화 데이터(JSON-LD) 삽입 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <nav style={{ marginBottom: '3rem' }}>
                <Link href="/guide" style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                }}>
                    ← 전체 가이드 목록
                </Link>
            </nav>

            <header style={{ marginBottom: '3.5rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '2rem' }}>
                <span style={{ 
                    display: 'inline-block', 
                    backgroundColor: '#fef2f2', 
                    color: '#dc2626', 
                    padding: '0.4rem 1rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.85rem', 
                    fontWeight: '800', 
                    marginBottom: '1.2rem'
                }}>
                    {guide.category}
                </span>
                <h1 style={{ fontSize: '2.5rem', color: '#111827', marginTop: '0', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.3' }}>{guide.title}</h1>
                <div style={{ color: '#9ca3af', fontSize: '0.95rem', fontWeight: '500', display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <span>복지 전문 필진 작성</span>
                    <span>•</span>
                    <span>{guide.date}</span>
                </div>
            </header>

            <div style={{ fontSize: '1.15rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                {guide.content}
            </div>

            <div style={{ marginTop: '5rem', padding: '2.5rem', backgroundColor: '#f9fafb', borderRadius: '24px', border: '1px solid #f3f4f6' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#111827', marginBottom: '1rem', fontWeight: '800' }}>💡 더 많은 복지 혜택을 확인해 보세요</h3>
                <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>정부 복지 알리미는 국민들이 놓치기 쉬운 소중한 혜택들을 발굴하여 전해 드립니다.</p>
                <Link href="/" style={{ 
                    display: 'inline-block', 
                    backgroundColor: '#111827', 
                    color: '#ffffff', 
                    padding: '1rem 2rem', 
                    borderRadius: '9999px', 
                    textDecoration: 'none', 
                    fontWeight: '700',
                    transition: 'opacity 0.2s'
                }}>정책 통합 검색 페이지로 이동</Link>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                h3 { margin-top: 2.5rem; margin-bottom: 1.2rem; font-weight: 800; color: #111827; font-size: 1.5rem; }
            `}} />
        </article>
    );
}
