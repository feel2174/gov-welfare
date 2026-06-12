import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  title: '개인정보처리방침',
  description: 'CloudPlare 개인정보처리방침입니다.',
};

export default function PrivacyPolicy() {
  const h2 = { fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-text)', marginTop: '2rem', marginBottom: '0.6rem' };
  const p = { fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, marginBottom: '0.65rem' };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.55rem', fontWeight: 900, marginBottom: '0.4rem' }}>개인정보처리방침</h1>
      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>시행일: 2026년 6월 12일</p>

      <p style={p}>CloudPlare는 회원가입 기능을 제공하지 않으며, 사이트 이용 과정에서 이름, 주소, 결제 정보와 같은 개인정보를 직접 요구하지 않습니다.</p>

      <h2 style={h2}>1. 문의 시 제공되는 정보</h2>
      <p style={p}>문의 양식 또는 이메일을 통해 이용자가 자발적으로 제공한 이름, 이메일 주소, 문의 내용은 답변과 정정 요청 처리 목적으로만 사용합니다.</p>

      <h2 style={h2}>2. 자동 수집 정보</h2>
      <p style={p}>접속 IP, 브라우저 정보, 방문 페이지, 체류 시간 등은 보안, 통계, 사이트 개선을 위해 분석 도구에서 처리될 수 있습니다. 이 정보는 개인을 직접 식별하기 위한 목적으로 사용하지 않습니다.</p>

      <h2 style={h2}>3. 광고와 쿠키</h2>
      <p style={p}>CloudPlare는 Google AdSense 광고를 게재할 수 있습니다. Google과 제3자 광고 사업자는 쿠키 또는 유사 기술을 사용해 맞춤형 광고를 제공할 수 있으며, 이용자는 브라우저 설정 또는 Google 광고 설정에서 쿠키와 맞춤형 광고를 관리할 수 있습니다.</p>

      <h2 style={h2}>4. 보유와 파기</h2>
      <p style={p}>문의 응대를 위해 받은 이메일은 응대 완료 후 30일 이내 삭제하는 것을 원칙으로 합니다. 법령상 보관 의무가 있는 경우 해당 기간 동안 보관할 수 있습니다.</p>

      <h2 style={h2}>5. 연락처</h2>
      <p style={p}>개인정보 관련 문의는 {CONTACT_EMAIL}로 보내주세요.</p>
    </article>
  );
}
