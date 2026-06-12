import Link from 'next/link';
import { CONTACT_EMAIL, SITE_NAME } from '@/lib/site';

export const metadata = {
  title: '사이트 소개',
  description: 'CloudPlare는 작은 웹사이트 운영자를 위한 독립 클라우드 운영 노트입니다.',
};

export default function AboutPage() {
  const h2 = { fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '0.7rem' };
  const p = { fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, marginBottom: '0.75rem' };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <header style={{ marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.5rem' }}>{SITE_NAME} 소개</h1>
        <p style={{ ...p, marginBottom: 0 }}>작은 웹사이트를 직접 운영하는 사람을 위한 클라우드 운영 기록 사이트입니다.</p>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={h2}>무엇을 다루나요?</h2>
        <p style={p}>
          CloudPlare는 DNS, HTTPS, 정적 배포, HTTP 캐시, CDN, Core Web Vitals, 장애 기록처럼
          작은 사이트 운영자가 실제로 자주 부딪히는 주제를 다룹니다.
        </p>
        <p style={p}>
          공식 문서의 문장을 옮겨 적는 대신, 배포 전후에 무엇을 확인해야 하는지와 문제가 생겼을 때 어떤 순서로 좁혀 볼지를 중심으로 씁니다.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={h2}>어떤 서비스와 관련이 있나요?</h2>
        <p style={p}>
          이 사이트는 특정 클라우드 사업자, CDN 서비스, 보안 서비스의 공식 사이트가 아닙니다.
          CloudPlare라는 이름은 독립 운영 노트의 브랜드명이며, 비슷한 이름의 외부 서비스와 제휴 관계가 없습니다.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={h2}>작성 기준</h2>
        <p style={p}>
          글은 MDN, web.dev, Next.js 공식 문서, 검색엔진 문서처럼 확인 가능한 1차 자료를 먼저 살핀 뒤 작성합니다.
          각 노트 하단에는 참고한 공식 자료를 남기고, 내용이 바뀔 수 있는 주제는 최종 검토일을 함께 표시합니다.
        </p>
        <p style={p}>
          자세한 기준은 <Link href="/editorial-policy" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>편집 원칙</Link>에서 확인할 수 있습니다.
        </p>
      </section>

      <section>
        <h2 style={h2}>문의와 정정 요청</h2>
        <p style={p}>
          오류 제보나 정정 요청은 <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 750 }}>문의 페이지</Link> 또는 {CONTACT_EMAIL}로 보내주세요.
        </p>
      </section>
    </article>
  );
}
