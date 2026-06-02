import Link from 'next/link';

export const metadata = {
    title: '복지 제도 신청 전 확인 체크리스트',
    description: '2026년 5월 기준 복지 제도 신청 전에 확인해야 할 자격, 서류, 기간, 공식 출처 점검 항목을 정리합니다.',
};

export default function ChecklistPage() {
    const sections = [
        {
            title: '1. 자격 기준을 같은 기준일로 맞추기',
            items: [
                '연령, 거주지, 가구원 수, 소득, 재산 기준은 제도마다 판단 시점이 다를 수 있습니다.',
                '건강보험료나 소득인정액을 보는 제도는 최근 납부 내역, 전년도 소득, 현재 가구 구성이 서로 맞는지 확인해야 합니다.',
                '청년, 신혼부부, 한부모, 장애인, 고령자처럼 대상 유형이 정해진 제도는 세부 정의가 기관별로 다를 수 있습니다.',
            ],
        },
        {
            title: '2. 신청 기간과 접수 창구 확인하기',
            items: [
                '상시 신청 제도인지, 모집 공고 기간에만 신청할 수 있는 제도인지 먼저 구분합니다.',
                '온라인 신청이 가능하더라도 추가 서류 제출이나 방문 확인이 필요한 경우가 있습니다.',
                '지방자치단체 사업은 같은 이름의 제도라도 지역별 예산, 접수 기간, 제출 서류가 달라질 수 있습니다.',
            ],
        },
        {
            title: '3. 중복 지원과 사후 의무 확인하기',
            items: [
                '이미 받고 있는 급여, 바우처, 주거 지원, 고용 지원이 있다면 중복 수급 제한을 확인합니다.',
                '선정 이후 취업, 소득 증가, 이사, 가구원 변동이 생기면 변경 신고 의무가 발생할 수 있습니다.',
                '부정확한 정보로 신청하거나 변경 신고를 놓치면 환수, 지원 중단, 추가 제재가 생길 수 있습니다.',
            ],
        },
        {
            title: '4. 공식 출처로 최종 확인하기',
            items: [
                '블로그나 커뮤니티의 요약 글은 참고만 하고, 최종 기준은 정부24, 복지로, 고용24, 주택도시기금, 지자체 공고문에서 확인합니다.',
                '지원 금액과 선정 기준은 예산, 고시, 시행 지침에 따라 바뀔 수 있으므로 신청 직전에 최신 공고를 다시 확인합니다.',
                '전화 문의가 필요한 제도는 상담 일시, 안내받은 기관명, 담당 부서, 안내 내용을 메모해 두는 것이 좋습니다.',
            ],
        },
    ];

    return (
        <article>
            <header style={{ marginBottom: '1.8rem' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>
                    2026년 5월 기준
                </p>
                <h1 style={{ fontSize: '1.55rem', fontWeight: 900, color: 'var(--color-text)', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                    복지 제도 신청 전 확인 체크리스트
                </h1>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}>
                    복지 제도는 이름이 비슷해도 대상, 접수 기간, 제출 서류, 중복 지원 제한이 다를 수 있습니다.
                    아래 항목은 특정 제도의 선정 결과를 보장하지 않으며, 신청자가 공식 안내를 확인할 때 놓치기 쉬운 기준을 정리한 점검 목록입니다.
                </p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sections.map((section) => (
                    <section key={section.title} style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.25rem',
                    }}>
                        <h2 style={{ fontSize: '1.05rem', fontWeight: 850, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                            {section.title}
                        </h2>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', paddingLeft: '1.1rem' }}>
                            {section.items.map((item) => (
                                <li key={item} style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            <section style={{
                marginTop: '1.4rem',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '1.2rem',
            }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 850, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                    신청 전 마지막 확인 순서
                </h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--color-text-secondary)', marginBottom: '0.9rem' }}>
                    관심 있는 제도를 찾았다면 먼저 공식 안내에서 대상 요건을 확인하고, 다음으로 신청 기간과 접수 방법을 확인한 뒤,
                    필요한 서류를 준비해 실제 신청 화면에서 입력 항목을 검토하는 순서가 안전합니다.
                </p>
                <Link href="/guide" style={{ color: 'var(--color-primary)', fontWeight: 750, fontSize: '0.88rem' }}>
                    제도별 가이드 확인하기 →
                </Link>
            </section>
        </article>
    );
}
