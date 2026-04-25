import ServiceList from '@/components/ServiceList';
import { getAllGuides } from '@/lib/policies';
import Link from 'next/link';

export const metadata = {
    title: '정부 복지 알리미 - 대한민국 보조금 실시간 통합검색',
    description: '정부24 공공서비스 API 기반 전국 10,000건 이상 정부 보조금·지원금 실시간 통합검색 서비스.',
};

export default async function Home() {
    const guides = await getAllGuides();

    return (
        <div>
            {/* 실시간 공공서비스 검색 (핵심 콘텐츠) */}
            <ServiceList />

            {/* 복지 가이드 섹션 (독창적 콘텐츠) */}
            <section style={{ marginTop: '3rem' }}>
                <header style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                    marginBottom: '1.2rem',
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-text)', marginBottom: '0.2rem' }}>
                            복지 가이드 ⚡️
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>놓치면 손해! 전문가 핵심 정리</p>
                    </div>
                    <Link href="/guide" style={{
                        color: 'var(--color-primary)', fontWeight: '700',
                        fontSize: '0.85rem',
                    }}>
                        전체보기 →
                    </Link>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {guides.map((guide) => (
                        <Link key={guide.id} href={`/guide/${guide.id}`} style={{ textDecoration: 'none' }}>
                            <article className="guide-card" style={{
                                padding: '1.4rem 1.5rem',
                                backgroundColor: 'var(--color-surface)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        backgroundColor: '#fdf2f8', color: '#be185d',
                                        padding: '0.2rem 0.6rem', borderRadius: '6px',
                                        fontSize: '0.72rem', fontWeight: '700',
                                    }}>
                                        {guide.category}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{guide.date}</span>
                                </div>
                                <h3 style={{
                                    fontSize: '1.05rem', fontWeight: '800',
                                    color: 'var(--color-text)', lineHeight: 1.4,
                                    marginBottom: '0.4rem',
                                }}>
                                    {guide.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.88rem', color: 'var(--color-text-secondary)',
                                    lineHeight: 1.6,
                                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}>
                                    {guide.description}
                                </p>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .guide-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08); border-color: var(--color-border-hover) !important; }
            `}} />
        </div>
    );
}
