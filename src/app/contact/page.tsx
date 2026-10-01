import { AUTHOR_NAME, CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  title: '문의 및 기술 오류 제보',
  description: 'CloudPlare 운영 노트의 오류 제보, 기술 정정 요청, 콘텐츠 피드백을 보내는 공식 소통 채널입니다.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: '문의 및 기술 오류 제보 | CloudPlare',
    description: 'CloudPlare 운영 노트의 오류 제보, 기술 정정 요청, 콘텐츠 피드백을 보내는 공식 소통 채널입니다.',
  },
};

export default function ContactPage() {
  const label = { display: 'block' as const, fontSize: '0.88rem', fontWeight: 750, color: 'var(--color-text)', marginBottom: '0.4rem' };
  const input = { width: '100%', boxSizing: 'border-box' as const, padding: '0.85rem 1rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#f8fafc', color: 'var(--color-text)', outline: 'none' };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.2rem 1.6rem' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800 }}>
          Direct Communication Channel
        </span>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginTop: '0.4rem', marginBottom: '0.5rem' }}>
          문의 및 기술 오류 제보
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
          CloudPlare에 게시된 글 중 잘못된 설명, 변경된 최신 표준, 오탈자, 깨진 링크 등을 발견하셨다면 운영자에게 직접 알려주세요.
          모든 제보는 <strong>영업일 기준 24~48시간 이내</strong>에 신속히 검토하여 사이트에 반영합니다.
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <div style={{ backgroundColor: '#eff6ff', border: '1px solid var(--color-border-hover)', borderRadius: 'var(--radius-sm)', padding: '1.1rem 1.25rem' }}>
          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-primary)' }}>DIRECT EMAIL</span>
          <p style={{ color: 'var(--color-text)', fontSize: '1.05rem', fontWeight: 900, marginTop: '0.2rem', marginBottom: '0.3rem' }}>
            {CONTACT_EMAIL}
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            운영자({AUTHOR_NAME}) 개인 메일함으로 바로 전달됩니다.
          </p>
        </div>
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.1rem 1.25rem' }}>
          <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#64748b' }}>RESPONSE SLA</span>
          <p style={{ color: 'var(--color-text)', fontSize: '1.05rem', fontWeight: 900, marginTop: '0.2rem', marginBottom: '0.3rem' }}>
            24~48시간 이내 회신
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            단순 스팸을 제외한 모든 기술적 문의에 성실히 답변드립니다.
          </p>
        </div>
      </div>

      <form action={`mailto:${CONTACT_EMAIL}`} method="post" encType="text/plain">
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={label}>작성자 이름 또는 닉네임</label>
          <input type="text" name="name" placeholder="홍길동" required style={input} />
        </div>
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={label}>회신받으실 이메일 주소</label>
          <input type="email" name="email" placeholder="user@example.com" required style={input} />
        </div>
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={label}>문의 및 제보 유형</label>
          <select name="type" required style={{ ...input, appearance: 'auto' as const }}>
            <option value="">유형을 선택해주세요</option>
            <option value="correction">기술 설명 오류 및 정정 요청</option>
            <option value="outdated">최신 사양 변경 및 업데이트 제보</option>
            <option value="suggestion">새로운 운영 주제 제안</option>
            <option value="general">일반 문의</option>
          </select>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={label}>내용</label>
          <textarea
            name="message"
            placeholder="문제가 발견된 URL과 발생한 현상 또는 정정 제안을 적어주세요."
            required
            rows={6}
            style={{ ...input, resize: 'vertical' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.95rem',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontWeight: 850,
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
        >
          기본 메일 앱으로 전송하기
        </button>
      </form>
    </article>
  );
}
