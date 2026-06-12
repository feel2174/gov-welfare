import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  title: '이용약관',
  description: 'CloudPlare 이용약관입니다.',
};

export default function TermsOfService() {
  const h2 = { fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-text)', marginTop: '2rem', marginBottom: '0.6rem' };
  const p = { fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, marginBottom: '0.65rem' };

  return (
    <article style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.55rem', fontWeight: 900, marginBottom: '0.4rem' }}>이용약관</h1>
      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '2rem', paddingBottom: '1.4rem', borderBottom: '1px solid var(--color-border)' }}>시행일: 2026년 6월 12일</p>

      <h2 style={h2}>제1조 목적</h2>
      <p style={p}>본 약관은 CloudPlare가 제공하는 클라우드 운영 노트 콘텐츠 이용과 관련한 기본 조건을 설명합니다.</p>

      <h2 style={h2}>제2조 서비스 내용</h2>
      <p style={p}>CloudPlare는 DNS, 배포, 캐시, 성능, 장애 대응과 관련된 운영 노트, 체크리스트, 용어 설명을 제공합니다. 모든 콘텐츠는 일반적인 정보 제공 목적이며, 특정 서비스의 공식 지원이나 전문 컨설팅을 대체하지 않습니다.</p>

      <h2 style={h2}>제3조 면책</h2>
      <p style={p}>기술 환경과 서비스 설정은 이용자의 도메인, 호스팅, CDN, 배포 방식에 따라 달라질 수 있습니다. 콘텐츠를 참고해 작업할 때에는 각 서비스의 최신 공식 문서와 본인의 운영 환경을 함께 확인해야 합니다.</p>

      <h2 style={h2}>제4조 저작권</h2>
      <p style={p}>CloudPlare의 글, 구성, 디자인 등 자체 제작 콘텐츠의 무단 복제와 상업적 재배포를 금합니다. 인용이 필요한 경우 출처와 원문 URL을 명확히 표시해 주세요.</p>

      <h2 style={h2}>제5조 광고</h2>
      <p style={p}>사이트 운영 비용을 위해 Google AdSense 등 광고가 표시될 수 있습니다. 광고는 편집 내용과 분리됩니다.</p>

      <h2 style={h2}>제6조 문의</h2>
      <p style={p}>이용약관과 콘텐츠 관련 문의는 {CONTACT_EMAIL}로 보내주세요.</p>
    </article>
  );
}
