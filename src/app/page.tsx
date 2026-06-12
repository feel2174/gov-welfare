import Link from 'next/link';
import { getAllNotes } from '@/lib/notes';
import { CONTENT_REVIEWED_AT } from '@/lib/site';

export const metadata = {
    title: 'CloudPlare - 클라우드 운영 노트',
    description: 'DNS, 배포, HTTP 캐시, CDN, Core Web Vitals, 장애 기록을 작은 사이트 운영자 관점으로 정리합니다.',
};

export default async function Home() {
    const featuredNotes = getAllNotes().slice(-5);

    return (
        <div>
            <section>
                <div style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: '800', marginBottom: '0.4rem' }}>
                        독립 운영 기록 · 최종 검토 {CONTENT_REVIEWED_AT}
                    </p>
                    <h1 style={{ fontSize: '1.55rem', fontWeight: '900', color: 'var(--color-text)', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                        작은 웹사이트를 위한 클라우드 운영 노트
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                        CloudPlare는 DNS, 배포, 캐시, 성능, 장애 대응을 혼자 또는 작은 팀이 이해할 수 있도록 정리하는 기술 노트입니다.
                        특정 클라우드 회사의 공식 문서가 아니라, 운영자가 실제 배포 전후에 확인할 판단 기준을 차분히 기록합니다.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.8rem',
                    marginBottom: '2rem',
                }}>
                    {[
                        ['도메인과 DNS', '레코드 변경 전 스냅샷, 전파 시간, 기준 주소를 먼저 확인합니다.'],
                        ['배포와 캐시', '정적 사이트 배포 후 실제 도메인, CDN, HTTP 캐시 계층을 나눠 봅니다.'],
                        ['성능과 장애 기록', 'Core Web Vitals와 장애 메모를 다음 배포의 체크리스트로 연결합니다.'],
                    ].map(([title, description]) => (
                        <article key={title} style={{
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.15rem',
                        }}>
                            <h2 style={{ fontSize: '0.98rem', fontWeight: 850, color: 'var(--color-text)', marginBottom: '0.45rem' }}>
                                {title}
                            </h2>
                            <p style={{ fontSize: '0.86rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                                {description}
                            </p>
                        </article>
                    ))}
                </div>

                <section style={{
                    borderTop: '1px solid var(--color-border)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: '1.4rem 0',
                    marginBottom: '2rem',
                }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                        배포 전 기본 점검
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.7rem 1.2rem' }}>
                        {[
                            '기준 도메인, canonical, sitemap이 같은 주소를 가리키는지 확인합니다.',
                            'DNS 레코드 변경 전 기존 값을 캡처하고 TTL을 기록합니다.',
                            '배포 후 루트, 목록, 상세 글, 정책 페이지를 실제 도메인으로 확인합니다.',
                            'HTML 문서와 정적 자산의 캐시 정책이 서로 맞는지 구분합니다.',
                            '모바일 화면에서 제목, 메뉴, 본문 폭이 안정적으로 보이는지 확인합니다.',
                            '문제가 생겼을 때 되돌릴 값과 확인한 URL을 운영 메모에 남깁니다.',
                        ].map((item) => (
                            <p key={item} style={{ fontSize: '0.86rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                                {item}
                            </p>
                        ))}
                    </div>
                    <Link href="/checklist" style={{
                        display: 'inline-flex',
                        marginTop: '1rem',
                        color: 'var(--color-primary)',
                        fontWeight: 750,
                        fontSize: '0.86rem',
                    }}>
                        배포 체크리스트 자세히 보기 →
                    </Link>
                </section>

                <header style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                    marginBottom: '1.2rem',
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-text)', marginBottom: '0.2rem' }}>
                            최근 운영 노트
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>배포 전후에 실제로 다시 열어보는 실무형 기록</p>
                    </div>
                    <Link href="/notes" style={{
                        color: 'var(--color-primary)', fontWeight: '700',
                        fontSize: '0.85rem',
                    }}>
                        전체보기 →
                    </Link>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {featuredNotes.map((note) => (
                        <Link key={note.slug} href={`/notes/${note.slug}`} style={{ textDecoration: 'none' }}>
                            <article className="note-card" style={{
                                padding: '1.4rem 1.5rem',
                                backgroundColor: 'var(--color-surface)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)',
                                transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        backgroundColor: '#fdf2f8', color: '#be185d',
                                        padding: '0.2rem 0.6rem', borderRadius: '6px',
                                        fontSize: '0.72rem', fontWeight: '700',
                                    }}>
                                        {note.category}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{note.publishedAt}</span>
                                </div>
                                <h3 style={{
                                    fontSize: '1.05rem', fontWeight: '800',
                                    color: 'var(--color-text)', lineHeight: 1.4,
                                    marginBottom: '0.4rem',
                                }}>
                                    {note.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.88rem', color: 'var(--color-text-secondary)',
                                    lineHeight: 1.6,
                                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}>
                                    {note.description}
                                </p>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            <section style={{
                marginTop: '2.4rem',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '1.4rem',
            }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                    함께 읽을 운영 자료
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                    {[
                        ['/checklist', '배포 전 확인 체크리스트', 'DNS, 메타데이터, sitemap, 캐시, 실제 도메인 확인을 한 흐름으로 점검합니다.'],
                        ['/glossary', '운영 용어 짧은 설명', 'DNS, TTL, CDN, Cache-Control, Core Web Vitals 같은 용어를 운영자 관점으로 풉니다.'],
                        ['/editorial-policy', '편집 원칙', '공식 문서 확인, 검토일, 정정 요청, 광고와 편집 독립성 기준을 공개합니다.'],
                        ['/about', 'CloudPlare 소개', '이 사이트가 어떤 회사의 공식 서비스가 아니라 독립 운영 노트라는 점을 설명합니다.'],
                    ].map(([href, title, description]) => (
                        <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                            <article className="note-card" style={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1.1rem',
                                minHeight: '9.5rem',
                            }}>
                                <h3 style={{ fontSize: '0.98rem', fontWeight: 850, color: 'var(--color-text)', marginBottom: '0.45rem', lineHeight: 1.45 }}>
                                    {title}
                                </h3>
                                <p style={{ fontSize: '0.84rem', lineHeight: 1.65, color: 'var(--color-text-secondary)' }}>
                                    {description}
                                </p>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .note-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08); border-color: var(--color-border-hover) !important; }
            `}} />
        </div>
    );
}
