import Link from 'next/link';

export const metadata = {
    title: '정부지원금 신청이 반려되는 흔한 이유',
    description: '복지와 공공지원 신청에서 자주 발생하는 반려 사유와 보완 방법을 정리합니다.',
};

const reasons = [
    ['명의 불일치', '계약서, 계좌, 고지서, 카드, 고객번호가 신청자 본인 또는 인정되는 가구원 명의인지 확인합니다.'],
    ['주소 불일치', '주민등록 주소, 실제 거주지, 임대차계약서 주소, 사업장 주소가 서로 다르면 보완 설명이 필요합니다.'],
    ['기간 착오', '신청 기간, 납부 기간, 거주 기간, 출생 또는 전입 기준일을 잘못 적용하면 대상에서 제외될 수 있습니다.'],
    ['소득 자료 누락', '최근 소득 감소, 휴직, 폐업, 실직이 있으면 이를 설명하는 자료를 함께 제출해야 합니다.'],
    ['중복 지원 미확인', '같은 목적의 지원을 이미 받고 있다면 지급액이 조정되거나 신청이 제한될 수 있습니다.'],
];

export default function RejectionReasonsPage() {
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
                    2026년 5월 기준 · 신청 보완 자료
                </p>
                <h1 style={{ fontSize: '1.55rem', fontWeight: 900, lineHeight: 1.35, marginBottom: '0.6rem' }}>
                    정부지원금 신청이 반려되는 흔한 이유
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
                    신청이 반려됐다고 해서 항상 자격이 없다는 뜻은 아닙니다. 서류가 부족하거나, 명의와 주소가 맞지 않거나,
                    신청 기준일을 잘못 이해해 보완 요청이 나오는 경우도 많습니다. 아래 항목은 신청 전후에 가장 먼저 확인할 지점입니다.
                </p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.8rem' }}>
                {reasons.map(([title, description]) => (
                    <section key={title} style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem',
                        backgroundColor: '#f8fafc',
                    }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 850, marginBottom: '0.35rem' }}>{title}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{description}</p>
                    </section>
                ))}
            </div>

            <section style={{ marginBottom: '1.7rem' }}>
                <h2 style={{ fontSize: '1.12rem', fontWeight: 850, marginBottom: '0.7rem' }}>반려 후 다시 확인할 순서</h2>
                <ol style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                    <li>반려 또는 보완 안내문에서 정확한 사유 문구를 확인합니다.</li>
                    <li>담당 기관에 전화하거나 방문해 어떤 서류가 부족한지 구체적으로 묻습니다.</li>
                    <li>새로 발급해야 하는 서류와 기존 서류를 그대로 쓸 수 있는 서류를 나눕니다.</li>
                    <li>보완 기한이 있는 경우 마감일 전에 제출 경로를 확인합니다.</li>
                    <li>자격 자체가 불인정된 경우 이의신청 또는 재신청 가능 여부를 확인합니다.</li>
                </ol>
            </section>

            <section style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
            }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 850, color: '#78350f', marginBottom: '0.45rem' }}>주의할 점</h2>
                <p style={{ color: '#92400e', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    온라인 게시글이나 주변 사례만 보고 다시 신청하면 같은 이유로 반복 반려될 수 있습니다.
                    반려 사유는 개인의 가구 구성, 주소, 소득, 재산, 신청 시점에 따라 달라지므로 공식 담당 창구의 안내를 기준으로 보완하세요.
                </p>
            </section>
        </article>
    );
}
