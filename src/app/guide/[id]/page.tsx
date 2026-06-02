import { getGuideById, getAllGuides } from '@/lib/policies';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { SITE_URL, SITE_NAME } from '@/lib/site';

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
            openGraph: {
                title: guide.title,
                description: guide.description,
                type: 'article',
                publishedTime: guide.date,
            url: `${SITE_URL}/guide/${id}`,
            siteName: SITE_NAME,
        },
        alternates: {
            canonical: `${SITE_URL}/guide/${id}`,
        },
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
        dateModified: guide.reviewedAt,
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: { '@type': 'Organization', name: SITE_NAME },
    };
    const contentWithoutRandomImages = guide.content.replace(/!\[[^\]]*\]\(https:\/\/picsum\.photos\/[^)]+\)\n*/g, '');

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
                    정부 복지 알리미 편집팀 · 최초 작성 {guide.date} · 최종 검토 {guide.reviewedAt}
                </p>
            </header>

            <section style={{
                marginBottom: '2rem',
                padding: '1rem 1.1rem',
                backgroundColor: '#f8fafc',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
            }}>
                <h2 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-text)' }}>공식 확인 출처</h2>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.7rem' }}>
                    아래 내용은 2026년 5월 기준으로 공공기관 안내와 공식 신청 페이지를 확인해 정리한 참고 정보입니다. 실제 신청 가능 여부, 소득·재산 기준, 신청 기간은 공식 사이트의 최신 공고를 우선 확인해 주세요.
                </p>
                <ul style={{ paddingLeft: '1.1rem', color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.8 }}>
                    {guide.sources?.map((source) => (
                        <li key={source.url}>
                            <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{source.title}</a>
                        </li>
                    ))}
                </ul>
            </section>

            <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }} className="markdown-content">
                <ReactMarkdown
                    components={{
                        h2: ({ node, ...props }) => {
                            void node;
                            return <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '2rem', marginBottom: '1rem', color: '#1f2937' }} {...props} />;
                        },
                        h3: ({ node, ...props }) => {
                            void node;
                            return <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.8rem', color: '#374151' }} {...props} />;
                        },
                        p: ({ node, ...props }) => {
                            void node;
                            return <p style={{ marginBottom: '1.2rem', color: '#4b5563' }} {...props} />;
                        },
                        ul: ({ node, ...props }) => {
                            void node;
                            return <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.5rem', listStyleType: 'disc', color: '#4b5563' }} {...props} />;
                        },
                        ol: ({ node, ...props }) => {
                            void node;
                            return <ol style={{ marginBottom: '1.2rem', paddingLeft: '1.5rem', color: '#4b5563' }} {...props} />;
                        },
                        li: ({ node, ...props }) => {
                            void node;
                            return <li style={{ marginBottom: '0.5rem' }} {...props} />;
                        },
                        strong: ({ node, ...props }) => {
                            void node;
                            return <strong style={{ fontWeight: '700', color: '#111827' }} {...props} />;
                        },
                        img: () => null,
                    }}
                >
                    {contentWithoutRandomImages}
                </ReactMarkdown>
            </div>

            <div style={{
                marginTop: '3rem', padding: '1.5rem', backgroundColor: '#f8fafc',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
            }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.6rem' }}>다른 복지 제도도 확인해 보세요</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
                    제도별 가이드를 먼저 확인하고, 추가 공공서비스는 참고용 검색 도구에서 살펴볼 수 있습니다.
                </p>
                <Link href="/search" style={{
                    display: 'inline-block', backgroundColor: 'var(--color-text)',
                    color: '#fff', padding: '0.7rem 1.5rem',
                    borderRadius: '10px', fontWeight: '700', fontSize: '0.88rem',
                }}>
                    공공서비스 검색 열기 →
                </Link>
            </div>
        </article>
    );
}
