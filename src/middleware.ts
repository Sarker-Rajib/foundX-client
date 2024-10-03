import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type TUser = {
  name: string;
  token: string;
  role: string;
};

const AuthRoutes = ["/login", "/register"];
const RoleBasedRoutes: Record<string, RegExp[]> = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Mock user for demonstration purposes
  const user: TUser | undefined = {
    name: "Rajib",
    token: "kjhfgiuyr",
    role: "USER",
  };

  // If the user is not authenticated
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Check if the user's role has any specific routes
  if (user.role && RoleBasedRoutes[user.role]) {
    const routes = RoleBasedRoutes[user.role];

    // Check if the current pathname matches any of the routes
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // If none of the conditions matched, redirect to the home page
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/admin', "/login", "/register", '/profile'],
};
