import Link from 'next/link';
import { getAllNotes } from '@/lib/notes';

export const metadata = {
  title: '페이지를 찾을 수 없습니다',
  description: '요청한 페이지를 찾을 수 없습니다. CloudPlare의 운영 노트 목록과 체크리스트에서 원하는 내용을 찾아보세요.',
};

export default function NotFound() {
  const recentNotes = getAllNotes().slice(-5).reverse();

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>404</p>
        <h1 style={{ fontSize: '1.55rem', fontWeight: 900, marginBottom: '0.6rem' }}>페이지를 찾을 수 없습니다</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
          주소가 바뀌었거나, 더 이상 존재하지 않는 페이지입니다. 아래에서 원하는 운영 노트를 찾아보시거나 홈으로 돌아가세요.
        </p>
      </header>

      <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Link href="/" style={{ color: 'var(--color-primary)', fontWeight: 750, fontSize: '0.9rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
          홈으로
        </Link>
        <Link href="/notes" style={{ color: 'var(--color-primary)', fontWeight: 750, fontSize: '0.9rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
          전체 운영 노트
        </Link>
        <Link href="/checklist" style={{ color: 'var(--color-primary)', fontWeight: 750, fontSize: '0.9rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 1rem' }}>
          배포 체크리스트
        </Link>
      </div>

      <section>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '0.9rem' }}>최근 운영 노트</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {recentNotes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{ backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.9rem 1rem' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '0.76rem', fontWeight: 800 }}>{note.category}</span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.3rem', color: 'var(--color-text)' }}>{note.title}</h3>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
