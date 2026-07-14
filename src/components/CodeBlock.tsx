export default function CodeBlock({ content, label }: { content: string; label?: string }) {
  return (
    <div style={{ marginBottom: '0.85rem' }}>
      {label && (
        <p style={{ fontSize: '0.76rem', fontWeight: 750, color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>
          {label}
        </p>
      )}
      <pre
        style={{
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          borderRadius: 'var(--radius-sm)',
          padding: '0.9rem 1rem',
          overflowX: 'auto',
          fontSize: '0.82rem',
          lineHeight: 1.7,
        }}
      >
        <code style={{ fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace" }}>
          {content}
        </code>
      </pre>
    </div>
  );
}
