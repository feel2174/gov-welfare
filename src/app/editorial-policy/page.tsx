import { AUTHOR_NAME, CONTACT_EMAIL, CONTENT_REVIEWED_AT } from '@/lib/site';

export const metadata = {
  title: '편집 원칙 및 콘텐츠 품질 가이드라인',
  description: 'CloudPlare의 기술 검증 절차, 1차 출처 인용 기준, 최종 검토 주기, 오류 정정 SLA, 광고 독립성 기준입니다.',
  alternates: {
    canonical: '/editorial-policy',
  },
  openGraph: {
    type: 'website',
    url: '/editorial-policy',
    title: '편집 원칙 및 콘텐츠 품질 가이드라인 | CloudPlare',
    description: 'CloudPlare의 기술 검증 절차, 1차 출처 인용 기준, 최종 검토 주기, 오류 정정 SLA, 광고 독립성 기준입니다.',
  },
};

export default function EditorialPolicyPage() {
  const h2 = { fontSize: '1.15rem', fontWeight: 900, marginTop: '2.2rem', marginBottom: '0.75rem', color: 'var(--color-text)' };
  const p = { fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, marginBottom: '0.8rem' };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.2rem 1.6rem' }}>
      <header style={{ paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800 }}>
          Editorial Standards & Ethics
        </span>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginTop: '0.4rem', marginBottom: '0.5rem' }}>
          편집 원칙 및 기술 검증 가이드라인
        </h1>
        <p style={{ ...p, marginBottom: 0 }}>최종 갱신 및 검토: {CONTENT_REVIEWED_AT}</p>
      </header>

      <h2 style={{ ...h2, marginTop: 0 }}>1. 발행 목적과 지향점</h2>
      <p style={p}>
        CloudPlare는 {AUTHOR_NAME}이 직접 작성하고 운영하는 독립 기술 노트입니다.
        소규모 웹사이트 및 서비스 운영자가 DNS 설정, 정적 배포, 캐시 전략, 보안 헤더, 장애 대응을 스스로 점검하고 해결할 수 있도록 실용적이고 정확한 지침을 제공합니다.
        제품 구매나 광고 클릭을 인위적으로 유도하는 상업적 포스팅을 지양하며, 운영자가 현장에서 직접 적용 가능한 판단 기준을 제시하는 것을 최우선 가치로 둡니다.
      </p>

      <h2 style={h2}>2. 1차 출처 인용 및 사실 검증 원칙</h2>
      <p style={p}>
        모든 기술 가이드는 IETF RFC 표준 규격, MDN Web Docs, Chrome for Developers, Next.js 공식 가이드, W3C 명세 등 공개적으로 검증 가능한 1차 문서를 바탕으로 작성됩니다.
        클라우드 서비스 대시보드의 화면 UI나 버튼 위치는 지속적으로 변하므로, 특정 공급자의 일시적인 화면 구성에 의존하기보다 근본적인 HTTP/DNS 동작 원리와 프로토콜 규격을 중심으로 서술합니다.
      </p>

      <h2 style={h2}>3. 실무 테스트와 원저작자 독립성</h2>
      <p style={p}>
        공식 문서의 문장을 번역하거나 짜깁기하는 방식을 엄격히 금지합니다.
        각 노트는 실제 프로덕션 서버와 테스트 환경에서 직접 명령어를 실행해 얻은 터미널 출력(cURL, dig 등), 발생 가능한 에러 로그(ChunkLoadError, 550 SPF Fail 등), 실전 복구 단계를 직접 경험한 뒤 작성됩니다.
      </p>

      <h2 style={h2}>4. AI 생성 텍스트 지양 및 진정성 유지</h2>
      <p style={p}>
        CloudPlare는 독창적 가치가 없는 범용 AI 생성 텍스트의 무분별한 게시를 지양합니다.
        실무자가 겪은 장애 경험, 5 Whys 분석, 구체적인 코드 설정 주석 등 실제 인간 엔지니어의 경험적 가치(Experience)가 담긴 오리지널 콘텐츠만을 발행합니다.
      </p>

      <h2 style={h2}>5. 오류 정정 및 투명한 수정 이력 (SLA)</h2>
      <p style={p}>
        기술 환경의 변화로 인한 오래된 정보나 오류를 발견한 독자는 언제든 {CONTACT_EMAIL}로 정정을 요청할 수 있습니다.
        제보된 내용은 <strong>영업일 기준 24~48시간 이내</strong>에 검토되며, 오류가 확인될 경우 글 상단의 검토일(reviewedAt)과 하단 수정 이력(revisions)에 변경 내역을 투명하게 기록합니다.
      </p>

      <h2 style={h2}>6. 광고 및 스폰서십으로부터의 편집권 분리</h2>
      <p style={p}>
        사이트 호스팅 및 도메인 유지비용 충당을 위해 온라인 디스플레이 광고가 노출될 수 있습니다.
        광고는 기술 콘텐츠의 내용 및 결론과 철저히 분리되며, 광고주나 특정 기업의 이해관계가 편집 원칙과 기술적 사실 평가에 어떠한 영향도 미칠 수 없습니다.
      </p>
    </article>
  );
}
