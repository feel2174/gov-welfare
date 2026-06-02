import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: '사이트 소개',
    description: '정부 복지 알리미는 공식 출처와 공공데이터를 바탕으로 복지 제도와 공공서비스 정보를 정리하는 정보 사이트입니다.',
};

export default function AboutPage() {
    const h2 = { fontSize: '1.2rem', fontWeight: '800' as const, color: 'var(--color-text)', marginBottom: '0.8rem' };
    const p = { fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' };
    const section = { marginBottom: '2.5rem' };

    return (
        <article style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.4rem' }}>사이트 소개</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                정부 복지 알리미를 방문해 주셔서 감사합니다.
            </p>

            <div style={section}>
                <h2 style={h2}>🩵 정부 복지 알리미란?</h2>
                <p style={p}>정부 복지 알리미는 정부 및 지방자치단체에서 제공하는 복지 서비스와 보조금 정보를 공식 출처 기준으로 정리하는 정보 제공 사이트입니다.</p>
                <p style={{ ...p, marginTop: '0.8rem' }}>복지 제도는 소득, 나이, 거주지, 신청 기간에 따라 적용 여부가 달라질 수 있습니다. 본 사이트는 신청 전 확인해야 할 요건과 공식 신청 경로를 이해하기 쉽게 정리하는 것을 목표로 합니다.</p>
            </div>

            <div style={section}>
                <h2 style={h2}>📡 데이터 출처</h2>
                <p style={p}>공공서비스 검색 영역은 <strong>공공데이터포털(data.go.kr)</strong>에서 제공하는 <strong>정부24 대한민국 공공서비스 정보 API</strong>를 활용합니다. 가이드 콘텐츠는 각 제도의 공식 안내와 공개 자료를 함께 확인해 작성합니다.</p>
                <div style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', padding: '1rem 1.2rem', marginTop: '0.8rem', border: '1px solid var(--color-border)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                        &bull; API 제공: 행정안전부 (정부24)<br />
                        &bull; 데이터 포털: 공공데이터포털 (data.go.kr)<br />
                        &bull; 공공서비스 검색: 정부24 공공서비스 API 활용<br />
                        &bull; 갱신 방식: API 응답 기준 + 1시간 캐싱
                    </p>
                </div>
            </div>

            <div style={section}>
                <h2 style={h2}>🎯 운영 목적</h2>
                <ul style={{ ...p, paddingLeft: '1.2rem', listStyle: 'disc' }}>
                    <li style={{ marginBottom: '0.5rem' }}>정부 보조금과 공공서비스 정보를 쉽게 탐색할 수 있는 환경 제공</li>
                    <li style={{ marginBottom: '0.5rem' }}>복잡한 자격 요건과 신청 절차를 이해하기 쉽게 안내하는 가이드 콘텐츠 제공</li>
                    <li style={{ marginBottom: '0.5rem' }}>각 정부 기관의 공식 신청 페이지로의 정확한 안내</li>
                    <li>정보 접근성이 낮은 계층의 복지 사각지대 해소 기여</li>
                </ul>
            </div>

            <div style={section}>
                <h2 style={h2}>👤 운영자 정보</h2>
                <p style={p}>본 사이트는 공익 정보 제공을 목적으로 개인이 운영하며, 정부 기관과는 직접적인 관련이 없습니다. 제공되는 정보는 공공데이터 API와 공개된 공식 안내를 바탕으로 정리되며, 정확한 자격 확인과 신청은 각 기관의 공식 웹사이트를 이용하시기 바랍니다.</p>
            </div>

            <div style={section}>
                <h2 style={h2}>📝 정보 검토 방식</h2>
                <p style={p}>가이드 콘텐츠는 정부24, 복지로, 고용24, 주택도시기금 등 공식 안내를 우선 참고해 작성합니다. 금액, 소득 기준, 신청 기간처럼 변동 가능성이 있는 정보는 각 글의 출처 영역과 공식 신청 화면에서 다시 확인할 수 있도록 안내합니다.</p>
                <p style={{ ...p, marginTop: '0.8rem' }}>자세한 기준은 <Link href="/editorial-policy" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>편집 원칙</Link>에서 확인할 수 있습니다.</p>
            </div>

            <div>
                <h2 style={h2}>📬 문의하기</h2>
                <p style={p}>사이트 이용 중 궁금한 점이나 오류 신고는 <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>문의 페이지</Link>를 통해 연락해 주세요.</p>
            </div>
        </article>
    );
}
