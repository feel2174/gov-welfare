'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ServiceDetail {
    서비스ID: string;
    서비스명: string;
    서비스목적: string;
    지원대상: string;
    선정기준: string;
    지원내용: string;
    신청방법: string;
    신청기한: string;
    구비서류: string;
    접수기관명: string;
    문의처: string;
    온라인신청사이트URL: string;
    소관기관명: string;
    수정일시: string;
    지원유형: string;
    법령: string;
    자치법규: string;
    행정규칙: string;
}

// 줄바꿈 렌더링
function FormatText({ text }: { text: string | null | undefined }) {
    if (!text) return <span style={{ color: 'var(--color-text-muted)' }}>정보 없음</span>;
    return (
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>
            {text.replace(/\\r\\n|\\r|\\n/g, '\n').split('\n').map((line, i) => (
                <React.Fragment key={i}>{line}{i < text.split('\n').length - 1 && <br />}</React.Fragment>
            ))}
        </div>
    );
}

function InfoSection({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
    return (
        <section style={{
            marginBottom: '1.2rem',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
        }}>
            <h2 style={{
                fontSize: '0.92rem', fontWeight: '800',
                padding: '0.8rem 1.2rem',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                color: 'var(--color-text)',
                margin: 0,
            }}>
                <span>{icon}</span> {title}
            </h2>
            <div style={{
                padding: '1rem 1.2rem',
                fontSize: '0.88rem',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.75',
            }}>
                {children}
            </div>
        </section>
    );
}

export default function ServiceDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [detail, setDetail] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchDetail() {
            setLoading(true);
            try {
                const res = await fetch(`/api/services/${id}?serviceId=${id}`);
                if (!res.ok) throw new Error('API 오류');
                const json = await res.json();
                if (json.data && json.data.length > 0) {
                    setDetail(json.data[0]);
                } else {
                    setError('해당 서비스를 찾을 수 없습니다.');
                }
            } catch {
                setError('데이터를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5rem 0' }}>
                <div className="spinner" />
                <style dangerouslySetInnerHTML={{ __html: `
                    .spinner { width: 36px; height: 36px; border: 3px solid #e5e7eb; border-top-color: var(--color-primary); border-radius: 50%; animation: spin 0.7s linear infinite; }
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}} />
            </div>
        );
    }

    if (error || !detail) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>😢</p>
                <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-secondary)' }}>{error || '서비스를 찾을 수 없습니다.'}</p>
                <Link href="/" style={{
                    display: 'inline-block', marginTop: '1.5rem',
                    backgroundColor: 'var(--color-primary)', color: '#fff',
                    padding: '0.7rem 1.5rem', borderRadius: '10px',
                    fontWeight: '700', fontSize: '0.88rem',
                }}>
                    홈으로 돌아가기
                </Link>
            </div>
        );
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: detail.서비스명,
        description: detail.서비스목적,
        provider: { '@type': 'GovernmentOrganization', name: detail.소관기관명 },
        serviceType: detail.지원유형,
    };

    return (
        <article>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 뒤로가기 */}
            <nav style={{ marginBottom: '1rem' }}>
                <Link href="/" style={{
                    color: 'var(--color-text-secondary)', fontWeight: '700',
                    fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                }}>
                    ← 전체 목록
                </Link>
            </nav>

            {/* 헤더 */}
            <header style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: '1.5rem',
                marginBottom: '1.2rem',
            }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.7rem' }}>
                    <span style={{
                        backgroundColor: 'var(--color-primary-light)', color: '#1d4ed8',
                        padding: '0.2rem 0.6rem', borderRadius: '6px',
                        fontSize: '0.72rem', fontWeight: '700',
                    }}>
                        {detail.소관기관명}
                    </span>
                    {detail.지원유형 && (
                        <span style={{
                            backgroundColor: '#f0fdf4', color: '#15803d',
                            padding: '0.2rem 0.6rem', borderRadius: '6px',
                            fontSize: '0.72rem', fontWeight: '600',
                        }}>
                            {detail.지원유형}
                        </span>
                    )}
                    {detail.신청기한 && (
                        <span style={{
                            backgroundColor: '#fef3c7', color: '#92400e',
                            padding: '0.2rem 0.6rem', borderRadius: '6px',
                            fontSize: '0.72rem', fontWeight: '600',
                        }}>
                            {detail.신청기한}
                        </span>
                    )}
                </div>

                <h1 style={{
                    fontSize: '1.35rem', fontWeight: '900',
                    lineHeight: 1.35, letterSpacing: '-0.02em',
                    marginBottom: '0.6rem', color: 'var(--color-text)',
                }}>
                    {detail.서비스명}
                </h1>

                <p style={{
                    fontSize: '0.9rem', color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                }}>
                    {detail.서비스목적}
                </p>

                {detail.수정일시 && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.8rem' }}>
                        최종 수정: {detail.수정일시}
                    </p>
                )}
            </header>

            {/* CTA 버튼 */}
            {detail.온라인신청사이트URL && (
                <a
                    href={detail.온라인신청사이트URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        backgroundColor: 'var(--color-primary)', color: '#fff',
                        padding: '0.95rem', borderRadius: 'var(--radius-md)',
                        fontSize: '0.95rem', fontWeight: '800',
                        textDecoration: 'none', marginBottom: '1.2rem',
                        boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                    }}
                >
                    온라인 신청 바로가기
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                </a>
            )}

            {/* 상세 정보 섹션들 */}
            <InfoSection icon="🎯" title="지원 대상">
                <FormatText text={detail.지원대상} />
            </InfoSection>

            <InfoSection icon="📋" title="선정 기준">
                <FormatText text={detail.선정기준} />
            </InfoSection>

            <InfoSection icon="💰" title="지원 내용">
                <FormatText text={detail.지원내용} />
            </InfoSection>

            <InfoSection icon="📝" title="신청 방법">
                <FormatText text={detail.신청방법} />
            </InfoSection>

            <InfoSection icon="📎" title="구비 서류">
                <FormatText text={detail.구비서류} />
            </InfoSection>

            {detail.문의처 && (
                <InfoSection icon="📞" title="문의처">
                    <div>
                        {detail.문의처.split('||').map((contact, i) => (
                            <p key={i} style={{ marginBottom: i < detail.문의처.split('||').length - 1 ? '0.3rem' : 0 }}>
                                {contact.trim()}
                            </p>
                        ))}
                    </div>
                </InfoSection>
            )}

            {detail.접수기관명 && (
                <InfoSection icon="🏢" title="접수 기관">
                    <p>{detail.접수기관명}</p>
                </InfoSection>
            )}

            {(detail.법령 || detail.자치법규 || detail.행정규칙) && (
                <InfoSection icon="⚖️" title="관련 법령">
                    {detail.법령 && <p style={{ marginBottom: '0.3rem' }}><strong>법령:</strong> {detail.법령.replace(/\|\|/g, ', ')}</p>}
                    {detail.자치법규 && <p style={{ marginBottom: '0.3rem' }}><strong>자치법규:</strong> {detail.자치법규}</p>}
                    {detail.행정규칙 && <p><strong>행정규칙:</strong> {detail.행정규칙}</p>}
                </InfoSection>
            )}

            {/* 하단 CTA */}
            <div style={{
                marginTop: '1.5rem', padding: '1.5rem',
                backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)', textAlign: 'center',
            }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
                    위 정보는 공공데이터포털 정부24 API를 통해 제공됩니다.<br />
                    정확한 자격 확인은 공식 사이트에서 진행해주세요.
                </p>
                <Link href="/" style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--color-text)', color: '#fff',
                    padding: '0.7rem 1.5rem', borderRadius: '10px',
                    fontWeight: '700', fontSize: '0.85rem',
                }}>
                    ← 다른 보조금 검색하기
                </Link>
            </div>
        </article>
    );
}
