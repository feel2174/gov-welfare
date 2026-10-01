'use client';

import { useState, useSyncExternalStore } from 'react';

interface ChecklistSection {
  title: string;
  items: string[];
}

const emptySubscribe = () => () => {};

export default function ChecklistInteractive({ sections }: { sections: ChecklistSection[] }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem('cloudplare_checklist_state');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const totalItems = sections.reduce((acc, sec) => acc + sec.items.length, 0);

  const toggleItem = (itemKey: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [itemKey]: !prev[itemKey] };
      try {
        localStorage.setItem('cloudplare_checklist_state', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleReset = () => {
    if (window.confirm('체크리스트 진행 상태를 모두 초기화하시겠습니까?')) {
      setCheckedItems({});
      try {
        localStorage.removeItem('cloudplare_checklist_state');
      } catch {
        // ignore
      }
    }
  };

  const checkedCount = isMounted ? Object.values(checkedItems).filter(Boolean).length : 0;
  const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div>
      {/* Interactive Progress Bar */}
      <div
        style={{
          backgroundColor: 'var(--color-primary-light)',
          border: '1px solid var(--color-border-hover)',
          borderRadius: 'var(--radius-md)',
          padding: '1.2rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              배포 준비 완료도
            </span>
            <span style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-primary)', marginLeft: '0.5rem' }}>
              {progressPercent}%
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginLeft: '0.4rem' }}>
              ({checkedCount}/{totalItems} 완료)
            </span>
          </div>
          {checkedCount > 0 && (
            <button
              onClick={handleReset}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              선택 초기화
            </button>
          )}
        </div>

        {/* Bar */}
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: progressPercent === 100 ? '#10b981' : 'var(--color-primary)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        {progressPercent === 100 && (
          <p style={{ marginTop: '0.6rem', fontSize: '0.84rem', fontWeight: 800, color: '#059669' }}>
            🎉 모든 점검 항목을 완료했습니다! 안전하게 배포를 진행하세요.
          </p>
        )}
      </div>

      {/* Sections */}
      {sections.map((section, secIdx) => (
        <section key={section.title} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '0.85rem', color: 'var(--color-text)' }}>
            {section.title}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {section.items.map((item, itemIdx) => {
              const itemKey = `${secIdx}-${itemIdx}`;
              const isChecked = isMounted && !!checkedItems[itemKey];
              return (
                <label
                  key={item}
                  onClick={() => toggleItem(itemKey)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem 0.95rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isChecked ? '#f1f5f9' : '#f8fafc',
                    border: isChecked ? '1px solid #cbd5e1' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // handled by label onClick
                    style={{
                      marginTop: '0.25rem',
                      accentColor: 'var(--color-primary)',
                      cursor: 'pointer',
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: isChecked ? 'var(--color-text-muted)' : 'var(--color-text)',
                      textDecoration: isChecked ? 'line-through' : 'none',
                      fontWeight: isChecked ? 500 : 600,
                    }}
                  >
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
