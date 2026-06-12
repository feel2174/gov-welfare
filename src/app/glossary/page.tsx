import { glossary } from '@/lib/notes';

export const metadata = {
  title: '클라우드 운영 용어집',
  description: 'DNS, TTL, CDN, Cache-Control, Core Web Vitals 등 작은 사이트 운영자가 자주 만나는 용어를 짧게 설명합니다.',
};

export default function GlossaryPage() {
  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '1.8rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>Glossary</p>
        <h1 style={{ fontSize: '1.55rem', fontWeight: 900, marginBottom: '0.55rem' }}>클라우드 운영 용어집</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
          운영 중 자주 마주치는 용어를 짧게 정리했습니다. 자세한 판단 기준은 각 운영 노트에서 이어서 설명합니다.
        </p>
      </header>

      <div style={{ display: 'grid', gap: '0.85rem' }}>
        {glossary.map((item) => (
          <section key={item.term} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.9rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.3rem' }}>{item.term}</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.75 }}>{item.description}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
