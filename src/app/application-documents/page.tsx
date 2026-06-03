import Link from 'next/link';

export const metadata = {
    title: '복지 신청 전 서류 준비 체크리스트',
    description: '2026년 5월 기준 복지 제도 신청 전에 자주 필요한 서류와 준비 순서를 정리합니다.',
};

const sections = [
    {
        title: '1. 본인과 가구를 확인하는 서류',
        items: [
            '주민등록등본은 세대 구성, 주소, 전입일을 확인하는 데 자주 쓰입니다.',
            '가족관계증명서는 부모, 배우자, 자녀 관계를 확인할 때 필요합니다.',
            '혼인관계증명서나 기본증명서는 청년, 출산, 한부모, 입양 관련 제도에서 추가로 요구될 수 있습니다.',
            '주소와 실제 거주지가 다른 경우에는 임대차계약서, 실거주 확인 자료, 담당자 상담 기록을 함께 준비하는 것이 좋습니다.',
        ],
    },
    {
        title: '2. 소득과 재산을 설명하는 자료',
        items: [
            '근로자는 급여명세서, 원천징수영수증, 건강보험료 납부 자료를 확인합니다.',
            '사업자는 사업자등록증, 부가가치세 과세표준증명, 소득금액증명, 폐업사실증명 등이 필요할 수 있습니다.',
            '임대보증금, 예금, 자동차, 부채는 제도에 따라 소득인정액 산정에 반영될 수 있습니다.',
            '최근 퇴사, 휴직, 폐업처럼 소득이 갑자기 줄었다면 이를 설명할 수 있는 증빙을 따로 준비합니다.',
        ],
    },
    {
        title: '3. 주거와 납부 사실을 확인하는 자료',
        items: [
            '월세 지원, 주거급여, 에너지 지원은 임대차계약서와 실제 납부 내역이 중요합니다.',
            '월세 이체 내역은 임대인 이름, 계좌, 금액, 기간이 계약서와 연결되어야 합니다.',
            '관리비에 전기·가스·난방비가 포함된 경우 관리비 고지서나 고객번호 확인 자료를 준비합니다.',
            '공동명의 계약, 셰어하우스, 고시원은 본인 부담액을 설명할 수 있는 추가 자료가 필요할 수 있습니다.',
        ],
    },
    {
        title: '4. 신청 직전 확인 순서',
        items: [
            '공식 신청 화면에서 요구하는 서류 이름을 먼저 확인합니다.',
            '발급일 제한이 있는 서류는 너무 일찍 발급하지 않습니다.',
            '온라인 신청 전 PDF, JPG 등 허용 파일 형식과 용량을 확인합니다.',
            '제출 전 서류의 이름, 생년월일, 주소, 계약 기간, 계좌번호가 서로 맞는지 다시 봅니다.',
        ],
    },
];

export default function ApplicationDocumentsPage() {
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
                    2026년 5월 기준 · 신청 준비 자료
                </p>
                <h1 style={{ fontSize: '1.55rem', fontWeight: 900, lineHeight: 1.35, marginBottom: '0.6rem' }}>
                    복지 신청 전 서류 준비 체크리스트
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.75 }}>
                    복지 제도 신청에서 가장 자주 막히는 지점은 자격 자체보다 서류의 명의, 기준일, 주소, 납부 내역이 서로 맞지 않는 경우입니다.
                    신청 전 아래 항목을 정리하면 주민센터 상담이나 온라인 신청에서 보완 요청을 줄일 수 있습니다.
                </p>
            </header>

            {sections.map((section) => (
                <section key={section.title} style={{ marginBottom: '1.7rem' }}>
                    <h2 style={{ fontSize: '1.12rem', fontWeight: 850, color: 'var(--color-text)', marginBottom: '0.7rem' }}>
                        {section.title}
                    </h2>
                    <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
                        {section.items.map((item) => (
                            <li key={item} style={{ marginBottom: '0.45rem' }}>{item}</li>
                        ))}
                    </ul>
                </section>
            ))}

            <section style={{
                backgroundColor: '#f8fafc',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
            }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 850, marginBottom: '0.45rem' }}>공식 확인 경로</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                    서류 목록은 제도와 신청 시점에 따라 달라집니다. 실제 제출 전에는 정부24, 복지로, 고용24, 주택도시기금, 각 지자체 공고의 신청 화면을 기준으로 다시 확인하세요.
                </p>
            </section>
        </article>
    );
}
