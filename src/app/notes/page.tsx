import Link from 'next/link';
import { getAllNotes } from '@/lib/notes';

export const metadata = {
  title: '운영 노트',
  description: 'DNS, 배포, 캐시, 성능, 장애 대응을 작은 웹사이트 운영자 관점으로 정리한 CloudPlare 노트입니다.',
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div>
      <header style={{ marginBottom: '1.6rem' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>
          CloudPlare Notes
        </p>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem' }}>운영 노트</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
          작은 사이트를 배포하고 고치는 과정에서 반복해서 확인하게 되는 주제를 정리했습니다.
          각 노트는 공식 문서를 참고하되, 실제 운영자가 판단해야 하는 순서와 실수 지점을 중심으로 작성합니다.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {notes.map((note) => (
          <Link key={note.slug} href={`/notes/${note.slug}`} style={{ textDecoration: 'none' }}>
            <article className="note-card" style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.35rem 1.45rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginBottom: '0.55rem' }}>
                <span style={{ color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 800 }}>{note.category}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.76rem' }}>{note.readingMinutes}분 읽기</span>
              </div>
              <h2 style={{ fontSize: '1.08rem', fontWeight: 850, lineHeight: 1.45, marginBottom: '0.4rem' }}>{note.title}</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>{note.description}</p>
            </article>
          </Link>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .note-card { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .note-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08); border-color: var(--color-border-hover) !important; }
      `}} />
    </div>
  );
}
