import { getIndexableGuides } from '@/lib/policies';
import Link from 'next/link';

export const metadata = {
    title: '정부 복지 알리미 - 공식 출처 기반 복지 정보',
    description: '2026년 5월 기준 공식 출처를 바탕으로 복지 제도와 공공서비스 정보를 정리합니다.',
};

export default async function Home() {
    const featuredGuides = await getIndexableGuides();

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
                        2026년 5월 기준 · 공식 출처 확인형 복지 정보
                    </p>
                    <h1 style={{ fontSize: '1.55rem', fontWeight: '900', color: 'var(--color-text)', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                        신청 전 확인해야 할 정부 복지 제도와 공공서비스
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                        정부24, 복지로, 고용24, 주택도시기금 등 공식 안내를 바탕으로 자격 요건, 신청 방법, 확인해야 할 주의사항을 정리합니다.
                        실제 신청과 최종 자격 판단은 각 기관의 공식 신청 화면을 기준으로 확인해 주세요.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.8rem',
                    marginBottom: '2rem',
                }}>
                    {[
                        ['자격 요건 확인', '연령, 소득, 재산, 거주지, 가구 형태처럼 신청 결과에 영향을 주는 항목을 먼저 구분합니다.'],
                        ['신청 경로 정리', '온라인 신청, 주민센터 방문, 전담 기관 접수 등 제도별 접수 창구를 공식 출처 중심으로 안내합니다.'],
                        ['주의사항 점검', '신청 기간, 중복 수혜 제한, 제출 서류, 사후 변경 신고처럼 놓치기 쉬운 항목을 함께 확인합니다.'],
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
                        복지 제도 신청 전 기본 점검
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.7rem 1.2rem' }}>
                        {[
                            '가구원 수와 건강보험료, 소득인정액 기준을 같은 기간의 자료로 확인합니다.',
                            '신청 기간이 정해진 제도는 접수 시작일과 마감일, 예산 소진 여부를 함께 확인합니다.',
                            '이미 받고 있는 급여나 바우처가 있다면 중복 지원 제한 여부를 공식 안내에서 확인합니다.',
                            '주민등록상 주소지, 실제 거주지, 근무지 기준이 서로 다른 제도인지 구분합니다.',
                            '온라인 신청 전 공동인증서, 간편인증, 가족관계 서류, 통장 사본 등 필요한 자료를 준비합니다.',
                            '선정 후에도 소득, 취업, 이사, 가구원 변동이 생기면 변경 신고 의무가 있는지 확인합니다.',
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
                        신청 전 체크리스트 자세히 보기 →
                    </Link>
                </section>

                <header style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                    marginBottom: '1.2rem',
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--color-text)', marginBottom: '0.2rem' }}>
                            복지 가이드
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>공식 출처와 함께 확인하는 제도별 신청 안내</p>
                    </div>
                    <Link href="/guide" style={{
                        color: 'var(--color-primary)', fontWeight: '700',
                        fontSize: '0.85rem',
                    }}>
                        전체보기 →
                    </Link>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {featuredGuides.map((guide) => (
                        <Link key={guide.id} href={`/guide/${guide.id}`} style={{ textDecoration: 'none' }}>
                            <article className="guide-card" style={{
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
                                        {guide.category}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{guide.date}</span>
                                </div>
                                <h3 style={{
                                    fontSize: '1.05rem', fontWeight: '800',
                                    color: 'var(--color-text)', lineHeight: 1.4,
                                    marginBottom: '0.4rem',
                                }}>
                                    {guide.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.88rem', color: 'var(--color-text-secondary)',
                                    lineHeight: 1.6,
                                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}>
                                    {guide.description}
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
                    신청 실패를 줄이는 실무형 자료
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
                    {[
                        ['/application-documents', '신청 전 서류 준비 체크리스트', '주민등록, 가족관계, 임대차, 소득 자료처럼 자주 필요한 서류를 신청 상황별로 정리합니다.'],
                        ['/income-check', '소득인정액 확인 전 알아야 할 것', '복지 신청에서 소득과 재산이 어떻게 다르게 보이는지, 상담 전 정리할 항목을 안내합니다.'],
                        ['/duplicate-support', '중복 지원 여부 확인 방법', '비슷한 목적의 급여와 바우처가 있을 때 먼저 확인해야 할 기준을 정리합니다.'],
                        ['/rejection-reasons', '신청이 반려되는 흔한 이유', '서류 누락, 명의 불일치, 주소 문제처럼 현장에서 자주 막히는 지점을 점검합니다.'],
                    ].map(([href, title, description]) => (
                        <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                            <article className="guide-card" style={{
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

            <section style={{
                marginTop: '2.4rem',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.2rem',
            }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 850, color: 'var(--color-text)', marginBottom: '0.45rem' }}>
                    공공서비스 검색은 참고 도구로 제공합니다
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.86rem', lineHeight: 1.65 }}>
                    정부24 API 검색 결과는 사용자가 추가 제도를 찾아볼 수 있도록 제공하는 보조 기능입니다.
                    검색 결과의 세부 조건과 신청 가능 여부는 각 기관의 공식 신청 화면에서 다시 확인해야 합니다.
                </p>
                <Link href="/search" style={{
                    display: 'inline-flex',
                    marginTop: '0.8rem',
                    color: 'var(--color-primary)',
                    fontWeight: 750,
                    fontSize: '0.86rem',
                }}>
                    공공서비스 검색 열기 →
                </Link>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .guide-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08); border-color: var(--color-border-hover) !important; }
            `}} />
        </div>
    );
}
