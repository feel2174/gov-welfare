import { getIndexableGuides, getSupportingGuides } from '@/lib/policies';
import Link from 'next/link';

export const metadata = {
    title: '복지 가이드',
    description: '2026년 5월 기준 공식 출처와 함께 정리한 복지 제도별 신청 안내입니다.',
};

export default async function GuidePage() {
    const guides = await getIndexableGuides();
    const supportingGuides = await getSupportingGuides();

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>
                    2026년 5월 기준
                </p>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.45rem' }}>복지 제도별 신청 가이드</h1>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                    승인 재신청 전에는 공식 안내를 바탕으로 보강한 핵심 가이드만 우선 공개 목록에 노출합니다.
                    실제 신청 가능 여부와 최종 선정은 각 기관의 공식 신청 화면에서 확인해야 합니다.
                </p>
            </header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {guides.map((guide) => (
                    <Link key={guide.id} href={`/guide/${guide.id}`} style={{ textDecoration: 'none' }}>
                        <article className="guide-card" style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                                <span style={{ backgroundColor: '#fdf2f8', color: '#be185d', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '700' }}>{guide.category}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{guide.date}</span>
                            </div>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.4' }}>{guide.title}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: '1.6' }}>{guide.description}</p>
                        </article>
                    </Link>
                ))}
            </div>
            <section style={{
                marginTop: '2rem',
                padding: '1.1rem',
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: 'var(--radius-md)',
            }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 850, color: '#78350f', marginBottom: '0.45rem' }}>
                    보강 대기 문서
                </h2>
                <p style={{ color: '#92400e', fontSize: '0.84rem', lineHeight: 1.65, marginBottom: '0.85rem' }}>
                    아래 주제는 중복되거나 본문 보강이 필요한 문서입니다. 승인 안정화를 위해 검색 색인에서는 제외하고, 추후 공식 출처 확인과 본문 확장을 거쳐 핵심 문서로 전환합니다.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {supportingGuides.map((guide) => (
                        <span key={guide.id} style={{
                            border: '1px solid #fcd34d',
                            borderRadius: '6px',
                            color: '#92400e',
                            backgroundColor: '#fff7ed',
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                        }}>
                            {guide.title}
                        </span>
                    ))}
                </div>
            </section>
            <style dangerouslySetInnerHTML={{ __html: `.guide-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08); border-color: var(--color-border-hover) !important; }` }} />
        </div>
    );
}
