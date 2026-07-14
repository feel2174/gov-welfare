import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  title: '문의하기',
  description: 'CloudPlare 운영 노트의 오류 제보, 정정 요청, 일반 문의를 보내는 페이지입니다.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: '문의하기 | CloudPlare',
    description: 'CloudPlare 운영 노트의 오류 제보, 정정 요청, 일반 문의를 보내는 페이지입니다.',
  },
};

export default function ContactPage() {
  const label = { display: 'block' as const, fontSize: '0.88rem', fontWeight: 750, color: 'var(--color-text)', marginBottom: '0.4rem' };
  const input = { width: '100%', boxSizing: 'border-box' as const, padding: '0.8rem 1rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#f8fafc', color: 'var(--color-text)', outline: 'none' };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 style={{ fontSize: '1.55rem', fontWeight: 900, marginBottom: '0.5rem' }}>문의하기</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
          오류 제보, 오래된 설명, 정정 요청, 일반 문의를 보내주세요. 가능한 한 확인한 URL과 상황을 함께 적어주시면 더 정확히 확인할 수 있습니다.
        </p>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.7rem' }}>이메일</h2>
        <p style={{ color: 'var(--color-primary)', fontSize: '1rem', fontWeight: 850 }}>{CONTACT_EMAIL}</p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.86rem', lineHeight: 1.75, marginTop: '0.4rem' }}>
          문의 메일은 순차적으로 확인합니다. 기술 설정 상담이나 특정 서비스의 계정 지원은 제공하지 않습니다.
        </p>
      </section>

      <form action={`mailto:${CONTACT_EMAIL}`} method="post" encType="text/plain">
        <div style={{ marginBottom: '1rem' }}>
          <label style={label}>이름 또는 닉네임</label>
          <input type="text" name="name" placeholder="이름" required style={input} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={label}>이메일 주소</label>
          <input type="email" name="email" placeholder="example@email.com" required style={input} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={label}>문의 유형</label>
          <select name="type" required style={{ ...input, appearance: 'auto' as const }}>
            <option value="">선택해주세요</option>
            <option value="correction">오류 또는 정정 요청</option>
            <option value="suggestion">주제 제안</option>
            <option value="general">일반 문의</option>
          </select>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={label}>내용</label>
          <textarea name="message" placeholder="확인한 URL과 상황을 적어주세요." required rows={5} style={{ ...input, resize: 'vertical' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.9rem', backgroundColor: 'var(--color-primary)', color: '#fff', fontSize: '0.95rem', fontWeight: 800, border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
          메일 앱으로 보내기
        </button>
      </form>
    </article>
  );
}
