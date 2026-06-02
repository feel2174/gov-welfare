import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { formatGovDate, getServiceDetail } from '@/lib/gov24';
import { SITE_URL, SITE_NAME } from '@/lib/site';

interface Props {
    params: Promise<{ id: string }>;
}

function cleanText(text: string | null | undefined) {
    return (text || '').replace(/\\r\\n|\\r|\\n/g, '\n').trim();
}

function FormatText({ text }: { text: string | null | undefined }) {
    const value = cleanText(text);
    if (!value) return <span style={{ color: 'var(--color-text-muted)' }}>공공데이터에 세부 정보가 등록되지 않았습니다.</span>;

    return (
        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>
            {value.split('\n').map((line, index, lines) => (
                <span key={`${line}-${index}`}>
                    {line}
                    {index < lines.length - 1 && <br />}
                </span>
            ))}
        </div>
    );
}

function InfoSection({ title, children }: { title: string; children: ReactNode }) {
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
                color: 'var(--color-text)',
                margin: 0,
            }}>
                {title}
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    try {
        const detail = await getServiceDetail(id);
        if (!detail) return { title: '공공서비스 정보를 찾을 수 없습니다.' };

        const description = cleanText(detail.서비스목적 || detail.지원내용).slice(0, 150);

        return {
            title: detail.서비스명,
            description,
            robots: {
                index: false,
                follow: true,
            },
            openGraph: {
                title: detail.서비스명,
                description,
                type: 'article',
                url: `${SITE_URL}/service/${id}`,
                siteName: SITE_NAME,
            },
            alternates: {
                canonical: `${SITE_URL}/service/${id}`,
            },
        };
    } catch {
        return {
            title: '공공서비스 정보',
            description: '정부24 공공데이터 기반 복지 서비스 상세 정보입니다.',
            robots: {
                index: false,
                follow: true,
            },
        };
    }
}

export default async function ServiceDetailPage({ params }: Props) {
    const { id } = await params;
    const detail = await getServiceDetail(id);

    if (!detail) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: detail.서비스명,
        description: cleanText(detail.서비스목적),
        provider: { '@type': 'GovernmentOrganization', name: detail.소관기관명 },
        serviceType: detail.지원유형,
        areaServed: 'KR',
        url: `${SITE_URL}/service/${id}`,
    };

    const sourceUrl = detail.상세조회URL || detail.온라인신청사이트URL;

    return (
        <article>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <nav style={{ marginBottom: '1rem' }}>
                <Link href="/" style={{
                    color: 'var(--color-text-secondary)', fontWeight: '700',
                    fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                }}>
                    ← 전체 목록
                </Link>
            </nav>

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
                        {detail.소관기관명 || '소관기관 정보 없음'}
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
                    {cleanText(detail.서비스목적) || '정부24 공공데이터에서 제공하는 공공서비스 상세 정보입니다.'}
                </p>

                <div style={{ marginTop: '1rem', padding: '0.9rem 1rem', backgroundColor: '#f8fafc', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                        데이터 출처: 공공데이터포털 정부24 공공서비스 API
                        {detail.수정일시 && <> · 공공데이터 수정일: {formatGovDate(detail.수정일시)}</>}
                        <br />
                        이 API 상세 페이지는 검색 보조용 참고 정보입니다. 자격과 신청 가능 여부는 소관기관의 최신 공고와 공식 신청 화면에서 다시 확인해 주세요.
                    </p>
                </div>
            </header>

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
                    공식 신청 화면 열기
                </a>
            )}

            <InfoSection title="지원 대상">
                <FormatText text={detail.지원대상} />
            </InfoSection>

            <InfoSection title="선정 기준">
                <FormatText text={detail.선정기준} />
            </InfoSection>

            <InfoSection title="지원 내용">
                <FormatText text={detail.지원내용} />
            </InfoSection>

            <InfoSection title="신청 방법">
                <FormatText text={detail.신청방법} />
            </InfoSection>

            <InfoSection title="신청 기한">
                <FormatText text={detail.신청기한} />
            </InfoSection>

            <InfoSection title="구비 서류">
                <FormatText text={detail.구비서류} />
            </InfoSection>

            {detail.문의처 && (
                <InfoSection title="문의처">
                    <div>
                        {detail.문의처.split('||').map((contact, index) => (
                            <p key={`${contact}-${index}`} style={{ marginBottom: index < detail.문의처.split('||').length - 1 ? '0.3rem' : 0 }}>
                                {contact.trim()}
                            </p>
                        ))}
                    </div>
                </InfoSection>
            )}

            {detail.접수기관명 && (
                <InfoSection title="접수 기관">
                    <p>{detail.접수기관명}</p>
                </InfoSection>
            )}

            {(detail.법령 || detail.자치법규 || detail.행정규칙) && (
                <InfoSection title="관련 법령 및 규정">
                    {detail.법령 && <p style={{ marginBottom: '0.3rem' }}><strong>법령:</strong> {detail.법령.replace(/\|\|/g, ', ')}</p>}
                    {detail.자치법규 && <p style={{ marginBottom: '0.3rem' }}><strong>자치법규:</strong> {detail.자치법규}</p>}
                    {detail.행정규칙 && <p><strong>행정규칙:</strong> {detail.행정규칙}</p>}
                </InfoSection>
            )}

            <div style={{
                marginTop: '1.5rem', padding: '1.5rem',
                backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
            }}>
                <h2 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.6rem' }}>공식 정보 확인</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: sourceUrl ? '1rem' : 0, lineHeight: 1.7 }}>
                    이 페이지는 공공데이터 API를 읽기 쉽게 정리한 참고용 정보입니다. 실제 신청, 자격 심사, 제출 서류는 소관기관의 공식 안내가 우선합니다.
                </p>
                {sourceUrl && (
                    <a href={sourceUrl} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-block',
                        backgroundColor: 'var(--color-text)', color: '#fff',
                        padding: '0.7rem 1.2rem', borderRadius: '10px',
                        fontWeight: '700', fontSize: '0.85rem',
                    }}>
                        공식 안내 확인하기
                    </a>
                )}
            </div>
        </article>
    );
}
