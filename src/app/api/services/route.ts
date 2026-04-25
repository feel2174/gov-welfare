import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'caf4d345731b3817f2699b9fc49ec84c2fe3fadf5046e64706a0dbb024c6b326';
const BASE_URL = 'https://api.odcloud.kr/api/gov24/v3/serviceList';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '20';
    const search = searchParams.get('search') || '';

    let apiUrl = `${BASE_URL}?page=${page}&perPage=${perPage}`;

    if (search) {
        apiUrl += `&cond[서비스명::LIKE]=${encodeURIComponent(search)}`;
    }

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Infuser ${API_KEY}`,
            },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: 'API 호출 실패', detail: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.', detail: String(error) },
            { status: 500 }
        );
    }
}
