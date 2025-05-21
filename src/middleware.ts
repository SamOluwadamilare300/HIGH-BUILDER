import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes that don't require authentication
const publicRoutes = ["/auth/sign-in", "/auth/sign-up", "/"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // Check if the request is for a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Get the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // If no token and trying to access a protected route
  if (!token) {
    // Redirect to sign-in page with return URL
    const signInUrl = new URL("/auth/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  // For dashboard routes, check role-based access
  if (pathname.startsWith("/dashboard/")) {
    const role = token.role as string;
    
    // If trying to access admin dashboard without admin role
    if (pathname === "/dashboard/admin" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }
    
    // If at the root, redirect to appropriate dashboard
    if (pathname === "/") {
      const dashboardPath = role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user";
      return NextResponse.redirect(new URL(dashboardPath, req.url));
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