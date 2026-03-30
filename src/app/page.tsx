import { getAllPolicies, getAllGuides } from '@/lib/policies';
import PolicyList from '@/components/PolicyList';
import Link from 'next/link';

export const metadata = {
    title: '정부 복지 알리미 - 2026 정부 정책 통합 검색',
    description: '최신 정부 복지 정책 모음, 지원금 가이드 및 카테고리별 맞춤형 안내 서비스',
};

// 메인 페이지: 전체보기 (최신 100개)
export default async function Home() {
    const policies = await getAllPolicies();
    const guides = await getAllGuides();

    return (
        <div>
            {/* Featured Guides (Highlighting Value for AdSense) */}
            <section style={{ marginBottom: '5rem' }}>
                <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#111827', marginBottom: '0.4rem' }}>실전 복지 가이드 ⚡️</h2>
                        <p style={{ color: '#6b7280', fontSize: '1rem' }}>놓치면 손해 보는 정부 지원금 핵심 정리</p>
                    </div>
                    <Link href="/guide" style={{ color: '#2563eb', fontWeight: '700', textDecoration: 'none', fontSize: '0.95rem' }}>전체 가이드 보기 &rarr;</Link>
                </header>

                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {guides.slice(0, 2).map((guide) => (
                        <Link key={guide.id} href={`/guide/${guide.id}`} style={{ textDecoration: 'none' }}>
                            <article style={{ 
                                padding: '2rem', 
                                backgroundColor: '#ffffff', 
                                borderRadius: '24px', 
                                border: '1px solid #f3f4f6', 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer'
                            }}
                            className="guide-home-card"
                            >
                                <span style={{ color: '#2563eb', fontWeight: '800', fontSize: '0.8rem', marginBottom: '0.8rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {guide.category}
                                </span>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#111827', marginBottom: '1rem', lineHeight: '1.4' }}>
                                    {guide.title}
                                </h3>
                                <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1 }}>{guide.description}</p>
                                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.85rem', fontWeight: '600' }}>
                                    <span>자세히 읽기</span>
                                    <span>&rarr;</span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            <hr style={{ border: 0, borderTop: '1px solid #e5e7eb', margin: '5rem 0' }} />

            <PolicyList 
                policies={policies} 
                title="정부 정책 통합검색" 
                description="나에게 찰떡같이 맞는 정부 지원금을 조회해보세요." 
            />

            <style dangerouslySetInnerHTML={{ __html: `
                .guide-home-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
            `}} />
        </div>
    );
}
