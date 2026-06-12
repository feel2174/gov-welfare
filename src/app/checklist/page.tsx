export const metadata = {
  title: '배포 전 확인 체크리스트',
  description: '작은 웹사이트를 배포하기 전 DNS, 메타데이터, sitemap, 캐시, 실제 도메인을 확인하는 CloudPlare 체크리스트입니다.',
};

const sections = [
  {
    title: '주소와 색인',
    items: [
      '기준 주소를 하나로 정하고 내부 링크, canonical, sitemap이 모두 같은 주소를 사용한다.',
      'robots.txt가 sitemap 위치를 정확히 안내하고, 임시 페이지를 색인 대상으로 보내지 않는다.',
      '예전 주제의 URL이 새 사이트 내부 링크나 sitemap에 남아 있지 않다.',
      '404로 정리한 이전 경로가 검색 가능한 목록이나 푸터에 다시 등장하지 않는다.',
    ],
  },
  {
    title: 'DNS와 HTTPS',
    items: [
      'A, CNAME, TXT, MX 레코드의 기존 값을 배포 전 기록했다.',
      '루트 도메인과 www 서브도메인의 연결 방식을 각각 확인했다.',
      'HTTPS 인증서와 http에서 https로의 이동이 실제 브라우저에서 정상이다.',
      '도메인 소유권 확인용 TXT 레코드가 다른 작업 중 삭제되지 않았는지 확인한다.',
    ],
  },
  {
    title: '콘텐츠 품질',
    items: [
      '홈, 목록, 상세 글, 소개 페이지가 모두 같은 사이트 목적을 설명한다.',
      '각 글은 공식 문서 링크만 나열하지 않고 운영자의 판단 기준과 실수 지점을 설명한다.',
      '과장된 표현, 수익 보장, 특정 서비스 오인 표현, 클릭 유도 문구가 없다.',
      '각 글 하단에 출처와 최종 검토일이 보이며, 본문 설명과 출처 주제가 서로 맞는다.',
    ],
  },
  {
    title: '성능과 캐시',
    items: [
      'HTML 문서와 정적 자산의 캐시 정책을 구분한다.',
      '첫 화면에서 불필요한 이미지, 애니메이션, 클라이언트 스크립트를 줄인다.',
      '배포 후 실제 도메인에서 홈, 노트 상세, 정책 페이지를 다시 열어본다.',
      '모바일 320px 폭에서도 메뉴와 제목이 가로로 넘치지 않는다.',
    ],
  },
];

const releaseSteps = [
  ['1단계', '빌드 결과 확인', '배포 전에 build와 lint를 실행하고, 예상하지 못한 동적 라우트나 오래된 경로가 남아 있는지 확인합니다.'],
  ['2단계', '실제 도메인 확인', '배포 후에는 localhost가 아니라 실제 도메인에서 홈, 대표 글, sitemap, robots, 정책 페이지를 엽니다.'],
  ['3단계', '색인 대상 점검', 'sitemap에 들어간 URL은 모두 충분한 본문과 고유한 제목을 가져야 하며, 임시 페이지는 제외합니다.'],
  ['4단계', '운영 기록 남기기', '배포 커밋, 확인한 URL, 발견한 문제, 되돌릴 방법을 짧게 적어 다음 배포의 기준으로 씁니다.'],
];

const failureExamples = [
  'sitemap은 새 주소를 말하지만 푸터 링크는 예전 경로를 가리키는 경우',
  'DNS는 바뀌었지만 브라우저나 CDN 캐시가 이전 HTML을 계속 보여주는 경우',
  '노트 본문은 새 주제인데 개인정보처리방침이나 약관에 이전 사이트 설명이 남아 있는 경우',
  '모바일 폭에서 메뉴가 가로로 넘쳐 첫 화면부터 사이트가 덜 다듬어진 것처럼 보이는 경우',
];

export default function ChecklistPage() {
  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>Release Checklist</p>
        <h1 style={{ fontSize: '1.55rem', fontWeight: 900, marginBottom: '0.55rem' }}>배포 전 확인 체크리스트</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
          이 체크리스트는 CloudPlare 노트를 실제 배포 전에 다시 확인할 수 있도록 압축한 것입니다.
          작은 사이트일수록 배포 버튼보다 기준 주소, 메타데이터, 캐시, 오래된 URL 정리가 더 중요해지는 순간이 많습니다.
        </p>
      </header>

      {sections.map((section) => (
        <section key={section.title} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.12rem', fontWeight: 900, marginBottom: '0.75rem' }}>{section.title}</h2>
          <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.85, paddingLeft: '1.1rem' }}>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}

      <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.12rem', fontWeight: 900, marginBottom: '0.75rem' }}>배포 당일 10분 점검 순서</h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {releaseSteps.map(([step, title, description]) => (
            <article key={step} style={{ backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.95rem 1rem' }}>
              <p style={{ color: 'var(--color-primary)', fontSize: '0.76rem', fontWeight: 850, marginBottom: '0.25rem' }}>{step}</p>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 850, marginBottom: '0.25rem' }}>{title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.12rem', fontWeight: 900, marginBottom: '0.75rem' }}>자주 놓치는 실패 사례</h2>
        <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.85, paddingLeft: '1.1rem' }}>
          {failureExamples.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
