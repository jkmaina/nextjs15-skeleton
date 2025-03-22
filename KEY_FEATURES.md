# Next.js 15 Key Features Explained

This document explains the key features of Next.js 15 that are demonstrated in our skeleton project.

## 1. React 19 Support

Next.js 15 fully supports React 19, enabling access to the latest React features:

### New Hooks

- **useActionState**: Demonstrated in the dashboard page for form state management
- **useFormStatus**: For tracking form submission state
- **useOptimistic**: For creating optimistic UI updates

### Server Components

- By default, all components in the App Router are Server Components
- Client Components are explicitly marked with the `'use client'` directive (see Header.js)
- Server Components can fetch data directly without client-side loading states

## 2. Async Request APIs

Next.js 15 has made request APIs like `headers()` and `cookies()` asynchronous:

```javascript
// Before Next.js 15
const headersList = headers();
const userAgent = headersList.get('user-agent');

// In Next.js 15
const headersList = await headers();
const userAgent = headersList.get('user-agent');
```

This is demonstrated in the middleware.js and dashboard layout.

## 3. after() API

The new `after()` API allows executing code after a response has finished streaming:

```javascript
import { after } from 'next/server';

export default function Component() {
  // This runs after the component is streamed to the client
  after(() => {
    console.log('Component rendered');
    // Perform analytics, logging, etc.
  });
  
  return <div>Content</div>;
}
```

This is demonstrated in the settings page and API route.

## 4. Improved Caching Semantics

Next.js 15 changes the default caching behavior:

- GET Route Handlers and fetch requests are no longer cached by default (demonstrated in API routes)
- You can opt into caching explicitly with:
  ```javascript
  export const dynamic = 'force-static';
  export const revalidate = 3600; // Revalidate every hour
  ```

## 5. Turbopack (Stable)

Next.js 15 includes a stable version of Turbopack for development:

- Faster local server startup
- Quicker code refreshes
- Configured automatically by adding the `--turbo` flag to the development script

## 6. Route Handlers

API Routes in Next.js 15 with improvements:

- Direct support for standard HTTP methods (GET, POST, etc.)
- Simpler response handling with NextResponse
- Easy co-location with page components

## 7. Server Actions

Form actions that run on the server:

```javascript
async function submitAction(formData) {
  'use server';
  
  // Server-side logic here
  return result;
}
```

This is demonstrated in the dashboard page and settings page.

## 8. App Router Architecture

The App Router provides a more intuitive routing system:

- File-based routing with special files:
  - `page.js`: Route UI
  - `layout.js`: Shared layouts
  - `loading.js`: Loading UI
  - `error.js`: Error handling
  - `not-found.js`: 404 pages
- Parallel routes and route interception
- Route groups for organization

## 9. Metadata API

Enhanced SEO and social media sharing:

```javascript
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    // Open Graph metadata
  }
};
```

This is demonstrated in the root layout and blog pages.

## 10. Partial Prerendering (Experimental)

This feature allows parts of a page to be statically generated while others are dynamically rendered at request time:

```javascript
export const dynamic = 'force-static';

export default function Page() {
  return (
    <>
      <StaticPart />
      <Suspense fallback={<Loading />}>
        <DynamicPart />
      </Suspense>
    </>
  );
}
```

The experimental configuration is included in next.config.js.

## 11. React Compiler (Experimental)

The React Compiler automatically optimizes React code:

```javascript
// next.config.js
module.exports = {
  experimental: {
    reactCompiler: {
      compilationMode: 'annotation',
    },
  }
};
```

This reduces the need for manual memoization with `useMemo` and `useCallback`.

## 12. Dynamic Routing

Advanced routing patterns:

- Dynamic segments with `[param]` syntax
- Catch-all routes with `[...param]` syntax
- Optional catch-all routes with `[[...param]]` syntax

## 13. Server-Side and Client-Side Data Fetching

Multiple data fetching strategies:

- Server Components can fetch data directly
- Route Handlers for API endpoints
- SWR for client-side data fetching with caching

## 14. Authentication and Authorization

Security patterns:

- Middleware for route protection
- Cookie-based authentication
- Protected routes with redirects

## 15. Image Optimization

The `next/image` component for automatic image optimization:

- Responsive images
- Automatic WebP/AVIF conversion
- Lazy loading
- Placeholder support

## 16. Styling Approaches

Multiple styling options:

- Global CSS
- CSS Modules
- Tailwind CSS integration
- CSS-in-JS (with various libraries)

These features are demonstrated throughout the skeleton project to provide a comprehensive reference for building Next.js 15 applications.