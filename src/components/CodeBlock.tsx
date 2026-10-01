'use client';

import { useState } from 'react';

export default function CodeBlock({ content, label }: { content: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        borderTopLeftRadius: 'var(--radius-sm)',
        borderTopRightRadius: 'var(--radius-sm)',
        padding: '0.45rem 0.85rem',
        borderBottom: '1px solid #334155',
      }}>
        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#94a3b8' }}>
          {label || 'Terminal / Configuration'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="코드 복사"
          style={{
            background: copied ? '#059669' : '#334155',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '0.22rem 0.55rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
          }}
        >
          {copied ? '✓ 복사완료' : '복사'}
        </button>
      </div>
      <pre
        style={{
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          borderBottomLeftRadius: 'var(--radius-sm)',
          borderBottomRightRadius: 'var(--radius-sm)',
          padding: '1rem',
          overflowX: 'auto',
          fontSize: '0.82rem',
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        <code style={{ fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace" }}>
          {content}
        </code>
      </pre>
    </div>
  );
}

