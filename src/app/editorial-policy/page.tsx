import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: '편집 원칙',
    description: '정부 복지 알리미의 정보 수집, 검토, 정정 요청 처리 기준입니다.',
};

export default function EditorialPolicyPage() {
    const h2 = { fontSize: '1.15rem', fontWeight: '800' as const, color: 'var(--color-text)', marginTop: '2rem', marginBottom: '0.7rem' };
    const p = { fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '0.7rem' };
    const li = { marginBottom: '0.5rem' };

    return (
        <article style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.4rem' }}>편집 원칙</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                최종 업데이트: 2026년 5월 26일
            </p>

            <p style={p}>
                정부 복지 알리미는 복지 제도와 공공서비스 정보를 쉽게 이해할 수 있도록 정리하는 정보 제공 사이트입니다. 본 사이트는 정부 기관이 아니며, 모든 신청과 최종 자격 판단은 해당 기관의 공식 안내를 따릅니다.
            </p>

            <h2 style={h2}>정보 출처</h2>
            <ul style={{ ...p, paddingLeft: '1.2rem', listStyle: 'disc' }}>
                <li style={li}>공공데이터포털 정부24 공공서비스 API</li>
                <li style={li}>정부24, 복지로, 고용24, 주택도시기금 등 공공기관 공식 안내</li>
                <li style={li}>소관 부처와 공공기관의 보도자료, 사업 공고, 이용 안내</li>
            </ul>

            <h2 style={h2}>검토 기준</h2>
            <p style={p}>
                금액, 소득 기준, 신청 기간처럼 이용자 판단에 직접 영향을 주는 정보는 공식 출처와 함께 확인할 수 있도록 정리합니다. 변동 가능성이 큰 내용은 단정 표현을 줄이고, 공식 신청 화면에서 다시 확인하도록 안내합니다.
            </p>

            <h2 style={h2}>정정 요청</h2>
            <p style={p}>
                공공데이터 지연, 제도 변경, 오탈자 등으로 실제 안내와 차이가 있을 수 있습니다. 오류를 발견하신 경우 <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: '700' }}>문의 페이지</Link>로 알려주시면 확인 후 반영하겠습니다.
            </p>

            <h2 style={h2}>광고와 콘텐츠 구분</h2>
            <p style={p}>
                사이트 운영 비용을 충당하기 위해 광고가 표시될 수 있습니다. 광고는 편집 내용과 분리되며, 복지 제도 설명과 공식 신청 안내의 우선순위에 영향을 주지 않습니다.
            </p>
        </article>
    );
}
