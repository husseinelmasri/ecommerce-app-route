import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

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
