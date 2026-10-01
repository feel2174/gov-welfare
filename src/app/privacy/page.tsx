import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  title: '개인정보처리방침',
  description: 'CloudPlare 개인정보처리방침입니다.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    type: 'website',
    url: '/privacy',
    title: '개인정보처리방침 | CloudPlare',
    description: 'CloudPlare 개인정보처리방침입니다.',
  },
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

      <h2 style={h2}>3. 광고 및 쿠키(Cookie) 정책</h2>
      <p style={p}>
        CloudPlare는 사이트 운영 지원 및 콘텐츠 유지를 위해 Google AdSense를 통한 온라인 광고를 게재하고 있습니다. 이와 관련하여 다음과 같은 정책이 적용됩니다:
      </p>
      <ul style={{ ...p, paddingLeft: '1.2rem', lineHeight: 1.85 }}>
        <li>
          Google을 포함한 제3자 공급업체는 이용자가 본 웹사이트 또는 다른 웹사이트를 방문한 과거 기록을 바탕으로 광고를 게재하기 위해 쿠키(Cookie)를 사용합니다.
        </li>
        <li>
          Google의 광고 쿠키 사용으로 인해 Google 및 파트너는 이용자의 본 사이트 및/또는 인터넷의 다른 사이트 방문을 기반으로 맞춤형 광고를 제공할 수 있습니다.
        </li>
        <li>
          이용자는 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>Google 광고 설정</a>을 방문하여 맞춤설정 광고를 선택 해제할 수 있습니다.
        </li>
        <li>
          또한 이용자는 <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>aboutads.info</a>를 방문하여 제3자 공급업체의 맞춤형 광고 쿠키 사용을 선택 해제할 수 있습니다.
        </li>
        <li>
          이용자는 웹 브라우저의 설정을 통해 모든 쿠키를 거부하거나, 쿠키가 저장될 때마다 알림을 받도록 제어할 수 있습니다. 다만 쿠키 저장을 거부할 경우 일부 서비스 이용에 불편이 있을 수 있습니다.
        </li>
      </ul>

      <h2 style={h2}>4. 보유와 파기</h2>
      <p style={p}>문의 응대를 위해 받은 이메일은 응대 완료 후 30일 이내 삭제하는 것을 원칙으로 합니다. 법령상 보관 의무가 있는 경우 해당 기간 동안 보관할 수 있습니다.</p>

      <h2 style={h2}>5. 연락처</h2>
      <p style={p}>개인정보 관련 문의는 {CONTACT_EMAIL}로 보내주세요.</p>
    </article>
  );
}
