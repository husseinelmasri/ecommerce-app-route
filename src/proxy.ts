import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const cookieName =
    process.env.NODE_ENV == 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token';
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, cookieName });

  const isAuthPages = pathname == '/login' || pathname == '/register';

  if (token && isAuthPages) {
    return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/`));
  }

  if (!token && !isAuthPages) {
    return NextResponse.redirect(new URL(`${process.env.NEXTAUTH_URL}/login`));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/brands',
    '/cart',
    '/wishlist',
    '/login',
    '/register',
    '/allorders',
  ],
};
