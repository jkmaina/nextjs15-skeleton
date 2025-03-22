import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { after } from 'next/server';

// In Next.js 15, GET requests are no longer cached by default
// You can explicitly opt into caching with the config options
export const dynamic = 'force-dynamic'; // This is the default now, but explicit for clarity

// GET handler
export async function GET(request) {
  // Use the new async Request APIs
  const cookieStore = await cookies();
  const hasVisited = cookieStore.has('visited');
  
  // Get search params from the URL
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'Guest';
  
  // Response with cookies
  const response = NextResponse.json({
    message: `Hello, ${name}!`,
    features: [
      'App Router',
      'React 19 Support',
      'Server Components',
      'Server Actions',
      'Improved Caching',
      'Turbopack'
    ],
    serverTime: new Date().toISOString(),
    hasVisited
  });
  
  // Set a cookie if first visit
  if (!hasVisited) {
    response.cookies.set('visited', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
  // Use the after() API to log analytics after the response is sent
  after(() => {
    console.log(`API request from ${name} at ${new Date().toISOString()}`);
    // In a real app, you might send this data to an analytics service
  });
  
  return response;
}

// POST handler
export async function POST(request) {
  try {
    // Parse the JSON body
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Process the data (in a real app, this might involve a database)
    const data = {
      id: Date.now(),
      name: body.name,
      email: body.email || null,
      createdAt: new Date().toISOString()
    };
    
    // Return the created resource
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// To use static caching for this route, you would uncomment the following:
// export const dynamic = 'force-static';
// export const revalidate = 3600; // Revalidate every hour