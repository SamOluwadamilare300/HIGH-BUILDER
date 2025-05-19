import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the Role enum inline to avoid importing from Prisma in middleware (Edge runtime)
enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // Public routes (accessible without authentication)
  const publicRoutes = [
    "/",
    "/auth/sign-in",
    "/auth/sign-up"
  ];

  // If the user is not authenticated and trying to access a protected route
  if (!token && !publicRoutes.includes(pathname)) {
    // Redirect to sign-in page
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  // If the user is authenticated
  if (token) {
    const role = token.role as Role;
    
    // Redirect from auth pages if already logged in
    if (pathname.startsWith("/auth/")) {
      return NextResponse.redirect(new URL(
        role === Role.ADMIN ? "/dashboard/admin" : "/dashboard/user", 
        req.url
      ));
    }

    // Check role-specific access
    if (pathname === "/dashboard/admin" && role !== Role.ADMIN) {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    // Redirect from home page based on role if user is authenticated
    if (pathname === "/") {
      if (role === Role.ADMIN) {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      } else {
        return NextResponse.redirect(new URL("/dashboard/user", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Auth.js authentication routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}; 