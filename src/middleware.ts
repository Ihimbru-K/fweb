import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

type UserRole =
  | 'CUSTOMER' | 'MERCHANT' | 'STAFF' | 'CASHIER' | 'DRIVER' | 'ADMIN' | 'SUPER_ADMIN';

interface JwtPayload {
  role: UserRole;
  exp: number;
}

// Route group -> allowed roles (Doc 02, s.7)
const ROUTE_GROUP_ROLES: Record<string, UserRole[]> = {
  admin: ['ADMIN', 'SUPER_ADMIN'],
  merchant: ['MERCHANT', 'STAFF'],
  cashier: ['CASHIER'],
  customer: ['CUSTOMER'],
};

function matchRouteGroup(pathname: string): string | null {
  // NOTE: route groups are folder conventions and do not appear in the URL.
  // Map real path prefixes to their logical group here as routes are built.
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.startsWith('/merchant')) return 'merchant';
  if (pathname.startsWith('/cashier')) return 'cashier';
  if (pathname.startsWith('/customer')) return 'customer';
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const group = matchRouteGroup(pathname);

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline';"
  );

  if (!group) return response;

  const token = request.cookies.get('flexmot_token')?.value;

  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = jwtDecode<JwtPayload>(token);
    const allowedRoles = ROUTE_GROUP_ROLES[group];

    if (!allowedRoles.includes(payload.role)) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/merchant/:path*', '/cashier/:path*', '/customer/:path*'],
};
