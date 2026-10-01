import Link from 'next/link';
import { getAllNotes } from '@/lib/notes';
import { CONTENT_REVIEWED_AT } from '@/lib/site';

export const metadata = {
    title: 'CloudPlare - 클라우드 운영 노트',
    description: 'DNS, 배포, HTTP 캐시, CDN, Core Web Vitals, 보안 헤더, 장애 기록을 작은 사이트 운영자 관점으로 정리합니다.',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: '/',
        title: 'CloudPlare - 클라우드 운영 노트',
        description: 'DNS, 배포, HTTP 캐시, CDN, Core Web Vitals, 보안 헤더, 장애 기록을 작은 사이트 운영자 관점으로 정리합니다.',
    },
};

export default async function Home() {
    const allNotes = getAllNotes();
    const featuredNotes = allNotes.slice(-6).reverse();

    return (
        <div>
            <section>
                <div style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.8rem 1.6rem',
                    marginBottom: '1.5rem',
                }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: '800', marginBottom: '0.4rem' }}>
                        독립 엔지니어링 기록 · 최종 검토 {CONTENT_REVIEWED_AT}
                    </p>
                    <h1 style={{ fontSize: '1.65rem', fontWeight: '950', color: 'var(--color-text)', lineHeight: 1.35, marginBottom: '0.65rem' }}>
                        작은 웹사이트를 위한 클라우드 인프라 운영 노트
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem', lineHeight: 1.75, marginBottom: '1rem' }}>
                        CloudPlare는 DNS, HTTPS 인증서, 정적 배포, CDN 및 브라우저 캐시, 보안 헤더, 장애 대응을 1인 또는 소규모 팀이 안정적으로 운영할 수 있도록 정리하는 기술 지침서입니다.
                        단순 이론이 아니라 실제 프로덕션 도메인에 적용하며 검증한 터미널 명령어와 트러블슈팅 기준을 차분히 기록합니다.
                    </p>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <Link href="/notes" style={{
                            backgroundColor: 'var(--color-primary)',
                            color: '#ffffff',
                            padding: '0.45rem 0.9rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.84rem',
                            fontWeight: 750,
                        }}>
                            전체 21편 노트 검색하기 →
                        </Link>
                        <Link href="/checklist" style={{
                            backgroundColor: 'var(--color-surface)',
                            color: 'var(--color-text)',
                            border: '1px solid var(--color-border)',
                            padding: '0.45rem 0.9rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.84rem',
                            fontWeight: 750,
                        }}>
                            배포 전 인터랙티브 체크리스트
                        </Link>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.8rem',
                    marginBottom: '2rem',
                }}>
                    {[
                        ['도메인과 DNS', '레코드 변경 전 스냅샷, 전파 시간, 기준 주소 표준화를 점검합니다.'],
                        ['배포와 무중단 롤백', '정적 사이트 빌드 후 실제 도메인, 심볼릭 링크, CDN 캐시를 관리합니다.'],
                        ['보안과 성능 활력', 'Core Web Vitals 최적화와 악성 봇 크롤러 차단으로 사이트를 보호합니다.'],
                    ].map(([title, description]) => (
                        <article key={title} style={{
                            backgroundColor: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.2rem',
                        }}>
                            <h2 style={{ fontSize: '1rem', fontWeight: 850, color: 'var(--color-text)', marginBottom: '0.45rem' }}>
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
                    padding: '1.5rem 0',
                    marginBottom: '2.2rem',
                }}>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '0.8rem' }}>
                        배포 전 필수 점검 기준
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem 1.2rem' }}>
                        {[
                            '기준 도메인, canonical, sitemap이 같은 주소를 가리키는지 확인합니다.',
                            'DNS 레코드 변경 전 기존 값을 캡처하고 TTL을 300초로 미리 낮춥니다.',
                            '배포 후 루트, 목록, 상세 글, 정책 페이지를 실제 도메인에서 확인합니다.',
                            'HTML 문서(no-cache)와 정적 자산(immutable)의 캐시 정책을 분리합니다.',
                            '모바일 320px 폭에서도 메뉴와 제목이 가로로 넘치지 않는지 점검합니다.',
                            '문제 발생 시 1분 이내에 이전 빌드로 되돌릴 수 있는 롤백 커맨드를 확보합니다.',
                        ].map((item) => (
                            <p key={item} style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                                ✓ {item}
                            </p>
                        ))}
                    </div>
                    <Link href="/checklist" style={{
                        display: 'inline-flex',
                        marginTop: '1.1rem',
                        color: 'var(--color-primary)',
                        fontWeight: 750,
                        fontSize: '0.88rem',
                    }}>
                        인터랙티브 배포 체크리스트 열기 →
                    </Link>
                </section>

                <header style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                    marginBottom: '1.2rem',
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--color-text)', marginBottom: '0.2rem' }}>
                            주요 운영 노트
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem' }}>배포 전후에 실무자가 다시 열어보는 21편의 검증된 기록</p>
                    </div>
                    <Link href="/notes" style={{
                        color: 'var(--color-primary)', fontWeight: '750',
                        fontSize: '0.85rem',
                    }}>
                        전체 21편 보기 →
                    </Link>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
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
                                        backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)',
                                        padding: '0.2rem 0.6rem', borderRadius: '6px',
                                        fontSize: '0.74rem', fontWeight: '800',
                                    }}>
                                        {note.category}
                                    </span>
                                    <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                                        {note.publishedAt} · {note.readingMinutes}분 읽기
                                    </span>
                                </div>
                                <h3 style={{
                                    fontSize: '1.08rem', fontWeight: '850',
                                    color: 'var(--color-text)', lineHeight: 1.4,
                                    marginBottom: '0.4rem',
                                }}>
                                    {note.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.88rem', color: 'var(--color-text-secondary)',
                                    lineHeight: 1.65,
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
                marginTop: '2.5rem',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '1.6rem',
            }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '0.85rem' }}>
                    함께 읽을 운영 자료 및 도구
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                    {[
                        ['/checklist', '인터랙티브 배포 체크리스트', 'DNS, 메타데이터, sitemap, 캐시를 브라우저에서 직접 체크하고 완료도를 진단합니다.'],
                        ['/glossary', '클라우드 운영 용어집 (34선)', 'DNS, TTL, CDN, Cache-Control, Core Web Vitals를 실무자 관점으로 풀고 관련 노트로 연결합니다.'],
                        ['/editorial-policy', '편집 원칙 및 품질 기준', '1차 공식 문서 확인, 실측 테스트, 투명한 수정 이력, 광고 독립성 원칙을 공개합니다.'],
                        ['/about', 'CloudPlare 소개 및 운영자 프로필', 'Cloud Platform Record & Operations 프로젝트 비전과 운영자 엔지니어링 철학을 소개합니다.'],
                    ].map(([href, title, description]) => (
                        <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                            <article className="note-card" style={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1.15rem',
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
