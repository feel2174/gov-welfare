import { getAllGuides } from '@/lib/policies';
import Link from 'next/link';

export const metadata = {
    title: '복지 가이드 - 꼭 알아야 할 혜택 정리',
    description: '복잡한 정부 복지 정책, 알기 쉽게 풀어서 설명해 드립니다.',
};

export default async function GuidePage() {
    const guides = await getAllGuides();

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#111827', marginBottom: '1rem' }}>복지 혜택 가이드 📚</h1>
                <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>정부 지원금을 더 똑똑하게 수령하는 방법을 안내합니다.</p>
            </header>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {guides.map((guide) => (
                    <Link key={guide.id} href={`/guide/${guide.id}`} style={{ textDecoration: 'none' }}>
                        <article style={{ 
                            backgroundColor: '#ffffff', 
                            padding: '2rem', 
                            borderRadius: '24px', 
                            border: '1px solid #f3f4f6', 
                            height: '100%',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer'
                        }}
                        className="guide-card"
                        >
                            <span style={{ 
                                display: 'inline-block', 
                                backgroundColor: '#fdf2f8', 
                                color: '#be185d', 
                                padding: '0.4rem 0.8rem', 
                                borderRadius: '9999px', 
                                fontSize: '0.8rem', 
                                fontWeight: '700',
                                marginBottom: '1.2rem'
                            }}>
                                {guide.category}
                            </span>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '1rem', lineHeight: '1.4' }}>
                                {guide.title}
                            </h2>
                            <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                {guide.description}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#9ca3af', fontSize: '0.85rem' }}>
                                <span>재무/상담 전문가 가이드</span>
                                <span>{guide.date}</span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .guide-card:hover { 
                    transform: translateY(-5px); 
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); 
                }
            `}} />
        </div>
    );
}
