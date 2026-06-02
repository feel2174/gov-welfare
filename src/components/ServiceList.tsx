'use client';

/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

interface ServiceItem {
    '\uC11C\uBE44\uC2A4ID': string;
    '\uC11C\uBE44\uC2A4\uBA85': string;
    '\uC11C\uBE44\uC2A4\uBAA9\uC801\uC694\uC57D': string;
    '\uC11C\uBE44\uC2A4\uBD84\uC57C': string;
    '\uC18C\uAD00\uAE30\uAD00\uBA85': string;
    '\uC9C0\uC6D0\uC720\uD615': string;
    '\uC0C1\uC138\uC870\uD68CURL': string;
    '\uC870\uD68C\uC218': number;
    '\uC218\uC815\uC77C\uC2DC': string;
}

interface ApiResponse {
    currentCount: number;
    totalCount: number;
    data: ServiceItem[];
}

function getFieldEmoji(field: string): string {
    if (!field) return '\uD83D\uDCCB';
    if (field.includes('\uBCF4\uC721') || field.includes('\uAD50\uC721')) return '\uD83D\uDCDA';
    if (field.includes('\uC8FC\uAC70') || field.includes('\uC790\uB9BD')) return '\uD83C\uDFE0';
    if (field.includes('\uBCF4\uAC74') || field.includes('\uC758\uB8CC')) return '\uD83D\uDC8A';
    if (field.includes('\uACE0\uC6A9') || field.includes('\uCC3D\uC5C5')) return '\uD83D\uDCBC';
    if (field.includes('\uBB38\uD654') || field.includes('\uC0DD\uD65C')) return '\uD83C\uDFA8';
    if (field.includes('\uC548\uC804') || field.includes('\uD53C\uD574')) return '\uD83D\uDEE1\uFE0F';
    if (field.includes('\uC784\uC0B0') || field.includes('\uCD9C\uC0B0')) return '\uD83C\uDF7C';
    if (field.includes('\uAE08\uC735')) return '\uD83D\uDCB0';
    if (field.includes('\uD589\uC815')) return '\u2699\uFE0F';
    return '\uD83D\uDCCB';
}

function formatDate(raw: string): string {
    if (!raw || raw.length < 8) return '';
    return `${raw.substring(0, 4)}.${raw.substring(4, 6)}.${raw.substring(6, 8)}`;
}

export default function ServiceList() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [initialLoad, setInitialLoad] = useState(true);
    const [error, setError] = useState('');
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const perPage = 20;

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    useEffect(() => {
        setServices([]);
        setPage(1);
        setHasMore(true);
        setInitialLoad(true);
        setError('');
    }, [debouncedSearch]);

    const fetchServices = useCallback(async (pageNum: number, searchTerm: string, isNew: boolean) => {
        if (loading) return;
        setLoading(true);
        setError('');
        try {
            const params = new URLSearchParams({ page: String(pageNum), perPage: String(perPage) });
            if (searchTerm) params.set('search', searchTerm);
            const res = await fetch(`/api/services?${params}`);
            if (!res.ok) throw new Error('API error');
            const json: ApiResponse = await res.json();
            setTotalCount(json.totalCount || 0);
            const newData = json.data || [];
            if (isNew) {
                setServices(newData);
                setHasMore(newData.length < (json.totalCount || 0));
            } else {
                setServices(prev => {
                    const merged = [...prev, ...newData];
                    setHasMore(merged.length < (json.totalCount || 0));
                    return merged;
                });
            }
            setInitialLoad(false);
        } catch {
            setError('\uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.');
            setInitialLoad(false);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        if (initialLoad) fetchServices(1, debouncedSearch, true);
    }, [initialLoad, debouncedSearch]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading && !initialLoad) {
                    const next = page + 1;
                    setPage(next);
                    fetchServices(next, debouncedSearch, false);
                }
            },
            { threshold: 0.1 }
        );
        if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);
        return () => observerRef.current?.disconnect();
    }, [hasMore, loading, page, debouncedSearch, initialLoad]);

    return (
        <section>
            <div style={{ background: '#1f2937', borderRadius: 'var(--radius-lg)', padding: '2.2rem 1.5rem 2rem', marginBottom: '1.5rem', color: '#fff' }}>
                <div>
                    <p style={{ fontSize: '0.72rem', fontWeight: '700', opacity: 0.8, marginBottom: '0.3rem', letterSpacing: '0.08em' }}>{'\uC815\uBD8024 \uACF5\uACF5\uC11C\uBE44\uC2A4 API \uAE30\uBC18'}</p>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.4rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>{'\uACF5\uACF5\uC11C\uBE44\uC2A4 \uCC38\uACE0 \uAC80\uC0C9'}</h1>
                    <p style={{ fontSize: '0.88rem', opacity: 0.85, marginBottom: '1.3rem' }}>
                        {'\uC804\uAD6D'} {totalCount > 0 ? totalCount.toLocaleString() + '\uAC74' : '...'} {'\uACF5\uACF5\uC11C\uBE44\uC2A4 \uCC38\uACE0 \uAC80\uC0C9'}
                    </p>
                    <div style={{ position: 'relative' }}>
                        <input type="text" placeholder={'\uC11C\uBE44\uC2A4\uBA85 \uAC80\uC0C9 (\uC608: \uCCAD\uB144, \uCD9C\uC0B0, \uC7A5\uB824\uAE08)'} value={search} onChange={e => setSearch(e.target.value)} aria-label={'\uACF5\uACF5\uC11C\uBE44\uC2A4 \uCC38\uACE0 \uAC80\uC0C9'} style={{ width: '100%', boxSizing: 'border-box', padding: '0.95rem 2.8rem 0.95rem 1.2rem', fontSize: '0.92rem', fontWeight: '500', borderRadius: '12px', border: 'none', backgroundColor: 'rgba(255,255,255,0.95)', color: '#1f2937', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', outline: 'none' }} />
                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.1rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                <span>
                    {debouncedSearch
                        ? <>&ldquo;<strong style={{ color: 'var(--color-primary)' }}>{debouncedSearch}</strong>&rdquo; {'\uAC80\uC0C9'} &mdash; <strong style={{ color: 'var(--color-text)' }}>{totalCount.toLocaleString()}</strong>{'\uAC74'}</>
                        : <>{'\uC804\uCCB4 \uACF5\uACF5\uC11C\uBE44\uC2A4'} <strong style={{ color: 'var(--color-text)' }}>{totalCount.toLocaleString()}</strong>{'\uAC74'}</>
                    }
                </span>
                <span>{services.length.toLocaleString()}{'\uAC74 \uD45C\uC2DC'}</span>
            </div>

            {error && (<div style={{ padding: '1.2rem', borderRadius: 'var(--radius-sm)', backgroundColor: '#fef2f2', color: '#dc2626', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>{error}</div>)}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {services.map((svc, idx) => (
                    <Link key={`${svc['\uC11C\uBE44\uC2A4ID']}-${idx}`} href={`/service/${svc['\uC11C\uBE44\uC2A4ID']}`} className="svc-card" style={{ display: 'block', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.2rem 1.3rem', textDecoration: 'none', transition: 'transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s', position: 'relative' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', backgroundColor: 'var(--color-primary-light)', color: '#1d4ed8', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700' }}>
                                {getFieldEmoji(svc['\uC11C\uBE44\uC2A4\uBD84\uC57C'])} {svc['\uC11C\uBE44\uC2A4\uBD84\uC57C']}
                            </span>
                            <span style={{ backgroundColor: '#f5f3ff', color: '#6d28d9', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '600' }}>
                                {svc['\uC18C\uAD00\uAE30\uAD00\uBA85']}
                            </span>
                            {svc['\uC9C0\uC6D0\uC720\uD615'] && (<span style={{ backgroundColor: '#f0fdf4', color: '#15803d', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '600' }}>{svc['\uC9C0\uC6D0\uC720\uD615']}</span>)}
                        </div>
                        <h3 style={{ fontSize: '1.02rem', fontWeight: '800', color: 'var(--color-text)', lineHeight: 1.4, marginBottom: '0.35rem', letterSpacing: '-0.01em' }}>{svc['\uC11C\uBE44\uC2A4\uBA85']}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.6rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{svc['\uC11C\uBE44\uC2A4\uBAA9\uC801\uC694\uC57D']}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.73rem', color: 'var(--color-text-muted)' }}>
                            <span style={{ display: 'flex', gap: '0.8rem' }}>
                                {svc['\uC870\uD68C\uC218'] > 0 && <span>{'\uD83D\uDC41'} {svc['\uC870\uD68C\uC218'].toLocaleString()}</span>}
                                {svc['\uC218\uC815\uC77C\uC2DC'] && <span>{formatDate(svc['\uC218\uC815\uC77C\uC2DC'])}</span>}
                            </span>
                            <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.78rem' }}>{'\uC790\uC138\uD788 \u2192'}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {loading && (<div style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem 0' }}><div className="spinner" /></div>)}
            <div ref={sentinelRef} style={{ height: '1px' }} />
            {!loading && !initialLoad && services.length === 0 && !error && (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--color-text-muted)' }}>
                    <p style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{'\uD83D\uDD0D'}</p>
                    <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-secondary)' }}>{'\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.'}</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>{'\uB2E4\uB978 \uD0A4\uC6CC\uB4DC\uB85C \uAC80\uC0C9\uD574 \uBCF4\uC138\uC694.'}</p>
                </div>
            )}
            {!hasMore && services.length > 0 && (
                <p style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-text-muted)', fontSize: '0.82rem', fontWeight: '600' }}>
                    {'\u2728 \uC804\uCCB4'} {services.length.toLocaleString()}{'\uAC74 \uB85C\uB4DC \uC644\uB8CC'}
                </p>
            )}
            <style dangerouslySetInnerHTML={{ __html: `.svc-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(0,0,0,0.08); border-color: var(--color-border-hover) !important; } .svc-card:active { transform: scale(0.99); } .spinner { width: 32px; height: 32px; border: 3px solid #e5e7eb; border-top-color: var(--color-primary); border-radius: 50%; animation: spin 0.7s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }` }} />
        </section>
    );
}
