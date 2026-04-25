import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'caf4d345731b3817f2699b9fc49ec84c2fe3fadf5046e64706a0dbb024c6b326';
const BASE_URL = 'https://api.odcloud.kr/api/gov24/v3/serviceDetail';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');

    if (!serviceId) {
        return NextResponse.json({ error: 'serviceId 파라미터가 필요합니다.' }, { status: 400 });
    }

    const apiUrl = new URL(BASE_URL);
    apiUrl.searchParams.set('page', '1');
    apiUrl.searchParams.set('perPage', '1');
    apiUrl.searchParams.set('cond[서비스ID::EQ]', serviceId);

    try {
        const response = await fetch(apiUrl.toString(), {
            headers: { 'Authorization': `Infuser ${API_KEY}` },
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
            { error: '서버 오류', detail: String(error) },
            { status: 500 }
        );
    }
}
