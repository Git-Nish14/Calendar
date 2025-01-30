import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function for global authentication check
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Retrieve the token from cookies

  // Check if the request is for a protected route
  if (!token && req.nextUrl.pathname.startsWith('/protected')) {
    // Redirect to the login page if the user is unauthorized
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Allow the request to proceed if authorized or if not a protected route
  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: ['/', '/protected/calendar'], // Define the routes to apply middleware to
};
