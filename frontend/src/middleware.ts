import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const loginPath = `${basePath}/login`;

  // Allow login page and Next.js internals
  if (pathname === loginPath || pathname.startsWith('/_next') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('agrotech-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
