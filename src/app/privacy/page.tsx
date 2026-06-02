import React from 'react';

export const metadata = {
    title: '개인정보처리방침',
    description: '정부 복지 알리미 개인정보처리방침.',
};

export default function PrivacyPolicy() {
    const h2 = { fontSize: '1.1rem', fontWeight: '800' as const, color: 'var(--color-text)', marginTop: '2rem', marginBottom: '0.6rem' };
    const p = { fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '0.6rem' };

    return (
        <article style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.4rem' }}>개인정보처리방침</h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>시행일: 2026년 1월 1일</p>

            <p style={p}>정부 복지 알리미(cloudplare.com)는 이용자의 개인정보를 소중히 보호하며, 개인정보 보호법 및 관련 법령을 준수합니다.</p>

            <h2 style={h2}>1. 개인정보 수집 항목</h2>
            <p style={p}>본 사이트는 회원가입 기능이 없으며 개인정보를 직접 수집하지 않습니다. 문의 페이지를 통해 자발적으로 제공된 이메일은 응대 후 파기합니다.</p>

            <h2 style={h2}>2. 자동 수집 정보</h2>
            <p style={p}>접속 IP, 브라우저 정보, 방문 페이지, 체류 시간 등이 통계 분석, 보안, 서비스 개선 목적으로 수집될 수 있습니다. 쿠키 저장은 브라우저 설정에서 거부할 수 있습니다.</p>

            <h2 style={h2}>3. 제3자 광고 (구글 애드센스)</h2>
            <p style={p}>본 사이트는 Google AdSense 광고를 게재할 수 있으며, Google과 제3자 광고 사업자는 쿠키 또는 유사 기술을 사용해 이용자의 이전 방문 기록을 바탕으로 맞춤형 광고를 제공할 수 있습니다.</p>
            <p style={p}>이용자는 Google 광고 설정 페이지에서 개인 맞춤 광고를 관리하거나 비활성화할 수 있으며, 브라우저 설정을 통해 쿠키 저장을 제한할 수 있습니다.</p>

            <h2 style={h2}>4. 분석 도구</h2>
            <p style={p}>사이트 이용 현황 파악을 위해 Vercel Analytics 등 방문 통계 도구가 사용될 수 있습니다. 수집 정보는 개인을 직접 식별하기보다 페이지 이용 흐름과 성능 개선을 위한 통계 목적으로 활용됩니다.</p>

            <h2 style={h2}>5. 데이터 출처</h2>
            <p style={p}>공공서비스 검색 정보는 공공데이터포털(data.go.kr) 정부24 API 응답을 바탕으로 표시됩니다. 제도별 신청 가능 여부와 최신 기준은 각 기관 공식 신청 화면을 우선합니다.</p>

            <h2 style={h2}>6. 개인정보 보유 및 파기</h2>
            <p style={p}>직접적인 개인정보를 보유하지 않으며, 문의 이메일은 응대 완료 후 30일 이내 파기합니다.</p>

            <h2 style={h2}>7. 이용자의 권리</h2>
            <p style={p}>개인정보 처리에 대한 열람, 정정, 삭제 요청은 eagles8795@gmail.com으로 연락해 주세요.</p>

            <div style={{ marginTop: '2.5rem', padding: '1rem 1.2rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                    <strong>문의:</strong> eagles8795@gmail.com<br /><strong>시행일:</strong> 2026년 1월 1일
                </p>
            </div>
        </article>
    );
}
