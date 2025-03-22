import { NextResponse } from 'next/server';

// Middleware function runs on every request
export default async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Example: Handle authentication
  if (pathname.startsWith('/dashboard')) {
    // Check for authentication token
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      // Redirect to login if no token is found
      return NextResponse.redirect(new URL('/login?from=' + pathname, request.url));
    }
    
    // You could verify JWT token here
    // For real apps, consider using a proper auth library
    try {
      // Simulate token verification
      if (token !== 'valid-token-example') {
        throw new Error('Invalid token');
      }
      
      // Continue if token is valid
      return NextResponse.next();
    } catch (error) {
      // Redirect on invalid token
      return NextResponse.redirect(new URL('/login?error=invalid_token', request.url));
    }
  }
  
  // Example: Add headers to all responses
  const response = NextResponse.next();
  response.headers.set('x-app-version', process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0');
  
  // Example: A/B testing - add a random test group
  if (pathname === '/' && !request.cookies.has('test-group')) {
    const response = NextResponse.next();
    response.cookies.set('test-group', Math.random() > 0.5 ? 'A' : 'B', {
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }
  
  // Example: Rate limiting
  // In production, use a proper rate limiting solution
  if (pathname.startsWith('/api/')) {
    // Get the IP address
    // In Next.js 15+, you'd use a solution like @vercel/functions
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // In a real app, you'd check a distributed cache/store for rate limits
    // This is just a demonstration
    const rateLimit = Math.random() > 0.95; // 5% chance to be rate limited
    
    if (rateLimit) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }
  }
  
  return response;
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    // Apply to all routes except for
    // - Files in the public directory
    // - API routes with the /_next prefix
    // - Static files with extensions
    '/((?!_next/static|_next/image|favicon.ico|public/|api/health).*)',
  ],
};