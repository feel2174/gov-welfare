import { getAllGuides } from '@/lib/policies';
import Link from 'next/link';

export const metadata = {
    title: '복지 가이드',
    description: '2026년 5월 기준 공식 출처와 함께 정리한 복지 제도별 신청 안내입니다.',
};

export default async function GuidePage() {
    const guides = await getAllGuides();

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>
                    2026년 5월 기준
                </p>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.45rem' }}>복지 제도별 신청 가이드</h1>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                    공식 안내를 바탕으로 대상 요건, 신청 경로, 확인해야 할 주의사항을 정리했습니다.
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
            <style dangerouslySetInnerHTML={{ __html: `.guide-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08); border-color: var(--color-border-hover) !important; }` }} />
        </div>
    );
}
