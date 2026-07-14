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
  sources: NoteSource[];
  revisions: NoteRevision[];
  images?: NoteImage[];
}

export const notes: CloudNote[] = [
  {
    slug: 'email-auth-records-for-small-domains',
    title: '메일 인증 레코드(SPF, DKIM, DMARC)를 정리하는 순서',
    description: '도메인 메일을 함께 쓰는 작은 사이트가 SPF, DKIM, DMARC 레코드를 점검하고 단계적으로 강화하는 방법을 정리합니다.',
    category: 'DNS',
    publishedAt: '2026-05-19',
    reviewedAt: '2026-06-08',
    readingMinutes: 3,
    summary: '도메인을 옮기거나 DNS를 정리할 때 가장 늦게 발견되는 문제는 메일입니다. SPF, DKIM, DMARC는 웹 접속과 무관해 보이지만, 누락되면 정상적인 메일이 스팸으로 분류되거나 발신 자체가 막힙니다.',
    diagram: ['SPF TXT 레코드 하나로 통합', 'DKIM 선택자 등록', 'DMARC p=none 모니터링', 'quarantine → reject 단계 강화'],
    sections: [
      {
        heading: '메일도 도메인 신뢰의 일부다',
        body: [
          '작은 사이트를 운영하면서 같은 도메인으로 메일도 함께 쓰는 경우가 많습니다. 웹 호스팅이나 DNS 제공자를 옮길 때 A, CNAME 레코드는 신경 써서 옮기지만, 메일 인증과 관련된 TXT 레코드는 화면에서 잘 보이지 않아 그대로 빠뜨리기 쉽습니다.',
          'SPF, DKIM, DMARC는 메일이 실제로 도메인 소유자가 보낸 것인지 수신 서버가 판단하는 데 쓰는 레코드입니다. 이 값이 없거나 잘못되면 메일 자체는 발송되지만 수신함에 도착하지 못하고 스팸함으로 들어가거나 거부될 수 있습니다.',
        ],
      },
      {
        heading: 'SPF는 발신을 허용한 목록이다',
        body: [
          'SPF(Sender Policy Framework)는 이 도메인 이름으로 메일을 보낼 수 있는 서버나 서비스를 TXT 레코드 하나에 나열하는 방식입니다. 흔한 실수는 새 메일 서비스를 추가할 때마다 SPF TXT 레코드를 새로 만들어, 같은 도메인에 SPF 레코드가 여러 개 존재하게 되는 경우입니다. 이렇게 되면 검증 자체가 무효로 처리될 수 있습니다.',
          '올바른 방법은 기존 SPF 레코드 안에 include 구문으로 새 서비스를 추가하고, 더 이상 쓰지 않는 서비스의 include는 제거하는 것입니다. 레코드는 항상 도메인당 하나여야 하며, 변경할 때마다 현재 값을 먼저 복사해 두면 실수를 되돌리기 쉽습니다.',
        ],
      },
      {
        heading: 'DKIM과 DMARC는 서명과 처리 정책이다',
        body: [
          'DKIM(DomainKeys Identified Mail)은 발신 메일에 암호화 서명을 추가하고, 수신 서버가 도메인에 등록된 공개키 TXT 레코드로 그 서명을 확인하는 방식입니다. 이메일 제공자가 안내하는 선택자(selector) 이름과 값을 정확히 등록해야 하며, 메일 제공자를 바꾸면 이전 선택자 레코드는 정리하고 새 값을 등록해야 합니다.',
          'DMARC(Domain-based Message Authentication, Reporting and Conformance)는 SPF와 DKIM 검증에 실패한 메일을 어떻게 처리할지 알려주는 정책입니다. 처음에는 p=none으로 설정해 결과를 모니터링만 하고, 정상적인 발신 흐름을 확인한 뒤 quarantine, reject로 단계적으로 강화하는 편이 안전합니다. 처음부터 reject로 시작하면 누락된 발신 경로의 메일이 한꺼번에 막힐 수 있습니다.',
        ],
      },
    ],
    checklist: [
      '현재 도메인의 SPF TXT 레코드가 하나만 존재한다.',
      '실제로 사용 중인 모든 발신 서비스가 SPF include에 포함되어 있다.',
      '더 이상 쓰지 않는 서비스의 SPF include를 제거했다.',
      'DKIM 선택자 레코드가 이메일 제공자 안내값과 일치한다.',
      'DMARC 레코드가 존재하고 현재 정책 단계(p값)를 알고 있다.',
      'DNS 변경 후 테스트 메일을 보내 인증 결과를 확인했다.',
    ],
    sources: [
      { title: 'Google Workspace 고객센터: SPF, DKIM, DMARC로 이메일 인증 강화', url: 'https://support.google.com/a/answer/10583557' },
      { title: 'DMARC.org: Overview', url: 'https://dmarc.org/overview/' },
    ],
    revisions: [
      { date: '2026-05-19', note: '최초 게시' },
    ],
  },
  {
    slug: 'image-format-and-loading-basics',
    title: '작은 사이트를 위한 이미지 포맷과 로딩 기본',
    description: '사진, 아이콘, 스크린샷처럼 성격이 다른 이미지를 어떤 포맷과 크기로 다뤄야 하는지 운영자 관점에서 정리합니다.',
    category: '성능',
    publishedAt: '2026-05-21',
    reviewedAt: '2026-06-08',
    readingMinutes: 3,
    summary: '이미지는 작은 사이트의 페이지 용량 중 가장 큰 비중을 차지하는 경우가 많습니다. 포맷과 크기를 콘텐츠 성격에 맞게 정리하면 별도 도구 없이도 로딩 속도와 레이아웃 안정성을 함께 개선할 수 있습니다.',
    diagram: ['사진/아이콘 포맷 구분(WebP·SVG)', '표시 크기에 맞게 리사이즈', 'width/height·aspect-ratio 지정', '첫 화면 밖은 lazy loading'],
    sections: [
      {
        heading: '이미지 종류마다 맞는 포맷이 다르다',
        body: [
          '사진이나 화면을 캡처한 이미지는 WebP나 AVIF처럼 압축률이 높은 포맷이 적합합니다. 같은 화질에서 JPEG보다 파일 크기가 작아지는 경우가 많습니다. 반면 로고나 아이콘처럼 선이 분명한 그래픽은 SVG로 다루면 어떤 화면 크기에서도 흐려지지 않고 파일 크기도 작습니다.',
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
          '이미지가 로딩되기 전과 후에 차지하는 공간이 다르면, 텍스트와 버튼이 갑자기 밀리는 레이아웃 흔들림이 생깁니다. img 태그에 width와 height를 지정하거나 CSS의 aspect-ratio로 비율을 미리 정해두면, 이미지가 아직 도착하지 않아도 같은 크기의 빈 공간이 먼저 자리를 잡아 화면이 흔들리지 않습니다.',
        ],
      },
      {
        heading: '첫 화면과 그 아래는 다르게 다룬다',
        body: [
          '방문자가 스크롤하지 않고 바로 보는 첫 화면의 이미지는 가능한 한 빨리 보여줘야 합니다. 반면 글 중간이나 하단의 이미지는 화면에 들어오기 직전에 불러와도 충분하므로 loading="lazy" 속성을 적용하면 초기 로딩 부담을 줄일 수 있습니다.',
          '글 하나에 너무 많은 이미지를 넣으면 각 이미지의 효과가 희석되고 페이지 전체 용량만 커집니다. 설명에 꼭 필요한 이미지만 선별하는 편이 읽는 속도와 로딩 속도 모두에 유리합니다.',
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
    sources: [
      { title: 'MDN: Image file type and format guide', url: 'https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types' },
      { title: 'web.dev: Optimize Cumulative Layout Shift', url: 'https://web.dev/articles/optimize-cls' },
    ],
    revisions: [
      { date: '2026-05-21', note: '최초 게시' },
    ],
  },
  {
    slug: 'web-font-loading-and-layout-shift',
    title: '웹 폰트 로딩과 레이아웃 흔들림 줄이기',
    description: '외부 폰트를 불러올 때 텍스트가 늦게 보이거나 자리가 바뀌는 문제를 font-display와 대체 폰트로 줄이는 방법입니다.',
    category: '성능',
    publishedAt: '2026-05-23',
    reviewedAt: '2026-07-14',
    readingMinutes: 2,
    summary: '본문이 많은 사이트에서는 폰트 로딩 방식이 체감 속도와 레이아웃 안정성에 직접 영향을 줍니다. 자주 받는 질문 세 가지로 정리했습니다.',
    diagram: ['font-display(swap/optional) 지정', '대체 폰트 스택 구성', '외부 CDN 요청 수 확인', 'CLS 재측정'],
    sections: [
      {
        heading: 'Q. 폰트가 늦게 도착하면 어떤 문제가 생기나?',
        body: [
          '웹 폰트가 아직 도착하지 않았을 때 브라우저가 텍스트를 보여주지 않고 기다리면, 방문자는 한동안 빈 화면을 보게 됩니다. 반대로 대체 폰트로 먼저 글자를 보여주고 나중에 지정한 폰트로 바꾸면, 글자 크기와 자간이 달라지면서 줄바꿈 위치와 레이아웃이 움직일 수 있습니다. 둘 다 본문이 많은 사이트에서는 체감 품질에 영향을 줍니다.',
        ],
      },
      {
        heading: 'Q. font-display는 이 문제를 어떻게 해결해주나?',
        body: [
          'font-display 속성은 폰트가 로딩되는 동안 텍스트를 어떻게 보여줄지 정합니다. swap은 대체 폰트로 즉시 보여주고 폰트가 도착하면 교체하며, optional은 빠르게 도착하지 않으면 교체를 포기합니다. 본문 텍스트는 내용을 먼저 전달하는 것이 중요하므로 swap을 사용하는 경우가 많고, 장식적인 폰트는 optional로 두어도 무리가 없습니다.',
        ],
      },
      {
        heading: 'Q. 외부 CDN에서 폰트를 불러오면 뭐가 달라지나?',
        body: [
          '스타일시트에서 외부 폰트 CDN을 @import로 불러오면, 브라우저는 먼저 스타일시트를 받고 그 안에서 다시 폰트 파일을 요청합니다. 이 과정에서 왕복이 한 번 더 생기므로, 폰트 호스팅 방식을 바꾸거나 preconnect를 함께 쓰는 선택지를 검토할 수 있습니다. CloudPlare도 Pretendard 가변 폰트를 외부 CDN에서 불러오고 있어, 폰트 요청이 본문 렌더링을 늦추지 않는지 주기적으로 확인합니다.',
          '폰트가 늦게 도착해도 읽기에 문제가 없도록, 시스템 폰트로 구성된 대체 폰트 스택을 함께 지정해두는 것이 좋습니다. 대체 폰트와 지정 폰트의 글자 너비가 비슷할수록 교체 시 레이아웃 흔들림이 줄어듭니다.',
        ],
      },
    ],
    checklist: [
      '본문에 사용하는 폰트에 font-display 값을 지정했다.',
      '폰트가 늦게 로딩돼도 대체 폰트로 읽는 데 문제가 없다.',
      '외부 폰트 CDN 요청 수와 응답 크기를 확인했다.',
      '제목과 본문에 서로 다른 폰트 굵기를 과도하게 쓰지 않았다.',
      '폰트 설정 변경 후 CLS 점수를 다시 측정했다.',
    ],
    sources: [
      { title: 'web.dev: Best practices for fonts', url: 'https://web.dev/articles/font-best-practices' },
      { title: 'MDN: font-display', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display' },
    ],
    revisions: [
      { date: '2026-05-23', note: '최초 게시' },
      { date: '2026-07-14', note: '소제목을 Q&A 형식으로 전환' },
    ],
  },
  {
    slug: 'http-security-headers-starter',
    title: '작은 사이트를 위한 HTTP 보안 헤더 시작하기',
    description: 'Content-Security-Policy, Referrer-Policy, Permissions-Policy 같은 보안 헤더를 정적 사이트에 점진적으로 적용하는 방법입니다.',
    category: '보안',
    publishedAt: '2026-05-26',
    reviewedAt: '2026-06-10',
    readingMinutes: 3,
    summary: '보안 헤더는 큰 서비스만의 설정이 아닙니다. 정적 콘텐츠 사이트라도 몇 가지 헤더만 추가하면 스크립트 삽입이나 클릭재킹 같은 흔한 위험을 줄일 수 있습니다. 다만 한 번에 모두 적용하면 사이트가 깨질 수 있어 순서가 중요합니다.',
    diagram: ['CSP Report-Only로 시작', '허용 출처 목록 정리', '차단 모드로 전환', 'Referrer/Permissions-Policy 적용', '배포 후 응답 헤더 재확인'],
    sections: [
      {
        heading: '정적 사이트도 헤더로 스스로를 보호한다',
        body: [
          '로그인이나 결제가 없는 정적 사이트는 보안과 거리가 멀어 보이지만, 외부 스크립트가 삽입되거나 다른 사이트의 iframe에 그대로 표시되는 문제는 어떤 사이트에도 일어날 수 있습니다. HTTP 응답 헤더 몇 가지만 추가해도 이런 시나리오의 위험을 크게 줄일 수 있습니다.',
        ],
      },
      {
        heading: 'Content-Security-Policy는 신고 모드로 시작한다',
        body: [
          'CSP(Content-Security-Policy)는 페이지가 어떤 출처의 스크립트, 스타일, 이미지를 불러올 수 있는지 제한합니다. 처음부터 차단 모드로 적용하면 분석 스크립트나 폰트 CDN처럼 실제로 필요한 리소스까지 막혀 화면이 깨질 수 있습니다. Content-Security-Policy-Report-Only 헤더로 먼저 어떤 리소스가 정책에 걸리는지 확인한 뒤, 허용 목록을 정리하고 차단 모드로 전환하는 순서가 안전합니다.',
        ],
      },
      {
        heading: 'Referrer-Policy로 전달되는 정보를 줄인다',
        body: [
          '방문자가 외부 링크를 클릭해 다른 사이트로 이동할 때, 브라우저는 기본적으로 이전 페이지의 주소를 함께 전달합니다. Referrer-Policy 헤더로 이 정보를 얼마나 전달할지 조절할 수 있습니다. strict-origin-when-cross-origin처럼 도메인 정보까지만 전달하도록 설정하면, 글 제목이나 검색어가 포함된 URL이 외부에 그대로 노출되는 것을 줄일 수 있습니다.',
        ],
      },
      {
        heading: 'Permissions-Policy로 불필요한 권한을 차단한다',
        body: [
          '카메라, 마이크, 위치 정보처럼 브라우저가 제공하는 기능 중 콘텐츠 사이트에서 쓰지 않는 권한은 명시적으로 차단할 수 있습니다. Permissions-Policy 헤더로 사용하지 않는 기능을 비활성화해두면, 페이지에 삽입된 외부 iframe이나 스크립트가 해당 권한을 요청할 수 있는 경로 자체를 줄일 수 있습니다.',
        ],
      },
      {
        heading: '헤더는 적용 후 실제로 확인한다',
        body: [
          '헤더를 설정 파일에 추가했다고 끝나는 것이 아닙니다. 배포 후 브라우저 개발자 도구의 네트워크 탭에서 실제 응답 헤더를 열어, 의도한 값이 실제 도메인에도 적용됐는지 확인해야 합니다. CDN이나 호스팅 플랫폼이 일부 헤더를 자체적으로 추가하거나 덮어쓰는 경우도 있으므로, 로컬 설정과 실제 배포 결과를 함께 봐야 합니다.',
        ],
      },
    ],
    checklist: [
      'CSP를 Report-Only 모드로 먼저 적용해 영향을 확인했다.',
      '실제로 필요한 스크립트와 폰트 출처를 허용 목록에 정리했다.',
      'Referrer-Policy 값을 설정해 외부로 전달되는 정보를 줄였다.',
      '사용하지 않는 브라우저 기능을 Permissions-Policy로 제한했다.',
      '배포 후 실제 도메인의 응답 헤더를 개발자 도구로 확인했다.',
      '헤더 변경으로 정상 동작하던 스크립트나 폰트가 깨지지 않았다.',
    ],
    sources: [
      { title: 'MDN: Content-Security-Policy', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy' },
      { title: 'MDN: Referrer-Policy', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy' },
    ],
    revisions: [
      { date: '2026-05-26', note: '최초 게시' },
    ],
  },
  {
    slug: 'custom-404-and-broken-link-routine',
    title: '404 페이지와 깨진 링크를 점검하는 루틴',
    description: '존재하지 않는 페이지에 방문자가 도착했을 때 보여줄 화면과, 내부·외부 링크를 주기적으로 점검하는 방법을 정리합니다.',
    category: '배포',
    publishedAt: '2026-05-28',
    reviewedAt: '2026-07-14',
    readingMinutes: 3,
    summary: '404 페이지는 실수의 흔적이 아니라 방문자가 다음 행동을 정할 수 있게 돕는 안내판입니다. 링크 점검을 배포 후 한 번이 아니라 주기적인 루틴으로 만들면 사이트 전체의 신뢰도가 천천히 올라갑니다.',
    sections: [
      {
        heading: '404는 길을 잃었다는 신호다',
        body: [
          '오래된 글의 주소가 바뀌거나, 외부에서 잘못된 링크로 들어오거나, 방문자가 URL을 직접 수정하는 경우 404 페이지를 보게 됩니다. 기본 제공되는 404 화면은 오류 메시지만 보여주는 경우가 많아, 방문자는 여기서 그대로 이탈하기 쉽습니다. 홈으로 가는 링크, 검색이나 목록 페이지로 가는 링크를 함께 보여주면 방문자가 다음 행동을 고를 수 있습니다.',
          '사실 이 사이트도 한동안 커스텀 404 페이지가 없었습니다. 존재하지 않는 주소로 들어오면 Next.js 기본 화면만 뜨는 상태였고, 그 화면에는 홈으로 돌아갈 링크조차 없었습니다. 지금 /notes 목록에 없는 아무 주소로 들어가 보면, 최근 노트 5개와 홈·체크리스트 링크가 뜨는 페이지로 바뀐 걸 볼 수 있습니다. 글로 설명하던 걸 실제로 적용하는 데 생각보다 오래 걸렸습니다.',
        ],
      },
      {
        heading: '전부 홈으로 보내는 리다이렉트의 부작용',
        body: [
          '존재하지 않는 모든 경로를 홈으로 리다이렉트하면 404가 사라진 것처럼 보이지만, 검색엔진 입장에서는 서로 다른 수백 개의 주소가 모두 같은 페이지로 응답하는 것으로 보일 수 있습니다. 이는 사이트 구조를 더 혼란스럽게 만들고, 실제로 삭제된 콘텐츠와 단순히 주소가 바뀐 콘텐츠를 구분하기 어렵게 합니다.',
          '주소가 바뀐 콘텐츠는 새 주소로 개별 리다이렉트하고, 완전히 사라진 콘텐츠는 404로 응답하는 편이 검색엔진과 방문자 모두에게 더 명확한 신호를 줍니다. 404 페이지 자체는 홈으로 가는 버튼 하나가 아니라, 방문자가 원래 찾으려던 것과 비슷한 콘텐츠 목록을 보여주는 편이 이탈을 줄입니다.',
        ],
      },
      {
        heading: '링크는 한 번 검사하고 끝나지 않는다',
        body: [
          '배포 시점에는 정상이던 외부 링크도 시간이 지나면 대상 페이지가 사라지거나 주소가 바뀔 수 있습니다. 글이 늘어날수록 내부 링크와 외부 링크의 수도 함께 늘어나므로, 새 글을 게시할 때마다 이전 글의 링크까지 다시 확인하기는 어렵습니다. 분기마다 한 번씩이라도 대표 글의 링크 상태를 점검하는 루틴을 만들어두면, 깨진 링크가 오래 방치되는 것을 막을 수 있습니다.',
          '정리하면 세 가지입니다. 404 페이지에 홈과 목록으로 가는 링크를 반드시 넣을 것, 존재하지 않는 경로를 전부 홈으로 리다이렉트하지 않을 것, 그리고 대표 글의 외부 출처 링크 상태를 주기적으로 점검할 것. 세 번째가 가장 지키기 어렵습니다. 링크가 깨졌다고 알려주는 알림이 따로 없기 때문에, 결국 사람이 주기를 정해두고 직접 열어보는 수밖에 없습니다.',
        ],
      },
    ],
    sources: [
      { title: 'MDN: 404 Not Found', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404' },
      { title: 'Google Search Central: HTTP network errors and Google Search', url: 'https://developers.google.com/search/docs/crawling-indexing/http-network-errors' },
    ],
    revisions: [
      { date: '2026-05-28', note: '최초 게시' },
      { date: '2026-07-14', note: '체크리스트 형식을 서술형으로 전환하고, 이 사이트의 실제 404 페이지 적용 사례를 추가' },
    ],
  },
  {
    slug: 'reading-access-logs-small-sites',
    title: '접속 로그에서 이상 징후를 먼저 알아채는 법',
    description: '복잡한 모니터링 도구 없이도 접속 로그와 상태 코드 비율로 작은 사이트의 이상 신호를 먼저 알아채는 방법입니다.',
    category: '운영',
    publishedAt: '2026-05-30',
    reviewedAt: '2026-06-11',
    readingMinutes: 2,
    summary: '큰 장애는 보통 작은 신호가 쌓인 뒤에 드러납니다. 접속 로그나 기본 분석 도구의 상태 코드와 트래픽 추이를 평소에 한 번씩 보는 습관만으로도, 문제가 커지기 전에 알아챌 수 있는 경우가 많습니다.',
    diagram: ['평소 트래픽·상태코드 파악', '4xx/5xx/3xx 각각 다르게 확인', '사람 트래픽과 봇 트래픽 구분', '이상 패턴 기록'],
    sections: [
      {
        heading: '로그는 거창한 도구가 아니어도 된다',
        body: [
          '별도의 모니터링 서비스를 갖추지 않았더라도, 호스팅 플랫폼이나 CDN이 기본으로 제공하는 접속 로그와 분석 화면만으로도 시작할 수 있습니다. 중요한 것은 도구의 정교함이 아니라, 평소에 한 번씩 들여다보는 습관입니다.',
        ],
      },
      {
        heading: '정상 범위를 먼저 알아야 이상을 알아챈다',
        body: [
          '하루 방문자 수, 페이지별 요청 비율, 평균 응답 시간처럼 평소 수치를 어느 정도 알고 있어야 “오늘은 평소와 다르다”를 판단할 수 있습니다. 작은 사이트는 트래픽이 적어 숫자 하나의 변화가 크게 보일 수 있으므로, 하루 단위보다는 며칠간의 흐름으로 보는 편이 오해를 줄입니다.',
        ],
      },
      {
        heading: '상태 코드별로 다르게 읽는다',
        body: [
          '4xx 응답이 특정 경로에서 갑자기 늘었다면, 외부에서 잘못된 링크로 유입되거나 내부 링크가 깨졌을 가능성을 먼저 봅니다. 5xx 응답이 보인다면 코드, 환경 변수, 배포 설정처럼 서버 쪽 원인을 먼저 의심합니다. 3xx 비율이 갑자기 늘었다면 리다이렉트 규칙이 의도와 다르게 넓은 범위에 적용되고 있을 수 있습니다.',
          '같은 “오류 증가”도 어떤 상태 코드인지에 따라 확인할 곳이 달라지므로, 숫자만 보지 않고 어떤 경로와 상태 코드의 조합인지까지 함께 기록합니다.',
        ],
      },
      {
        heading: '사람 트래픽과 봇 트래픽을 구분한다',
        body: [
          '검색엔진 크롤러, 모니터링 서비스, 광고 관련 봇은 정상적인 트래픽의 일부입니다. 갑작스러운 방문자 수 증가가 실제 독자 증가인지, 특정 봇의 반복 요청인지 구분하지 못하면 잘못된 결론을 내릴 수 있습니다. User-Agent나 요청 패턴을 함께 보면 두 트래픽을 구분하는 데 도움이 됩니다.',
        ],
      },
    ],
    checklist: [
      '평소의 방문자 수와 상태 코드 비율을 대략 알고 있다.',
      '4xx 응답이 늘어난 경로와 패턴을 확인했다.',
      '5xx 응답이 보이면 최근 배포나 설정 변경과 시간을 비교했다.',
      '3xx 리다이렉트가 의도한 범위에서만 동작하는지 확인했다.',
      '갑작스러운 트래픽 변화가 사람인지 봇인지 구분해봤다.',
    ],
    sources: [
      { title: 'MDN: HTTP response status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status' },
      { title: 'Google Search Central: Verifying Googlebot', url: 'https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot' },
    ],
    revisions: [
      { date: '2026-05-30', note: '최초 게시' },
    ],
  },
  {
    slug: 'dns-records-before-deploy',
    title: 'DNS 레코드를 바꾸기 전에 확인하는 작은 운영 순서',
    description: 'A, CNAME, TXT, MX 레코드를 수정하기 전 실제 운영자가 확인해야 할 기준과 되돌리는 방법을 정리합니다.',
    category: 'DNS',
    publishedAt: '2026-06-01',
    reviewedAt: '2026-06-09',
    readingMinutes: 4,
    summary: '도메인 연결 문제는 대부분 배포 도구보다 DNS 변경 순서에서 시작됩니다. 이 글은 레코드를 고치기 전에 현재 상태를 기록하고, 변경 범위를 좁히고, 전파 시간을 기다리는 현실적인 절차를 다룹니다.',
    diagram: ['변경 전 레코드 스냅샷', 'A/CNAME/TXT/MX 역할 구분', 'TTL 고려해 일정 여유', '여러 DNS 조회 도구로 교차 확인'],
    sections: [
      {
        heading: 'DNS 변경은 배포 버튼보다 느리다',
        body: [
          '작은 웹사이트를 운영하다 보면 배포 자체는 1분 안에 끝나는데 접속 문제는 몇 시간씩 이어지는 일이 있습니다. 원인은 대개 코드가 아니라 DNS입니다. DNS는 여러 해석기와 캐시를 지나 사용자의 브라우저까지 도착하기 때문에, 관리 화면에서 값을 바꿨다고 모든 방문자가 즉시 같은 결과를 보는 구조가 아닙니다.',
          '그래서 DNS 작업은 “맞는 값을 넣는다”보다 “무엇을 바꿨고 어디까지 확인했는지 남긴다”가 더 중요합니다. 운영 기록 없이 A 레코드와 CNAME을 여러 번 바꾸면, 나중에는 어떤 값이 정상이고 어떤 값이 임시 조치였는지 구분하기 어려워집니다.',
        ],
      },
      {
        heading: '레코드별로 역할을 분리해서 본다',
        body: [
          'A 레코드는 도메인을 IPv4 주소에 연결하고, AAAA 레코드는 IPv6 주소를 가리킵니다. CNAME은 한 이름을 다른 이름의 별칭으로 연결합니다. TXT는 소유권 확인, 이메일 인증, 보안 정책처럼 사람이 읽는 값보다 서비스가 검사하는 값에 자주 쓰입니다. MX는 메일 수신 서버를 지정하므로 웹 배포와 직접 관련이 없어 보여도 실수로 지우면 메일 수신이 멈출 수 있습니다.',
          '루트 도메인과 www 서브도메인을 같은 방식으로 다루는 것도 흔한 실수입니다. 어떤 호스팅 서비스는 루트에는 A 레코드나 ALIAS류 설정을 요구하고, www에는 CNAME을 요구합니다. 반대로 둘 다 CNAME으로 처리하려다 DNS 제공자 제약에 막히는 경우도 있습니다. 변경 전에는 현재 DNS 제공자가 지원하는 레코드 타입과 호스팅 업체의 연결 안내를 같이 봐야 합니다.',
      ],
      },
      {
        heading: '작업 전 스냅샷을 남긴다',
        body: [
          'DNS를 바꾸기 전에는 기존 레코드를 캡처하거나 텍스트로 복사해 둡니다. 최소한 이름, 타입, 값, TTL, 프록시 사용 여부, 메모를 남겨야 합니다. 이 기록은 문제가 생겼을 때 되돌리는 기준이 됩니다. “기존 값으로 복구”라고 말하려면 기존 값이 실제로 남아 있어야 합니다.',
          'TTL은 캐시가 얼마나 오래 유지될 수 있는지를 알려주는 값입니다. 급한 이전 작업이라면 하루 전에 TTL을 낮춰두는 방식이 도움이 될 수 있습니다. 다만 이미 높은 TTL로 배포된 값은 바로 사라지지 않습니다. 작업 당일에 TTL만 낮춰도 모든 곳이 즉시 빨라지는 것은 아니니, 중요한 도메인은 일정에 여유를 둬야 합니다.',
        ],
      },
      {
        heading: '확인은 한 도구만 믿지 않는다',
        body: [
          '브라우저 접속 성공만으로 DNS가 완전히 정상이라고 판단하기 어렵습니다. 내 브라우저는 이전 캐시를 들고 있을 수 있고, 사내 네트워크나 통신사 DNS가 다른 응답을 줄 수도 있습니다. 로컬 터미널, 외부 DNS 조회 도구, 모바일 네트워크처럼 서로 다른 경로에서 확인하면 문제 범위를 좁히기 쉽습니다.',
          '문제가 생겼을 때는 “도메인이 안 된다”가 아니라 “루트 도메인의 A 레코드는 새 IP를 보지만 www CNAME은 예전 값을 본다”처럼 관찰한 사실을 분리해 적습니다. 이렇게 적어야 호스팅, DNS, 인증서 중 어느 층을 봐야 하는지 빠르게 결정할 수 있습니다.',
        ],
      },
    ],
    checklist: [
      '변경 전 레코드 이름, 타입, 값, TTL을 기록했다.',
      '루트 도메인과 www 서브도메인의 연결 방식이 각각 확인됐다.',
      'TXT와 MX처럼 웹 접속 외 기능에 쓰이는 레코드를 삭제하지 않았다.',
      '변경 후 최소 두 가지 DNS 조회 경로에서 응답을 확인했다.',
      '되돌릴 값과 판단 시간을 운영 메모에 남겼다.',
    ],
    sources: [
      { title: 'MDN: What is a domain name?', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name' },
      { title: 'ICANN: DNS Basics', url: 'https://www.icann.org/resources/pages/dns-basics-2012-02-25-en' },
    ],
    revisions: [
      { date: '2026-06-01', note: '최초 게시' },
    ],
  },
  {
    slug: 'static-site-release-checklist',
    title: '정적 사이트 배포 전에 보는 마지막 체크리스트',
    description: '작은 정적 사이트를 배포하기 전 링크, 메타데이터, 404, robots, sitemap, 캐시를 확인하는 현실적인 순서입니다.',
    category: '배포',
    publishedAt: '2026-06-02',
    reviewedAt: '2026-06-09',
    readingMinutes: 3,
    summary: '정적 사이트는 서버가 단순한 대신 작은 누락이 그대로 공개됩니다. 배포 직전 사람이 직접 확인해야 하는 항목을 운영자 관점으로 정리했습니다.',
    diagram: ['title/description 현재 주제와 일치 확인', 'sitemap엔 핵심 URL만', 'robots가 sitemap 위치 안내', '배포 후 실제 도메인 재확인'],
    sections: [
      {
        heading: '정적 사이트의 장점은 단순함이고 약점도 단순함이다',
        body: [
          '정적 사이트는 데이터베이스나 서버 세션이 없어 장애 면이 좁습니다. 하지만 잘못 만든 링크, 비어 있는 메타 설명, 오래된 sitemap, 존재하지 않는 이미지 같은 문제도 빌드가 성공했다는 이유로 함께 배포됩니다. 정적 배포에서 빌드 성공은 “문법이 맞다”에 가깝고, “방문자에게 좋은 페이지다”와는 별개의 문제입니다.',
          '배포 전 점검은 거창한 자동화보다 반복 가능한 순서가 중요합니다. 홈, 목록, 상세, 정책 페이지를 같은 흐름으로 열어보며 제목, 본문 첫 문단, 내부 링크, 외부 링크, 모바일 화면을 확인하면 방문자가 처음 마주하는 기본 품질을 끌어올릴 수 있습니다.',
        ],
      },
      {
        heading: '메타데이터는 페이지의 약속이다',
        body: [
          '검색 결과와 공유 미리보기에는 title과 description이 먼저 노출됩니다. 이 값이 페이지 본문과 어긋나면 방문자는 기대한 정보를 찾지 못하고 바로 나갑니다. 사이트 전체에서 주제가 흐릿하면 방문자뿐 아니라 검색엔진도 이 사이트가 무엇을 다루는 곳인지 판단하기 어려워집니다. 홈은 사이트의 목적을 말하고, 상세 글은 글 하나의 문제와 답을 말해야 합니다.',
          '특히 이전 프로젝트에서 가져온 메타 문구가 남는 경우가 많습니다. 콘텐츠를 전면 개편했다면 레이아웃, 홈, 상세, 소개, 개인정보처리방침까지 모두 같은 브랜드와 주제를 말하는지 확인해야 합니다. 한 곳이라도 예전 주제가 남으면 사이트가 임시 복제물처럼 보일 수 있습니다.',
        ],
      },
      {
        heading: 'robots와 sitemap은 적게, 정확하게',
        body: [
          '새로 만든 사이트는 많은 URL보다 신뢰할 수 있는 URL을 보여주는 편이 낫습니다. 비어 있거나 얇은 페이지를 sitemap에 넣어 페이지 수를 늘리는 방식은 오히려 검색엔진에 "가치가 낮은 콘텐츠" 신호로 읽힐 수 있습니다. sitemap에는 실제로 색인되길 원하는 핵심 페이지와 깊이 있는 글만 넣는 편이 안전합니다.',
          'robots.txt는 크롤러에게 전체 사이트 접근 정책을 알려주고 sitemap 위치를 안내합니다. 다만 robots가 페이지 품질을 대신 보장하지는 않습니다. noindex 처리한 페이지가 내부에서 계속 강조되거나, 사용자가 쉽게 접근했을 때 빈 내용이면 사이트 경험은 여전히 나빠집니다.',
        ],
      },
      {
        heading: '배포 후에는 실제 도메인으로 확인한다',
        body: [
          '로컬 개발 서버에서 정상이어도 실제 도메인에서는 다른 문제가 나올 수 있습니다. 환경 변수, CDN 캐시, 빌드 산출물, 리다이렉트, HTTPS 인증서가 모두 실제 배포 경로에서만 드러납니다. 배포 직후에는 루트, sitemap, robots, 대표 글, 404 페이지를 실제 도메인으로 확인해야 합니다.',
          '확인 기록은 간단해도 됩니다. 배포한 커밋, 확인한 URL, 발견한 문제, 수정 여부만 남겨도 다음 배포 때 같은 실수를 줄일 수 있습니다. 작은 사이트일수록 이런 기록이 운영자의 신뢰도를 만듭니다.',
        ],
      },
    ],
    checklist: [
      '홈과 대표 글의 title, description이 현재 주제와 일치한다.',
      'sitemap에는 색인할 핵심 URL만 포함되어 있다.',
      'robots.txt가 sitemap 위치를 정확히 안내한다.',
      '대표 내부 링크와 외부 출처 링크를 실제 도메인에서 열어봤다.',
      '모바일 폭에서 제목과 버튼 문구가 깨지지 않는다.',
    ],
    sources: [
      { title: 'Next.js: Metadata and OG Images', url: 'https://nextjs.org/docs/app/getting-started/metadata-and-og-images' },
      { title: 'Google Search Central: Build and submit a sitemap', url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap' },
    ],
    revisions: [
      { date: '2026-06-02', note: '최초 게시' },
    ],
  },
  {
    slug: 'http-cache-control-field-notes',
    title: 'HTTP Cache-Control을 운영자가 이해하는 방식',
    description: 'Cache-Control의 max-age, no-cache, no-store, stale-while-revalidate를 실제 사이트 운영 관점에서 설명합니다.',
    category: '캐시',
    publishedAt: '2026-06-03',
    reviewedAt: '2026-06-10',
    readingMinutes: 3,
    summary: '캐시는 속도를 올리지만 잘못 쓰면 오래된 화면을 배포합니다. 헤더 이름을 외우기보다 어떤 리소스를 얼마나 믿고 재사용할지 결정하는 관점이 필요합니다.',
    diagram: ['리소스 성격별 캐시 정책 구분', 'no-cache vs no-store 구분', '정적 자산은 길게, HTML은 짧게', 's-maxage(CDN)와 max-age(브라우저) 분리'],
    sections: [
      {
        heading: '캐시는 저장이 아니라 약속이다',
        body: [
          'Cache-Control은 브라우저와 중간 캐시에게 응답을 어떻게 재사용할지 알려주는 HTTP 헤더입니다. 단순히 “캐시한다”와 “캐시하지 않는다”로 나누기보다, 어떤 응답을 얼마나 오래 신선하다고 볼지, 다시 확인할지, 아예 저장하지 말지를 정하는 약속에 가깝습니다.',
          '정적 파일, 글 페이지, 개인화 페이지는 같은 정책을 쓰면 안 됩니다. 해시가 붙은 자바스크립트 번들은 오래 캐시해도 비교적 안전하지만, 로그인 후 개인 정보가 담긴 응답을 공유 캐시에 저장하면 심각한 문제가 됩니다. 작은 사이트라도 페이지 성격별로 정책을 나눠야 합니다.',
        ],
      },
      {
        heading: 'no-cache는 저장 금지가 아니다',
        body: [
          '이름 때문에 자주 헷갈리지만 no-cache는 저장하지 말라는 뜻이 아닙니다. 저장할 수는 있지만 다시 사용할 때 원 서버에 검증하라는 의미입니다. 정말 저장 자체를 피해야 하는 민감한 응답에는 no-store가 더 적절합니다.',
          '운영자가 이 차이를 모르면 “no-cache를 넣었는데 왜 캐시가 남아 있지?” 같은 혼란이 생깁니다. 브라우저가 응답을 저장하고 매번 재검증하는 것과, 아예 저장하지 않는 것은 전혀 다른 동작입니다. 정책을 읽을 때는 이름보다 실제 지시 내용을 봐야 합니다.',
        ],
      },
      {
        heading: '정적 자산은 오래, 문서는 짧게',
        body: [
          '파일명에 해시가 들어간 정적 자산은 내용이 바뀌면 URL도 바뀌므로 오래 캐시하기 좋습니다. 반면 HTML 문서는 같은 URL에서 내용이 바뀔 수 있습니다. 글 수정, 메타 변경, 정책 페이지 업데이트가 잦다면 HTML에 너무 긴 max-age를 주면 방문자가 오래된 설명을 볼 수 있습니다.',
          'CDN을 쓰는 경우 브라우저 캐시와 CDN 캐시를 구분해야 합니다. s-maxage는 공유 캐시에 적용되고, max-age는 일반 캐시에 적용됩니다. 둘을 섞어 쓸 때는 어느 계층이 어떤 시간 동안 응답을 들고 있는지 운영 메모에 남겨야 장애 때 빠르게 지울 수 있습니다.',
        ],
      },
      {
        heading: 'stale-while-revalidate는 만능이 아니다',
        body: [
          'stale-while-revalidate는 오래된 응답을 잠시 보여주면서 뒤에서 새 응답을 확인하는 전략입니다. 읽기 중심 페이지에는 체감 속도를 좋게 만들 수 있지만, 즉시 반영이 중요한 공지나 가격, 보안 관련 안내에는 조심스럽게 써야 합니다.',
          '캐시 정책은 성능 도구 점수만 보고 정하지 않습니다. 방문자가 오래된 정보를 봐도 되는지, 배포자가 캐시를 언제 무효화할 수 있는지, 문제가 생겼을 때 어떤 계층부터 지울지까지 함께 결정해야 합니다.',
        ],
      },
    ],
    checklist: [
      'no-cache와 no-store의 차이를 이해하고 적용했다.',
      'HTML 문서와 해시 기반 정적 자산의 캐시 정책을 분리했다.',
      'CDN 공유 캐시에 적용되는 s-maxage 사용 여부를 확인했다.',
      '오래된 정보가 노출되면 위험한 페이지를 별도로 분류했다.',
      '캐시 제거 방법과 확인 URL을 운영 기록에 남겼다.',
    ],
    sources: [
      { title: 'MDN: Cache-Control header', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control' },
      { title: 'HTTP Caching specification', url: 'https://httpwg.org/specs/rfc9111.html' },
    ],
    revisions: [
      { date: '2026-06-03', note: '최초 게시' },
    ],
  },
  {
    slug: 'cdn-cache-mistakes-small-sites',
    title: '작은 사이트에서 자주 겪는 CDN 캐시 실수',
    description: 'CDN을 켰는데 수정이 안 보이거나 특정 경로만 오래된 화면을 보여주는 상황을 운영 관점에서 정리합니다.',
    category: 'CDN',
    publishedAt: '2026-06-04',
    reviewedAt: '2026-06-10',
    readingMinutes: 3,
    summary: 'CDN은 느린 서버를 감추는 도구가 아니라 응답을 여러 위치에서 재사용하는 계층입니다. 작은 사이트에서 흔히 생기는 오해를 실제 점검 순서로 풀었습니다.',
    diagram: ['원본/CDN 어느 계층이 오래됐는지 분리', '전체 삭제보다 경로 단위 삭제', '쿼리 문자열·쿠키의 캐시 키 영향 확인', '개인화 응답은 공유 캐시 제외'],
    sections: [
      {
        heading: 'CDN은 배포물을 한 번 더 들고 있다',
        body: [
          '원본 서버에 새 파일이 올라갔는데 방문자는 예전 화면을 볼 수 있습니다. CDN이 이전 응답을 아직 신선하다고 판단하기 때문입니다. 이 상황에서 코드를 계속 다시 배포하면 원인은 그대로인데 변경 이력만 늘어납니다.',
          '먼저 확인할 것은 어느 계층이 오래된 응답을 주는지입니다. 원본 URL, CDN이 붙은 도메인, 브라우저 강력 새로고침, 다른 네트워크를 나눠서 확인하면 원본 문제인지 CDN 문제인지 분리할 수 있습니다.',
        ],
      },
      {
        heading: '전체 삭제보다 경로 삭제가 안전하다',
        body: [
          '급할 때 전체 캐시 삭제를 누르기 쉽지만, 트래픽이 있는 사이트에서는 갑자기 모든 요청이 원본으로 몰릴 수 있습니다. 작은 사이트라도 이미지와 정적 자산이 많으면 배포 직후 원본 부하가 튈 수 있습니다. 문제가 특정 HTML이나 특정 이미지라면 경로 단위로 지우는 편이 낫습니다.',
          '캐시 삭제 전에는 어떤 URL이 오래됐는지 정확히 적습니다. /about인지 /notes/foo인지, 이미지 파일인지 HTML인지에 따라 처리 방법이 달라집니다. 캐시 문제를 “사이트가 이상함”으로 묶으면 원인을 찾기 어려워집니다.',
        ],
      },
      {
        heading: '쿠키와 쿼리 문자열을 가볍게 보지 않는다',
        body: [
          'CDN은 설정에 따라 쿠키, 헤더, 쿼리 문자열을 캐시 키에 포함하거나 제외합니다. 같은 URL처럼 보여도 쿼리 문자열이 다르면 다른 캐시로 취급될 수 있고, 반대로 쿼리를 무시하면 실제로 다른 응답이어야 할 요청이 같은 캐시를 공유할 수 있습니다.',
          '정적 블로그나 문서 사이트라면 쿼리 문자열을 거의 쓰지 않는 편이 단순합니다. 추적 파라미터가 붙은 URL이 색인되거나 공유되지 않도록 canonical과 내부 링크를 정리하는 것도 함께 봐야 합니다.',
        ],
      },
      {
        heading: '캐시 히트율보다 사용자에게 맞는 응답이 먼저다',
        body: [
          '캐시 히트율이 높으면 비용과 속도에는 유리하지만, 사용자마다 달라야 하는 응답까지 캐시하면 문제가 됩니다. 로그인, 장바구니, 지역별 가격처럼 개인화가 필요한 페이지는 공유 캐시 대상이 아닙니다. CloudPlare 같은 읽기 중심 사이트는 대부분 정적 문서라 비교적 단순하지만, 문의 폼이나 관리자 페이지가 붙으면 정책을 다시 나눠야 합니다.',
          '읽기 중심 콘텐츠 사이트에서는 과한 캐시 설정보다 안정적인 최신 문서 노출이 더 중요합니다. 특히 소개, 정책, 편집 기준 같은 신뢰 페이지는 변경 후 실제 도메인에서 바로 확인하는 습관을 들이는 것이 좋습니다.',
        ],
      },
    ],
    checklist: [
      '오래된 응답이 원본 서버인지 CDN인지 분리해서 확인했다.',
      '캐시 삭제 대상 URL을 기록하고 경로 단위 삭제를 우선 검토했다.',
      '쿼리 문자열과 쿠키가 캐시 키에 미치는 영향을 확인했다.',
      '개인화 응답을 공유 캐시에 저장하지 않도록 구분했다.',
      '캐시 삭제 후 실제 도메인과 다른 네트워크에서 재확인했다.',
    ],
    sources: [
      { title: 'MDN: HTTP caching', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching' },
      { title: 'web.dev: HTTP cache', url: 'https://web.dev/articles/http-cache' },
    ],
    revisions: [
      { date: '2026-06-04', note: '최초 게시' },
    ],
  },
  {
    slug: 'core-web-vitals-operator-view',
    title: 'Core Web Vitals를 운영자 관점으로 읽는 법',
    description: 'LCP, INP, CLS를 점수 암기가 아니라 사용자가 느끼는 로딩, 반응, 안정성 문제로 해석합니다.',
    category: '성능',
    publishedAt: '2026-06-05',
    reviewedAt: '2026-06-11',
    readingMinutes: 3,
    summary: '성능 점수는 목적이 아니라 증상 지도입니다. 작은 사이트 운영자가 Core Web Vitals를 읽고 개선 우선순위를 정하는 방법을 정리했습니다.',
    diagram: ['LCP·INP·CLS 중 원인 지표 구분', '실험실 점수와 현장 데이터 함께 보기', '이미지·폰트부터 우선 점검', '변경 전후 기록'],
    sections: [
      {
        heading: '세 지표는 각각 다른 불편을 말한다',
        body: [
          'LCP는 주요 콘텐츠가 보이기까지의 시간을 봅니다. 사용자는 빈 화면이나 골격만 오래 보이면 사이트가 느리다고 느낍니다. INP는 사용자의 클릭, 입력, 탭 같은 상호작용 뒤 화면이 반응하기까지의 지연을 봅니다. CLS는 로딩 중 레이아웃이 얼마나 흔들리는지 봅니다.',
          '이 세 지표를 하나의 “성능 점수”로만 보면 개선 방향을 놓치기 쉽습니다. LCP가 나쁜 페이지와 CLS가 나쁜 페이지는 원인이 다릅니다. 첫 이미지를 줄여야 하는지, 자바스크립트 실행을 줄여야 하는지, 이미지 크기 공간을 미리 잡아야 하는지 따로 판단해야 합니다.',
        ],
      },
      {
        heading: '운영자는 실험실 점수와 실제 사용자 데이터를 구분한다',
        body: [
          '개발 도구에서 한 번 측정한 점수는 실험실 조건입니다. 기기 성능, 네트워크, 지역, 캐시 상태에 따라 실제 방문자의 경험은 다를 수 있습니다. 작은 사이트는 트래픽이 적어 실제 사용자 데이터가 늦게 쌓일 수 있으므로, 실험실 점수와 현장 데이터를 함께 봐야 합니다.',
          '개선 작업을 할 때는 대표 페이지를 정해 반복 측정합니다. 홈, 노트 목록, 긴 글 상세처럼 레이아웃이 다른 페이지를 각각 확인해야 합니다. 한 페이지가 좋아졌다고 사이트 전체가 좋아졌다고 말하기 어렵습니다.',
        ],
      },
      {
        heading: '이미지와 폰트는 작은 사이트의 큰 변수다',
        body: [
          '콘텐츠 사이트는 복잡한 앱보다 이미지와 폰트가 성능을 좌우하는 경우가 많습니다. 첫 화면에 큰 이미지를 쓰면 LCP가 느려질 수 있고, 폰트 로딩이 늦으면 텍스트 표시가 지연되거나 레이아웃이 바뀔 수 있습니다. 꼭 필요한 시각 요소만 쓰고, 크기와 비율을 미리 정하는 것이 안정적입니다.',
          '콘텐츠 중심 사이트에서는 화려한 효과보다 읽기 좋은 본문과 빠른 첫 화면이 우선입니다. 글 목록과 상세 페이지는 불필요한 클라이언트 스크립트를 줄이고, 서버에서 정적으로 렌더링되는 구조를 유지하는 편이 안정적입니다.',
        ],
      },
      {
        heading: '개선 기록을 남겨야 다음 판단이 쉬워진다',
        body: [
          '성능 개선은 한 번에 끝나지 않습니다. 이미지 최적화, 폰트 변경, 컴포넌트 제거, 캐시 정책 변경을 할 때마다 무엇을 바꿨고 어떤 지표가 움직였는지 기록해야 합니다. 기록이 없으면 다음 문제 때 같은 실험을 반복합니다.',
          '성능은 사용 경험의 일부입니다. 빠르고 안정적인 문서 사이트는 콘텐츠를 읽기 쉽게 만들고, 방문자가 글을 끝까지 읽기 전에 떠나는 비율을 줄입니다. 다만 성능만 좋고 콘텐츠가 얇으면 방문자가 머무를 이유 자체가 없으므로, 성능은 콘텐츠 품질을 받쳐주는 기반으로 봐야 합니다.',
        ],
      },
    ],
    checklist: [
      'LCP, INP, CLS 중 어떤 지표가 문제인지 구분했다.',
      '홈, 목록, 상세 글을 별도로 측정했다.',
      '첫 화면 이미지와 폰트가 로딩에 미치는 영향을 확인했다.',
      '레이아웃 이동을 줄이기 위해 이미지/영역 크기를 고정했다.',
      '성능 변경 전후의 측정 조건과 결과를 기록했다.',
    ],
    sources: [
      { title: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
      { title: 'Chrome for Developers: INP', url: 'https://developer.chrome.com/docs/lighthouse/performance/interactive' },
    ],
    revisions: [
      { date: '2026-06-05', note: '최초 게시' },
    ],
  },
  {
    slug: 'https-redirects-domain-canonical',
    title: 'HTTPS와 리다이렉트를 정리할 때 놓치기 쉬운 것',
    description: 'http, https, www, 루트 도메인, canonical을 하나의 운영 흐름으로 정리합니다.',
    category: '도메인',
    publishedAt: '2026-06-06',
    reviewedAt: '2026-06-11',
    readingMinutes: 3,
    summary: '도메인은 접속만 되면 끝이 아닙니다. 여러 주소가 같은 페이지를 가리킬 때 어떤 주소를 기준으로 삼을지 정해야 검색과 사용자 경험이 안정됩니다.',
    diagram: ['기준 주소 하나로 통일', '인증서 → 리다이렉트 → HSTS 순서 점검', 'canonical·sitemap·내부링크 일치', '리다이렉트 체인 최소화'],
    sections: [
      {
        heading: '주소가 여러 개면 기준 주소를 정한다',
        body: [
          '사용자는 example.com, www.example.com, http://example.com, https://example.com을 모두 같은 사이트로 생각할 수 있습니다. 하지만 브라우저와 검색엔진, 캐시 계층에는 서로 다른 URL입니다. 운영자는 이 중 하나를 기준 주소로 정하고 나머지는 일관되게 이동시켜야 합니다.',
          'CloudPlare처럼 루트 도메인을 브랜드로 쓰는 사이트라면 https://cloudplare.com을 기준으로 삼고, www나 http 요청은 그 주소로 이동시키는 방식이 단순합니다. 중요한 것은 어떤 선택을 하든 모든 내부 링크, canonical, sitemap이 같은 기준을 말해야 한다는 점입니다.',
        ],
      },
      {
        heading: 'HTTPS는 인증서와 리다이렉트가 함께 맞아야 한다',
        body: [
          'HTTPS 인증서가 발급되어 있어도 http에서 https로 이동하지 않으면 사용자는 여전히 안전하지 않은 주소로 들어올 수 있습니다. 반대로 리다이렉트만 있고 인증서가 잘못되면 브라우저 경고가 먼저 보입니다. 인증서, 리다이렉트, HSTS 같은 정책은 순서를 갖고 점검해야 합니다.',
          '처음 사이트를 정리할 때는 HSTS를 서둘러 강하게 걸기보다 기본 HTTPS 연결과 리다이렉트가 안정적으로 작동하는지 먼저 봅니다. 잘못된 HSTS 설정은 되돌리기까지 시간이 걸릴 수 있어 작은 사이트에도 부담이 됩니다.',
        ],
      },
      {
        heading: 'canonical은 검색엔진에게 주는 힌트다',
        body: [
          'canonical 링크는 이 페이지의 대표 URL을 알려주는 힌트입니다. 같은 글이 여러 경로로 열리거나 쿼리 문자열이 붙어 공유되는 경우 대표 주소를 정리하는 데 도움이 됩니다. 하지만 canonical이 있다고 해서 잘못된 내부 링크나 중복 페이지 문제가 자동으로 사라지는 것은 아닙니다.',
          'sitemap에는 canonical로 삼는 URL만 넣고, 내부 링크도 같은 주소를 사용해야 합니다. 사용자가 보는 링크와 검색엔진에게 말하는 대표 주소가 다르면 사이트 구조가 어수선해 보입니다.',
        ],
      },
      {
        heading: '리다이렉트 체인은 짧게 만든다',
        body: [
          'http에서 www로, 다시 https로, 다시 루트로 이동하는 식의 긴 체인은 느리고 관리하기 어렵습니다. 가능하면 한 번의 영구 리다이렉트로 기준 주소에 도착하게 만듭니다. 오래된 경로를 새 경로로 옮길 때도 중간 경로를 여러 개 거치지 않도록 정리합니다.',
          '전면 개편 후에는 기존 주제의 URL이 새 사이트에 남지 않도록 하는 것이 중요합니다. 관련 없는 오래된 URL을 새 콘텐츠로 억지 연결하면 방문자 기대와 실제 페이지가 어긋납니다. 삭제된 주제는 404로 정리하거나, 명확한 새 홈으로 제한적으로 안내하는 편이 낫습니다.',
        ],
      },
    ],
    checklist: [
      '기준 주소를 https://cloudplare.com으로 정했다.',
      'sitemap, canonical, 내부 링크가 같은 기준 주소를 사용한다.',
      'http와 www 요청이 불필요한 체인 없이 정리된다.',
      '인증서 오류가 실제 브라우저에서 발생하지 않는다.',
      '전면 개편 전 오래된 URL이 새 주제와 섞이지 않는다.',
    ],
    sources: [
      { title: 'Google Search Central: Canonicalization', url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls' },
      { title: 'MDN: HTTPS', url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTTPS' },
    ],
    revisions: [
      { date: '2026-06-06', note: '최초 게시' },
    ],
  },
  {
    slug: 'nextjs-deploy-notes-for-small-sites',
    title: 'Next.js 작은 사이트 배포 메모',
    description: 'App Router 기반 작은 콘텐츠 사이트를 배포할 때 metadata, 정적 생성, 라우트 정리를 확인하는 메모입니다.',
    category: 'Next.js',
    publishedAt: '2026-06-07',
    reviewedAt: '2026-06-12',
    readingMinutes: 3,
    summary: 'Next.js는 앱도 만들 수 있지만 작은 문서 사이트에도 잘 맞습니다. 다만 동적 기능을 줄이고 정적 페이지 품질을 관리해야 오래 안정적으로 운영할 수 있습니다.',
    diagram: ['가능한 페이지는 정적 생성', 'layout/개별 페이지 metadata 역할 분리', '삭제한 라우트 sitemap에서 제외', '빌드 결과·실도메인 재확인'],
    sections: [
      {
        heading: '콘텐츠 사이트는 정적으로 생각한다',
        body: [
          '작은 노트 사이트는 사용자가 글을 읽는 것이 핵심입니다. 로그인, 실시간 검색, 복잡한 API가 없다면 가능한 많은 페이지를 정적으로 생성하는 편이 빠르고 단순합니다. 정적 생성은 서버 비용과 장애 가능성을 줄이고, 배포 결과를 예측하기 쉽게 만듭니다.',
          'Next.js App Router에서는 데이터가 파일이나 정적 배열에 있으면 목록과 상세 페이지를 안정적으로 생성할 수 있습니다. 크롤러가 보는 HTML이 분명하고, 각 페이지의 메타데이터와 본문이 일관되게 노출되어 검색엔진이 사이트 구조를 파악하기 쉬워집니다.',
        ],
      },
      {
        heading: 'metadata는 레이아웃과 페이지가 역할을 나눈다',
        body: [
          '전역 layout의 metadata는 사이트 전체의 기본 설명을 맡고, 개별 글 페이지의 generateMetadata는 글 제목과 설명을 맡는 식으로 나누면 관리가 쉽습니다. 자주 생기는 실수는 layout에는 새로 정리한 설명을 넣고, 개별 페이지에는 이전에 쓰던 문구가 그대로 남는 경우입니다.',
          '브랜드명, 사이트 설명, Open Graph, JSON-LD까지 같은 주제를 말해야 합니다. 페이지마다 다른 이름이나 설명이 섞여 있으면 검색엔진과 방문자 모두 이 사이트의 정체성을 한 문장으로 정리하기 어려워집니다.',
        ],
      },
      {
        heading: '라우트 삭제는 콘텐츠 삭제와 다르다',
        body: [
          '파일을 지우면 경로는 사라지지만, 검색엔진이나 외부 링크는 한동안 예전 URL을 기억할 수 있습니다. 개편 전 주제와 새 주제가 완전히 다르다면 오래된 URL을 억지로 새 글에 연결하지 않는 편이 낫습니다. 사용자 의도가 다르기 때문입니다.',
          '삭제한 경로가 많다면 sitemap에서 먼저 제외하고, 실제 요청이 오면 404가 나오는지 확인합니다. 필요한 경우에만 새 홈으로 안내합니다. 관련 없는 주제끼리 301을 걸면 새 사이트의 주제 신뢰도가 흐려질 수 있습니다.',
        ],
      },
      {
        heading: '빌드 결과를 운영 체크리스트로 읽는다',
        body: [
          'Next.js 빌드 결과에는 어떤 경로가 정적으로 생성됐고 어떤 경로가 동적으로 처리되는지 표시됩니다. 콘텐츠 사이트라면 대부분의 공개 페이지가 정적이어야 이해하기 쉽습니다. 예상치 못한 API나 동적 라우트가 남아 있으면 이전 기능이 덜 제거됐다는 신호일 수 있습니다.',
          '배포 전에 빌드, lint, 키워드 검색을 같이 돌립니다. 사이트 주제를 바꾼 적이 있다면 이전 주제와 관련된 단어가 코드나 메타데이터에 남아 있는지 확인해야 합니다. 사람에게는 작은 문구 하나지만, 검색엔진에는 사이트 정체성이 섞인 신호로 읽힐 수 있습니다.',
        ],
      },
    ],
    checklist: [
      '공개 콘텐츠 페이지가 정적으로 생성되는 구조인지 확인했다.',
      '전역 metadata와 개별 페이지 metadata가 같은 브랜드를 말한다.',
      '이전 주제의 라우트가 sitemap과 내부 링크에서 빠졌다.',
      '빌드 결과에 예상하지 못한 공개 동적 경로가 없다.',
      '배포 후 실제 도메인 HTML에서 title과 description을 확인했다.',
    ],
    sources: [
      { title: 'Next.js: App Router', url: 'https://nextjs.org/docs/app' },
      { title: 'Next.js: Metadata and OG Images', url: 'https://nextjs.org/docs/app/getting-started/metadata-and-og-images' },
    ],
    revisions: [
      { date: '2026-06-07', note: '최초 게시' },
    ],
  },
  {
    slug: 'small-site-incident-log',
    title: '소규모 사이트 장애 기록은 어떻게 남기면 좋을까',
    description: '접속 장애, 배포 실수, DNS 변경, 캐시 문제를 다음 운영에 도움이 되는 기록으로 남기는 방법입니다.',
    category: '운영',
    publishedAt: '2026-06-08',
    reviewedAt: '2026-06-12',
    readingMinutes: 3,
    summary: '장애 기록은 큰 회사만 쓰는 문서가 아닙니다. 혼자 운영하는 작은 사이트도 짧은 기록이 쌓이면 같은 실수를 줄이고 사이트 품질을 높일 수 있습니다.',
    diagram: ['장애 시작~복구 시간순 기록', '영향 범위(URL·기기·지역) 분리', '가설과 실제 원인 구분', '다음 배포 전 개선 항목 하나 확정'],
    sections: [
      {
        heading: '기록의 목적은 책임 추궁이 아니라 재현 방지다',
        body: [
          '작은 사이트에서 장애가 나면 운영자는 대부분 개발자이자 배포자이자 고객 지원 담당자입니다. 그래서 기록을 남기지 않으면 당장 복구한 뒤 모든 맥락이 사라집니다. 다음에 비슷한 문제가 생기면 같은 명령을 다시 찾고, 같은 대시보드를 다시 열어보게 됩니다.',
          '장애 기록은 길 필요가 없습니다. 언제 시작됐는지, 사용자는 무엇을 봤는지, 원인은 무엇이었는지, 어떤 조치가 효과가 있었는지, 다음에는 무엇을 바꿀지만 남겨도 충분합니다. 중요한 것은 기억이 생생할 때 적는 것입니다.',
        ],
      },
      {
        heading: '시간순으로 쓰면 판단이 보인다',
        body: [
          '장애 중에는 원인을 단번에 맞히기 어렵습니다. DNS를 의심했다가 캐시로 돌아가고, 코드 문제로 보였지만 환경 변수였던 경우도 있습니다. 시간순 기록은 그때 어떤 증거를 보고 어떤 판단을 했는지 남겨줍니다.',
          '예를 들어 “14:05 홈 접속 500 확인, 14:08 최근 배포 커밋 확인, 14:12 환경 변수 누락 발견, 14:20 재배포 완료”처럼 쓰면 충분합니다. 나중에 보면 복구 시간이 어디서 길어졌는지 알 수 있습니다.',
        ],
      },
      {
        heading: '사용자 영향 범위를 분리한다',
        body: [
          '모든 장애가 같은 무게는 아닙니다. 관리자만 불편한 문제, 일부 이미지가 늦게 뜨는 문제, 전체 사이트가 열리지 않는 문제는 대응 우선순위가 다릅니다. 기록에는 영향 받은 URL, 기기나 브라우저, 지역, 오류 메시지, 시작과 종료 시간을 적습니다.',
          '이 범위가 있어야 다음에 모니터링을 어디에 둘지 결정할 수 있습니다. 홈만 확인하는 모니터링으로는 상세 글 404를 잡지 못합니다. 반대로 모든 URL을 계속 확인하면 운영 비용과 소음이 커집니다.',
        ],
      },
      {
        heading: '작은 개선 하나로 마무리한다',
        body: [
          '장애 기록의 끝에는 항상 다음 조치가 있어야 합니다. 체크리스트에 항목 추가, 배포 전 명령 추가, 환경 변수 문서화, DNS 변경 기록 양식 만들기처럼 작아도 됩니다. 큰 재설계를 매번 약속하면 기록이 부담스러워져 오래가지 않습니다.',
          'CloudPlare의 콘텐츠도 이런 관점을 유지합니다. 완벽한 인프라 이론보다 작은 운영자가 실제로 다음 배포에서 덜 틀리게 만드는 기록이 더 가치 있습니다. 이런 목소리가 사이트의 독창성을 만듭니다.',
        ],
      },
    ],
    checklist: [
      '장애 시작 시간과 복구 시간을 기록했다.',
      '사용자가 본 증상과 영향을 받은 URL을 분리했다.',
      '확인한 가설과 실제 원인을 시간순으로 남겼다.',
      '효과가 있었던 조치와 없었던 조치를 구분했다.',
      '다음 배포 전에 바꿀 체크리스트 항목을 하나 정했다.',
    ],
    sources: [
      { title: 'Google SRE: Postmortem Culture', url: 'https://sre.google/sre-book/postmortem-culture/' },
      { title: 'Atlassian: Incident postmortem guide', url: 'https://www.atlassian.com/incident-management/postmortem' },
    ],
    revisions: [
      { date: '2026-06-08', note: '최초 게시' },
    ],
  },
  {
    slug: 'deploy-environment-variables-checklist',
    title: '배포 환경에서만 깨지는 문제, 환경변수부터 본다',
    description: '로컬에서는 정상인데 배포 환경에서만 오류가 나는 문제의 흔한 원인인 환경변수 설정을 점검하는 방법입니다.',
    category: '배포',
    publishedAt: '2026-06-09',
    reviewedAt: '2026-07-14',
    readingMinutes: 3,
    summary: '“로컬에서는 되는데 배포하면 안 돼요”라는 문제의 상당수는 코드가 아니라 환경변수에서 시작됩니다. 자주 나오는 실패 사례 하나를 처음부터 끝까지 따라가 보면 원인을 좁히는 순서가 더 잘 보입니다.',
    sections: [
      {
        heading: '시나리오 — 로컬은 되는데 배포만 안 된다',
        body: [
          '빌드는 초록불인데, 배포된 사이트에서 특정 버튼을 누르면 아무 반응이 없습니다. 로컬에서는 같은 버튼이 멀쩡히 동작합니다. 콘솔을 열어보면 클라이언트 컴포넌트 안에서 참조하던 값이 undefined로 찍혀 있습니다.',
          { type: 'code', label: '문제가 있던 코드 (클라이언트 컴포넌트)', content: `'use client';

// .env에는 있지만 배포 환경변수 설정 화면에는
// 접두사 없이 SITE_API_BASE로만 등록돼 있었음
const apiBase = process.env.NEXT_PUBLIC_SITE_API_BASE;

fetch(\`\${apiBase}/submit\`); // apiBase가 undefined → "undefined/submit" 요청` },
        ],
      },
      {
        heading: '원인을 좁히는 과정',
        body: [
          '빌드가 성공했다는 것은 코드 문법에 문제가 없다는 뜻이지, 런타임에 필요한 값이 다 채워졌다는 뜻은 아닙니다. "빌드는 됐는데 특정 기능만 깨진다"는 증상이 나오면, 그 기능이 참조하는 환경변수부터 의심하는 편이 빠릅니다.',
          '이 사례의 원인은 두 가지가 겹친 것이었습니다. 첫째, 로컬 .env에는 NEXT_PUBLIC_SITE_API_BASE로 등록했지만 배포 플랫폼의 환경변수 설정 화면에는 SITE_API_BASE로 접두사 없이 등록돼 있었습니다. 둘째, Next.js는 NEXT_PUBLIC_ 접두사가 붙은 변수만 클라이언트 번들에 포함시키므로, 접두사가 빠진 변수는 빌드 시점에 조용히 undefined로 치환됩니다. 에러가 나지 않고 그냥 undefined가 되기 때문에 발견이 늦어집니다.',
        ],
      },
      {
        heading: '고치고 나서 남긴 것',
        body: [
          '조치는 배포 환경변수 이름을 로컬 .env와 정확히 일치시키는 것으로 끝났지만, 재발을 막으려면 "이번 배포에서 새로 추가하거나 바꾼 환경변수 목록"을 배포 전 체크리스트에 한 줄로 남기는 습관이 더 중요했습니다. 이름이 다른 것 하나로 몇 시간이 날아갈 수 있다는 걸 알고 나면, 이 한 줄을 아끼기 어려워집니다.',
        ],
      },
    ],
    checklist: [
      '코드에 직접 적힌 API 키나 주소를 환경변수로 분리했다.',
      '로컬 .env 파일에 추가한 변수를 배포 환경에도 정확히 같은 이름으로 등록했다.',
      '공개해도 되는 변수와 서버 전용 변수를 구분했다.',
      '브라우저에서 필요한 값에 공개 접두사를 정확히 붙였다.',
      '이번 배포에서 변경한 환경변수 목록을 기록해뒀다.',
    ],
    sources: [
      { title: 'Next.js: Environment Variables', url: 'https://nextjs.org/docs/app/guides/environment-variables' },
    ],
    revisions: [
      { date: '2026-06-09', note: '최초 게시' },
      { date: '2026-07-14', note: '일반론 나열 대신 단일 실패 사례 딥다이브 형식으로 재구성' },
    ],
  },
  {
    slug: 'cloudplare-self-audit-adsense-review',
    title: '우리 체크리스트로 우리 사이트를 다시 점검한 기록',
    description: 'CloudPlare가 자체 배포 체크리스트를 자기 사이트에 그대로 적용했을 때 실제로 나온 문제와 조치 내역을 정리합니다.',
    category: '운영',
    publishedAt: '2026-07-14',
    reviewedAt: '2026-07-14',
    readingMinutes: 3,
    summary: '체크리스트를 글로만 정리해두고 정작 자기 사이트에는 적용해보지 않으면, 그 체크리스트는 아직 검증된 것이 아닙니다. /checklist에 적어둔 항목을 cloudplare.com 자신에게 그대로 돌려본 기록입니다.',
    diagram: ['체크리스트를 자기 사이트에 적용', '광고 스크립트 노출 범위 재검토', 'sitemap·메타데이터 재계산', '남은 항목은 미해결로 표시'],
    sections: [
      {
        heading: '왜 다른 사이트가 아니라 우리 사이트부터 봤나',
        body: [
          'CloudPlare의 /checklist에는 "기준 주소, canonical, sitemap이 같은 주소를 가리키는지 확인한다", "콘텐츠가 실제로 있는 페이지에서만 광고가 보이는지 확인한다" 같은 항목이 있습니다. 이 문서를 새로 쓰는 대신, 이미 적어둔 항목을 우리 사이트에 그대로 적용해 무엇이 실제로 걸리는지 확인했습니다.',
          '결과적으로 세 가지 문제를 찾았고, 모두 코드에 남아 있던 것이었습니다. 아래는 발견한 순서 그대로의 기록입니다.',
        ],
      },
      {
        heading: '문제 1 — 콘텐츠가 거의 없는 화면에도 광고 스크립트가 실렸다',
        body: [
          '광고 스크립트(adsbygoogle.js)가 루트 레이아웃의 head에서 전역으로 로드되고 있었습니다. 즉 문의 폼 하나뿐인 /contact, 약관 텍스트만 있는 /privacy·/terms, 그리고 커스텀 404 페이지가 아예 없어 Next.js 기본 404 화면이 뜨던 경로에도 예외 없이 같은 스크립트가 실렸습니다.',
          '조치는 방문 경로에 따라 스크립트 로드 여부를 판단하는 클라이언트 컴포넌트를 만들고, 콘텐츠가 실질적으로 있는 경로만 화이트리스트로 명시하는 것이었습니다.',
          { type: 'code', label: 'src/components/AdsenseLoader.tsx (핵심 판정 로직)', content: `const AD_ELIGIBLE_EXACT = ['/', '/checklist', '/glossary', '/about', '/editorial-policy'];
const AD_ELIGIBLE_PREFIXES = ['/notes'];

function isAdEligible(pathname: string): boolean {
  if (AD_ELIGIBLE_EXACT.includes(pathname)) return true;
  return AD_ELIGIBLE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(\`\${prefix}/\`)
  );
}` },
          '이 방식의 장점은 블랙리스트가 아니라 화이트리스트라는 점입니다. 새 유틸리티 페이지를 추가했을 때 실수로 목록에 안 넣으면 "광고가 안 뜨는" 쪽으로 실패하지, "콘텐츠 없는 화면에 광고가 뜨는" 쪽으로 실패하지 않습니다.',
        ],
      },
      {
        heading: '문제 2 — sitemap이 실제 수정일과 다른 날짜를 보고했다',
        body: [
          'sitemap.ts의 모든 항목이 lastModified를 new Date()로 채우고 있었습니다. 빌드되거나 요청될 때마다 "지금"이 찍히는 구조라, 6월 초에 쓰고 검토가 끝난 글도 sitemap에서는 항상 "방금 수정됨"으로 보였습니다. 개별 글의 JSON-LD에는 실제 검토일(reviewedAt)이 정확히 들어가는데, sitemap과 그 값이 서로 어긋나는 상태였습니다.',
          { type: 'code', label: '수정 전/후 요약', content: `// 수정 전
lastModified: new Date()               // 매 빌드마다 "지금"

// 수정 후
lastModified: new Date(note.reviewedAt) // 실제 검토일 그대로` },
          '고치고 나니 sitemap의 lastmod 값이 노트별로 2026-06-08부터 2026-06-12까지 실제 검토일 그대로 흩어져 나왔습니다. 크롤러 입장에서는 "이 사이트는 실제로 각 글을 다른 시점에 손봤다"는, 이전보다 훨씬 정직한 신호입니다.',
        ],
      },
      {
        heading: '문제 3 — 읽기 시간이 실제 글자 수와 무관했다',
        body: [
          '각 노트의 readingMinutes 값을 실제 본문 글자 수로 나눠보니 분당 118자에서 351자까지 거의 3배 차이가 났습니다. 가장 긴 글이 오히려 가장 짧은 읽기 시간으로 표시된 경우도 있었습니다. 실제로 계산해서 넣은 값이 아니라 6~9분 사이에서 임의로 채운 값이었다는 뜻입니다.',
          '분당 400자를 기준으로 요약과 본문 글자 수를 다시 계산해 전체 글의 readingMinutes를 2~4분 범위로 다시 채웠습니다. 숫자가 작아 보일 수 있지만, 실제 분량과 맞는 숫자가 부풀려진 숫자보다 낫다고 판단했습니다.',
        ],
      },
      {
        heading: '이번 점검에서 남은 것과 남기지 않은 것',
        body: [
          '이번에 고친 세 가지는 코드만으로 끝나는 문제였습니다. 반면 실기기에서 320~375px 폭을 직접 확인하는 것, EEA 방문자를 위한 동의관리플랫폼(CMP) 연동, 실제 스크린샷과 명령어 실행 결과를 글에 넣는 것은 코드 수정만으로 끝나지 않아 이번 점검에서는 항목만 확인하고 미해결로 남겨뒀습니다.',
          '체크리스트를 스스로에게 적용해서 나온 결과를 숨기지 않고 그대로 남기는 것도 이 글의 목적 중 하나입니다. 다음 점검에서 이 글의 "수정 이력"에 추가로 남길 예정입니다.',
        ],
      },
    ],
    checklist: [
      '광고 스크립트가 콘텐츠 없는 화면(문의, 정책, 404)에도 실리고 있지 않은지 확인했다.',
      'sitemap의 lastModified가 실제 콘텐츠 수정일과 일치하는지 확인했다.',
      '읽기 시간 같은 메타데이터가 실제 콘텐츠 분량과 비례하는지 확인했다.',
      '전 페이지의 canonical과 OG URL이 자기 자신의 주소를 가리키는지 확인했다.',
      '고치지 못한 항목은 숨기지 않고 미해결로 기록해뒀다.',
    ],
    sources: [
      { title: 'Google AdSense 고객센터: 게재 광고 배치 정책', url: 'https://support.google.com/adsense/answer/1346295' },
      { title: 'Google Search Central: 유용하고 신뢰할 수 있는 콘텐츠 만들기', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content' },
    ],
    revisions: [
      { date: '2026-07-14', note: '최초 게시 — 광고 스크립트 노출 범위, sitemap lastModified, readingMinutes 계산 방식 점검 결과 반영' },
    ],
  },

];

export const glossary = [
  { term: 'DNS', description: '도메인 이름을 실제 서버 주소나 다른 이름으로 연결하기 위한 분산 이름 확인 체계입니다.' },
  { term: 'TTL', description: 'DNS나 캐시 응답이 얼마 동안 재사용될 수 있는지 알려주는 시간 값입니다.' },
  { term: 'A 레코드', description: '도메인 이름을 IPv4 주소에 연결하는 DNS 레코드입니다.' },
  { term: 'AAAA 레코드', description: '도메인 이름을 IPv6 주소에 연결하는 DNS 레코드입니다.' },
  { term: 'CNAME', description: '한 도메인 이름을 다른 도메인 이름의 별칭으로 연결하는 DNS 레코드입니다.' },
  { term: 'TXT 레코드', description: '소유권 확인, 이메일 인증, 보안 정책처럼 서비스가 읽는 문자열 값을 담는 DNS 레코드입니다.' },
  { term: 'MX 레코드', description: '도메인의 메일 수신 서버를 지정하는 DNS 레코드입니다.' },
  { term: 'CDN', description: '콘텐츠를 여러 위치에서 전달해 지연 시간을 줄이고 원본 서버 부담을 낮추는 네트워크 계층입니다.' },
  { term: 'Cache-Control', description: '브라우저와 공유 캐시가 응답을 저장하고 재사용하는 방식을 알려주는 HTTP 헤더입니다.' },
  { term: 'max-age', description: '응답을 생성 시점부터 몇 초 동안 신선한 것으로 볼지 지정하는 캐시 지시자입니다.' },
  { term: 'no-cache', description: '응답을 저장할 수는 있지만 재사용 전에 원 서버에 검증하라고 지시하는 캐시 지시자입니다.' },
  { term: 'no-store', description: '민감한 응답을 캐시에 저장하지 말라고 지시하는 캐시 지시자입니다.' },
  { term: 's-maxage', description: '브라우저가 아니라 CDN 같은 공유 캐시에 적용되는 신선도 시간을 지정합니다.' },
  { term: 'LCP', description: '페이지의 주요 콘텐츠가 화면에 표시되기까지 걸리는 시간을 보는 Core Web Vitals 지표입니다.' },
  { term: 'INP', description: '사용자 상호작용 뒤 페이지가 다음 화면을 그리기까지의 반응성을 보는 지표입니다.' },
  { term: 'CLS', description: '로딩 중 레이아웃이 예기치 않게 움직이는 정도를 보는 지표입니다.' },
  { term: 'Canonical URL', description: '중복되거나 비슷한 페이지 중 검색엔진에 대표로 알려주고 싶은 주소입니다.' },
  { term: 'Sitemap', description: '검색엔진에 색인하길 원하는 주요 URL 목록을 알려주는 XML 파일입니다.' },
  { term: 'robots.txt', description: '크롤러가 사이트를 어떻게 탐색할 수 있는지 알려주는 루트 경로의 텍스트 파일입니다.' },
  { term: '리다이렉트', description: '방문자를 한 URL에서 다른 URL로 이동시키는 서버나 애플리케이션의 응답입니다.' },
  { term: 'HSTS', description: '브라우저가 이후 접속에서 HTTPS를 우선 사용하도록 알려주는 보안 정책입니다.' },
  { term: '정적 생성', description: '요청 시점이 아니라 빌드 시점에 HTML을 만들어 두는 렌더링 방식입니다.' },
  { term: '오리진 서버', description: 'CDN이나 프록시 뒤에서 실제 원본 응답을 제공하는 서버입니다.' },
  { term: 'SPF', description: '도메인을 대신해 메일을 보낼 수 있는 서버를 선언하는 DNS TXT 레코드입니다.' },
  { term: 'DKIM', description: '메일에 암호화 서명을 추가해 발신 이후 위변조 여부를 확인할 수 있게 하는 인증 방식입니다.' },
  { term: 'DMARC', description: 'SPF와 DKIM 검증 결과를 바탕으로 인증에 실패한 메일을 어떻게 처리할지 도메인이 선언하는 정책입니다.' },
  { term: 'WebP', description: 'JPEG, PNG보다 작은 파일 크기로 비슷한 품질을 제공하는 이미지 포맷입니다.' },
  { term: 'AVIF', description: 'WebP보다 더 높은 압축률을 제공하는 최신 이미지 포맷입니다.' },
  { term: 'srcset', description: '화면 크기나 해상도에 따라 브라우저가 선택할 수 있는 이미지 후보 목록을 지정하는 속성입니다.' },
  { term: 'font-display', description: '웹 폰트가 로딩되는 동안 텍스트를 어떻게 보여줄지 지정하는 CSS 속성입니다.' },
  { term: 'Content-Security-Policy', description: '브라우저가 어떤 출처의 스크립트, 스타일, 이미지를 불러올 수 있는지 제한하는 보안 헤더입니다.' },
  { term: 'Referrer-Policy', description: '다른 사이트로 이동할 때 브라우저가 이전 페이지 주소를 얼마나 전달할지 정하는 헤더입니다.' },
  { term: 'Permissions-Policy', description: '카메라, 위치 정보 같은 브라우저 기능을 페이지에서 사용할 수 있는지 제한하는 헤더입니다.' },
  { term: '404', description: '요청한 주소에 해당하는 페이지를 찾을 수 없다는 것을 알려주는 HTTP 상태 코드입니다.' },
  { term: '환경변수', description: '코드와 분리해 배포 환경마다 다르게 설정할 수 있는 값으로, 보통 API 키나 외부 주소를 담습니다.' },
  { term: 'NEXT_PUBLIC_', description: 'Next.js에서 브라우저로 노출돼도 되는 환경변수임을 나타내는 접두사입니다.' },
];

export function getAllNotes(): CloudNote[] {
  return notes;
}

export function getNoteBySlug(slug: string): CloudNote | undefined {
  return notes.find((note) => note.slug === slug);
}
