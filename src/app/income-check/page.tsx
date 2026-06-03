import Link from 'next/link';

export const metadata = {
    title: '소득인정액 확인 전 알아야 할 것',
    description: '복지 신청에서 소득, 재산, 가구 범위가 어떻게 다르게 확인되는지 정리합니다.',
};

export default function IncomeCheckPage() {
    return (
        <article style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.5rem',
            lineHeight: 1.8,
        }}>
            <nav style={{ marginBottom: '1.5rem' }}>
                <Link href="/" style={{ color: 'var(--color-text-secondary)', fontWeight: 700, fontSize: '0.88rem' }}>
                    ← 홈으로
                </Link>
            </nav>
            <header style={{ marginBottom: '1.6rem', paddingBottom: '1.2rem', borderBottom: '1px solid var(--color-border)' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>
                    2026년 5월 기준 · 소득 기준 이해
                </p>
                <h1 style={{ fontSize: '1.55rem', fontWeight: 900, lineHeight: 1.35, marginBottom: '0.6rem' }}>
                    소득인정액 확인 전 알아야 할 것
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
                    복지 신청에서 말하는 소득은 통장에 들어오는 월급만 뜻하지 않습니다. 일부 제도는 재산을 소득으로 환산하고,
                    부모나 배우자를 포함한 가구 기준을 함께 보기도 합니다. 신청 전 아래 기준을 먼저 정리하면 자가진단 결과를 더 현실적으로 해석할 수 있습니다.
                </p>
            </header>

            <section style={{ marginBottom: '1.7rem' }}>
                <h2 style={{ fontSize: '1.12rem', fontWeight: 850, marginBottom: '0.7rem' }}>가구 범위를 먼저 확인합니다</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                    같은 주소에 살고 있는 사람, 실제 생계를 같이하는 사람, 가족관계증명서상 가족은 항상 같지 않습니다.
                    청년 지원은 부모를 포함한 원가구를 함께 볼 수 있고, 기초생활보장이나 주거급여는 실제 생계와 세대 구성이 중요하게 다뤄질 수 있습니다.
                    신청 화면에서 “본인 가구”, “원가구”, “세대”, “부양의무자”라는 표현이 나오면 각각의 범위를 분리해서 적어두세요.
                </p>
            </section>

            <section style={{ marginBottom: '1.7rem' }}>
                <h2 style={{ fontSize: '1.12rem', fontWeight: 850, marginBottom: '0.7rem' }}>소득 자료는 종류별로 나눕니다</h2>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                    <li>근로소득: 급여명세서, 원천징수영수증, 건강보험료 자료</li>
                    <li>사업소득: 소득금액증명, 부가가치세 신고 자료, 휴폐업 자료</li>
                    <li>이전소득: 연금, 실업급여, 양육비, 각종 공적 급여</li>
                    <li>일시적 변동: 퇴직, 휴직, 폐업, 질병으로 인한 소득 감소 자료</li>
                </ul>
            </section>

            <section style={{ marginBottom: '1.7rem' }}>
                <h2 style={{ fontSize: '1.12rem', fontWeight: 850, marginBottom: '0.7rem' }}>재산은 “보유 여부”와 “환산 여부”를 따로 봅니다</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                    예금, 임대보증금, 자동차, 부동산, 부채는 제도마다 반영 방식이 다릅니다. 자동차는 생업용인지, 장애인 사용 차량인지,
                    가액이 어느 정도인지에 따라 판단이 달라질 수 있습니다. 부채가 있다고 해서 자동으로 모두 차감되는 것도 아니므로 공식 안내의 인정 범위를 확인해야 합니다.
                </p>
            </section>

            <section style={{
                backgroundColor: '#f8fafc',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
            }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 850, marginBottom: '0.45rem' }}>상담 전 메모할 질문</h2>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.88rem' }}>
                    <li>부모 또는 배우자 소득을 함께 보는 제도인가요?</li>
                    <li>최근 소득 감소를 현재 기준으로 반영할 수 있나요?</li>
                    <li>보증금, 자동차, 예금은 어떤 방식으로 반영되나요?</li>
                    <li>신청 후 소득이 바뀌면 신고해야 하나요?</li>
                </ul>
            </section>
        </article>
    );
}
