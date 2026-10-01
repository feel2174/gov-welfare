import { getAllNotes } from '@/lib/notes';
import NotesFilterList from '@/components/NotesFilterList';

export const metadata = {
  title: '운영 노트',
  description: 'DNS, 배포, 캐시, 성능, 장애 대응을 작은 웹사이트 운영자 관점으로 정리한 CloudPlare 노트입니다.',
  alternates: {
    canonical: '/notes',
  },
  openGraph: {
    type: 'website',
    url: '/notes',
    title: '운영 노트 | CloudPlare',
    description: 'DNS, 배포, 캐시, 성능, 장애 대응을 작은 웹사이트 운영자 관점으로 정리한 CloudPlare 노트입니다.',
  },
};

export default function NotesPage() {
  const notes = getAllNotes().map((note) => ({
    slug: note.slug,
    title: note.title,
    description: note.description,
    category: note.category,
    publishedAt: note.publishedAt,
    readingMinutes: note.readingMinutes,
  }));

  return (
    <div>
      <header style={{ marginBottom: '1.6rem' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>
          CloudPlare Notes
        </p>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem' }}>운영 노트</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
          작은 사이트를 배포하고 고치는 과정에서 반복해서 확인하게 되는 실무 주제를 체계적으로 정리했습니다.
          카테고리별로 탐색하거나 필요한 키워드로 검색해 즉시 확인해 보세요.
        </p>
      </header>

      <NotesFilterList initialNotes={notes} />

      <style dangerouslySetInnerHTML={{ __html: `
        .note-card { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        .note-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08); border-color: var(--color-border-hover) !important; }
      `}} />
    </div>
  );
}

