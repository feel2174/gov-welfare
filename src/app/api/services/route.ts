import { NextRequest, NextResponse } from 'next/server';
import { getServices } from '@/lib/gov24';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || '1');
    const perPage = Number(searchParams.get('perPage') || '20');
    const search = searchParams.get('search') || '';

    try {
        const data = await getServices(page, perPage, search);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.', detail: String(error) },
            { status: 500 }
        );
    }
}
