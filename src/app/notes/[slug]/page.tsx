import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllNotes, getNoteBySlug } from '@/lib/notes';
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from '@/lib/site';

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    return { title: '노트를 찾을 수 없습니다' };
  }

  return {
    title: note.title,
    description: note.description,
    alternates: {
      canonical: `${SITE_URL}/notes/${note.slug}`,
    },
    openGraph: {
      type: 'article',
      title: note.title,
      description: note.description,
      url: `${SITE_URL}/notes/${note.slug}`,
      siteName: SITE_NAME,
      publishedTime: note.publishedAt,
      modifiedTime: note.reviewedAt,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.description,
    datePublished: note.publishedAt,
    dateModified: note.reviewedAt,
    author: { '@type': 'Person', name: AUTHOR_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/notes/${note.slug}`,
  };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <nav style={{ marginBottom: '1.5rem' }}>
        <Link href="/notes" style={{ color: 'var(--color-text-secondary)', fontWeight: 750, fontSize: '0.88rem' }}>← 운영 노트 목록</Link>
      </nav>

      <header style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.8rem' }}>
        <span style={{ display: 'inline-block', color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', borderRadius: 6, padding: '0.25rem 0.7rem', fontSize: '0.76rem', fontWeight: 850, marginBottom: '0.8rem' }}>
          {note.category}
        </span>
        <h1 style={{ fontSize: '1.55rem', lineHeight: 1.35, fontWeight: 950, marginBottom: '0.7rem', letterSpacing: 0 }}>{note.title}</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: '0.9rem' }}>
          쓴 사람 {AUTHOR_NAME} · 최초 작성 {note.publishedAt} · 최종 검토 {note.reviewedAt} · {note.readingMinutes}분 읽기
        </p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.75 }}>{note.summary}</p>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '0.95rem', fontWeight: 850, marginBottom: '0.7rem', color: 'var(--color-text)' }}>한눈에 보는 흐름</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
          {note.diagram.map((step, i) => (
            <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.55rem 0.85rem',
                fontSize: '0.82rem',
                fontWeight: 750,
                lineHeight: 1.45,
              }}>{step}</span>
              {i < note.diagram.length - 1 && (
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }} aria-hidden="true">→</span>
              )}
            </span>
          ))}
        </div>
      </section>

      <aside style={{ backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem 1.1rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '0.95rem', fontWeight: 850, marginBottom: '0.55rem' }}>이 노트에서 확인할 것</h2>
        <ol style={{ color: 'var(--color-text-secondary)', fontSize: '0.86rem', lineHeight: 1.75, paddingLeft: '1.2rem' }}>
          {note.sections.map((section) => (
            <li key={section.heading}>{section.heading}</li>
          ))}
        </ol>
      </aside>

      <div>
        {note.sections.map((section) => (
          <section key={section.heading} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.18rem', fontWeight: 900, marginBottom: '0.8rem', lineHeight: 1.45 }}>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '0.85rem' }}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.4rem', marginTop: '2.2rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '0.7rem' }}>운영 체크리스트</h2>
        <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.85, paddingLeft: '1.1rem' }}>
          {note.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.4rem', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '0.7rem' }}>확인한 공식 자료</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.86rem', lineHeight: 1.75, marginBottom: '0.7rem' }}>
          아래 자료를 바탕으로 운영 관점의 설명을 덧붙였습니다. 세부 동작은 서비스와 배포 환경에 따라 달라질 수 있습니다.
        </p>
        <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.86rem', lineHeight: 1.8, paddingLeft: '1.1rem' }}>
          {note.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>{source.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
