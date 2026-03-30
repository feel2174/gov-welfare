import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories } from '@/lib/policies'

export const metadata: Metadata = {
  title: '정부 복지 알리미',
  description: '최신 정부 복지 정책 지원금 안내',
  verification: {
    other: {
      "naver-site-verification": ["af08f882eb6864711387eedb9eda95b25726d2ba"],
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories();

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '정부복지 알리미',
    url: 'https://cloudplare.com',
    description: '최신 정부 복지 정책 지원금 안내',
  };

  return (
    <html lang="ko">
      <head>
        <script 
            async 
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8738602180421069" 
            crossOrigin="anonymous"
        ></script>
        {/* 전체 사이트용 구조화 데이터 뼈대 삽입 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <style dangerouslySetInnerHTML={{__html: `
          *, *::before, *::after { box-sizing: border-box; }
          body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; margin: 0; padding: 0; overflow-x: hidden; }
          input, button, textarea, select { font: inherit; }
        `}} />
      </head>
      <body style={{ fontFamily: '"Pretendard Variable", -apple-system, blinkmacsystemfont, system-ui, sans-serif', backgroundColor: '#f9fafb', color: '#111827' }}>
        
        {/* Navigation Menu (Modern, Bright, Sticky) */}
        <header style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #e5e7eb', 
            position: 'sticky', 
            top: 0, 
            zIndex: 50,
            padding: '1rem 0'
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.03em' }}>
                    정부복지 알리미 🩵
                </Link>
                <nav style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch', paddingBottom: '0.2rem' }}>
                    <Link href="/" style={{ 
                        color: '#4b5563', 
                        textDecoration: 'none', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '9999px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        backgroundColor: '#f3f4f6',
                        transition: 'background-color 0.2s, color 0.2s'
                    }}>전체보기</Link>
                    
                    <Link href="/guide" style={{ 
                        color: '#4b5563', 
                        textDecoration: 'none', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '9999px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        backgroundColor: '#f3f4f6',
                        transition: 'background-color 0.2s, color 0.2s'
                    }}>복지가이드</Link>
                    
                    {categories.map(c => (
                        <Link key={c.slug} href={`/category/${c.slug}`} style={{ 
                            color: '#4b5563', 
                            textDecoration: 'none', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '9999px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            backgroundColor: '#f3f4f6',
                            transition: 'background-color 0.2s, color 0.2s'
                        }}>
                            {c.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>

        <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
            {children}
        </main>

        <footer style={{ backgroundColor: '#ffffff', padding: '4rem 1.5rem', textAlign: 'center', color: '#6b7280', borderTop: '1px solid #f3f4f6', marginTop: '6rem' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <Link href="/" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '600' }}>홈</Link>
                    <Link href="/guide" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '600' }}>복지 가이드</Link>
                    <Link href="/privacy" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '600' }}>개인정보처리방침</Link>
                    <Link href="/terms" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '600' }}>이용약관</Link>
                </div>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>정부 복지 알리미</p>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                    본 사이트는 정부 및 지방자치단체의 복지 정책 데이터를 바탕으로 유익한 정보를 공공의 이익을 위해 제공합니다. 공식적인 신청 및 모의 계산은 반드시 해당 주무 부처의 사이트에서 진행하시기 바랍니다.
                </p>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>© 2026 정부 복지 정책 안내 블로그. All rights reserved.</p>
            </div>
        </footer>
      </body>
    </html>
  )
}
