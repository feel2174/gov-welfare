import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories } from '@/lib/policies'

export const metadata: Metadata = {
  title: '정부 복지 알리미',
  description: '최신 정부 복지 정책 지원금 안내',
  verification: {
    other: {
      "naver-site-verification": ["1ae5d630aa9d4d97076b358fd47bdf880df595f7"],
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
    url: 'https://gov-welfare.com',
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

        <footer style={{ backgroundColor: '#ffffff', padding: '3rem 1.5rem', textAlign: 'center', color: '#9ca3af', borderTop: '1px solid #f3f4f6', marginTop: '4rem' }}>
            <p style={{ fontSize: '0.95rem', fontWeight: '500' }}>© 2026 정부 복지 안내 블로그.</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>이 사이트는 모의계산 및 정보 제공을 위해 작성되었으며, (구글 애드센스용 하단 영역)</p>
        </footer>
      </body>
    </html>
  )
}
