import React from 'react';

export const metadata = { title: '이용약관', description: '정부 복지 알리미 이용약관.' };

export default function TermsOfService() {
    const h2 = { fontSize: '1.1rem', fontWeight: '800' as const, color: 'var(--color-text)', marginTop: '2rem', marginBottom: '0.6rem' };
    const p = { fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '0.6rem' };

    return (
        <article style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.4rem' }}>이용약관</h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>시행일: 2026년 1월 1일</p>

            <h2 style={h2}>제1조 (목적)</h2>
            <p style={p}>본 약관은 정부 복지 알리미가 제공하는 정부 보조금 공공서비스 정보 검색 및 복지 가이드 콘텐츠 서비스의 이용 조건을 규정합니다.</p>

            <h2 style={h2}>제2조 (서비스 내용)</h2>
            <ul style={{ ...p, paddingLeft: '1.2rem' }}>
                <li>공공데이터포털 정부24 API를 활용한 공공서비스 검색</li>
                <li>공식 출처를 바탕으로 정리한 복지 정책 가이드 콘텐츠 제공</li>
                <li>각 정부 기관 공식 사이트로의 연결</li>
            </ul>

            <h2 style={h2}>제3조 (면책사항)</h2>
            <p style={p}>본 사이트의 정보는 공공 API와 공개된 공식 안내를 바탕으로 정리한 참고용 정보입니다. 정확한 자격 확인과 신청은 해당 기관 공식 사이트를 이용하세요. 제도 변경, 공공데이터 갱신 지연, 기관별 세부 심사 기준 차이로 실제 결과와 다를 수 있습니다.</p>

            <h2 style={h2}>제4조 (저작권)</h2>
            <p style={p}>가이드 콘텐츠, 디자인 등 자체 제작 저작물의 무단 복제 및 상업적 이용을 금합니다. 공공 API 데이터의 원본 저작권은 각 정부 기관에 귀속됩니다.</p>

            <h2 style={h2}>제5조 (광고)</h2>
            <p style={p}>운영 비용 충당을 위해 Google AdSense 등 디스플레이 광고를 게재할 수 있습니다.</p>

            <h2 style={h2}>제6조 (약관 변경)</h2>
            <p style={p}>본 약관은 관련 법령이나 서비스 정책 변경에 따라 수정될 수 있으며, 변경 시 본 페이지를 통해 공고합니다.</p>

            <div style={{ marginTop: '2.5rem', padding: '1rem 1.2rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
                    <strong>문의:</strong> eagles8795@gmail.com<br /><strong>시행일:</strong> 2026년 1월 1일
                </p>
            </div>
        </article>
    );
}
