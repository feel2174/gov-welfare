import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: '사이트 소개',
    description: '정부 복지 알리미는 공공데이터포털 API를 활용하여 대한민국 정부 보조금 지원금 정보를 실시간으로 제공하는 비영리 정보 서비스입니다.',
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
                <p style={p}>정부 복지 알리미는 대한민국 국민이 정부 및 지방자치단체에서 제공하는 다양한 복지 서비스와 보조금 정보를 <strong>쉽고 빠르게 검색</strong>할 수 있도록 만든 비영리 정보 제공 서비스입니다.</p>
                <p style={{ ...p, marginTop: '0.8rem' }}>많은 분들이 본인에게 해당되는 정부 지원금이 있는지조차 모르고 지나치는 경우가 많습니다. 저희는 이러한 정보 비대칭을 해소하고, 모든 국민이 자신에게 맞는 복지 혜택을 놓치지 않도록 돕고자 이 사이트를 운영하고 있습니다.</p>
            </div>

            <div style={section}>
                <h2 style={h2}>📡 데이터 출처</h2>
                <p style={p}>본 사이트의 모든 정부 지원 서비스 정보는 <strong>공공데이터포털(data.go.kr)</strong>에서 제공하는 <strong>정부24 대한민국 공공서비스 정보 API</strong>를 통해 실시간으로 연동됩니다.</p>
                <div style={{ backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)', padding: '1rem 1.2rem', marginTop: '0.8rem', border: '1px solid var(--color-border)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                        &bull; API 제공: 행정안전부 (정부24)<br />
                        &bull; 데이터 포털: 공공데이터포털 (data.go.kr)<br />
                        &bull; 서비스 수: 약 10,000건 이상의 공공서비스<br />
                        &bull; 갱신 주기: 실시간 API 호출 + 1시간 캐싱
                    </p>
                </div>
            </div>

            <div style={section}>
                <h2 style={h2}>🎯 운영 목적</h2>
                <ul style={{ ...p, paddingLeft: '1.2rem', listStyle: 'disc' }}>
                    <li style={{ marginBottom: '0.5rem' }}>국민 누구나 쉽게 정부 보조금 정보를 검색할 수 있는 환경 제공</li>
                    <li style={{ marginBottom: '0.5rem' }}>복잡한 자격 요건과 신청 절차를 이해하기 쉽게 안내하는 가이드 콘텐츠 제공</li>
                    <li style={{ marginBottom: '0.5rem' }}>각 정부 기관의 공식 신청 페이지로의 정확한 안내</li>
                    <li>정보 접근성이 낮은 계층의 복지 사각지대 해소 기여</li>
                </ul>
            </div>

            <div style={section}>
                <h2 style={h2}>👤 운영자 정보</h2>
                <p style={p}>본 사이트는 공익 정보 제공을 목적으로 개인이 운영하며, 정부 기관과는 직접적인 관련이 없습니다. 제공되는 정보는 공공데이터 API를 통해 자동으로 수집되며, 정확한 자격 확인과 신청은 반드시 각 기관의 공식 웹사이트를 이용하시기 바랍니다.</p>
            </div>

            <div>
                <h2 style={h2}>📬 문의하기</h2>
                <p style={p}>사이트 이용 중 궁금한 점이나 오류 신고는 <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>문의 페이지</Link>를 통해 연락해 주세요.</p>
            </div>
        </article>
    );
}
