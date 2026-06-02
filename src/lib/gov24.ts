import { cache } from 'react';

const DEFAULT_API_KEY = 'caf4d345731b3817f2699b9fc49ec84c2fe3fadf5046e64706a0dbb024c6b326';
const API_KEY = process.env.GOV24_API_KEY || DEFAULT_API_KEY;
const LIST_URL = 'https://api.odcloud.kr/api/gov24/v3/serviceList';
const DETAIL_URL = 'https://api.odcloud.kr/api/gov24/v3/serviceDetail';

export interface ServiceItem {
    서비스ID: string;
    서비스명: string;
    서비스목적요약: string;
    서비스분야: string;
    소관기관명: string;
    지원유형: string;
    상세조회URL: string;
    조회수: number;
    수정일시: string;
}

export interface ServiceDetail {
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
    상세조회URL: string;
    온라인신청사이트URL: string;
    소관기관명: string;
    수정일시: string;
    지원유형: string;
    법령: string;
    자치법규: string;
    행정규칙: string;
}

interface ApiListResponse<T> {
    currentCount: number;
    totalCount: number;
    data: T[];
}

function authHeaders() {
    return { Authorization: `Infuser ${API_KEY}` };
}

export async function getServices(page = 1, perPage = 20, search = ''): Promise<ApiListResponse<ServiceItem>> {
    const apiUrl = new URL(LIST_URL);
    apiUrl.searchParams.set('page', String(page));
    apiUrl.searchParams.set('perPage', String(perPage));

    if (search) {
        apiUrl.searchParams.set('cond[서비스명::LIKE]', search);
    }

    const response = await fetch(apiUrl.toString(), {
        headers: authHeaders(),
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

export const getServiceDetail = cache(async (serviceId: string): Promise<ServiceDetail | null> => {
    const apiUrl = new URL(DETAIL_URL);
    apiUrl.searchParams.set('page', '1');
    apiUrl.searchParams.set('perPage', '1');
    apiUrl.searchParams.set('cond[서비스ID::EQ]', serviceId);

    const response = await fetch(apiUrl.toString(), {
        headers: authHeaders(),
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = (await response.json()) as ApiListResponse<ServiceDetail>;
    return data.data?.[0] || null;
});

export function formatGovDate(raw: string): string {
    if (!raw) return '';
    const digits = raw.replace(/\D/g, '');
    if (digits.length < 8) return raw;
    return `${digits.substring(0, 4)}.${digits.substring(4, 6)}.${digits.substring(6, 8)}`;
}
