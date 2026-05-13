import { getGuideById, getAllGuides } from '@/lib/policies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const guides = await getAllGuides();
    return guides.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const guide = await getGuideById(id);
    if (!guide) return { title: '가이드를 찾을 수 없습니다.' };
    return {
        title: guide.title,
        description: guide.description,
    };
}

export default async function GuideDetailPage({ params }: Props) {
    const { id } = await params;
    const guide = await getGuideById(id);

    if (!guide) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        datePublished: guide.date,
        author: { '@type': 'Organization', name: '정부복지 알리미' },
        publisher: { '@type': 'Organization', name: '정부복지 알리미' },
    };

    return (
        <article style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.5rem',
            border: '1px solid var(--color-border)',
            lineHeight: '1.8',
        }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <nav style={{ marginBottom: '1.5rem' }}>
                <Link href="/guide" style={{
                    color: 'var(--color-text-secondary)', fontWeight: '700',
                    fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                }}>
                    ← 가이드 목록
                </Link>
            </nav>

            <header style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{
                    display: 'inline-block', backgroundColor: '#fef2f2', color: '#dc2626',
                    padding: '0.25rem 0.7rem', borderRadius: '6px',
                    fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.8rem',
                }}>
                    {guide.category}
                </span>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '900', lineHeight: '1.35', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                    {guide.title}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
                    복지 전문 필진 · {guide.date}
                </p>
            </header>

            <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }} className="markdown-content">
                <ReactMarkdown
                    components={{
                        h2: ({node, ...props}) => <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '2rem', marginBottom: '1rem', color: '#1f2937' }} {...props} />,
                        h3: ({node, ...props}) => <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.8rem', color: '#374151' }} {...props} />,
                        p: ({node, ...props}) => <p style={{ marginBottom: '1.2rem', color: '#4b5563' }} {...props} />,
                        ul: ({node, ...props}) => <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.5rem', listStyleType: 'disc', color: '#4b5563' }} {...props} />,
                        li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                        strong: ({node, ...props}) => <strong style={{ fontWeight: '700', color: '#111827' }} {...props} />,
                    }}
                >
                    {guide.content}
                </ReactMarkdown>
            </div>

            <div style={{
                marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f8fafc',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
            }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.6rem' }}>💡 더 많은 복지 혜택을 확인해 보세요</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
                    정부 복지 알리미에서 전국 10,000건 이상의 보조금을 실시간 검색하세요.
                </p>
                <Link href="/" style={{
                    display: 'inline-block', backgroundColor: 'var(--color-text)',
                    color: '#fff', padding: '0.7rem 1.5rem',
                    borderRadius: '10px', fontWeight: '700', fontSize: '0.88rem',
                }}>
                    보조금 검색하기 →
                </Link>
            </div>
        </article>
    );
}
