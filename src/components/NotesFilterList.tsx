'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export interface NoteListItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingMinutes: number;
}

export default function NotesFilterList({ initialNotes }: { initialNotes: NoteListItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = ['전체'];
    const set = new Set(initialNotes.map((n) => n.category));
    set.forEach((c) => cats.push(c));
    return cats;
  }, [initialNotes]);

  const filteredNotes = useMemo(() => {
    return initialNotes.filter((note) => {
      const matchCat = selectedCategory === '전체' || note.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        note.title.toLowerCase().includes(q) ||
        note.description.toLowerCase().includes(q) ||
        note.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [initialNotes, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Search Input */}
      <div style={{ marginBottom: '1.2rem' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="노트 제목, 설명, 키워드로 검색..."
            aria-label="노트 검색"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '0.85rem 1rem 0.85rem 2.5rem',
              fontSize: '0.92rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              outline: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              fontSize: '1rem',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.8rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                padding: '0.2rem',
              }}
              aria-label="검색어 지우기"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === '전체'
              ? initialNotes.length
              : initialNotes.filter((n) => n.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.82rem',
                fontWeight: isSelected ? 800 : 600,
                borderRadius: '20px',
                border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>{cat}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  opacity: isSelected ? 0.9 : 0.6,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Count Info */}
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          총 {filteredNotes.length}개의 운영 노트
        </span>
        {(selectedCategory !== '전체' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('전체');
              setSearchQuery('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
            검색 결과가 없습니다
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            다른 검색어를 입력하시거나 카테고리 필터를 변경해 보세요.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredNotes.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} style={{ textDecoration: 'none' }}>
              <article
                className="note-card"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.35rem 1.45rem',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    alignItems: 'center',
                    marginBottom: '0.55rem',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--color-primary)',
                      backgroundColor: 'var(--color-primary-light)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                    }}
                  >
                    {note.category}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.76rem' }}>
                    {note.publishedAt} · {note.readingMinutes}분 읽기
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: '1.08rem',
                    fontWeight: 850,
                    lineHeight: 1.45,
                    marginBottom: '0.4rem',
                    color: 'var(--color-text)',
                  }}
                >
                  {note.title}
                </h2>
                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {note.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
