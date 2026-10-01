import Link from 'next/link';
import { glossary } from '@/lib/notes';

export const metadata = {
  title: '클라우드 운영 용어집',
  description: 'DNS, TTL, CDN, Cache-Control, Core Web Vitals 등 작은 사이트 운영자가 자주 만나는 용어를 실무 관점으로 설명합니다.',
  alternates: {
    canonical: '/glossary',
  },
  openGraph: {
    type: 'website',
    url: '/glossary',
    title: '클라우드 운영 용어집 | CloudPlare',
    description: 'DNS, TTL, CDN, Cache-Control, Core Web Vitals 등 작은 사이트 운영자가 자주 만나는 용어를 실무 관점으로 설명합니다.',
  },
};

export default function GlossaryPage() {
  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '1.8rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>Glossary</p>
        <h1 style={{ fontSize: '1.55rem', fontWeight: 900, marginBottom: '0.55rem' }}>클라우드 운영 용어집</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
          소규모 사이트 배포와 클라우드 인프라 운영 중 자주 마주치는 핵심 용어 34가지를 실무자 눈높이에서 정리했습니다.
          각 용어의 구체적인 설정법과 장애 해결책은 연결된 관련 운영 노트에서 상세히 다룹니다.
        </p>
      </header>

      <div style={{ display: 'grid', gap: '1.1rem' }}>
        {glossary.map((item) => (
          <section
            key={item.term}
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.1rem 1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-text)', margin: 0 }}>
                {item.term}
              </h2>
              {item.relatedSlug && (
                <Link
                  href={`/notes/${item.relatedSlug}`}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 750,
                    color: 'var(--color-primary)',
                    backgroundColor: 'var(--color-primary-light)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                  }}
                >
                  관련 실무 노트 보기 →
                </Link>
              )}
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
              {item.description}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
