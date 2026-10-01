import { NextResponse } from 'next/server';

// 복지 정보 사이트 시절의 주소는 되돌아오지 않으므로 404 대신 410(Gone)으로 응답한다.
export function proxy() {
  return new NextResponse('이 페이지는 영구적으로 삭제되었습니다.', {
    status: 410,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-robots-tag': 'noindex',
    },
  });
}

export const config = {
  matcher: [
    '/policy/:path*',
    '/service/:path*',
    '/guide/:path*',
    '/category/:path*',
    '/search',
    '/income-check',
    '/rejection-reasons',
    '/duplicate-support',
    '/application-documents',
    '/api/:path*',
  ],
};
