import type { Metadata } from 'next'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'
import { AUTHOR_NAME, SITE_URL, SITE_NAME, SITE_TAGLINE } from '@/lib/site'
import AdsenseLoader from '@/components/AdsenseLoader'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'CloudPlare - 클라우드 운영 노트',
    template: '%s | CloudPlare',
  },
  description: '작은 웹사이트 운영자를 위한 DNS, 배포, 캐시, 성능, 장애 대응 기록을 정리하는 독립 클라우드 운영 노트입니다.',
  keywords: ['CloudPlare', '클라우드 운영', 'DNS', 'CDN', 'HTTP 캐시', '웹 성능', 'Next.js 배포'],
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'CloudPlare - 클라우드 운영 노트',
    description: 'DNS, 배포, 캐시, 성능, 장애 기록을 작은 운영자 관점으로 정리합니다.',
  },
  verification: {
    other: {
      "naver-site-verification": ["af08f882eb6864711387eedb9eda95b25726d2ba"],
      "google-adsense-account": ["ca-pub-8738602180421069"],
    },
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: '작은 웹사이트 운영자를 위한 독립 클라우드 운영 노트',
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <AdsenseLoader />
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
            flexWrap: 'wrap', rowGap: '0.55rem',
          }}>
            <Link href="/" style={{ color: 'var(--color-primary)', fontSize: '1.15rem', fontWeight: '900', letterSpacing: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {SITE_NAME}
            </Link>
            <nav style={{ display: 'flex', gap: '0.25rem', fontSize: '0.84rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Link href="/notes" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', padding: '0.35rem 0.65rem', borderRadius: '8px' }}>노트</Link>
              <Link href="/checklist" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', padding: '0.35rem 0.65rem', borderRadius: '8px' }}>체크리스트</Link>
              <Link href="/glossary" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', padding: '0.35rem 0.65rem', borderRadius: '8px' }}>용어집</Link>
              <Link href="/about" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', padding: '0.35rem 0.65rem', borderRadius: '8px' }}>소개</Link>
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
              <Link href="/notes" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>운영 노트</Link>
              <Link href="/checklist" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>배포 체크리스트</Link>
              <Link href="/glossary" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>용어집</Link>
              <Link href="/about" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>소개</Link>
              <Link href="/editorial-policy" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>편집 원칙</Link>
              <Link href="/contact" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>문의</Link>
              <Link href="/privacy" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>개인정보처리방침</Link>
              <Link href="/terms" style={{ color: 'var(--color-text-secondary)', fontWeight: '600' }}>이용약관</Link>
            </div>
            <p style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{SITE_NAME} · {SITE_TAGLINE} · {AUTHOR_NAME} 운영</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '0.8rem' }}>
              CloudPlare는 작은 웹사이트 운영자가 DNS, 배포, 캐시, 성능, 장애 대응을 차분히 점검할 수 있도록 작성한 독립 운영 노트입니다.
              특정 클라우드 사업자나 CDN 서비스와 공식 제휴 관계가 없습니다.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              &copy; 2026 CloudPlare. All rights reserved.
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
