import { AUTHOR_NAME, CONTACT_EMAIL, CONTENT_REVIEWED_AT } from '@/lib/site';

export const metadata = {
  title: '편집 원칙',
  description: 'CloudPlare의 자료 확인, 출처 표시, 검토일, 정정 요청, 광고 독립성 기준입니다.',
  alternates: {
    canonical: '/editorial-policy',
  },
  openGraph: {
    type: 'website',
    url: '/editorial-policy',
    title: '편집 원칙 | CloudPlare',
    description: 'CloudPlare의 자료 확인, 출처 표시, 검토일, 정정 요청, 광고 독립성 기준입니다.',
  },
};

export default function EditorialPolicyPage() {
  const h2 = { fontSize: '1.12rem', fontWeight: 900, marginTop: '2rem', marginBottom: '0.65rem' };
  const p = { fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, marginBottom: '0.7rem' };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <header style={{ paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.55rem', fontWeight: 900, marginBottom: '0.5rem' }}>편집 원칙</h1>
        <p style={{ ...p, marginBottom: 0 }}>최종 검토일: {CONTENT_REVIEWED_AT}</p>
      </header>

      <h2 style={h2}>1. 작성 목적</h2>
      <p style={p}>
        CloudPlare는 {AUTHOR_NAME}이 혼자 운영하는 사이트로, 작은 웹사이트 운영자가 DNS, 배포, 캐시, 성능, 장애 대응을 이해하는 데 필요한 실무형 설명을 제공합니다.
        특정 제품 구매나 광고 클릭을 유도하기보다, 운영자가 직접 확인할 수 있는 판단 기준을 정리하는 것을 우선합니다.
      </p>

      <h2 style={h2}>2. 출처 확인 기준</h2>
      <p style={p}>
        기술 개념과 표준 동작은 MDN, web.dev, Chrome for Developers, Next.js 공식 문서, 검색엔진 공식 문서처럼 공개적으로 검증 가능한 자료를 우선 확인합니다.
        서비스별 세부 설정은 시간이 지나며 바뀔 수 있으므로, 글에서는 특정 화면의 영구적인 위치를 단정하지 않습니다.
      </p>

      <h2 style={h2}>3. 독립적인 설명</h2>
      <p style={p}>
        공식 문서의 문장을 그대로 옮기는 방식은 피합니다. 각 글은 운영자의 문제 상황, 확인 순서, 실수 사례, 되돌리는 기준을 중심으로 다시 설명합니다.
        외부 자료를 참고할 때는 글 하단에 출처를 표시합니다.
      </p>

      <h2 style={h2}>4. 정정 요청</h2>
      <p style={p}>
        오류, 오래된 설명, 오해의 소지가 있는 표현을 발견하면 {CONTACT_EMAIL}로 알려주세요.
        확인 후 필요한 경우 본문과 최종 검토일을 갱신합니다.
      </p>

      <h2 style={h2}>5. 광고와 편집의 분리</h2>
      <p style={p}>
        사이트 운영 비용을 충당하기 위해 광고가 표시될 수 있습니다. 광고는 편집 내용과 분리되며,
        특정 광고주나 서비스가 글의 결론에 영향을 주지 않습니다.
      </p>
    </article>
  );
}
