import { getAllGuides } from '@/lib/policies';
import Link from 'next/link';

export const metadata = {
    title: '복지 가이드',
    description: '복잡한 정부 복지 정책을 알기 쉽게 풀어서 설명합니다.',
};

export default async function GuidePage() {
    const guides = await getAllGuides();

    return (
        <div>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.3rem' }}>복지 혜택 가이드 📚</h1>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)' }}>정부 지원금을 더 똑똑하게 수령하는 방법을 안내합니다.</p>
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
