'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Policy {
    id: string;
    title: string;
    category: string;
    categorySlug: string;
    description: string;
    target: string;
    amount: string;
    application_url: string;
    date_posted: string;
}

interface Props {
    policies: Policy[];
    title: string;
    description: string;
}

export default function PolicyList({ policies, title, description }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPolicies = policies.filter(p => 
        p.title.includes(searchTerm) || 
        p.description.includes(searchTerm) || 
        p.category.includes(searchTerm)
    );

    return (
        <div>
            <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1f2937', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
                    {title}
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>
                    {description} ({filteredPolicies.length}건)
                </p>
            </header>

            {/* 검색창 영역 */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                    <input 
                        type="text" 
                        placeholder="지원금, 정책 이름, 키워드로 검색해 보세요" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1.5rem',
                            fontSize: '1rem',
                            borderRadius: '9999px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                            outline: 'none',
                            color: '#374151',
                            backgroundColor: '#ffffff',
                            transition: 'box-shadow 0.2s, border-color 0.2s',
                        }}
                    />
                    <div style={{ position: 'absolute', right: '1.2rem', top: '1rem', color: '#9ca3af' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                </div>
            </div>

            {/* 카드 리스트 */}
            {filteredPolicies.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af', fontSize: '1.1rem' }}>
                    검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                    {filteredPolicies.map((policy) => (
                        <article key={policy.id} style={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #f3f4f6', 
                            borderRadius: '16px', 
                            padding: '1.5rem', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <span style={{ 
                                    display: 'inline-block', 
                                    backgroundColor: '#eff6ff', 
                                    color: '#3b82f6', 
                                    padding: '0.3rem 0.8rem', 
                                    borderRadius: '9999px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: '700' 
                                }}>
                                    {policy.category}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '0', marginBottom: '0.75rem', color: '#111827', letterSpacing: '-0.01em', lineHeight: '1.3' }}>
                                <Link href={`/policy/${policy.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{policy.title}</Link>
                            </h3>
                            <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '1.2rem', flexGrow: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                {policy.description}
                            </p>
                            <Link href={`/policy/${policy.id}`} style={{ 
                                display: 'inline-block', 
                                color: '#3b82f6', 
                                fontWeight: '700', 
                                textDecoration: 'none', 
                                fontSize: '0.95rem',
                                borderTop: '1px solid #f3f4f6',
                                paddingTop: '1rem'
                            }}>
                                정책 자세히 확인하기 &rarr;
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
