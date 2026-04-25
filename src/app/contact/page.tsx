import React from 'react';

export const metadata = {
    title: '문의하기',
    description: '정부 복지 알리미 사이트 관련 문의, 오류 신고, 제안사항을 보내주세요.',
};

export default function ContactPage() {
    const label = { display: 'block' as const, fontSize: '0.88rem', fontWeight: '700' as const, color: 'var(--color-text)', marginBottom: '0.4rem' };
    const input = { width: '100%', boxSizing: 'border-box' as const, padding: '0.8rem 1rem', fontSize: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: '#f8fafc', color: 'var(--color-text)', outline: 'none' };

    return (
        <article style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem', border: '1px solid var(--color-border)' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.4rem' }}>문의하기</h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', lineHeight: 1.6 }}>
                사이트 이용 중 궁금한 사항, 오류 신고, 개선 제안을 보내주시면 확인 후 답변드리겠습니다.
            </p>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.8rem' }}>📧 이메일 문의</h2>
                <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '1.2rem 1.3rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>✉️</span>
                    <div>
                        <p style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-primary)' }}>eagles8795@gmail.com</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>평일 기준 24시간 이내 답변드립니다.</p>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1rem' }}>💬 빠른 문의 양식</h2>
                <form action="mailto:eagles8795@gmail.com" method="post" encType="text/plain">
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={label}>이름 또는 닉네임</label>
                        <input type="text" name="name" placeholder="홍길동" required style={input} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={label}>이메일 주소</label>
                        <input type="email" name="email" placeholder="example@email.com" required style={input} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={label}>문의 유형</label>
                        <select name="type" required style={{ ...input, appearance: 'auto' as const }}>
                            <option value="">선택해주세요</option>
                            <option value="error">오류 신고</option>
                            <option value="suggestion">개선 제안</option>
                            <option value="question">일반 문의</option>
                            <option value="partnership">제휴 문의</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={label}>문의 내용</label>
                        <textarea name="message" placeholder="문의 내용을 자세히 적어주세요." required rows={5} style={{ ...input, resize: 'vertical' }} />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '0.9rem', backgroundColor: 'var(--color-primary)', color: '#fff', fontSize: '0.95rem', fontWeight: '700', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
                        문의 보내기
                    </button>
                </form>
            </section>

            <section>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.8rem' }}>⚠️ 참고사항</h2>
                <ul style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
                    <li>본 사이트는 정부 기관이 아닙니다. 개별 정책의 자격 요건이나 신청 관련 문의는 해당 기관에 직접 문의해 주세요.</li>
                    <li>데이터 오류 발견 시 신고해주시면 공공데이터포털 측에 전달하겠습니다.</li>
                </ul>
            </section>
        </article>
    );
}
