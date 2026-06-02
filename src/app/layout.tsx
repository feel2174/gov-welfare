import type { Metadata } from 'next'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '정부 복지 알리미 - 공식 출처 기반 복지 정보',
    template: '%s | 정부복지 알리미',
  },
  description: '공식 출처를 바탕으로 정부 복지 제도와 공공서비스 정보를 정리하는 생활 정보 사이트입니다.',
  keywords: ['정부지원금', '보조금', '복지정책', '정부24', '공공서비스', '지원금검색'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: '정부 복지 알리미 - 공식 출처 기반 복지 정보',
    description: '공식 출처를 바탕으로 정부 복지 제도와 공공서비스 정보를 정리합니다.',
  },
  verification: {
    other: {
      "naver-site-verification": ["af08f882eb6864711387eedb9eda95b25726d2ba"],
      "google-adsense-account": ["ca-pub-8738602180421069"],
    },
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: '대한민국 복지 제도와 공공서비스 정보를 공식 출처 기준으로 정리하는 정보 사이트',
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8738602180421069" crossOrigin="anonymous"></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <header style={{
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky', top: 0, zIndex: 100,
          padding: '0.8rem 0',
        }}>
          <div style={{
            maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 1.2rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <Link href="/" style={{ color: 'var(--color-primary)', fontSize: '1.15rem', fontWeight: '900', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🩵 복지알리미
            </Link>
            <nav style={{ display: 'flex', gap: '0.3rem', fontSize: '0.85rem' }}>
              <Link href="/guide" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>가이드</Link>
              <Link href="/checklist" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>체크리스트</Link>
              <Link href="/about" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>소개</Link>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '2rem 1.2rem 4rem' }}>
          {children}
        </main>

        <footer style={{ backgroundColor: 'var(--color-surface)', padding: '3rem 1.2rem', borderTop: '1px solid var(--color-border)', marginTop: '2rem' }}>
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <Link href="/" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>홈</Link>
              <Link href="/guide" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>복지 가이드</Link>
              <Link href="/checklist" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>신청 전 체크리스트</Link>
              <Link href="/about" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>소개</Link>
              <Link href="/editorial-policy" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>편집 원칙</Link>
              <Link href="/search" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>공공서비스 검색</Link>
              <Link href="/contact" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>문의</Link>
              <Link href="/privacy" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>개인정보처리방침</Link>
              <Link href="/terms" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>이용약관</Link>
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.5rem' }}>정부 복지 알리미</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '0.8rem' }}>
              본 사이트는 공공데이터포털(data.go.kr)의 정부24 API와 각 기관의 공개 안내를 바탕으로 공공서비스 정보를 정리합니다.
              정부 기관이 아니며, 공식 신청 및 자격 확인은 반드시 해당 기관의 공식 사이트에서 진행하시기 바랍니다.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              &copy; 2026 정부 복지 알리미. All rights reserved. | 데이터 출처: 공공데이터포털 &middot; 정부24
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
