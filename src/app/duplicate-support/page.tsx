import Link from 'next/link';

export const metadata = {
    title: '중복 지원 여부 확인 방법',
    description: '비슷한 목적의 복지 급여와 바우처를 함께 신청하기 전 확인해야 할 기준을 정리합니다.',
};

export default function DuplicateSupportPage() {
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
                    2026년 5월 기준 · 중복 지원 점검
                </p>
                <h1 style={{ fontSize: '1.55rem', fontWeight: 900, lineHeight: 1.35, marginBottom: '0.6rem' }}>
                    중복 지원 여부 확인 방법
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
                    복지 제도는 이름이 달라도 같은 목적의 비용을 지원하면 중복 제한이 생길 수 있습니다.
                    반대로 목적이 다르거나 보충 지원 방식이면 함께 받을 수 있는 경우도 있습니다. 신청 전에는 “어떤 비용을 지원하는 제도인지”부터 비교해야 합니다.
                </p>
            </header>

            <section style={{ marginBottom: '1.7rem' }}>
                <h2 style={{ fontSize: '1.12rem', fontWeight: 850, marginBottom: '0.7rem' }}>목적이 같은지 확인합니다</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                    월세를 지원하는 제도끼리, 냉난방비를 지원하는 제도끼리, 직업훈련비를 지원하는 제도끼리는 중복 또는 조정 가능성이 있습니다.
                    제도명이 다르더라도 지원 목적과 사용처가 같으면 담당 기관에서 이미 받은 금액을 차감하거나 신청을 제한할 수 있습니다.
                </p>
            </section>

            <section style={{ marginBottom: '1.7rem' }}>
                <h2 style={{ fontSize: '1.12rem', fontWeight: 850, marginBottom: '0.7rem' }}>국가, 지자체, 민간 지원을 함께 적습니다</h2>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                    <li>국가 제도: 복지로, 정부24, 고용24, 주택도시기금 등</li>
                    <li>지자체 제도: 시·도, 시·군·구 자체 청년·주거·소상공인 지원</li>
                    <li>기관 지원: 학교, 회사, 공단, 재단의 장학금 또는 보조금</li>
                    <li>민간 지원: 협회, 재단, 비영리단체의 목적성 지원금</li>
                </ul>
            </section>

            <section style={{ marginBottom: '1.7rem' }}>
                <h2 style={{ fontSize: '1.12rem', fontWeight: 850, marginBottom: '0.7rem' }}>보충 지원인지 대체 지원인지 봅니다</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                    일부 제도는 이미 받은 급여를 제외한 나머지 금액만 보충합니다. 예를 들어 주거 관련 지원은 실제 월세, 주거급여, 지자체 월세 지원이 서로 영향을 줄 수 있습니다.
                    이 경우 “중복 불가”라고 단순히 판단하기보다 지급액 산정 방식이 어떻게 조정되는지 확인하는 것이 중요합니다.
                </p>
            </section>

            <section style={{
                backgroundColor: '#f8fafc',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
            }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 850, marginBottom: '0.45rem' }}>문의할 때 말하면 좋은 정보</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    “현재 받고 있는 지원명, 지급 기관, 지급 기간, 금액, 사용 목적”을 한 줄씩 정리해 담당자에게 전달하세요.
                    같은 이름의 제도라도 지자체별 세부 기준이 달라질 수 있으므로, 신청 지역과 주민등록 주소지도 함께 알려주는 것이 좋습니다.
                </p>
            </section>
        </article>
    );
}
