export interface NoteSource {
  title: string;
  url: string;
}

export interface NoteCodeBlock {
  type: 'code';
  content: string;
  label?: string;
}

export type NoteBodyItem = string | NoteCodeBlock;

export interface NoteSection {
  heading: string;
  body: NoteBodyItem[];
}

export interface NoteRevision {
  date: string;
  note: string;
}

export interface NoteImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface NoteFaq {
  question: string;
  answer: string;
}

export interface CloudNote {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  reviewedAt: string;
  readingMinutes: number;
  summary: string;
  diagram?: string[];
  sections: NoteSection[];
  checklist?: string[];
  faqs?: NoteFaq[];
  sources: NoteSource[];
  revisions: NoteRevision[];
  images?: NoteImage[];
}

export interface GlossaryItem {
  term: string;
  description: string;
  relatedSlug?: string;
}

export const notes: CloudNote[] = [
  {
    slug: 'email-auth-records-for-small-domains',
    title: '메일 인증 레코드(SPF, DKIM, DMARC)를 정리하는 순서',
    description: '도메인 메일을 함께 쓰는 작은 사이트가 SPF, DKIM, DMARC 레코드를 점검하고 단계적으로 강화하는 방법을 정리합니다.',
    category: 'DNS',
    publishedAt: '2026-05-19',
    reviewedAt: '2026-08-24',
    readingMinutes: 5,
    summary: '도메인을 옮기거나 DNS를 정리할 때 가장 늦게 발견되는 문제는 메일입니다. SPF, DKIM, DMARC는 웹 접속과 무관해 보이지만, 누락되면 정상적인 메일이 스팸으로 분류되거나 발신 자체가 막힙니다.',
    diagram: ['SPF TXT 레코드 하나로 통합', 'DKIM 선택자 등록', 'DMARC p=none 모니터링', 'quarantine → reject 단계 강화'],
    sections: [
      {
        heading: '메일도 도메인 신뢰의 일부다',
        body: [
          '작은 사이트를 운영하면서 같은 도메인으로 메일도 함께 쓰는 경우가 많습니다. 웹 호스팅이나 DNS 제공자를 옮길 때 A, CNAME 레코드는 신경 써서 옮기지만, 메일 인증과 관련된 TXT 레코드는 화면에서 잘 보이지 않아 그대로 빠뜨리기 쉽습니다.',
          'SPF, DKIM, DMARC는 메일이 실제로 도메인 소유자가 보낸 것인지 수신 서버가 판단하는 데 쓰는 레코드입니다. 이 값이 없거나 잘못되면 메일 자체는 발송되지만 수신함에 도착하지 못하고 스팸함으로 들어가거나 거부될 수 있습니다.',
          'Gmail과 Yahoo는 2024년부터 일일 5,000건 이상의 대량 발신자뿐만 아니라 일반 발신자에 대해서도 유효한 SPF/DKIM 및 DMARC 레코드 설정을 사실상 의무화했습니다. 미등록 도메인의 메일은 즉시 반송(550 5.7.26 에러)되거나 강력하게 스팸함으로 격리됩니다.',
        ],
      },
      {
        heading: 'SPF는 발신을 허용한 목록이다',
        body: [
          'SPF(Sender Policy Framework)는 이 도메인 이름으로 메일을 보낼 수 있는 서버나 서비스를 TXT 레코드 하나에 나열하는 방식입니다. 흔한 실수는 새 메일 서비스를 추가할 때마다 SPF TXT 레코드를 새로 만들어, 같은 도메인에 SPF 레코드가 여러 개 존재하게 되는 경우입니다. 이렇게 되면 규격상 permerror가 되어 검증 자체가 무효로 처리됩니다.',
          '올바른 방법은 기존 SPF 레코드 안에 include 구문으로 새 서비스를 추가하고, 더 이상 쓰지 않는 서비스의 include는 제거하는 것입니다. 레코드는 항상 도메인당 하나여야 하며, 변경할 때마다 현재 값을 먼저 복사해 두면 실수를 되돌리기 쉽습니다.',
          '또한 SPF는 DNS 조회 횟수(DNS Lookup Limit)가 최대 10회로 제한되어 있습니다. 여러 외부 SaaS(뉴스레터, CS툴, 결제알림)의 include를 무분별하게 추가하면 10회를 초과하여 Temperror가 발생할 수 있으므로 필요 없는 서비스는 정기적으로 정리해야 합니다.',
        ],
      },
      {
        heading: 'DKIM과 DMARC는 서명과 처리 정책이다',
        body: [
          'DKIM(DomainKeys Identified Mail)은 발신 메일에 암호화 서명을 추가하고, 수신 서버가 도메인에 등록된 공개키 TXT 레코드로 그 서명을 확인하는 방식입니다. 이메일 제공자가 안내하는 선택자(selector) 이름과 값을 정확히 등록해야 하며, 메일 제공자를 바꾸면 이전 선택자 레코드는 정리하고 새 값을 등록해야 합니다.',
          'DMARC(Domain-based Message Authentication, Reporting and Conformance)는 SPF와 DKIM 검증에 실패한 메일을 어떻게 처리할지 알려주는 정책입니다. 처음에는 p=none으로 설정해 결과를 모니터링만 하고, 정상적인 발신 흐름을 확인한 뒤 quarantine, reject로 단계적으로 강화하는 편이 안전합니다. 처음부터 reject로 시작하면 누락된 발신 경로의 메일이 한꺼번에 막힐 수 있습니다.',
        ],
      },
      {
        heading: '레코드 실제 값과 조회 방법',
        body: [
          '세 레코드는 모두 TXT로 등록되지만 이름과 형식이 다릅니다. 아래는 조회 명령과, 값을 읽을 때 봐야 하는 지점입니다.',
          { type: 'code', label: 'SPF · DKIM · DMARC 조회', content: `# SPF — 루트 도메인의 TXT 중 v=spf1로 시작하는 항목
dig example.com TXT +short | grep spf1
# "v=spf1 include:_spf.google.com ~all"
#                                  ^^^^ ~all(soft fail) / -all(hard fail)

# DKIM — 선택자(selector)를 알아야 조회된다. 메일 서비스가 알려준 값을 쓴다
dig google._domainkey.example.com TXT +short
# "v=DKIM1; k=rsa; p=MIIBIjANBgkqh..."

# DMARC — 반드시 _dmarc 서브도메인
dig _dmarc.example.com TXT +short
# "v=DMARC1; p=none; rua=mailto:report@example.com"` },
          'SPF에서 가장 흔한 사고는 TXT 레코드를 두 개 만드는 것입니다. v=spf1로 시작하는 TXT가 두 개 있으면 규격상 permerror가 되어 SPF 검사 자체가 실패합니다. 발신 서비스를 추가할 때는 새 레코드를 만들지 말고 기존 값의 include를 늘려야 합니다.',
          'DMARC는 p=none으로 시작해 최소 2주간 rua 리포트를 받아본 뒤 quarantine, reject로 올립니다. 처음부터 p=reject로 두면 미처 SPF/DKIM을 등록하지 못한 발신 경로(예: 결제 알림, 뉴스레터 대행)의 메일이 조용히 사라집니다.',
          { type: 'code', label: '단계적 강화 순서', content: `v=DMARC1; p=none;       rua=mailto:report@example.com   # 1) 2주 관찰
v=DMARC1; p=quarantine; rua=mailto:report@example.com; pct=25   # 2) 25%만 적용
v=DMARC1; p=quarantine; rua=mailto:report@example.com   # 3) 전량
v=DMARC1; p=reject;     rua=mailto:report@example.com   # 4) 최종` },
        ],
      },
    ],
    checklist: [
      '현재 도메인의 SPF TXT 레코드가 하나만 존재하는지 확인했다.',
      '실제로 사용 중인 모든 발신 서비스가 SPF include에 포함되어 있다.',
      '더 이상 쓰지 않는 서비스의 SPF include를 제거했다.',
      'DKIM 선택자 레코드가 이메일 제공자 안내값과 일치한다.',
      'DMARC 레코드가 존재하고 현재 정책 단계(p값)를 알고 있다.',
      'DNS 변경 후 테스트 메일을 보내 인증 결과를 확인했다.',
    ],
    faqs: [
      {
        question: 'SPF 레코드 끝의 ~all과 -all의 차이는 무엇인가요?',
        answer: '~all은 SoftFail로 인증되지 않은 IP라도 메일을 수신자에게 전달하되 스팸 점수를 올리는 방식이며, -all은 HardFail로 즉시 거부(Reject)를 요청합니다. DMARC 설정 전에는 과도한 차단을 방지하기 위해 ~all로 시작하는 것이 안전합니다.',
      },
      {
        question: '여러 개의 메일 서비스(예: Google Workspace와 AWS SES)를 함께 쓸 때 SPF는 어떻게 적나요?',
        answer: '새 TXT 레코드를 만들지 마시고, 하나의 v=spf1 문자열 내에 "v=spf1 include:_spf.google.com include:amazonses.com ~all" 처럼 공백으로 구분하여 include 항목을 연이어 적어야 합니다.',
      },
    ],
    sources: [
      { title: 'Google Workspace 고객센터: SPF, DKIM, DMARC로 이메일 인증 강화', url: 'https://support.google.com/a/answer/10583557' },
      { title: 'DMARC.org: Overview', url: 'https://dmarc.org/overview/' },
    ],
    revisions: [
      { date: '2026-05-19', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'Gmail 발신 정책 의무화 배경 및 FAQ 추가' },
    ],
  },
  {
    slug: 'image-format-and-loading-basics',
    title: '작은 사이트를 위한 이미지 포맷과 로딩 기본',
    description: '사진, 아이콘, 스크린샷처럼 성격이 다른 이미지를 어떤 포맷과 크기로 다뤄야 하는지 운영자 관점에서 정리합니다.',
    category: '성능',
    publishedAt: '2026-05-21',
    reviewedAt: '2026-08-24',
    readingMinutes: 4,
    summary: '이미지는 작은 사이트의 페이지 용량 중 가장 큰 비중을 차지하는 경우가 많습니다. 포맷과 크기를 콘텐츠 성격에 맞게 정리하면 별도 도구 없이도 로딩 속도와 레이아웃 안정성을 함께 개선할 수 있습니다.',
    diagram: ['사진/아이콘 포맷 구분(WebP·SVG)', '표시 크기에 맞게 리사이즈', 'width/height·aspect-ratio 지정', '첫 화면 밖은 lazy loading'],
    sections: [
      {
        heading: '이미지 종류마다 맞는 포맷이 다르다',
        body: [
          '사진이나 화면을 캡처한 이미지는 WebP나 AVIF처럼 압축률이 높은 포맷이 적합합니다. 같은 화질에서 JPEG보다 파일 크기가 작아지는 경우가 많습니다. 반면 로고나 아이콘처럼 선이 분명한 그래픽은 SVG로 다루면 어떤 화면 크기에서도 흐려지지 않고 파일 크기도 작습니다.',
          'AVIF는 WebP보다 약 20% 더 압축률이 우수하지만 인코딩 속도가 느립니다. 정적 사이트 빌드 시에는 WebP를 기본으로 하되, 히어로 이미지 등 핵심 자산에는 AVIF를 picture 태그로 함께 제공하는 것이 이상적입니다.',
        ],
      },
      {
        heading: '원본 크기 그대로 올리지 않는다',
        body: [
          '카메라나 디자인 도구에서 내보낸 원본 이미지는 실제 화면에 표시되는 크기보다 훨씬 큰 경우가 많습니다. 본문 폭이 720px 안팎인 사이트에 2000px 이상의 원본을 그대로 올리면, 방문자는 화면에 보이지도 않는 픽셀까지 모두 내려받게 됩니다. 업로드 전에 표시 크기에 맞춰 한 번 줄이는 작업만으로도 페이지 용량을 크게 줄일 수 있습니다.',
          '여러 화면 크기를 지원해야 한다면 srcset과 sizes 속성으로 화면 폭에 맞는 이미지를 브라우저가 선택하게 할 수 있습니다. 다만 작은 콘텐츠 사이트라면 본문 폭에 맞춘 이미지 한두 개를 잘 준비하는 것만으로도 충분한 경우가 많습니다.',
        ],
      },
      {
        heading: '레이아웃을 흔들지 않는 이미지 태그',
        body: [
          '이미지가 로딩되기 전과 후에 차지하는 공간이 다르면, 텍스트와 버튼이 갑자기 밀리는 레이아웃 흔들림(CLS: Cumulative Layout Shift)이 생깁니다. img 태그에 width와 height를 지정하거나 CSS의 aspect-ratio로 비율을 미리 정해두면, 이미지가 아직 도착하지 않아도 같은 크기의 빈 공간이 먼저 자리를 잡아 화면이 흔들리지 않습니다.',
        ],
      },
      {
        heading: '첫 화면과 그 아래는 다르게 다룬다',
        body: [
          '방문자가 스크롤하지 않고 바로 보는 첫 화면의 이미지는 가능한 한 빨리 보여줘야 합니다. 반면 글 중간이나 하단의 이미지는 화면에 들어오기 직전에 불러와도 충분하므로 loading="lazy" 속성을 적용하면 초기 로딩 부담을 줄일 수 있습니다.',
          '글 하나에 너무 많은 이미지를 넣으면 각 이미지의 효과가 희석되고 페이지 전체 용량만 커집니다. 설명에 꼭 필요한 이미지만 선별하는 편이 읽는 속도와 로딩 속도 모두에 유리합니다.',
        ],
      },
      {
        heading: '형식 선택과 로딩 속성을 정리한다',
        body: [
          '이미지는 형식 선택보다 "언제 받을지"와 "자리를 미리 잡았는지"가 체감에 더 크게 영향을 줍니다.',
          { type: 'code', label: '형식 대체와 로딩 속성', content: `<picture>
  <source srcset="/img/hero.avif" type="image/avif">
  <source srcset="/img/hero.webp" type="image/webp">
  <img src="/img/hero.jpg" alt="설명"
       width="1200" height="630"       <!-- CLS 방지: 반드시 명시 -->
       loading="eager" fetchpriority="high"> <!-- 첫 화면 이미지 -->
</picture>

<!-- 첫 화면 아래 이미지는 반대로 -->
<img src="/img/below.jpg" alt="설명" width="800" height="450"
     loading="lazy" decoding="async">` },
          'width와 height를 적어두면 브라우저가 이미지가 도착하기 전에 자리를 확보해 밀림이 생기지 않습니다. CSS로 크기를 조정하더라도 속성은 남겨 둡니다. 비율만 알려주는 용도이기 때문입니다.',
          '첫 화면에 보이는 이미지에 loading="lazy"를 걸면 오히려 LCP가 나빠집니다. lazy는 화면 아래 이미지에만 쓰고, 첫 화면 대표 이미지에는 fetchpriority="high"를 주는 편이 낫습니다.',
        ],
      },
    ],
    checklist: [
      '사진과 아이콘에 각각 적합한 이미지 포맷을 사용했다.',
      '표시 크기보다 훨씬 큰 원본 이미지를 그대로 올리지 않았다.',
      '주요 이미지에 width, height 또는 aspect-ratio를 지정했다.',
      '첫 화면 밖의 이미지에는 지연 로딩을 적용했다.',
      '이미지 변경 후 페이지 용량과 로딩 시간을 다시 확인했다.',
    ],
    faqs: [
      {
        question: 'CSS로 responsive하게 width: 100%를 주는데도 HTML 속성에 width/height를 써야 하나요?',
        answer: '네, 브라우저는 HTML의 width와 height 속성 비율을 바탕으로 CSS가 적용되기 전부터 고유 가로세로비(aspect-ratio)를 계산해 레이아웃 공간을 예약합니다. 이를 누락하면 이미지가 로딩되면서 주변 텍스트가 덜컹거리는 CLS가 발생합니다.',
      },
      {
        question: '모든 이미지에 loading="lazy"를 넣으면 왜 성능 점수가 떨어지나요?',
        answer: '첫 화면 상단(Above the fold)에 바로 보이는 LCP 대상 이미지에 lazy를 걸면 브라우저가 렌더링을 지연시켜 화면 출력이 늦어집니다. 상단 대표 이미지에는 loading="eager"와 fetchpriority="high"를 주어야 합니다.',
      },
    ],
    sources: [
      { title: 'MDN: Image file type and format guide', url: 'https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types' },
      { title: 'web.dev: Optimize Cumulative Layout Shift', url: 'https://web.dev/articles/optimize-cls' },
    ],
    revisions: [
      { date: '2026-05-21', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'AVIF 비교 분석 및 FAQ 추가' },
    ],
  },
  {
    slug: 'web-font-loading-and-layout-shift',
    title: '웹 폰트 로딩 방식과 레이아웃 흔들림(CLS) 줄이기',
    description: '시스템 폰트와 웹 폰트 전환 시 깜빡임(FOIT)과 밀림(FOUT)을 제어하고 최적의 font-display를 설정하는 방법입니다.',
    category: '성능',
    publishedAt: '2026-05-23',
    reviewedAt: '2026-08-24',
    readingMinutes: 4,
    summary: '웹 폰트는 사이트의 시각적 완성도를 높이지만, 잘못 불러오면 글자가 늦게 뜨거나 글꼴이 바뀌면서 전체 문단이 흔들립니다. font-display와 사전 로딩(preload)으로 깜빡임과 밀림을 최소화하는 기준을 설명합니다.',
    diagram: ['폰트 서브셋 경량화', 'preconnect / preload 적용', 'font-display: swap 또는 optional', '시스템 폴백 폰트 줄 간격 일치'],
    sections: [
      {
        heading: 'FOIT와 FOUT: 폰트 로딩 시 생기는 두 가지 현상',
        body: [
          '웹 폰트가 네트워크를 통해 다운로드되는 동안 브라우저는 두 가지 방식 중 하나로 동작합니다. 폰트가 올 때까지 텍스트를 아예 보여주지 않는 FOIT(Flash of Invisible Text)와, 기본 시스템 폰트로 먼저 보여준 뒤 다운로드가 끝나면 글꼴을 교체하는 FOUT(Flash of Unstyled Text)입니다.',
          'FOIT는 화면이 텅 비어 보이고 LCP 점수를 깎아먹으며, FOUT는 글꼴 폭이나 높이 차이로 인해 줄 바꿈이 다시 일어나면서 심각한 레이아웃 흔들림(CLS)을 유발합니다.',
        ],
      },
      {
        heading: 'font-display 속성 선택 기준',
        body: [
          'CSS @font-face의 font-display 속성으로 이 동작을 제어할 수 있습니다.',
          '대부분의 콘텐츠 사이트에서는 font-display: swap을 권장합니다. 즉시 시스템 폰트로 본문을 읽을 수 있게 하고 폰트가 오면 교체합니다.',
          '만약 폰트 교체로 인한 흔들림이 너무 거슬린다면 font-display: optional을 쓸 수 있습니다. 최초 100ms 이내에 캐시된 폰트가 없으면 이번 방문에서는 시스템 폰트를 유지하고, 백그라운드에서 다운로드해 다음 방문부터 적용합니다.',
          { type: 'code', label: '최적화된 @font-face 설정', content: `@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+AC00-D7A3; /* 한글 완성형만 서브셋 */
}` },
        ],
      },
      {
        heading: 'preload와 preconnect로 다운로드 시점 앞당기기',
        body: [
          'HTML의 head에서 핵심 폰트를 미리 선언하면 브라우저가 CSS 파싱을 끝내기 전부터 폰트 다운로드를 시작합니다.',
          { type: 'code', label: 'Preload 선언', content: `<link rel="preload" href="/fonts/custom.woff2" as="font" type="font/woff2" crossorigin="anonymous">` },
          '반드시 crossorigin="anonymous"를 붙여야 합니다. 폰트 요청은 CORS 규격상 익명 요청으로 처리되므로, 이 속성이 없으면 브라우저가 같은 폰트를 두 번 다운로드합니다.',
        ],
      },
    ],
    checklist: [
      'WOFF2 포맷을 사용하고 불필요한 글리프를 제거한 서브셋 폰트를 쓰고 있다.',
      '모든 @font-face에 적절한 font-display가 명시되어 있다.',
      '첫 화면 본문에 쓰이는 핵심 폰트 1~2개에 preload를 적용했다.',
      'preload 태그에 crossorigin 속성이 누락되지 않았다.',
      '시스템 폴백 폰트의 line-height와 size-adjust를 조정해 전환 시 흔들림을 줄였다.',
    ],
    faqs: [
      {
        question: 'preload 태그에 crossorigin 속성을 왜 꼭 붙여야 하나요?',
        answer: '웹 폰트는 브라우저 보안 규격상 항상 CORS 모드로 요청됩니다. preload에 crossorigin이 없으면 브라우저는 일반 요청으로 먼저 받고, 실제 CSS 파싱 후 CORS 요청으로 폰트를 다시 받아 2배의 트래픽 낭비가 발생합니다.',
      },
      {
        question: '한글 웹 폰트 용량을 줄이는 가장 효과적인 방법은 무엇인가요?',
        answer: '현대 한글 11,172자 전체가 아닌 자주 쓰이는 2,350자만 추출한 서브셋(Subset) WOFF2를 사용하는 것입니다. 파일 용량이 2~4MB에서 300~500KB 이하로 80% 이상 감소합니다.',
      },
    ],
    sources: [
      { title: 'web.dev: Best practices for fonts', url: 'https://web.dev/articles/font-best-practices' },
      { title: 'MDN: @font-face font-display', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display' },
    ],
    revisions: [
      { date: '2026-05-23', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: '서브셋 최적화 및 FAQ 보강' },
    ],
  },
  {
    slug: 'http-security-headers-starter',
    title: '작은 사이트에 꼭 필요한 HTTP 보안 헤더 5가지',
    description: 'X-Content-Type-Options, Referrer-Policy, HSTS, CSP 등 사이트를 안전하게 지키는 기본 보안 헤더 설정법을 정리합니다.',
    category: '보안',
    publishedAt: '2026-05-26',
    reviewedAt: '2026-08-24',
    readingMinutes: 5,
    summary: '웹사이트 보안은 거창한 방화벽 솔루션만 의미하지 않습니다. 웹 서버나 호스팅 설정에 단 5개의 HTTP 헤더를 추가하는 것만으로도 클릭재킹, MIME 스니핑, 비암호화 통신 다운그레이드 공격을 효과적으로 방어할 수 있습니다.',
    diagram: ['X-Content-Type-Options: nosniff', 'Strict-Transport-Security(HSTS)', 'X-Frame-Options / frame-ancestors', 'Referrer-Policy & Permissions-Policy'],
    sections: [
      {
        heading: '보안 헤더가 왜 필요한가',
        body: [
          '브라우저는 기본적으로 웹 서버의 응답을 신뢰하도록 설계되었지만, 악의적인 스크립트 삽입이나 악성 사이트의 프레임 삽입 공격에는 취약할 수 있습니다.',
          'HTTP 응답 헤더는 "이 콘텐츠를 어떻게 해석하고 어떤 브라우저 기능을 허용할 것인가"를 브라우저에 지시하는 공식 지침입니다. 작은 사이트라도 이 헤더들을 올바르게 내려주지 않으면 보안 스캐너나 검색엔진의 신뢰도 평가에서 감점을 받을 수 있습니다.',
        ],
      },
      {
        heading: '반드시 넣어야 하는 5가지 핵심 헤더',
        body: [
          '1. X-Content-Type-Options: nosniff — 브라우저가 파일의 Content-Type을 무시하고 파일 내용을 추측해 실행하는 MIME 스니핑을 방지합니다.',
          '2. Strict-Transport-Security (HSTS) — 브라우저가 이후 사이트에 접속할 때 항상 HTTPS만 사용하도록 강제합니다. 중간자 공격(MitM)을 차단합니다.',
          '3. Referrer-Policy: strict-origin-when-cross-origin — 다른 사이트로 이동할 때 상세 URL 파라미터가 유출되지 않도록 제어합니다.',
          '4. Permissions-Policy: camera=(), microphone=(), geolocation=() — 사이트에서 사용하지 않는 브라우저 민감 API(카메라, 마이크 등)를 비활성화합니다.',
          '5. Content-Security-Policy (CSP) — 허용되지 않은 출처의 스크립트 실행이나 프레임 삽입을 막는 가장 강력한 방어선입니다.',
        ],
      },
      {
        heading: '실제 서버 및 Next.js 적용 예시',
        body: [
          { type: 'code', label: 'next.config.js / ts 적용 예시', content: `// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};` },
          { type: 'code', label: 'curl을 통한 헤더 검증', content: `curl -I https://example.com | grep -E -i "x-content|strict-transport|referrer|permissions"` },
        ],
      },
    ],
    checklist: [
      'X-Content-Type-Options nosniff 설정이 확인된다.',
      'HSTS 헤더가 최소 1년 이상의 max-age로 설정되어 있다.',
      '외부로 링크가 나갈 때 민감 경로가 남지 않도록 Referrer-Policy가 설정되었다.',
      '외부 사이트가 내 페이지를 iframe에 심지 못하도록 프레임 제어 헤더가 있다.',
      'SecurityHeaders.com 같은 검증 도구에서 A 등급 이상을 받았다.',
    ],
    faqs: [
      {
        question: 'HSTS 설정 시 includeSubDomains 플래그를 넣을 때 주의할 점은 무엇인가요?',
        answer: '루트 도메인에 includeSubDomains를 걸면 아직 HTTPS 인증서가 준비되지 않은 내부 개발 서버나 스테이징 서브도메인까지 브라우저가 강제로 HTTPS 접속을 시도해 접속 불가 장애가 발생할 수 있습니다. 모든 서브도메인이 HTTPS를 지원하는지 먼저 확인해야 합니다.',
      },
      {
        question: 'CSP를 처음 도입할 때 기존 스크립트가 깨지지 않게 적용하려면 어떻게 하나요?',
        answer: 'Content-Security-Policy 대신 Content-Security-Policy-Report-Only 헤더를 먼저 사용하세요. 실제 브라우저 동작은 차단하지 않고 위반 사항만 콘솔이나 리포트 수집 엔드포인트로 전송하므로 안전하게 화이트리스트를 완성할 수 있습니다.',
      },
    ],
    sources: [
      { title: 'MDN: HTTP headers - Security', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security' },
      { title: 'OWASP: Secure Headers Project', url: 'https://owasp.org/www-project-secure-headers/' },
    ],
    revisions: [
      { date: '2026-05-26', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'HSTS 주의사항 및 CSP 단계적 적용 FAQ 보강' },
    ],
  },
  {
    slug: 'custom-404-and-broken-link-routine',
    title: '작은 사이트의 커스텀 404 페이지와 깨진 링크 점검 루틴',
    description: '오래된 페이지나 오타로 들어온 방문자를 유실하지 않는 404 안내 화면과 정기적인 링크 점검 방식을 정리합니다.',
    category: '운영',
    publishedAt: '2026-05-29',
    reviewedAt: '2026-08-24',
    readingMinutes: 4,
    summary: '404 페이지는 단순한 오류 화면이 아니라 길을 잃은 방문자를 올바른 콘텐츠로 안내하는 중요한 전환점입니다. 검색엔진 크롤러의 크롤링 예산을 아끼고 사용자 이탈을 막는 404 구성 및 깨진 링크 추적 루틴을 살펴봅니다.',
    diagram: ['명확한 오류 고지 및 검색 제공', '핵심 카테고리 바로가기 링크', 'HTTP 상태 코드 404 준수', '주기적 링크 유효성 크롤링'],
    sections: [
      {
        heading: '기본 404 화면을 방치하면 안 되는 이유',
        body: [
          '프레임워크나 웹 서버의 기본 404 페이지(예: Nginx 404 Not Found 흰 화면)는 방문자에게 사이트가 완전히 망가졌다는 인상을 줍니다.',
          '헤더나 네비게이션이 없는 404 페이지에 도달한 방문자의 90% 이상은 뒤로 가기나 탭 닫기로 사이트를 이탈합니다. 사이트의 전체 레이아웃과 브랜드를 유지하면서 다른 유용한 글로 유도해야 합니다.',
        ],
      },
      {
        heading: '좋은 404 페이지의 조건',
        body: [
          '1. 반드시 HTTP 404 상태 코드를 반환해야 합니다. 일부 개발자가 사용자 친화적 처리를 한답시고 200 OK를 반환하거나 홈으로 302 리다이렉트(Soft 404)를 시키는데, 이는 구글 검색엔진이 중복 페이지나 인덱싱 오류로 판단하게 만드는 치명적인 실수입니다.',
          '2. 검색 바 또는 최근 인기 글 목록을 배치하여 방문자가 원하는 정보를 찾을 수 있는 다음 행동을 제시합니다.',
          '3. 광고 스크립트나 트래킹을 남발하지 않습니다. 본문이 없는 오류 화면에 광고를 게재하는 것은 주요 광고 플랫폼 정책 위반 사유가 되며 방문자 경험을 해칩니다.',
        ],
      },
      {
        heading: '깨진 링크(Broken Link) 정기 점검 명령어',
        body: [
          { type: 'code', label: 'wget을 활용한 내부 깨진 링크 점검', content: `# 사이트 내 모든 내부 링크를 재귀적으로 탐색해 404 링크 검출
wget --spider -r -nd -nv -H -l 3 -o broken-links.log https://example.com

# 에러 로그 필터링
grep -B1 'broken link' broken-links.log` },
        ],
      },
    ],
    checklist: [
      '커스텀 404 페이지가 사이트 전역 레이아웃과 헤더/푸터를 포함하고 있다.',
      '실제 HTTP 응답 상태 코드가 404 Not Found로 정상 반환된다 (Soft 404 방지).',
      '홈 및 주요 카테고리로 바로 이동할 수 있는 버튼이 있다.',
      '404 화면에는 불필요한 광고 코드가 로드되지 않는다.',
      '한 달에 한 번씩 내부/외부 깨진 링크를 크롤링하여 고친다.',
    ],
    faqs: [
      {
        question: 'Soft 404가 검색엔진 최적화(SEO)에 왜 치명적인가요?',
        answer: '없는 페이지 주소인데 서버가 200 OK 상태 코드와 함께 오류 문구를 내려주면, 검색 크롤러는 이를 정상적인 고유 페이지로 착각해 색인을 시도합니다. 결과적으로 중복 콘텐츠 및 저품질 페이지로 분류되어 사이트 전체의 크롤링 신뢰도가 하락합니다.',
      },
      {
        question: '글의 URL을 바꿨을 때 404 대신 301 리다이렉트를 걸어야 하는 이유는 무엇인가요?',
        answer: '기존 URL이 갖고 있던 외부 백링크와 검색엔진 인덱스 점수를 새 주소로 100% 승계하기 위해서입니다. 404로 방치하면 기존 유입 트래픽과 검색 순위를 모두 잃게 됩니다.',
      },
    ],
    sources: [
      { title: 'Google Search Central: Soft 404 오류 수정', url: 'https://developers.google.com/search/docs/crawling-indexing/soft-404-errors' },
      { title: 'W3C: Link Checker', url: 'https://validator.w3.org/checklink' },
    ],
    revisions: [
      { date: '2026-05-29', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'Soft 404 위험성 및 FAQ 보강' },
    ],
  },
  {
    slug: 'reading-access-logs-small-sites',
    title: '작은 사이트 운영자를 위한 웹 서버 액세스 로그 읽기',
    description: 'Nginx, Vercel, Cloudflare 액세스 로그에서 비정상 트래픽, 스크래퍼, 404 급증을 찾아내는 실무 요령입니다.',
    category: '운영',
    publishedAt: '2026-06-01',
    reviewedAt: '2026-08-24',
    readingMinutes: 5,
    summary: '서버가 느려지거나 대역폭 비용이 튀었을 때 가장 먼저 열어봐야 하는 것은 액세스 로그입니다. 복잡한 모니터링 도구 없이도 터미널 한 줄로 공격 봇, 느린 응답, 무차별 요청을 짚어내는 방법을 정리합니다.',
    diagram: ['로그 포맷 구조 이해', '응답 코드별 집계(2xx, 4xx, 5xx)', '요청 IP 및 User-Agent 순위', '비정상 패턴 IP 차단'],
    sections: [
      {
        heading: '로그 한 줄에 담겨 있는 정보',
        body: [
          '표준 Nginx 결합 로그 포맷(Combined Log Format)은 다음 순서로 기록됩니다.',
          '클라이언트 IP - 인증사용자 [접속시간] "HTTP메서드 요청URL HTTP버전" 상태코드 바이트수 "Referer" "User-Agent"',
          '이 중에서 작은 사이트 운영자가 집중해서 봐야 할 지표는 상태 코드(Status Code), 응답 바이트 수, 그리고 User-Agent입니다.',
        ],
      },
      {
        heading: '터미널 실전 로그 분석 명령어',
        body: [
          '별도 유료 로그 분석기를 깔지 않아도 awk, sort, uniq 조합만으로 강력한 진단이 가능합니다.',
          { type: 'code', label: '자주 쓰이는 로그 파싱 한 줄 명령어', content: `# 1. 가장 요청이 많은 상위 10개 IP 확인
cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10

# 2. HTTP 상태 코드별 발생 비율 확인
cat access.log | awk '{print $9}' | sort | uniq -c | sort -nr

# 3. 404를 가장 많이 유발한 요청 경로 Top 10
grep ' 404 ' access.log | awk '{print $7}' | sort | uniq -c | sort -nr | head -n 10

# 4. 의심스러운 User-Agent(봇, 스크래퍼) 상위 조회
cat access.log | awk -F'"' '{print $6}' | sort | uniq -c | sort -nr | head -n 10` },
        ],
      },
      {
        heading: '로그에서 확인되는 흔한 공격 징후',
        body: [
          'WordPress를 쓰지 않는 사이트인데도 /wp-login.php, /wp-admin/, /.env, /phpmyadmin 같은 경로로 404가 수천 건씩 찍힌다면 자동화된 취약점 스캐너가 사이트를 훑고 있는 것입니다.',
          '이런 트래픽은 사이트에 심각한 위험을 주지는 않지만 서버 CPU와 접속 커넥션을 불필요하게 낭비하므로, WAF나 Nginx 레벨에서 차단 규칙을 적용하는 것이 좋습니다.',
        ],
      },
    ],
    checklist: [
      '웹 서버의 로그 로테이션(logrotate)이 설정되어 디스크 고갈을 방지하고 있다.',
      '특정 IP에서 초당 수십 건 이상의 요청이 발생하는지 점검했다.',
      '404 에러 중 실제 사이트 링크 오류인지 외부 스캔 공격인지 구분했다.',
      '500대 서버 에러가 기록된 시간대와 원인을 파악했다.',
    ],
    faqs: [
      {
        question: 'Vercel이나 Netlify 같은 서버리스 호스팅에서는 로그를 어떻게 보나요?',
        answer: 'Vercel 대시보드의 Logs 탭에서 실시간 스트리밍 로그를 보거나, Log Drains 기능을 통해 Datadog, Axiom, 또는 AWS S3로 로그를 스트리밍하여 장기 보관 및 검색할 수 있습니다.',
      },
      {
        question: '취약점 스캐너 봇들이 404를 유발할 때 서버 성능을 지키려면 어떻게 하나요?',
        answer: 'Nginx에서 location ~* \\.(env|git|php) { return 444; } 처럼 설정하면 HTTP 응답 바디조차 내려주지 않고 TCP 연결을 즉시 끊어버려(Connection Closed Without Response) 서버 자원 소모를 최소화할 수 있습니다.',
      },
    ],
    sources: [
      { title: 'Nginx: Configuring HTTP Access Logs', url: 'https://docs.nginx.com/nginx/admin-guide/monitoring/logging/' },
      { title: 'OWASP: Automated Threats to Web Applications', url: 'https://owasp.org/www-project-automated-threats-to-web-applications/' },
    ],
    revisions: [
      { date: '2026-06-01', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: '공격 패턴 차단(444) 실무 팁 및 FAQ 보강' },
    ],
  },
  {
    slug: 'dns-records-before-deploy',
    title: '배포 전 반드시 기록해둬야 할 DNS 레코드 스냅샷',
    description: '호스팅 이전이나 네임서버 변경 시 기존 레코드를 누락해 생기는 다운타임을 방지하는 점검 절차입니다.',
    category: 'DNS',
    publishedAt: '2026-06-03',
    reviewedAt: '2026-08-24',
    readingMinutes: 4,
    summary: '도메인 이전이나 네임서버 전환 작업에서 가장 큰 사고는 "기존 레코드가 무엇이었는지 모른 채" 네임서버를 바꿔버리는 것입니다. 이전 전 스냅샷을 백업하고 TTL을 낮추는 안전한 이전 공식을 공유합니다.',
    diagram: ['기존 Zone 파일 백업(dig ANY / axfr)', 'TTL을 300초(5분)로 하향', '새 네임서버에 동일 레코드 사전 입력', '네임서버 전환 후 전파 모니터링'],
    sections: [
      {
        heading: 'DNS 변경 사고가 가장 무서운 이유',
        body: [
          '코드는 문제가 생기면 git revert로 1초 만에 롤백할 수 있습니다. 하지만 DNS는 한 번 잘못 변경하면 전 세계 로컬 캐시 DNS 서버에 이전/잘못된 값이 캐싱(TTL)되어 되돌리는 데 몇 시간에서 며칠이 걸립니다.',
          '특히 메일(MX), 서브도메인 API, 도메인 소유권 인증 TXT 레코드가 증발하면 비즈니스에 치명적인 공백이 생깁니다.',
        ],
      },
      {
        heading: '배포 48시간 전 TTL 낮추기',
        body: [
          '일반적인 DNS 레코드의 TTL은 86400초(24시간) 또는 43200초(12시간)로 잡혀 있습니다.',
          '이 상태에서 값을 바꾸면 변경사항이 반영되기까지 24시간이 걸립니다. 배포 예정일 2~3일 전에 변경할 레코드의 TTL을 300초(5분) 또는 60초로 미리 줄여두어야 배포 당일 즉각적인 전환과 신속한 롤백이 가능합니다.',
        ],
      },
      {
        heading: '원클릭 DNS 전체 백업 스크립트',
        body: [
          { type: 'code', label: '현재 도메인 레코드 캡처 스크립트', content: `# 주요 레코드 유형별 조회 및 파일 저장
DOMAIN="example.com"
echo "=== A Record ===" > dns-backup.txt
dig $DOMAIN A +short >> dns-backup.txt

echo "=== AAAA Record ===" >> dns-backup.txt
dig $DOMAIN AAAA +short >> dns-backup.txt

echo "=== CNAME Record ===" >> dns-backup.txt
dig www.$DOMAIN CNAME +short >> dns-backup.txt

echo "=== MX Record ===" >> dns-backup.txt
dig $DOMAIN MX +short >> dns-backup.txt

echo "=== TXT Record ===" >> dns-backup.txt
dig $DOMAIN TXT +short >> dns-backup.txt

echo "=== NS Record ===" >> dns-backup.txt
dig $DOMAIN NS +short >> dns-backup.txt` },
        ],
      },
    ],
    checklist: [
      '이전 전 전체 DNS 레코드 스냅샷 텍스트 파일을 로컬에 저장했다.',
      '이전 48시간 전에 주요 A, CNAME 레코드의 TTL을 300초로 낮췄다.',
      '새 네임서버에 기존 레코드(특히 MX와 메일 TXT)를 모두 사전 등록했다.',
      '전환 후 1.1.1.1, 8.8.8.8 등 주요 퍼블릭 리졸버에서 변경을 확인했다.',
    ],
    faqs: [
      {
        question: '루트 도메인(@)에 CNAME 레코드를 연결할 수 없는데 왜 그런가요?',
        answer: 'DNS 표준(RFC 1912)상 CNAME은 다른 모든 레코드와 공존할 수 없습니다. 루트 도메인에는 SOA와 NS 레코드가 필수이므로 CNAME을 둘 수 없습니다. 이를 해결하려면 Cloudflare의 CNAME Flattening이나 AWS Route53의 ALIAS 같은 특수 기능을 지원하는 DNS 서비스를 써야 합니다.',
      },
      {
        question: '네임서버 변경 후 전 세계 전파가 완료되었는지 어떻게 확인하나요?',
        answer: 'DNSChecker.org 같은 글로벌 DNS 전파 확인 도구를 쓰거나, 터미널에서 "dig @8.8.8.8 example.com" 및 "dig @1.1.1.1 example.com" 처럼 글로벌 주요 리졸버에 직접 쿼리를 날려 새 IP가 반환되는지 비교하면 됩니다.',
      },
    ],
    sources: [
      { title: 'RFC 1035: Domain Names - Implementation and Specification', url: 'https://datatracker.ietf.org/doc/html/rfc1035' },
      { title: 'Cloudflare Docs: Manage DNS records', url: 'https://developers.cloudflare.com/dns/manage-dns-records/' },
    ],
    revisions: [
      { date: '2026-06-03', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: '루트 CNAME 제한(RFC 1912) 해설 및 FAQ 보강' },
    ],
  },
  {
    slug: 'static-site-release-checklist',
    title: '정적 사이트 배포 직후 5분 안에 마쳐야 하는 점검 목록',
    description: '배포 버튼을 누른 뒤 개발자가 안도하기 전에 반드시 실제 도메인에서 확인해야 할 7가지 항목입니다.',
    category: '배포',
    publishedAt: '2026-06-05',
    reviewedAt: '2026-08-24',
    readingMinutes: 4,
    summary: '로컬(localhost)에서 잘 동작했다고 배포가 끝난 것이 아닙니다. 환경변수 누락, 절대 경로 자산 404, sitemap 갱신 실패 등은 실제 배포 환경에서만 발생합니다. 5분 안에 사이트 이상 유무를 판별하는 절차를 정리합니다.',
    diagram: ['실제 프로덕션 도메인 접속', '캐시 무효화 및 새 빌드 해시 확인', '콘솔 에러 및 네트워크 탭 점검', 'sitemap.xml 및 robots.txt 확인'],
    sections: [
      {
        heading: '로컬 환경과 프로덕션 환경의 간극',
        body: [
          '로컬에서는 .env.local이 로드되고 번들링 전의 원본 모듈이 실행되므로, 환경변수 철자 오타나 대소문자 파일명 불일치(macOS는 대소문자 무시, Linux 서버는 구분)가 감지되지 않습니다.',
          '배포가 완료되면 반드시 시크릿 브라우징 창(Private Window)을 켜고 실제 도메인으로 접속해야 합니다. 브라우저 캐시가 남아 있으면 이전 버전 화면을 보며 정상이라 착각하기 쉽습니다.',
        ],
      },
      {
        heading: '실제 도메인 5분 점검 절차',
        body: [
          '1. 홈 화면 강제 새로고침(Ctrl+F5 / Cmd+Shift+R) 후 콘솔 에러가 0건인지 확인합니다.',
          '2. 개발자 도구의 Network 탭에서 JS, CSS 번들 파일이 200 또는 304로 정상 다운로드되는지 봅니다. 404가 발생한다면 이전 배포의 캐시된 HTML이 새 빌드 해시 자산을 찾지 못하는 상태입니다.',
          '3. 임의의 오타 경로(예: /non-existent-page)를 입력해 커스텀 404 페이지가 정상 출력되고 HTTP 404를 반환하는지 확인합니다.',
          '4. /robots.txt와 /sitemap.xml 주소를 직접 열어 도메인이 localhost가 아닌 실제 프로덕션 URL로 적혀 있는지 확인합니다.',
        ],
      },
      {
        heading: '배포 검증을 위한 컬(curl) 테스트',
        body: [
          { type: 'code', label: 'HTTP 응답 및 리다이렉트 빠른 확인', content: `# 프로덕션 도메인 HTTP 상태 코드 및 압축 전송 여부
curl -sI -H "Accept-Encoding: gzip, br" https://example.com | head -n 15

# sitemap.xml의 첫 머리 확인 (localhost 주소 오염 여부 검증)
curl -s https://example.com/sitemap.xml | head -n 10` },
        ],
      },
    ],
    checklist: [
      '브라우저 시크릿 창에서 콘솔 에러가 없음을 확인했다.',
      'sitemap.xml 내 모든 URL이 프로덕션 도메인으로 출력된다.',
      'robots.txt가 크롤러 접근을 차단(Disallow: /)하고 있지 않다.',
      '모바일 뷰포트에서 레이아웃 가로 스크롤이 발생하지 않는다.',
      '주요 내비게이션 링크와 검색 기능이 정상 동작한다.',
    ],
    faqs: [
      {
        question: '배포 후 사용자들이 옛날 화면이 계속 보인다고 할 때 원인은 무엇인가요?',
        answer: 'index.html 같은 HTML 파일에 브라우저 캐시 헤더(Cache-Control: public, max-age=...)가 길게 설정되어 있기 때문입니다. HTML 문서는 항상 "no-cache"를 주어 매번 원본 서버에 변경 여부를 ETag로 확인하게 해야 합니다.',
      },
      {
        question: 'Git 커밋 푸시 후 Vercel 빌드는 성공했는데 런타임 오류가 날 때는 어떻게 확인하나요?',
        answer: '환경변수(Environment Variables)가 프로덕션(Production) 환경에 체크되어 있지 않거나, NEXT_PUBLIC_ 접두사가 빠져 클라이언트 컴포넌트에서 undefined로 참조되었을 가능성이 가장 높습니다.',
      },
    ],
    sources: [
      { title: 'Google Search Central: 사이트 상태 확인', url: 'https://developers.google.com/search/docs/monitor-debug/debugging-search' },
      { title: 'MDN: Cross-browser testing', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Cross_browser_testing' },
    ],
    revisions: [
      { date: '2026-06-05', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'HTML 캐시 무효화 기준 및 FAQ 보강' },
    ],
  },
  {
    slug: 'http-cache-control-field-notes',
    title: '실수하기 쉬운 HTTP Cache-Control 설정 지침',
    description: 'HTML 문서, 불변 자산(JS/CSS), 이미지 각각에 어울리는 Cache-Control 헤더 조합을 정리합니다.',
    category: '캐시',
    publishedAt: '2026-06-06',
    reviewedAt: '2026-08-24',
    readingMinutes: 5,
    summary: '캐시 설정에서 단 하나의 단어를 잘못 쓰면 사이트 업데이트가 전 세계 사용자에게 반영되지 않거나, 반대로 매 요청마다 서버가 다운될 정도로 과도한 트래픽이 발생합니다. 자산 성격별 최적의 캐시 공식을 정리합니다.',
    diagram: ['HTML: no-cache, no-transform', '해시 자산(JS/CSS): max-age=31536000, immutable', '이미지: max-age=86400, stale-while-revalidate', '공유 캐시: s-maxage 활용'],
    sections: [
      {
        heading: 'no-cache와 no-store는 완전히 다르다',
        body: [
          '가장 흔한 오해가 no-cache가 캐시를 하지 말라는 뜻이라고 착각하는 것입니다.',
          'no-cache는 "응답을 로컬에 저장해도 좋지만, 재사용하기 전에 반드시 원본 서버에 ETag나 Last-Modified로 검증을 받아라"는 뜻입니다. 반면 no-store는 "어떤 캐시 저장소에도 응답을 절대 저장하지 마라"는 뜻으로 개인정보나 결제 화면에 쓰는 설정입니다.',
          'HTML 문서는 no-store가 아니라 no-cache를 설정하는 것이 표준입니다. 이렇게 하면 변경이 없을 때는 304 Not Modified로 빠르게 통신하고, 새 배포가 생겼을 때만 새 HTML을 내려줄 수 있습니다.',
        ],
      },
      {
        heading: '불변 자산(Immutable Assets)에는 1년 캐시',
        body: [
          'Next.js, Vite, Webpack 등 현대 번들러로 빌드된 정적 자산(/_next/static/...)은 파일명에 고유한 콘텐츠 해시(예: main-8f92a.js)가 포함되어 있습니다.',
          '파일 내용이 바뀌면 이름 자체가 바뀌므로, 이 자산들은 브라우저나 CDN이 평생 캐싱해도 절대 구버전 충돌이 생기지 않습니다. 따라서 max-age=31536000(1년)과 immutable 속성을 부여해 네트워크 요청 자체를 없애야 합니다.',
          { type: 'code', label: '자산 성격별 최적 헤더 조합', content: `# 1. HTML 파일
Cache-Control: public, max-age=0, must-revalidate

# 2. 파일명에 해시가 붙은 JS, CSS 자산
Cache-Control: public, max-age=31536000, immutable

# 3. 고정 파일명의 이미지, 파비콘, 폰트
Cache-Control: public, max-age=86400, stale-while-revalidate=604800` },
        ],
      },
      {
        heading: 'stale-while-revalidate의 마법',
        body: [
          'stale-while-revalidate 지시자는 브라우저가 오래된 캐시(Stale)를 사용자에게 즉시 보여주는 동시에, 백그라운드에서 조용히 원본 서버에 새 버전을 요청해 캐시를 갱신하는 기법입니다.',
          '사용자는 로딩 지연을 전혀 느끼지 않으면서도 백그라운드에서 항상 최신 자산으로 유지되는 장점이 있습니다.',
        ],
      },
    ],
    checklist: [
      'HTML 문서 응답에 긴 max-age가 걸려 있지 않다.',
      '빌드 해시가 포함된 JS/CSS에 max-age=31536000, immutable이 지정되었다.',
      'API 응답 중 민감한 개인정보에는 no-store가 적용되었다.',
      'curl -I 명령으로 주요 리소스의 실제 Cache-Control 값을 직접 확인했다.',
    ],
    faqs: [
      {
        question: 'immutable 지시자는 실제로 어떤 효과가 있나요?',
        answer: '사용자가 브라우저에서 F5(새로고침)를 누를 때, 브라우저는 보통 모든 캐시 자원에 대해 서버로 304 조건부 요청을 다시 보냅니다. 하지만 immutable이 붙어 있으면 사용자가 새로고침을 해도 서버로 요청 자체를 아예 보내지 않고 로컬 캐시에서 즉시 꺼내 씁니다.',
      },
      {
        question: 'HTML에 no-cache를 주었는데도 변경사항이 바로 반영되지 않는 이유는 무엇인가요?',
        answer: 'CDN(Cloudflare, CloudFront 등)이 중간에 껴 있고 CDN 쪽에 Edge Cache TTL이 별도로 설정되어 원본 서버의 no-cache를 무시하고 엣지에서 이전 HTML을 서빙하고 있을 가능성이 높습니다. CDN의 캐시 퍼지(Purge)를 실행해야 합니다.',
      },
    ],
    sources: [
      { title: 'MDN: Cache-Control', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control' },
      { title: 'web.dev: Prevent unnecessary network requests with the HTTP Cache', url: 'https://web.dev/articles/http-cache' },
    ],
    revisions: [
      { date: '2026-06-06', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'stale-while-revalidate 상세 및 FAQ 보강' },
    ],
  },
  {
    slug: 'cdn-cache-mistakes-small-sites',
    title: '작은 사이트 운영자가 자주 겪는 CDN 캐시 실수 4가지',
    description: 'Cloudflare 같은 CDN을 도입한 뒤 겪는 HTML 캐시 갇힘, 동적 쿠키 무시, SSL 리다이렉트 무한 루프 해결법입니다.',
    category: '캐시',
    publishedAt: '2026-06-07',
    reviewedAt: '2026-08-24',
    readingMinutes: 5,
    summary: 'CDN은 트래픽 비용을 아끼고 속도를 높여주는 고마운 도구지만, 기본 동작 방식을 오해하면 심각한 운영 장애를 부릅니다. 작은 사이트에서 실제로 반복되는 4대 CDN 사고와 대응법을 짚어봅니다.',
    diagram: ['Cache Everything 오남용 주의', 'SSL Flexible 모드의 무한 루프', '배포 시 CDN Cache Purge 자동화', 'Bypass Cache on Cookie 설정'],
    sections: [
      {
        heading: '실수 1 — Cache Everything 룰로 로그인 세션 캐싱',
        body: [
          '페이지 로딩 속도를 높이겠다고 CDN 페이지 룰에 "Cache Level: Cache Everything"을 무작정 걸어버리는 경우가 있습니다.',
          '이러면 정적 파일뿐만 아니라 사용자의 로그인 쿠키나 인증 정보가 포함된 HTML까지 CDN 엣지에 캐싱되어, 다른 사용자에게 특정 사용자의 개인정보나 로그인된 화면이 노출되는 심각한 보안 사고가 터집니다.',
        ],
      },
      {
        heading: '실수 2 — SSL Flexible 모드로 인한 무한 리다이렉트(301 Loop)',
        body: [
          'Cloudflare의 SSL 암호화 모드를 "Flexible"로 두었을 때 발생하는 대표적 문제입니다.',
          '브라우저와 Cloudflare 간은 HTTPS(443)로 통신하지만, Cloudflare와 원본 서버 간은 HTTP(80)로 통신합니다. 이때 원본 서버(Next.js나 Nginx)가 "HTTP 요청이 왔으니 HTTPS로 가라"며 301 리다이렉트를 던지면 무한 루프(ERR_TOO_MANY_REDIRECTS)에 빠집니다.',
          '해결책은 Cloudflare SSL 모드를 "Full" 또는 "Full (Strict)"로 설정하고, 원본 서버에도 유효한 SSL 인증서를 설치하는 것입니다.',
        ],
      },
      {
        heading: '실수 3 — 배포 후 CDN 캐시 퍼지(Purge) 누락',
        body: [
          '새 코드를 배포했는데도 CDN 엣지가 기존 HTML을 들고 있어 새 기능이 반영되지 않는 현상입니다.',
          'CI/CD 파이프라인(GitHub Actions) 끝단에 Cloudflare API를 호출해 캐시를 퍼지하는 스텝을 반드시 추가해야 합니다.',
          { type: 'code', label: 'GitHub Actions Cloudflare 캐시 퍼지 예시', content: `curl -X POST "https://api.cloudflare.com/client/v4/zones/\${{ secrets.CF_ZONE_ID }}/purge_cache" \\
  -H "Authorization: Bearer \${{ secrets.CF_API_TOKEN }}" \\
  -H "Content-Type: application/json" \\
  --data '{"purge_everything":true}'` },
        ],
      },
    ],
    checklist: [
      'CDN SSL 암호화 모드가 Flexible이 아닌 Full (Strict)로 되어 있다.',
      '로그인이나 사용자별 개인화가 필요한 경로는 CDN 캐시 대상에서 제외했다.',
      '배포 완료 시 자동으로 CDN 캐시를 비우는 API 연동이 되어 있다.',
      'CDN 상태 헤더(cf-cache-status: HIT / MISS)를 통해 캐시 동작을 확인했다.',
    ],
    faqs: [
      {
        question: 'Cloudflare의 Development Mode는 언제 쓰나요?',
        answer: 'CSS나 자바스크립트를 로컬에서 실시간으로 수정하며 원본 서버와 직접 통신해 테스트할 때 일시적으로 켭니다. 3시간 뒤 자동으로 꺼지므로 운영 중 디버깅에 유용합니다.',
      },
      {
        question: 'Purge Everything 대신 특정 페이지만 캐시를 지우는 것이 좋은 이유는 무엇인가요?',
        answer: '전체 퍼지를 실행하면 수만 건의 엣지 캐시가 일시에 증발해 모든 트래픽이 순간적으로 원본 서버로 쏠리는 캐시 스탬피드(Cache Stampede) 현상이 일어나 서버가 다운될 수 있습니다. 변경된 URL만 선택적 퍼지(Purge by URL)하는 것이 안전합니다.',
      },
    ],
    sources: [
      { title: 'Cloudflare Docs: Default Cache Behavior', url: 'https://developers.cloudflare.com/cache/concepts/default-cache-behavior/' },
      { title: 'Cloudflare Support: Troubleshooting redirect loop errors', url: 'https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/' },
    ],
    revisions: [
      { date: '2026-06-07', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: '선택적 캐시 퍼지 및 FAQ 보강' },
    ],
  },
  {
    slug: 'core-web-vitals-operator-view',
    title: '운영자 눈높이에서 보는 Core Web Vitals(LCP, INP, CLS)',
    description: '구글 검색 랭킹과 사용자 체감 속도를 결정짓는 3대 웹 활력 지표의 측정 및 실무 개선법을 안내합니다.',
    category: '성능',
    publishedAt: '2026-06-08',
    reviewedAt: '2026-08-24',
    readingMinutes: 5,
    summary: 'Core Web Vitals는 추상적인 점수가 아닙니다. 방문자가 언제 첫 화면을 보는지(LCP), 버튼을 눌렀을 때 얼마나 빨리 반응하는지(INP), 읽는 중에 글자가 얼마나 덜컹거리는지(CLS)를 실측하는 지표입니다.',
    diagram: ['LCP < 2.5초 (핵심 자산 우선순위)', 'INP < 200ms (메인 스레드 블로킹 해소)', 'CLS < 0.1 (크기 예약 및 폰트 안정화)', 'CrUX 실사용자 데이터 모니터링'],
    sections: [
      {
        heading: 'LCP (Largest Contentful Paint) — 2.5초 이내',
        body: [
          '페이지에서 가장 큰 콘텐츠(히어로 이미지, 큰 텍스트 블록)가 화면에 완전히 그려지기까지 걸리는 시간입니다.',
          '작은 사이트에서 LCP를 망치는 주범은 두 가지입니다. 첫째, 히어로 이미지에 loading="lazy"를 걸어놓은 경우. 둘째, TTFB(서버 응답 속도)가 느려 HTML 수신 자체가 늦어지는 경우입니다.',
          '히어로 이미지에는 반드시 fetchpriority="high"를 부여하고, 서버 응답은 엣지 CDN 캐싱을 통해 200ms 이내로 줄여야 합니다.',
        ],
      },
      {
        heading: 'INP (Interaction to Next Paint) — 200ms 이내',
        body: [
          '2024년 3월부터 FID를 대체해 정식 지표가 된 INP는 사용자가 클릭, 탭, 키보드 입력을 했을 때 브라우저가 화면을 다음 프레임으로 갱신하기까지의 반응 지연 시간입니다.',
          '자바스크립트 번들이 너무 무겁거나, 긴 작업(Long Task)이 메인 스레드를 50ms 이상 점유하고 있으면 클릭해도 화면이 멈칫거립니다.',
          'Next.js에서 과도한 서드파티 스크립트나 무거운 리액트 리렌더링을 제거하고, 긴 작업은 Web Worker나 scheduler.yield()로 잘게 쪼개야 합니다.',
        ],
      },
      {
        heading: 'CLS (Cumulative Layout Shift) — 0.1 이하',
        body: [
          '로딩 도중 화면의 요소들이 제멋대로 이동하는 누적 이동 점수입니다.',
          '이미지, 비디오 태그에 width/height가 없거나, 광고 배너 공간의 크기를 미리 잡아두지 않아서 발생합니다. 모든 미디어 태그에 크기를 고정하고, 비동기 광고가 들어올 영역에는 min-height를 부여해 공간을 미리 예약해 두어야 합니다.',
        ],
      },
    ],
    checklist: [
      'PageSpeed Insights에서 모바일 LCP 2.5초 이하가 확인된다.',
      '첫 화면 대표 이미지에 fetchpriority="high"가 부여되었다.',
      '모든 이미지와 광고 영역에 크기 예약(aspect-ratio 또는 width/height)이 있다.',
      'PageSpeed 및 Search Console의 Core Web Vitals 리포트가 양호(Good) 상태다.',
    ],
    faqs: [
      {
        question: 'Lighthouse 점수는 100점인데 왜 Search Console에서는 개선이 필요하다고 나오나요?',
        answer: 'Lighthouse는 단일 기기/네트워크의 실험실 데이터(Lab Data)이고, Search Console은 전 세계 실제 크롬 사용자 28일간의 누적 현장 데이터(Field Data, CrUX)를 기준으로 평가하기 때문입니다. 저사양 모바일 기기에서의 실제 속도를 개선해야 합니다.',
      },
      {
        question: 'INP 지표를 디버깅할 때 개발자 도구에서 무엇을 봐야 하나요?',
        answer: 'Chrome DevTools의 Performance 탭에서 녹화 후 빨간색 대각선으로 표시되는 50ms 초과의 Long Task들을 찾아내야 합니다. 해당 태스크를 유발한 자바스크립트 함수 호출 스택을 확인해 최적화합니다.',
      },
    ],
    sources: [
      { title: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
      { title: 'Google Search Central: Core Web Vitals 및 Google 검색결과', url: 'https://developers.google.com/search/docs/appearance/core-web-vitals' },
    ],
    revisions: [
      { date: '2026-06-08', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'INP 신규 표준 기준 및 Lab/Field 데이터 차이점 보강' },
    ],
  },
  {
    slug: 'https-redirects-domain-canonical',
    title: 'HTTPS 강제 리다이렉트와 도메인 표준화(Canonical) 설정',
    description: 'http, https, www, non-www 등 4가지 주소 조합을 하나의 기준 도메인으로 통합하는 방법입니다.',
    category: 'DNS',
    publishedAt: '2026-06-08',
    reviewedAt: '2026-08-24',
    readingMinutes: 4,
    summary: '하나의 웹사이트라도 http://example.com, https://example.com, http://www.example.com, https://www.example.com 4개 주소로 모두 열린다면 검색엔진은 4개의 별개 사이트로 인식해 검색 점수를 4등분합니다.',
    diagram: ['4개 주소 조합 식별', '단일 표준 주소 확정(https://example.com)', 'HTTP 301 Permanent Redirect 설정', 'rel="canonical" 메타 태그 통일'],
    sections: [
      {
        heading: '도메인 파편화가 부르는 재앙',
        body: [
          '검색엔진의 크롤러는 URL 문자열 자체를 고유 식별자로 취급합니다.',
          '도메인 표준화가 되어 있지 않으면 동일한 콘텐츠가 4개의 서로 다른 주소에서 중복 색인되어 검색 순위가 곤두박질치고, 외부에서 링크를 걸어주어도 백링크 파워가 여러 주소로 흩어져 버립니다.',
        ],
      },
      {
        heading: '301 영구 리다이렉트로 한 곳으로 모으기',
        body: [
          '반드시 302(임시)가 아닌 301(영구 이동) 리다이렉트를 사용해야 검색엔진이 기존 주소의 권위를 표준 주소로 완전히 넘겨줍니다.',
          { type: 'code', label: 'Nginx 도메인 표준화 설정 예시', content: `# 1. www 및 HTTP 접속을 non-www HTTPS로 일원화
server {
    listen 80;
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}

server {
    listen 80;
    server_name example.com;
    return 301 https://example.com$request_uri;
}` },
        ],
      },
      {
        heading: 'HTML의 rel="canonical" 선언',
        body: [
          '서버 리다이렉트 외에도 모든 HTML 페이지의 head에 <link rel="canonical" href="https://example.com/현재경로" />를 명시해야 합니다.',
          '파라미터(?utm_source=... 등)가 붙어 주소가 달라지더라도 검색엔진에게 "이 페이지의 원본 대표 주소는 여기다"라고 명확히 선언해 주는 안전장치입니다.',
        ],
      },
    ],
    checklist: [
      'http:// 도메인 접속 시 즉시 https:// 로 301 리다이렉트된다.',
      'www 접속 시 non-www(또는 반대 기준)로 301 리다이렉트된다.',
      '모든 페이지 head에 올바른 rel="canonical" 태그가 존재한다.',
      'sitemap.xml에 기재된 모든 URL이 표준 도메인 형식과 일치한다.',
    ],
    faqs: [
      {
        question: '301 리다이렉트 체인(Redirect Chain)이란 무엇이고 왜 피해야 하나요?',
        answer: 'http://www -> http:// -> https:// 로 두 번 이상 연쇄 리다이렉트되는 현상입니다. 리다이렉트가 한 번 발생할 때마다 RTT(Round Trip Time)가 추가되어 첫 페이지 로딩이 수백 밀리초씩 지연되고 크롤링 효율이 떨어집니다. 한 번의 301로 최종 목적지에 바로 도달하게 해야 합니다.',
      },
      {
        question: 'Next.js App Router에서는 canonical을 어떻게 설정하나요?',
        answer: 'layout.tsx 또는 page.tsx의 metadata 객체에 metadataBase: new URL("https://example.com")를 선언하고 alternates: { canonical: "/경로" }를 지정하면 Next.js가 빌드 시 절대 경로 canonical 태그를 자동 생성합니다.',
      },
    ],
    sources: [
      { title: 'Google Search Central: 표준화란 무엇인가요?', url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls' },
      { title: 'MDN: 301 Moved Permanently', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301' },
    ],
    revisions: [
      { date: '2026-06-08', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: '리다이렉트 체인 위험성 및 FAQ 보강' },
    ],
  },
  {
    slug: 'nextjs-deploy-notes-for-small-sites',
    title: '작은 사이트 운영자를 위한 Next.js App Router 배포 핵심',
    description: 'generateStaticParams, metadataBase, 정적 빌드 최적화 등 작은 사이트에 꼭 맞는 Next.js 설정법입니다.',
    category: '배포',
    publishedAt: '2026-06-07',
    reviewedAt: '2026-08-24',
    readingMinutes: 5,
    summary: 'Next.js App Router는 강력하지만 설정 하나를 빠뜨리면 서버 비용이 급증하거나 크롤러에게 빈 화면이 전달됩니다. 정적 페이지 사전 생성과 메타데이터 설정의 핵심을 정리합니다.',
    diagram: ['generateStaticParams로 사전 빌드', 'metadataBase 선언 필수', 'output: export 또는 ISR 활용', '빌드 결과물 정적 경로 검증'],
    sections: [
      {
        heading: '동적 라우트는 반드시 빌드 시점에 생성한다',
        body: [
          '블로그나 문서 사이트처럼 콘텐츠가 고정된 경우, 동적 라우트([slug]) 페이지에 generateStaticParams를 구현하지 않으면 요청마다 서버 렌더링(SSR)이 돌아가 서버 부담이 커집니다.',
          'generateStaticParams를 선언해 두면 빌드 시점에 모든 HTML이 미리 파일로 생성되어 CDN에서 초고속으로 서빙됩니다.',
          { type: 'code', label: 'generateStaticParams 구현', content: `// app/notes/[slug]/page.tsx
export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}` },
        ],
      },
      {
        heading: 'metadataBase 누락으로 인한 OG 태그 깨짐 방지',
        body: [
          'Next.js 14+ 버전부터는 루트 layout.tsx에 metadataBase를 선언하지 않으면 상대 경로로 지정한 canonical URL과 og:image가 유효하지 않은 주소로 렌더링되며 빌드 경고가 발생합니다.',
          { type: 'code', label: 'metadataBase 선언 예시', content: `// app/layout.tsx
export const metadata = {
  metadataBase: new URL('https://example.com'),
  alternates: { canonical: '/' },
  openGraph: {
    siteName: '사이트명',
    locale: 'ko_KR',
  },
};` },
        ],
      },
      {
        heading: '빌드 후 실제 HTML 산출물 검증',
        body: [
          '배포 후 터미널에서 curl 명령어로 자바스크립트를 비활성화한 크롤러 관점에서 본문이 제대로 들어가 있는지 확인해야 합니다.',
          { type: 'code', label: '자바스크립트 없는 본문 렌더링 확인', content: `curl -sS https://example.com/notes | grep -c '<article'
# 결과가 1 이상 나와야 검색엔진 크롤러가 본문을 제대로 색인할 수 있습니다.` },
        ],
      },
    ],
    checklist: [
      '모든 [slug] 동적 경로에 generateStaticParams가 구현되어 있다.',
      '루트 layout.tsx에 metadataBase가 올바른 도메인으로 선언되었다.',
      '빌드 결과(npm run build)에서 모든 공개 페이지가 정적(○ 또는 ●)으로 표시된다.',
      '자바스크립트를 끈 상태에서도 curl로 본문 텍스트가 정상 조회된다.',
    ],
    faqs: [
      {
        question: 'ISR(증분 정적 재생성)과 generateStaticParams는 어떻게 다른가요?',
        answer: 'generateStaticParams는 빌드 시점에 초기 HTML 파일들을 생성하는 것이며, ISR(revalidate)은 빌드 이후 운영 중에 지정된 시간 간격으로 백그라운드에서 HTML을 최신 데이터로 다시 빌드해 갱신하는 기능입니다.',
      },
      {
        question: 'Next.js에서 unoptimized: true 옵션을 이미지에 줄 때의 장단점은 무엇인가요?',
        answer: '장점은 Vercel 이미지 최적화 한도 초과 비용이 발생하지 않고 어디서든 정적 호스팅이 가능하다는 점이며, 단점은 이미지 크기와 포맷 변환을 업로드 전에 수동으로 완료해 두어야 한다는 점입니다.',
      },
    ],
    sources: [
      { title: 'Next.js: App Router', url: 'https://nextjs.org/docs/app' },
      { title: 'Next.js: Metadata and OG Images', url: 'https://nextjs.org/docs/app/getting-started/metadata-and-og-images' },
    ],
    revisions: [
      { date: '2026-06-07', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'Next.js 15+ 메타데이터 주의점 및 FAQ 보강' },
    ],
  },
  {
    slug: 'small-site-incident-log',
    title: '소규모 사이트 장애 기록은 어떻게 남기면 좋을까',
    description: '접속 장애, 배포 실수, DNS 변경, 캐시 문제를 다음 운영에 도움이 되는 자산으로 남기는 포스트모텀 작성법입니다.',
    category: '운영',
    publishedAt: '2026-06-08',
    reviewedAt: '2026-08-24',
    readingMinutes: 4,
    summary: '장애 기록(Post-mortem)은 대기업만 쓰는 문서가 아닙니다. 혼자 운영하는 작은 사이트도 짧은 기록이 쌓이면 같은 실수를 반복하지 않고 사이트의 안정성을 비약적으로 높일 수 있습니다.',
    diagram: ['장애 발생 및 감지 시각 기록', '영향 범위(URL·기기·지역) 파악', '근본 원인(Root Cause) 5 Whys', '재발 방지 액션 아이템 확정'],
    sections: [
      {
        heading: '기록의 목적은 자책이 아니라 재현 방지다',
        body: [
          '장애가 발생했을 때 급하게 불만 끄고 넘어가면, 몇 달 뒤 환경이 조금 바뀌었을 때 똑같은 이유로 사이트가 또 죽습니다.',
          '혼자 쓰는 문서라도 "무엇이 일어났고, 왜 일어났으며, 다음 배포 때는 무엇을 자동으로 검증할 것인가"를 간결하게 남겨두어야 합니다.',
        ],
      },
      {
        heading: '작은 사이트에 꼭 맞는 4단 포스트모텀 템플릿',
        body: [
          '1. 요약(Summary): 장애 발생 시각, 복구 시각, 장애 시간, 영향받은 페이지',
          '2. 타임라인(Timeline): 몇 시 몇 분에 무엇을 건드렸고 언제 에러가 감지되었는가',
          '3. 근본 원인(Root Cause): 겉으로 드러난 에러가 아니라 왜 그 실수가 방지되지 못했는가',
          '4. 개선 조치(Action Items): 다음 배포 체크리스트나 CI 빌드 스크립트에 추가할 검증 항목',
          { type: 'code', label: '실제 작성 예시 템플릿', content: `## 2026-06-08 배포 장애 메모
- 영향: 전체 페이지 502 Bad Gateway (약 18분간)
- 감지: 업타임 모니터링 봇 슬랙 알림
- 원인: .env 파일의 DB 연결 URL에 특수문자 인코딩 누락으로 Node 서버 부팅 실패
- 해결: URL 인코딩 처리 후 재배포
- 조치: 배포 전 빌드 스크립트에서 환경변수 유효성 검사 스크립트(validate-env) 강제 실행 추가` },
        ],
      },
    ],
    checklist: [
      '장애 복구 직후 24시간 이내에 간단한 원인 메모를 남겼다.',
      '동일 장애를 사전에 방지할 체크리스트 항목을 하나 이상 추가했다.',
      '업타임 모니터링(Uptime Kuma, BetterStack 등) 알림 채널을 점검했다.',
    ],
    faqs: [
      {
        question: '작은 사이트에서 무료로 쓸 수 있는 업타임 모니터링 도구는 무엇이 있나요?',
        answer: 'UptimeRobot(50개 모니터링 무료), BetterStack(무료 티어 제공), 또는 GitHub Actions를 활용한 5분 주기 cURL 크론잡으로 무료 알림을 구성할 수 있습니다.',
      },
      {
        question: '5 Whys 기법은 작은 사이트 장애 분석에 어떻게 적용하나요?',
        answer: '"왜 500 에러가 났나? 환경변수가 없었다 -> 왜 없었나? 배포 스크립트에서 빠졌다 -> 왜 빠졌나? 수동 복사했다 -> 결론: 환경변수 체크 스크립트를 CI 빌드 단계에 자동화한다" 처럼 근본적인 시스템 개선으로 연결하는 방법입니다.',
      },
    ],
    sources: [
      { title: 'Google SRE Book: Postmortem Culture', url: 'https://sre.google/sre-book/postmortem-culture/' },
      { title: 'GitHub: Post-mortems repository', url: 'https://github.com/danluu/post-mortems' },
    ],
    revisions: [
      { date: '2026-06-08', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: '5 Whys 실무 예시 및 무료 모니터링 FAQ 보강' },
    ],
  },
  {
    slug: 'deploy-environment-variables-checklist',
    title: '배포 환경변수 실수로 사이트를 날려먹지 않는 점검표',
    description: 'API 키 누락, 클라이언트 노출 접두사 혼동, 스테이징/프로덕션 오염을 방지하는 실무 환경변수 관리법입니다.',
    category: '배포',
    publishedAt: '2026-06-09',
    reviewedAt: '2026-08-24',
    readingMinutes: 4,
    summary: '환경변수는 잘못 다루면 사이트가 빌드되지 않는 사소한 오류부터, 데이터베이스 시크릿이 클라이언트 JS 번들에 통째로 노출되는 치명적인 보안 사고까지 일으킵니다. 안전한 환경변수 배포 원칙을 정리합니다.',
    diagram: ['.env.example 파일 동기화', 'NEXT_PUBLIC_ 접두사 보안 검증', '빌드 시점 유효성 검사 라이브러리(Zod)', '프로덕션 대시보드 환경변수 확인'],
    sections: [
      {
        heading: 'NEXT_PUBLIC_의 양날의 검',
        body: [
          'Next.js에서 NEXT_PUBLIC_ 접두사가 붙은 환경변수는 브라우저로 전송되는 자바스크립트 번들에 문자열 그대로 인라인 치환됩니다.',
          '즉, 웹사이트 방문자 누구나 개발자 도구의 소스 코드에서 해당 값을 읽을 수 있습니다. 데이터베이스 비밀번호, 결제 비밀키, 관리자 API 토큰에 이 접두사를 붙이는 순간 영구적인 유출 사고가 발생합니다.',
        ],
      },
      {
        heading: 'Zod를 활용한 런타임/빌드 환경변수 강제 검증',
        body: [
          '빌드가 완료되고 나서 런타임에 "undefined is not a function"으로 죽는 것을 막기 위해, 애플리케이션 시작 시점에 스키마를 검증해야 합니다.',
          { type: 'code', label: 'env 검증 모듈 예시', content: `// src/lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  API_SECRET_KEY: z.string().min(10),
});

export const env = envSchema.parse(process.env);` },
        ],
      },
    ],
    checklist: [
      '비밀키나 토큰에 NEXT_PUBLIC_ 접두사가 붙어 있지 않음을 확인했다.',
      '.env.local 파일이 .gitignore에 확실히 포함되어 GitHub에 커밋되지 않았다.',
      '새 환경변수를 추가할 때 .env.example 파일도 함께 업데이트했다.',
      '호스팅 플랫폼(Vercel, AWS)의 Production 환경변수에 값이 모두 채워져 있다.',
    ],
    faqs: [
      {
        question: '실수로 API 키가 포함된 .env 파일을 GitHub 공개 저장소에 푸시했을 때는 어떻게 해야 하나요?',
        answer: '단순히 git commit으로 파일을 지우거나 커밋을 되돌려도 깃 히스토리에 키가 영구히 남습니다. 즉시 해당 서비스 콘솔에 들어가 기존 API 키를 폐기(Revoke)하고 새로 발급받아야 합니다.',
      },
      {
        question: 'Vercel에서 브랜치별(Preview vs Production) 환경변수는 어떻게 다르게 관리하나요?',
        answer: 'Vercel 프로젝트 설정의 Environment Variables 탭에서 각 키마다 적용할 타깃 환경(Production, Preview, Development)을 체크박스로 개별 선택하여 분리할 수 있습니다.',
      },
    ],
    sources: [
      { title: 'Next.js: Environment Variables', url: 'https://nextjs.org/docs/app/guides/environment-variables' },
      { title: 'The Twelve-Factor App: Config', url: 'https://12factor.net/config' },
    ],
    revisions: [
      { date: '2026-06-09', note: '최초 게시' },
      { date: '2026-08-24', note: '확인 절차를 실제 명령과 출력 예시로 보강' },
      { date: '2026-09-03', note: 'Zod 환경변수 스키마 검증 및 FAQ 보강' },
    ],
  },
  {
    slug: 'production-readiness-self-audit',
    title: '작은 사이트 출시 전 웹 인프라 종합 감사(Audit) 실전 기록',
    description: 'DNS, SSL, 캐시 헤더, 내부 링크, 모바일 반응성까지 사이트 런칭 전 전방위적인 품질을 점검한 실무 감사 기록입니다.',
    category: '운영',
    publishedAt: '2026-07-14',
    reviewedAt: '2026-09-03',
    readingMinutes: 5,
    summary: '체크리스트를 머릿속으로만 알고 있는 것과, 실제 프로덕션 도메인에 돋보기를 들이대고 하나씩 감사하는 것은 전혀 다릅니다. CloudPlare 운영자가 실제 배포된 사이트를 종합 감사하며 발견한 결함들과 조치 내역을 가감 없이 공유합니다.',
    diagram: ['인프라 기준선 진단', '캐시·헤더·링크 정합성 검사', '성능 및 리다이렉트 체인 확인', '운영 체크리스트 동기화'],
    sections: [
      {
        heading: '왜 배포 직전 종합 감사가 필수적인가',
        body: [
          '작은 사이트일수록 1인이 개발과 운영을 겸하기 때문에 자신이 만든 코드의 맹점을 놓치기 쉽습니다.',
          '기능 구현에 집중하다 보면 sitemap의 최종 수정일이 엉뚱하게 박혀 있거나, 모바일 320px에서 메뉴가 깨지거나, 불필요한 스크립트가 전역 레이아웃에서 낭비되고 있는 현상이 빈번하게 일어납니다.',
          '아래는 실제 감사를 수행하면서 잡아낸 3가지 핵심 결함과 그에 대한 구체적 해결책입니다.',
        ],
      },
      {
        heading: '감사 사례 1 — 전역 레이아웃의 무분별한 스크립트 로드',
        body: [
          '문의 페이지(/contact)나 약관 페이지(/terms)처럼 콘텐츠가 정적인 텍스트뿐인 화면에도 무거운 서드파티 스크립트나 분석 SDK가 루트 layout에서 무차별 로드되고 있었습니다.',
          '조치는 클라이언트 경로(usePathname)를 검사하여 콘텐츠가 풍부한 본문 경로에서만 스크립트가 동작하도록 화이트리스트 기반 조건부 로더를 구축한 것이었습니다.',
          { type: 'code', label: '조건부 스크립트 로더 패턴', content: `'use client';
import { usePathname } from 'next/navigation';

const ELIGIBLE_PATHS = ['/', '/checklist', '/glossary', '/about'];

export default function ConditionalScriptLoader() {
  const pathname = usePathname();
  const isEligible = ELIGIBLE_PATHS.includes(pathname) || pathname.startsWith('/notes');

  if (!isEligible) return null;
  return <script async src="https://third-party.example.com/sdk.js" />;
}` },
        ],
      },
      {
        heading: '감사 사례 2 — Sitemap의 lastModified 불일치 문제',
        body: [
          'sitemap.ts에서 모든 페이지의 lastModified를 new Date()로 채우고 있었습니다. 이로 인해 빌드가 일어날 때마다 모든 글이 "방금 수정됨"으로 둔갑해 크롤러에게 거짓 신호를 보내고 있었습니다.',
          '실제 각 글의 검토일(reviewedAt) 데이터를 파싱하여 정확한 날짜를 내려주도록 수정함으로써 검색엔진의 크롤링 신뢰도를 확보했습니다.',
        ],
      },
      {
        heading: '감사 사례 3 — 읽기 시간(readingMinutes)의 부정확성',
        body: [
          '글자 수가 1,500자인 글과 4,000자인 글이 모두 동일하게 "3분 읽기"로 하드코딩되어 있었습니다.',
          '한국어 기준 분당 평균 400~500자 독서 속도를 기준으로 실제 본문 텍스트 길이에 비례해 현실적인 시간을 재계산해 반영했습니다.',
        ],
      },
    ],
    checklist: [
      '불필요한 스크립트가 텍스트 중심 페이지에서 낭비되지 않는지 확인했다.',
      'sitemap의 lastModified가 실제 콘텐츠 수정 일자와 일치한다.',
      '메타데이터의 읽기 시간이 실제 본문 분량과 비례한다.',
      '전체 내부 링크 중 404를 유발하는 깨진 경로가 없음을 검증했다.',
    ],
    faqs: [
      {
        question: '정기 감사는 얼마 주기로 수행하는 것이 좋은가요?',
        answer: '대규모 기능 배포 직후에는 필수적으로 수행하며, 정기적으로는 분기별 1회 DNS, SSL 만료일, sitemap 정합성, 깨진 링크 등을 종합 점검하는 것을 권장합니다.',
      },
      {
        question: '감사 결과 발견된 문제 중 즉시 고치지 못하는 항목은 어떻게 하나요?',
        answer: '이슈 트래커나 운영 체크리스트 문서 하단에 "미해결 기술 부채" 목록으로 등록해 두고 원인과 영향도를 명시해 다음 스프린트에서 우선적으로 해결해야 합니다.',
      },
    ],
    sources: [
      { title: 'Google Search Central: 검색엔진 최적화(SEO) 기본 가이드', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
      { title: 'web.dev: Audit your site with Lighthouse', url: 'https://web.dev/learn/performance/audit' },
    ],
    revisions: [
      { date: '2026-07-14', note: '최초 게시' },
      { date: '2026-09-03', note: '웹 인프라 종합 감사 지침으로 전면 개편 및 실무 코드 보강' },
    ],
  },
  {
    slug: 'ssl-tls-auto-renewal-failure-cases',
    title: "Let's Encrypt 및 Certbot 자동 갱신이 실패하는 4가지 원인과 주기 점검",
    description: '80번 포트 차단, DNS 레코드 불일치, systemd 타이머 오류 등 무료 SSL 인증서 자동 갱신 실패의 원인과 디버깅 절차입니다.',
    category: '보안',
    publishedAt: '2026-09-03',
    reviewedAt: '2026-09-03',
    readingMinutes: 5,
    summary: "무료 SSL의 대명사인 Let's Encrypt는 90일마다 갱신해야 합니다. Certbot 자동 갱신을 믿고 있다가 어느 날 갑자기 '인증서 만료' 경고로 사이트가 먹통이 되는 사고의 4대 원인과 방지책을 정리합니다.",
    diagram: ['80번 포트 HTTP 챌린지 차단', 'DNS 레코드 변경 후 갱신 실패', 'systemd 타이머 중단', 'Web Server reload 누락'],
    sections: [
      {
        heading: '사고 원인 1 — 80번 포트(HTTP) 방화벽 차단',
        body: [
          'HTTPS(443)를 적용하고 나면 보안 강화를 명목으로 클라우드 방화벽(Security Group)에서 80번 포트를 닫아버리는 운영자가 많습니다.',
          "하지만 Let's Encrypt의 기본 HTTP-01 챌린지는 반드시 80번 포트로 /.well-known/acme-challenge/ 경로에 접근해 소유권을 검증합니다. 80번 포트가 막히면 갱신 데몬이 조용히 실패를 거듭하다가 만료일에 사이트가 차단됩니다.",
        ],
      },
      {
        heading: '사고 원인 2 — 인증서 갱신 후 Nginx 리로드(Reload) 누락',
        body: [
          '디스크에는 새 인증서 파일(fullchain.pem)이 정상적으로 갱신되어 내려왔는데, 정작 웹 서버(Nginx, Apache)가 이전 인증서를 메모리에 물고 있어 브라우저에는 계속 만료된 인증서가 제공되는 경우입니다.',
          'Certbot 실행 시 --deploy-hook을 지정하여 갱신 성공 시 웹 서버를 자동 재로드하도록 구성해야 합니다.',
          { type: 'code', label: '안전한 자동 갱신 cron / systemd 설정', content: `# 갱신 테스트 (Dry-run) 실행
sudo certbot renew --dry-run

# 갱신 성공 시 Nginx graceful reload 강제
sudo certbot renew --deploy-hook "systemctl reload nginx"` },
        ],
      },
      {
        heading: '사고 원인 3 — CAA 레코드 오설정',
        body: [
          'DNS에 CAA(Certificate Authority Authorization) 레코드를 등록해 두었는데 letsencrypt.org를 명시하지 않은 경우, 인증 기관이 규정상 인증서 발급을 거부합니다.',
          'dig example.com CAA +short 명령으로 CAA 레코드를 점검해야 합니다.',
        ],
      },
    ],
    checklist: [
      '80번 포트 인바운드가 열려 있어 HTTP-01 챌린지가 통과된다.',
      'sudo certbot renew --dry-run 테스트가 에러 없이 통과한다.',
      'certbot 갱신 훅에 웹 서버 reload 명령이 포함되어 있다.',
      '인증서 만료 14일 전 이메일 알림을 수신하도록 이메일 주소가 등록되어 있다.',
    ],
    faqs: [
      {
        question: '인증서는 만료 며칠 전부터 갱신 시도를 해야 하나요?',
        answer: "Let's Encrypt의 공식 권장 주기는 만료 30일 전입니다. Certbot은 하루 2회 주기로 타이머를 돌려 30일 미만으로 남았을 때 자동으로 갱신을 수행하므로, 실패하더라도 30일간의 트러블슈팅 여유가 주어집니다.",
      },
      {
        question: '와일드카드(*.example.com) 인증서는 왜 HTTP 챌린지로 자동 갱신이 안 되나요?',
        answer: '보안 규격상 와일드카드 인증서는 도메인 전체에 대한 소유권을 요구하므로 HTTP 파일 업로드가 아닌 DNS-01 챌린지(TXT 레코드 등록)로만 발급됩니다. Cloudflare API 등을 활용한 자동 DNS 플러그인을 써야 자동 갱신이 가능합니다.',
      },
    ],
    sources: [
      { title: "Let's Encrypt: Challenge Types", url: 'https://letsencrypt.org/docs/challenge-types/' },
      { title: 'Certbot: User Guide', url: 'https://eff-certbot.readthedocs.io/en/stable/using.html' },
    ],
    revisions: [
      { date: '2026-09-03', note: '신규 작성 — Let’s Encrypt 자동 갱신 장애 유형 및 예방 절차 정리' },
    ],
  },
  {
    slug: 'zero-downtime-deployment-rollback-strategy',
    title: '작은 사이트를 위한 무중단 배포와 1분 롤백 전략',
    description: '대규모 인프라 도구 없이도 정적 사이트와 SPA에서 404 청크 오류 없이 롤백을 마치는 실무 아키텍처입니다.',
    category: '배포',
    publishedAt: '2026-09-03',
    reviewedAt: '2026-09-03',
    readingMinutes: 5,
    summary: '배포 도중 사용자가 사이트를 보고 있다가 이전 청크 JS가 사라져 화면이 하얗게 굳어버리거나(ChunkLoadError), 치명적인 버그가 터졌을 때 즉시 되돌리지 못해 발을 동동 구른 경험이 있다면 릴리스 디렉토리 분리와 심볼릭 링크 구조가 정답입니다.',
    diagram: ['버전별 정적 빌드 보관', '심볼릭 링크 또는 CDN 오리진 전환', '불변 자산(immutable)과 HTML 분리', '장애 시 즉각 이전 해시로 롤백'],
    sections: [
      {
        heading: 'ChunkLoadError가 왜 발생하는가',
        body: [
          '사용자가 웹사이트를 켜놓은 상태에서 새 배포가 진행되면, 서버는 이전 빌드의 청크 파일들(예: chunk-123.js)을 덮어쓰거나 지워버립니다.',
          '사용자가 페이지 내 다른 링크를 클릭했을 때 브라우저는 메모리에 로드된 이전 index.html을 기반으로 chunk-123.js를 요청하지만, 서버에는 이미 새 빌드 파일만 있어 404 Not Found가 떨어지고 화면이 깨집니다.',
        ],
      },
      {
        heading: '심볼릭 링크(Symlink) 릴리스 패턴',
        body: [
          '서버의 정적 웹 서빙 디렉토리를 /var/www/current 심볼릭 링크로 지정하고, 실제 빌드는 /var/www/releases/20260903_120000 처럼 타임스탬프 폴더에 수행합니다.',
          '빌드가 완전히 성공하면 ln -sfn 명령어로 current 심볼릭 링크를 원자적(atomic)으로 교체합니다. 롤백이 필요할 때는 링크를 직전 릴리스 폴더로 1초 만에 돌리면 끝납니다.',
          { type: 'code', label: '무중단 심볼릭 링크 배포 스크립트', content: `# 새 릴리스 폴더 빌드
RELEASE_DIR="/var/www/releases/$(date +%Y%m%d_%H%M%S)"
mkdir -p $RELEASE_DIR
cp -r ./dist/* $RELEASE_DIR/

# 원자적 심볼릭 링크 교체 (다운타임 0초)
ln -sfn $RELEASE_DIR /var/www/current

# 과거 5개 릴리스만 보관하고 오래된 릴리스 정리
cd /var/www/releases && ls -t | tail -n +6 | xargs -r rm -rf` },
        ],
      },
    ],
    checklist: [
      '배포 시 기존 빌드 청크를 최소 2~3회차 이전까지 삭제하지 않고 보관한다.',
      '웹 서버의 웹 루트가 심볼릭 링크를 바라보고 있으며 원자적으로 교체된다.',
      '장애 발생 시 1분 이내에 이전 빌드로 되돌리는 롤백 커맨드가 준비되어 있다.',
    ],
    faqs: [
      {
        question: 'Vercel이나 Netlify 같은 클라우드 호스팅을 쓸 때도 청크 에러가 생기나요?',
        answer: 'Vercel은 모든 배포마다 고유한 Immutable 배포 URL을 생성하므로 이전 청크 자산을 CDN에 안전하게 보존합니다. 단, 클라이언트에서 새 버전이 감지되었을 때 페이지를 새로고침하도록 유도하는 리액트 에러 바운더리 처리가 있으면 더욱 안전합니다.',
      },
      {
        question: '롤백 시 데이터베이스 마이그레이션이 얽혀 있으면 어떻게 하나요?',
        answer: '코드와 DB 변경은 항상 하위 호환성(Backward Compatibility)을 유지해야 합니다. 새 컬럼을 추가할 때 기존 코드가 깨지지 않게 널러블로 만들고, 코드 배포가 안정화된 후 구 컬럼을 제거하는 단계적 확장을 해야 안전하게 롤백할 수 있습니다.',
      },
    ],
    sources: [
      { title: 'Martin Fowler: Blue-Green Deployment', url: 'https://martinfowler.com/bliki/BlueGreenDeployment.html' },
      { title: 'web.dev: Deploying without downtime', url: 'https://web.dev/articles/progressive-web-apps' },
    ],
    revisions: [
      { date: '2026-09-03', note: '신규 작성 — 무중단 배포와 1분 롤백 아키텍처 가이드' },
    ],
  },
  {
    slug: 'crawler-traffic-rate-limiting-setup',
    title: '무단 AI 스크래퍼와 악성 크롤러 폭격 막기: Nginx와 CDN Rate Limit 설정',
    description: '작은 사이트의 CPU와 대역폭을 고갈시키는 비정상 봇 크롤러를 식별하고 단계적으로 제한하는 기법입니다.',
    category: '보안',
    publishedAt: '2026-09-03',
    reviewedAt: '2026-09-03',
    readingMinutes: 5,
    summary: '최근 생성형 AI 학습용 스크래퍼와 정체불명의 크롤러들이 robots.txt를 무시하고 작은 웹사이트에 수만 건의 요청을 퍼붓는 일이 잦아졌습니다. 정상 검색엔진은 살려두면서 악성 봇만 차단하는 레이트 리밋 설정을 공유합니다.',
    diagram: ['비정상 트래픽 식별', 'User-Agent/IP 대역 필터링', 'Nginx limit_req 적용', 'CDN WAF 챌린지 연동'],
    sections: [
      {
        heading: 'robots.txt는 신사협정일 뿐이다',
        body: [
          '많은 초보 운영자가 robots.txt에 Disallow: /를 써놓으면 봇이 안 들어올 거라 믿습니다.',
          '구글이나 네이버 같은 합법적인 검색엔진은 robots.txt를 엄격히 준수하지만, 무단 스크래퍼와 데이터 수집 봇들은 이를 무시하고 웹 서버 자원을 100%까지 갉아먹습니다. 네트워크 및 웹 서버 계층에서 물리적으로 막아야 합니다.',
        ],
      },
      {
        heading: 'Nginx limit_req_zone을 통한 요청 빈도 제한',
        body: [
          '동일 IP에서 초당 요청 가능한 횟수를 제한하고, 순간적인 버스트(burst)는 허용하되 기준을 넘어서면 429 Too Many Requests를 반환합니다.',
          { type: 'code', label: 'Nginx 레이트 리밋 설정', content: `# nginx.conf의 http 블록에 선언
limit_req_zone $binary_remote_addr zone=one:10m rate=5r/s;

# server 또는 location 블록에 적용
location / {
    limit_req zone=one burst=10 nodelay;
    limit_req_status 429;
    proxy_pass http://localhost:3000;
}` },
        ],
      },
    ],
    checklist: [
      '비정상적으로 많은 요청을 보내는 User-Agent를 식별했다.',
      'Nginx 또는 CDN에서 초당 요청 수(Rate Limit)가 제한되어 있다.',
      '구글 봇, 빙 봇 등 공인 검색 크롤러 IP 대역이 차단되지 않도록 예외 처리했다.',
      '초과 요청 시 적절한 429 Too Many Requests 응답이 반환된다.',
    ],
    faqs: [
      {
        question: '검색엔진 크롤러가 레이트 리밋에 걸리면 어떻게 하나요?',
        answer: 'Googlebot은 공식 역방향 DNS 조회(Reverse DNS) 또는 공개된 Googlebot IP 목록을 통해 검증할 수 있습니다. Nginx에서 geo 모듈이나 Cloudflare의 Known Bots 허용 옵션을 켜두면 검색엔진은 차단하지 않고 일반 스크래퍼만 정확히 걸러냅니다.',
      },
      {
        question: 'IP 기반 레이트 리밋은 회사나 학교 등 공용 IP 환경 사용자에게 문제가 되지 않나요?',
        answer: '네, 같은 NAT 공용 IP를 공유하는 사용자가 많을 때 엄격한 limit_req는 정상 사용자를 차단할 수 있습니다. 따라서 burst 값을 넉넉히(15~20) 주고, Cloudflare Turnstile 같은 캡차 챌린지를 결합하는 것이 이상적입니다.',
      },
    ],
    sources: [
      { title: 'Nginx: Rate Limiting with NGINX', url: 'https://www.nginx.com/blog/rate-limiting-nginx/' },
      { title: 'Cloudflare: Rate Limiting Best Practices', url: 'https://developers.cloudflare.com/waf/rate-limiting-rules/' },
    ],
    revisions: [
      { date: '2026-09-03', note: '신규 작성 — 악성 크롤러 방어를 위한 Nginx 및 WAF 레이트 리밋 지침' },
    ],
  },
  {
    slug: 'web-analytics-privacy-friendly-alternatives',
    title: '작은 사이트에 GA4 대신 경량 프라이버시 친화 분석 도구를 도입한 이유',
    description: '쿠키 동의 배너의 피로도를 없애고 사이트 속도를 20% 끌어올린 Umami, Cloudflare Web Analytics 적용기입니다.',
    category: '성능',
    publishedAt: '2026-09-03',
    reviewedAt: '2026-09-03',
    readingMinutes: 4,
    summary: 'Google Analytics 4(GA4)는 거대하지만 스크립트 용량이 크고, GDPR/개인정보 보호 규정 때문에 첫 화면에 흉측한 쿠키 동의(CMP) 팝업을 띄워야 합니다. 방문자 경험을 해치지 않으면서 꼭 필요한 트래픽 지표만 깔끔하게 측정하는 대안을 소개합니다.',
    diagram: ['쿠키 없는 익명 측정 원리', '스크립트 용량 45KB vs 2KB 비교', '자체 호스팅 또는 경량 서비스', '핵심 지표(방문자/경로) 중심 대시보드'],
    sections: [
      {
        heading: 'GA4가 작은 사이트에 너무 무거운 이유',
        body: [
          'GA4 스크립트(gtag.js)는 gtm.js와 결합될 때 45KB~100KB 이상의 자바스크립트를 다운로드하고 파싱합니다. 모바일 환경에서 LCP와 TBT(총 차단 시간) 점수를 크게 깎아먹는 원인이 됩니다.',
          '게다가 쿠키를 심어 사용자를 추적하므로 유럽(EEA) 사용자를 위한 쿠키 동의 팝업이 필수적이며, 이는 첫 화면 이탈률을 급증시킵니다.',
        ],
      },
      {
        heading: '경량 프라이버시 도구(Umami, Plausible)의 장점',
        body: [
          '1. 단 2KB 안팎의 초경량 스크립트로 사이트 로딩 속도에 전혀 영향을 주지 않습니다.',
          '2. 개인식별정보(PII)나 쿠키를 일절 저장하지 않고, 일일 해시 방식으로 고유 방문자 수만 집계하므로 쿠키 동의 배너가 전혀 필요 없습니다.',
          '3. 복잡한 보고서 대신 "오늘 몇 명이 어떤 글을 읽고 어떤 경로로 들어왔는가"라는 핵심 지표만 직관적으로 제공합니다.',
        ],
      },
    ],
    checklist: [
      '사이트에 불필요한 무거운 서드파티 트래커가 없는지 번들 크기를 확인했다.',
      '사용 중인 분석 도구가 쿠키 없이도 작동하는지 확인했다.',
      '첫 화면 방문자에게 방해되는 동의 팝업 없이 매끄러운 UX를 제공하고 있다.',
    ],
    faqs: [
      {
        question: '쿠키가 없으면 재방문자나 세션 측정이 정확한가요?',
        answer: 'IP 주소와 브라우저 User-Agent, 당일 날짜를 조합해 단방향 해시(Salted Hash)를 생성해 측정합니다. 사용자를 영구 추적하지는 못하지만, 당일 기준의 고유 방문자와 세션을 95% 이상의 정확도로 산출할 수 있습니다.',
      },
      {
        question: 'Next.js에서 Vercel Analytics를 쓰는 것은 어떤가요?',
        answer: 'Vercel Analytics 역시 쿠키 없이 익명으로 집계되는 경량 도구이며, Next.js에 @vercel/analytics 패키지로 단 한 줄에 연결되고 성능 저하가 없어 작은 사이트에 매우 훌륭한 선택입니다.',
      },
    ],
    sources: [
      { title: 'Umami: Privacy focused open source analytics', url: 'https://umami.is/docs' },
      { title: 'Vercel: Web Analytics documentation', url: 'https://vercel.com/docs/analytics' },
    ],
    revisions: [
      { date: '2026-09-03', note: '신규 작성 — 경량 분석 도구 비교 및 도입 가이드' },
    ],
  },
  {
    slug: 'service-worker-cache-vs-http-cache',
    title: 'Service Worker 캐시와 HTTP 브라우저 캐시가 충돌할 때 디버깅 순서',
    description: 'PWA 도입 후 새 코드를 배포해도 구버전 화면이 계속 뜨는 고질적인 캐시 충돌 문제와 해결법입니다.',
    category: '캐시',
    publishedAt: '2026-09-03',
    reviewedAt: '2026-09-03',
    readingMinutes: 5,
    summary: '웹앱에 오프라인 지원을 위해 Service Worker(Cache Storage API)를 도입했다가, 새 배포가 나갔는데도 사용자들이 일주일 전 구버전을 계속 보고 있다는 항의를 받는 경우가 많습니다. 두 캐시 계층의 우선순위와 sw.js 수명 주기를 파헤칩니다.',
    diagram: ['요청 가로채기(Fetch Event)', 'Cache Storage vs HTTP Cache 우선순위', 'sw.js 자체의 캐싱 방지', '업데이트 알림 및 skipWaiting()'],
    sections: [
      {
        heading: 'Service Worker는 브라우저 HTTP 캐시보다 앞단에 있다',
        body: [
          '브라우저가 네트워크 요청을 보낼 때 가장 먼저 가로채는 것은 Service Worker의 fetch 이벤트 리스너입니다.',
          '여기서 caches.match()로 이전 캐시 응답을 반환해 버리면, 서버에 새 배포가 일어났든 HTTP Cache-Control 헤더가 no-cache로 되어 있든 아무런 상관없이 영원히 구버전 화면만 서빙됩니다.',
        ],
      },
      {
        heading: '반드시 지켜야 할 2대 원칙',
        body: [
          '1. sw.js 파일 자체는 절대로 HTTP 캐싱하지 마라 — 서버 응답 헤더에 Cache-Control: no-cache, no-store, must-revalidate를 명시해야 브라우저가 매 방문마다 sw.js의 변경을 감지할 수 있습니다.',
          '2. HTML 문서는 Network First 전략을 써라 — 정적 자산(CSS, JS)은 Cache First로 빠르게 띄우더라도, HTML 문서는 네트워크를 먼저 확인하고 오프라인일 때만 캐시를 꺼내 쓰도록 해야 배포 즉시 새 화면이 반영됩니다.',
          { type: 'code', label: 'Service Worker Network First 구현', content: `self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    // HTML 페이지 요청인 경우 Network First
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});` },
        ],
      },
    ],
    checklist: [
      'sw.js 파일에 HTTP 캐시가 걸리지 않도록 서버 헤더를 설정했다.',
      '페이지 진입(navigate) 요청에 Network First 전략이 적용되었다.',
      '새 Service Worker 활성화 시 이전 캐시 저장소를 삭제(caches.delete)하는 코드가 있다.',
      'Chrome DevTools Application 탭의 Service Workers에서 Update on reload를 켜고 테스트했다.',
    ],
    faqs: [
      {
        question: '사용자가 탭을 닫지 않고 계속 켜두어도 새 버전을 적용하게 하려면 어떻게 하나요?',
        answer: '새 Service Worker 파일에 self.skipWaiting()을 호출하고, 클라이언트 페이지에서 navigator.serviceWorker의 controllerchange 이벤트를 감지하여 "새 버전이 배포되었습니다. 새로고침하시겠습니까?" 모달을 띄우거나 자동 새로고침을 유도해야 합니다.',
      },
      {
        question: 'Service Worker를 완전히 제거하고 싶을 때는 어떻게 하나요?',
        answer: '기존 sw.js 내용을 self.registration.unregister() 코드로 대체해 배포하고, 캐시 저장소를 모두 날려주는 자바스크립트를 한동안 유지해야 기존 사용자 브라우저에 남아 있는 워커가 완전히 해제됩니다.',
      },
    ],
    sources: [
      { title: 'MDN: Service Worker API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API' },
      { title: 'web.dev: The Service Worker Lifecycle', url: 'https://web.dev/articles/service-worker-lifecycle' },
    ],
    revisions: [
      { date: '2026-09-03', note: '신규 작성 — Service Worker 캐시 충돌 디버깅 및 수명 주기 관리' },
    ],
  },
];

export const glossary: GlossaryItem[] = [
  { term: 'DNS', description: '도메인 이름을 실제 서버 주소나 다른 이름으로 연결하기 위한 분산 이름 확인 체계입니다.', relatedSlug: 'dns-records-before-deploy' },
  { term: 'TTL', description: 'DNS나 캐시 응답이 얼마 동안 재사용될 수 있는지 알려주는 시간 값입니다.', relatedSlug: 'dns-records-before-deploy' },
  { term: 'A 레코드', description: '도메인 이름을 IPv4 주소에 연결하는 DNS 레코드입니다.', relatedSlug: 'dns-records-before-deploy' },
  { term: 'AAAA 레코드', description: '도메인 이름을 IPv6 주소에 연결하는 DNS 레코드입니다.', relatedSlug: 'dns-records-before-deploy' },
  { term: 'CNAME', description: '한 도메인 이름을 다른 도메인 이름의 별칭으로 연결하는 DNS 레코드입니다.', relatedSlug: 'dns-records-before-deploy' },
  { term: 'TXT 레코드', description: '소유권 확인, 이메일 인증, 보안 정책처럼 서비스가 읽는 문자열 값을 담는 DNS 레코드입니다.', relatedSlug: 'email-auth-records-for-small-domains' },
  { term: 'MX 레코드', description: '도메인의 메일 수신 서버를 지정하는 DNS 레코드입니다.', relatedSlug: 'email-auth-records-for-small-domains' },
  { term: 'CDN', description: '콘텐츠를 전 세계 여러 엣지 노드에 캐싱해 지연 시간을 줄이고 원본 서버 부담을 낮추는 네트워크 계층입니다.', relatedSlug: 'cdn-cache-mistakes-small-sites' },
  { term: 'Cache-Control', description: '브라우저와 공유 캐시가 응답을 저장하고 재사용하는 방식을 알려주는 HTTP 헤더입니다.', relatedSlug: 'http-cache-control-field-notes' },
  { term: 'max-age', description: '응답을 생성 시점부터 몇 초 동안 신선한 것으로 볼지 지정하는 캐시 지시자입니다.', relatedSlug: 'http-cache-control-field-notes' },
  { term: 'no-cache', description: '응답을 저장할 수는 있지만 재사용 전에 원본 서버에 반드시 ETag 등으로 검증하라고 지시하는 캐시 지시자입니다.', relatedSlug: 'http-cache-control-field-notes' },
  { term: 'no-store', description: '민감한 응답을 어떤 캐시 저장소에도 보관하지 말라고 지시하는 캐시 지시자입니다.', relatedSlug: 'http-cache-control-field-notes' },
  { term: 's-maxage', description: '개인 브라우저가 아니라 CDN 같은 공용 프록시 캐시에만 적용되는 신선도 시간을 지정합니다.', relatedSlug: 'cdn-cache-mistakes-small-sites' },
  { term: 'LCP', description: '페이지의 가장 큰 주요 콘텐츠가 화면에 렌더링되기까지 걸리는 시간을 측정하는 핵심 웹 활력 지표입니다.', relatedSlug: 'core-web-vitals-operator-view' },
  { term: 'INP', description: '사용자의 클릭이나 키보드 상호작용 후 브라우저가 다음 프레임을 그리기까지의 반응성을 측정하는 지표입니다.', relatedSlug: 'core-web-vitals-operator-view' },
  { term: 'CLS', description: '페이지 로딩 중 레이아웃이 예기치 않게 덜컹거리며 움직이는 정도를 측정하는 지표입니다.', relatedSlug: 'web-font-loading-and-layout-shift' },
  { term: 'Canonical URL', description: '중복되거나 비슷한 여러 페이지 주소 중 검색엔진에 대표로 알려주고 싶은 원본 표준 주소입니다.', relatedSlug: 'https-redirects-domain-canonical' },
  { term: 'Sitemap', description: '검색엔진 크롤러에게 사이트 내에 색인되길 원하는 주요 URL 목록과 수정일을 알려주는 XML 파일입니다.', relatedSlug: 'static-site-release-checklist' },
  { term: 'robots.txt', description: '검색엔진 크롤러가 사이트의 어떤 디렉토리를 탐색하거나 건너뛰어야 하는지 안내하는 루트 경로의 텍스트 파일입니다.', relatedSlug: 'static-site-release-checklist' },
  { term: '301 리다이렉트', description: '요청한 URL이 새 위치로 영구히 이동했음을 알려 기존 검색 순위 권위를 새 주소로 넘겨주는 응답입니다.', relatedSlug: 'https-redirects-domain-canonical' },
  { term: 'HSTS', description: '브라우저가 중간자 공격을 받지 않도록 이후 접속에서 무조건 HTTPS 통신만 사용하도록 강제하는 보안 정책입니다.', relatedSlug: 'http-security-headers-starter' },
  { term: '정적 생성', description: '요청 시점이 아니라 빌드 시점에 HTML을 미리 만들어 두어 고속 응답과 안정성을 얻는 렌더링 방식입니다.', relatedSlug: 'nextjs-deploy-notes-for-small-sites' },
  { term: '오리진 서버', description: 'CDN이나 프록시 캐시 뒤에서 실제 원본 콘텐츠와 비즈니스 로직을 처리하는 서버입니다.', relatedSlug: 'cdn-cache-mistakes-small-sites' },
  { term: 'SPF', description: '이 도메인을 대신해 메일을 보낼 수 있는 공인 발신 서버 IP 목록을 선언하는 DNS TXT 레코드입니다.', relatedSlug: 'email-auth-records-for-small-domains' },
  { term: 'DKIM', description: '발신 메일 헤더에 전자서명을 추가해 메일이 위조되거나 변조되지 않았음을 증명하는 인증 방식입니다.', relatedSlug: 'email-auth-records-for-small-domains' },
  { term: 'DMARC', description: 'SPF와 DKIM 검증에 실패한 스푸핑 메일을 수신자가 어떻게 처리(격리 또는 차단)할지 지정하는 정책입니다.', relatedSlug: 'email-auth-records-for-small-domains' },
  { term: 'WebP', description: 'JPEG, PNG 대비 25~35% 이상 작은 파일 크기로 동일한 시각적 품질을 제공하는 웹 최적화 이미지 포맷입니다.', relatedSlug: 'image-format-and-loading-basics' },
  { term: 'AVIF', description: '최신 AV1 코덱 기반으로 WebP보다 20% 더 높은 초고압축률을 제공하는 차세대 이미지 포맷입니다.', relatedSlug: 'image-format-and-loading-basics' },
  { term: 'font-display', description: '웹 폰트가 다운로드되는 동안 텍스트를 어떻게 보여줄지(swap, optional 등) 지정하는 CSS 속성입니다.', relatedSlug: 'web-font-loading-and-layout-shift' },
  { term: 'Content-Security-Policy', description: '브라우저가 신뢰할 수 있는 출처의 스크립트, 스타일, 이미지만 실행하도록 강제하는 가장 강력한 보안 헤더입니다.', relatedSlug: 'http-security-headers-starter' },
  { term: 'Rate Limiting', description: '특정 IP나 클라이언트로부터 들어오는 과도한 요청 빈도를 제한해 디도스 공격과 무단 스크래퍼를 막는 방어 기법입니다.', relatedSlug: 'crawler-traffic-rate-limiting-setup' },
  { term: 'Service Worker', description: '브라우저 백그라운드에서 실행되며 네트워크 요청을 가로채 오프라인 캐싱과 푸시 알림을 지원하는 스크립트입니다.', relatedSlug: 'service-worker-cache-vs-http-cache' },
  { term: 'Certbot', description: "Let's Encrypt를 통해 무료 SSL/TLS 인증서를 자동으로 발급받고 갱신해 주는 오픈소스 도구입니다.", relatedSlug: 'ssl-tls-auto-renewal-failure-cases' },
  { term: '무중단 배포', description: '새로운 버전을 배포하는 동안 사용자가 404 오류나 접속 끊김을 전혀 겪지 않도록 유지하는 배포 방식입니다.', relatedSlug: 'zero-downtime-deployment-rollback-strategy' },
];

export function getAllNotes(): CloudNote[] {
  return notes;
}

export function getNoteBySlug(slug: string): CloudNote | undefined {
  return notes.find((note) => note.slug === slug);
}
