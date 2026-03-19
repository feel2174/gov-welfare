import React from 'react';

export const metadata = {
    title: '이용약관 - 정부복지 알리미',
};

export default function TermsOfService() {
    return (
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '2px solid #f3f4f6', paddingBottom: '1rem' }}>이용약관 및 면책조항</h1>
            <h2 style={{ marginTop: '2rem', fontSize: '1.2rem' }}>1. 목적</h2>
            <p>본 약관은 ‘정부복지 알리미’에서 제공하는 정부 지원금, 정책 모음 등의 정보 제공 서비스의 이용에 대한 조건 및 절차, 책임 사항을 규정합니다.</p>
            <h2 style={{ marginTop: '2rem', fontSize: '1.2rem' }}>2. 정보의 성격 및 면책사항</h2>
            <p>본 사이트에서 제공하는 복지 정책, 지원 금액 등의 모든 내용은 정부와 지자체의 안내자료를 참고하여 작성되었으나, 시기에 따라 정책 변동이 있을 수 있으므로 단순 참고용으로만 활용되어야 합니다.</p>
            <p>본 사이트는 제공된 정보로 인해 발생한 직·간접적인 손해에 대하여 법적 책임을 지지 않으며, 정확한 신청 자격 및 모의계산은 반드시 명시된 공식 홈페이지를 통해 확인하시기 바랍니다.</p>
            <h2 style={{ marginTop: '2rem', fontSize: '1.2rem' }}>3. 저작권 및 무단 이용 금지</h2>
            <p>본 사이트에 등록된 자체 가공 콘텐츠의 무단 복제 및 상업적 도용을 금합니다. 단, 각 정책의 원본 저작권은 각 정부 기관에 있습니다.</p>
            <p style={{ marginTop: '2rem', color: '#6b7280', fontSize: '0.9rem' }}>시행일자: 2026.01.01</p>
        </article>
    );
}
