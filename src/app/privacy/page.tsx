import React from 'react';

export const metadata = {
    title: '개인정보처리방침 - 정부복지 알리미',
};

export default function PrivacyPolicy() {
    return (
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '2px solid #f3f4f6', paddingBottom: '1rem' }}>개인정보처리방침</h1>
            <p>‘정부복지 알리미’(이하 ‘본 사이트’)는 구글 애드센스 등 제3자 광고 게재를 위해 쿠키를 사용할 수 있으며, 개인을 식별할 수 있는 정보를 무단으로 수집, 저장하지 않습니다.</p>
            <h2 style={{ marginTop: '2rem', fontSize: '1.2rem' }}>1. 개인정보 수집 항목</h2>
            <p>본 사이트는 회원가입 기능을 생략하여 일체의 회원 정보 및 이름, 이메일 등의 개인정보를 수집하지 않습니다. 모의계산을 위한 클릭 링크는 각각의 정부 공식 홈페이지로만 전달됩니다.</p>
            <h2 style={{ marginTop: '2rem', fontSize: '1.2rem' }}>2. 자동 수집되는 정보 (쿠키, 접속 로그)</h2>
            <p>익명 방문 정보, 트래픽 분석(구글 애널리틱스 등) 및 타겟 광고(구글 애드센스) 목적을 위해 브라우저 쿠키(Cookie) 데이터가 수집 및 공유될 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
            <h2 style={{ marginTop: '2rem', fontSize: '1.2rem' }}>3. 제3자 광고 (구글 애드센스)</h2>
            <p>본 사이트는 구글 애드센스 광고를 게재합니다. 구글은 사용자가 사이트에 방문한 기록을 바탕으로 관련성 높은 광고를 게재하기 위해 DART 쿠키를 사용할 수 있습니다.</p>
            <p style={{ marginTop: '2rem', color: '#6b7280', fontSize: '0.9rem' }}>공고일자: 2026.01.01</p>
        </article>
    );
}
