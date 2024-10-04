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

type TRole = keyof typeof RoleBasedRoutes

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
  if (user?.role && RoleBasedRoutes[user?.role]) {
    const routes = RoleBasedRoutes[user?.role];

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