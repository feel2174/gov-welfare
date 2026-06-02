import ServiceList from '@/components/ServiceList';

export const metadata = {
    title: '공공서비스 검색',
    description: '정부24 공공데이터 API를 활용해 공공서비스를 참고용으로 검색합니다.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function SearchPage() {
    return (
        <div>
            <header style={{ marginBottom: '1.4rem' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '0.35rem' }}>
                    참고용 검색 도구
                </p>
                <h1 style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                    공공서비스 검색
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    이 페이지는 공공데이터포털 정부24 API를 활용한 보조 검색 기능입니다.
                    검색 결과는 자동 수집 정보가 포함될 수 있으므로, 신청 전 자격 요건과 접수 가능 여부는 반드시 공식 신청 화면에서 다시 확인해 주세요.
                </p>
            </header>
            <ServiceList />
        </div>
    );
}
