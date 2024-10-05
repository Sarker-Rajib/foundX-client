import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './services/AuthService';

const AuthRoutes = ["/login", "/register"];

type TRole = keyof typeof RoleBasedRoutes;

const RoleBasedRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser()
  // console.log(user);

  // If the user is not authenticated
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
  }

  if (user?.role && RoleBasedRoutes[user?.role as TRole]) {
    const routes = RoleBasedRoutes[user?.role as TRole];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // If none of the conditions matched, redirect to the home page
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/login', '/register', '/admin', '/profile', '/profile/:page*'],
};

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// const AuthRoutes = ["/login", "/register"];

// type Role = keyof typeof roleBasedRoutes;

// const roleBasedRoutes = {
//   USER: [/^\/profile/],
//   ADMIN: [/^\/admin/],
// };

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   console.log(pathname);

//   //   const user = {
//   //     name: "Mir",
//   //     token: "adsf asda",
//   //     role: "ADMIN",
//   //   };

//   const user = undefined;

//   if (!user) {
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   if (user?.role && roleBasedRoutes[user?.role as Role]) {
//     const routes = roleBasedRoutes[user?.role as Role];

//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/profile", "/admin", "/login", "/register"],
// };