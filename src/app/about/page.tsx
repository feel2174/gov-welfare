import Link from 'next/link';
import { AUTHOR_NAME, CONTACT_EMAIL, SITE_NAME } from '@/lib/site';

export const metadata = {
  title: '사이트 소개 및 운영 철학',
  description: 'CloudPlare는 작은 웹사이트 및 웹 서비스 운영자를 위한 독립 클라우드 인프라 운영 노트입니다.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    url: '/about',
    title: '사이트 소개 및 운영 철학 | CloudPlare',
    description: 'CloudPlare는 작은 웹사이트 및 웹 서비스 운영자를 위한 독립 클라우드 인프라 운영 노트입니다.',
  },
};

export default function AboutPage() {
  const h2 = { fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '0.75rem', marginTop: '1.8rem' };
  const p = { fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, marginBottom: '0.85rem' };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2.2rem 1.6rem' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
          About Project & Operator
        </span>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 900, marginTop: '0.4rem', marginBottom: '0.5rem' }}>
          {SITE_NAME} 소개 및 엔지니어링 철학
        </h1>
        <p style={{ ...p, marginBottom: 0, fontSize: '0.95rem' }}>
          작은 웹 서비스를 직접 만들고 배포하는 1인 엔지니어가 실무에서 마주친 인프라 판단 기준과 트러블슈팅을 정리하는 독립 기술 지식 저장소입니다.
        </p>
      </header>

      <section>
        <h2 style={{ ...h2, marginTop: 0 }}>1. 브랜드 정체성과 명칭의 의미</h2>
        <p style={p}>
          <strong>{SITE_NAME}</strong>는 <strong>Cloud Platform Record & Operations</strong>(클라우드 플랫폼 운영 기록)의 축약어로 기획된 독립 기술 프로젝트입니다.
          소규모 스타트업, 1인 창업가, 프론트엔드 개발자가 거대한 데브옵스 조직 없이도 안전하게 웹 인프라를 운영할 수 있도록 돕는 실무 지침서를 지향합니다.
        </p>
        <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.2rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>
            <strong>독립성 및 상표 고지:</strong> {SITE_NAME}는 특정 클라우드 사업자나 상용 CDN 제공업체의 공식 사이트가 아니며,
            <strong>Cloudflare, Inc.</strong>를 비롯한 어떤 외부 기업과도 제휴, 후원, 승인 관계가 없습니다.
            본 사이트에 언급되는 타사 상표나 제품명은 오직 기술적 맥락과 동작 원리를 설명하기 위한 인용 목적으로만 사용됩니다.
          </p>
        </div>
      </section>

      <section>
        <h2 style={h2}>2. 운영자(Author) 프로필 및 경험</h2>
        <p style={p}>
          이 사이트는 소프트웨어 엔지니어 <strong>{AUTHOR_NAME}</strong>이 직접 기획하고 작성하며 운영하고 있습니다.
        </p>
        <ul style={{ ...p, paddingLeft: '1.2rem', lineHeight: 1.9 }}>
          <li>
            웹 프론트엔드 최적화 도구인{' '}
            <a href="https://pixelzipkit.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>
              pixelzipkit.com
            </a>
            (브라우저 기반 무손실 이미지 압축·WebP 변환 서비스)을 개발 및 운영 중입니다.
          </li>
          <li>
            웹 개발 실무 경험을 아카이빙하는 기술 블로그{' '}
            <a href="https://frontendnote.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>
              frontendnote.com
            </a>
            을 연재하고 있습니다.
          </li>
          <li>
            Next.js App Router, Cloudflare Workers/Pages, AWS S3/CloudFront, DNS 라우팅, SSL/TLS 인증서 자동화 등 웹 서비스 출시와 인프라 관리 전반을 지속적으로 연구하고 실측합니다.
          </li>
        </ul>
      </section>

      <section>
        <h2 style={h2}>3. 콘텐츠 작성 및 품질 검증 기준 (E-E-A-T)</h2>
        <p style={p}>
          CloudPlare의 모든 글은 다음과 같은 엄격한 원칙 하에 작성됩니다.
        </p>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.2rem' }}>
          {[
            ['직접 검증된 실무 경험(Experience)', '단순한 이론 요약이 아니라 실제 프로덕션 도메인에 적용해보고 겪은 에러 로그와 성공적인 설정값만을 기록합니다.'],
            ['공식 1차 자료 근거(Authoritativeness)', 'IETF RFC 표준 문서, MDN Web Docs, web.dev, Next.js 공식 문서를 교차 검증하여 기술적 정확도를 확보합니다.'],
            ['투명한 수정 이력 및 최신성(Trustworthiness)', '클라우드와 웹 표준은 빠르게 변하므로 각 글 상단에 최종 검토일(reviewedAt)을 명시하고 하단에 상세 변경 로그를 투명하게 공개합니다.'],
            ['AI 생성 텍스트 지양', '의미 없는 자동 생성 텍스트를 배제하고, 실무자가 현장에서 즉시 복사해 쓸 수 있는 터미널 명령어와 구체적인 트러블슈팅 단계만을 담습니다.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.9rem 1.1rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 850, color: 'var(--color-text)', marginBottom: '0.3rem' }}>{title}</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
        <p style={p}>
          자세한 작성 원칙은 <Link href="/editorial-policy" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>편집 원칙</Link> 페이지에서 열람할 수 있습니다.
        </p>
      </section>

      <section>
        <h2 style={h2}>4. 피드백 및 정정 요청 채널</h2>
        <p style={p}>
          게시된 내용 중 최신 표준과 달라졌거나 오류가 있는 부분을 발견하셨다면 언제든 편하게 제보해 주세요.
          운영자가 직접 확인 후 영업일 기준 24~48시간 이내에 검토하여 정정 반영합니다.
        </p>
        <p style={p}>
          이메일: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)', fontWeight: 750 }}>{CONTACT_EMAIL}</a> 또는{' '}
          <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>문의 폼</Link>을 이용해 주시기 바랍니다.
        </p>
      </section>
    </article>
  );
}
