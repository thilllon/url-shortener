import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { findOriginalUrl } from './app/lib';

const delimiter = '/s/';

export const config = {
  matcher: '/s/:path*',
};

export async function middleware(request: NextRequest) {
  try {
    if (!request.url.includes(delimiter)) {
      return;
    }
    const url = await findOriginalUrl(request.url.split(delimiter)[1]);
    if (url === null) {
      return NextResponse.next();
    }
    return NextResponse.redirect(url);
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
