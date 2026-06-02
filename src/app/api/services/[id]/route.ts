import { NextRequest, NextResponse } from 'next/server';
import { getServiceDetail } from '@/lib/gov24';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');

    if (!serviceId) {
        return NextResponse.json({ error: 'serviceId 파라미터가 필요합니다.' }, { status: 400 });
    }

    try {
        const detail = await getServiceDetail(serviceId);
        return NextResponse.json({ currentCount: detail ? 1 : 0, totalCount: detail ? 1 : 0, data: detail ? [detail] : [] });
    } catch (error) {
        return NextResponse.json(
            { error: '서버 오류', detail: String(error) },
            { status: 500 }
        );
    }
}
