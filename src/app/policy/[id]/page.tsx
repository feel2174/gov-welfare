import { getPolicyById, getAllPolicies } from '@/lib/policies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const policies = await getAllPolicies();
    return policies.map((p) => ({
        id: p.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const policy = await getPolicyById(id);
    if (!policy) return { title: '정책을 찾을 수 없습니다.' };
    return {
        title: `${policy.title} - 정부복지 알리미`,
        description: policy.description,
    };
}

// AdSense를 위한 SEO 대응 동적 페이지 (모던 UI)
export default async function PolicyDetailPage({ params }: Props) {
    const { id } = await params;
    const policy = await getPolicyById(id);

    if (!policy) {
        notFound();
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: policy.title,
      description: policy.description,
      datePublished: policy.date_posted,
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
            borderRadius: '24px', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
            fontFamily: '"Pretendard Variable", sans-serif', 
            color: '#374151', 
            lineHeight: '1.7' 
        }}>
            {/* SEO 구조화 데이터(JSON-LD) 삽입 */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav style={{ marginBottom: '3rem' }}>
                <Link href="/" style={{ 
                    color: '#6b7280', 
                    textDecoration: 'none', 
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    전체 목록으로 돌아가기
                </Link>
            </nav>

            <header style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ 
                    display: 'inline-block', 
                    backgroundColor: '#eff6ff', 
                    color: '#2563eb', 
                    padding: '0.4rem 1rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.85rem', 
                    fontWeight: '800', 
                    marginBottom: '1.2rem',
                    boxShadow: 'inset 0 0 0 1px rgba(59, 130, 246, 0.2)'
                }}>
                    {policy.category}
                </span>
                <h1 style={{ fontSize: '2.5rem', color: '#111827', marginTop: '0', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.2' }}>{policy.title}</h1>
                <time dateTime={policy.date_posted} style={{ color: '#9ca3af', fontSize: '0.95rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    등재일: {policy.date_posted}
                </time>
            </header>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.4rem', color: '#1f2937', marginBottom: '1.2rem', fontWeight: '800' }}>제도 개요</h2>
                <p style={{ fontSize: '1.1rem', color: '#4b5563', backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '12px' }}>{policy.description}</p>
            </section>

            <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e5e7eb', marginBottom: '3rem' }}>
                <section style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#2563eb', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800' }}>
                        <span>🎯</span> 지원 대상
                    </h3>
                    <p style={{ marginTop: '0.8rem', fontSize: '1.05rem', color: '#374151' }}>{policy.target}</p>
                </section>

                <hr style={{ border: 0, borderTop: '1px solid #f3f4f6', margin: '2rem 0' }} />

                <section>
                    <h3 style={{ fontSize: '1.2rem', color: '#059669', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800' }}>
                        <span>💰</span> 지원 내용 (금액)
                    </h3>
                    <p style={{ marginTop: '0.8rem', fontSize: '1.05rem', color: '#374151', fontWeight: 'bold' }}>{policy.amount}</p>
                </section>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                <a 
                    href={policy.application_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.8rem',
                        backgroundColor: '#2563eb', 
                        color: '#ffffff', 
                        padding: '1.2rem 2.5rem', 
                        borderRadius: '9999px', 
                        textDecoration: 'none', 
                        fontSize: '1.15rem', 
                        fontWeight: '800', 
                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)',
                        transition: 'transform 0.2s, boxShadow 0.2s'
                    }}
                >
                    기관 공식 홈페이지 이동
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '1rem' }}>공식 홈페이지에서 모의계산 및 정확한 신청 조건을 확인하세요.</p>
            </div>

            {/* 추후 구글 애드센스 스크립트가 들어갈 위치 안내 영역 */}
            <div style={{ marginTop: '5rem', padding: '3rem', border: '2px dashed #e5e7eb', borderRadius: '16px', textAlign: 'center', backgroundColor: '#f9fafb', color: '#9ca3af', fontWeight: '600' }}>
                <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem' }}>광고 영역</span>
                구글 애드센스 등 디스플레이 광고 단위가 표시됩니다.
            </div>
        </article>
    );
}
