import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllNotes, getNoteBySlug } from '@/lib/notes';
import { AUTHOR_NAME, AUTHOR_ROLE, AUTHOR_SAME_AS, SITE_NAME, SITE_URL } from '@/lib/site';
import CodeBlock from '@/components/CodeBlock';

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

  const otherNotes = getAllNotes().filter((n) => n.slug !== note.slug);
  const sameCategory = otherNotes.filter((n) => n.category === note.category);
  const rest = otherNotes.filter((n) => n.category !== note.category);
  const relatedNotes = [...sameCategory, ...rest].slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.description,
    datePublished: note.publishedAt,
    dateModified: note.reviewedAt,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      jobTitle: AUTHOR_ROLE,
      url: `${SITE_URL}/about`,
      sameAs: AUTHOR_SAME_AS,
    },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/notes/${note.slug}`,
    ...(note.images && note.images.length > 0
      ? { image: note.images.map((image) => `${SITE_URL}${image.src}`) }
      : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: '운영 노트', item: `${SITE_URL}/notes` },
      { '@type': 'ListItem', position: 3, name: note.title, item: `${SITE_URL}/notes/${note.slug}` },
    ],
  };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav aria-label="breadcrumb" style={{ marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
        <Link href="/" style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>홈</Link>
        <span style={{ margin: '0 0.4rem' }}>›</span>
        <Link href="/notes" style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>운영 노트</Link>
        <span style={{ margin: '0 0.4rem' }}>›</span>
        <span style={{ color: 'var(--color-text)', fontWeight: 700 }}>{note.title}</span>
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

      {note.diagram && note.diagram.length > 0 && (
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
                {note.diagram && i < note.diagram.length - 1 && (
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }} aria-hidden="true">→</span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

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
            {section.body.map((item, i) =>
              typeof item === 'string' ? (
                <p key={i} style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '0.85rem' }}>
                  {item}
                </p>
              ) : (
                <CodeBlock key={i} content={item.content} label={item.label} />
              )
            )}
          </section>
        ))}
      </div>

      {note.images && note.images.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          {note.images.map((image) => (
            <figure key={image.src} style={{ marginBottom: '1rem' }}>
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={675}
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
              />
              {image.caption && (
                <figcaption style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', textAlign: 'center' }}>
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </section>
      )}

      {note.checklist && note.checklist.length > 0 && (
        <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.4rem', marginTop: '2.2rem' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '0.7rem' }}>운영 체크리스트</h2>
          <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.85, paddingLeft: '1.1rem' }}>
            {note.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {relatedNotes.length > 0 && (
        <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.4rem', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '0.9rem' }}>관련 노트</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {relatedNotes.map((related) => (
              <Link key={related.slug} href={`/notes/${related.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{ backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.9rem 1rem' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.74rem', fontWeight: 800 }}>{related.category}</span>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--color-text)' }}>{related.title}</h3>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

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

      <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.4rem', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: '0.7rem' }}>이 글의 수정 이력</h2>
        <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.86rem', lineHeight: 1.85, paddingLeft: '1.1rem' }}>
          {note.revisions.map((revision) => (
            <li key={revision.date + revision.note}>
              <span style={{ color: 'var(--color-text-muted)' }}>{revision.date}</span> — {revision.note}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
