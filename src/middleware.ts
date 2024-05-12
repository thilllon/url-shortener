import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { findOriginalUrl } from './app/lib';

export const config = {
  matcher: '/s/:path*',
};

export async function middleware(request: NextRequest) {
  try {
    if (!request.url.includes('/s/')) {
      return;
    }
    const url = await findOriginalUrl(request.url.split('/s/')[1]);
    if (url === null) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.redirect(url);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
