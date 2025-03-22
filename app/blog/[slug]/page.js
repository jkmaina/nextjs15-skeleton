import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

// Sample blog data (in a real app, this would come from a database or CMS)
const blogPosts = [
  {
    id: 1,
    title: 'Introduction to Next.js 15',
    slug: 'intro-nextjs-15',
    content: `
# Introduction to Next.js 15

Next.js 15 introduces several exciting features and improvements that enhance both developer experience and application performance.

## React 19 Support

Next.js 15 fully supports React 19, enabling you to use the latest React features including:

- New hooks like useActionState for managing form state
- Improved error handling and debugging
- Better hydration strategies

## Turbopack (Stable)

Turbopack is now stable in Next.js 15, offering significantly faster development experiences:

- Faster local server startup
- Quicker code refreshes
- Improved build times

## Improved Caching Semantics

Next.js 15 changes the default caching behavior:

- fetch requests, GET Route Handlers, and client navigations are no longer cached by default
- You can explicitly opt into caching when needed
- This provides more predictable behavior and easier debugging

## Partial Prerendering (Experimental)

This new feature allows parts of your page to be statically generated while others are dynamically rendered at request time, combining the benefits of both approaches.

## Async Request APIs

APIs like headers() and cookies() are now async by default, providing a more consistent programming model.
    `,
    date: '2025-03-15',
    author: 'Jane Doe',
    authorTitle: 'Web Developer',
    readTime: '5 min',
    category: 'Tutorial',
  },
  {
    id: 2,
    title: 'React 19 New Features',
    slug: 'react-19-features',
    content: `
# React 19 New Features

React 19 brings a host of new capabilities that make building applications easier and more efficient.

## New Hooks

React 19 introduces several new hooks:

- useActionState: Manage form state and submissions
- useFormStatus: Get the status of form submissions
- useOptimistic: Create optimistic UI updates

## Improved Server Components

React 19 enhances Server Components with:

- Better streaming capabilities
- Improved hydration
- More efficient data loading patterns

## React Compiler

The experimental React Compiler automatically optimizes your code by:

- Reducing the need for manual memoization
- Optimizing re-renders
- Improving performance without changing your code
    `,
    date: '2025-03-10',
    author: 'John Smith',
    authorTitle: 'Frontend Engineer',
    readTime: '8 min',
    category: 'Framework',
  },
  {
    id: 3,
    title: 'Optimizing with Turbopack',
    slug: 'turbopack-optimization',
    content: `
# Optimizing with Turbopack

Turbopack is a Rust-based successor to Webpack that dramatically improves build performance.

## Key Benefits

- **Incremental Computation**: Turbopack only rebuilds what's changed
- **Persistent Caching**: Caches build artifacts across sessions
- **Native Rust Implementation**: Much faster than JavaScript-based bundlers

## Using Turbopack in Next.js 15

Turbopack is now stable and enabled by default in Next.js 15, but you can also explicitly enable it:

\`\`\`bash
# Start dev server with Turbopack
npm run dev -- --turbo
\`\`\`

## Performance Improvements

In real-world applications, Turbopack can provide:

- Up to 10x faster local server startup
- Near-instant code updates during development
- Significantly reduced build times for large applications
    `,
    date: '2025-03-05',
    author: 'Alex Johnson',
    authorTitle: 'Performance Engineer',
    readTime: '6 min',
    category: 'Performance',
  },
];

// Generate static params for all blog posts
export async function generateStaticParams() {
  // This function doesn't need to be changed as it returns params rather than consuming them
  // but we're keeping it async for consistency with Next.js 15 patterns
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata generation based on the post
export async function generateMetadata({ params }) {
  // In Next.js 15, params needs to be awaited
  const resolvedParams = await params;
  const post = blogPosts.find((post) => post.slug === resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.content.substring(0, 160),
    openGraph: {
      title: `${post.title} | Next.js 15 Demo`,
      description: post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category, 'Next.js', 'React'],
    },
  };
}

// Related posts component with Suspense
function RelatedPosts({ currentSlug }) {
  // Get 2 random related posts (excluding current)
  const related = blogPosts
    .filter(post => post.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  
  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.map(post => (
          <div key={post.id} className="card">
            <h3 className="text-lg font-bold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{post.category}</span>
              <span>{post.readTime} read</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Blog post page component
export default async function BlogPost({ params }) {
  // In Next.js 15, params needs to be awaited
  const resolvedParams = await params;
  const post = blogPosts.find((post) => post.slug === resolvedParams.slug);
  
  // Show 404 page if post not found
  if (!post) {
    notFound();
  }
  
  // Convert markdown-like content to HTML (simplified for demo)
  const contentHtml = post.content
    .split('\n')
    .map(line => {
      if (line.startsWith('# ')) {
        return `<h1 class="text-3xl font-bold my-6">${line.substring(2)}</h1>`;
      } else if (line.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold my-5">${line.substring(3)}</h2>`;
      } else if (line.startsWith('- ')) {
        return `<li class="ml-6 list-disc my-1">${line.substring(2)}</li>`;
      } else if (line.startsWith('```')) {
        return line.includes('```bash') 
          ? '<pre class="bg-gray-800 text-white p-4 rounded my-4 overflow-x-auto">'
          : '</pre>';
      } else {
        return line ? `<p class="my-4">${line}</p>` : '';
      }
    })
    .join('');
  
  return (
    <article className="max-w-3xl mx-auto">
      {/* Post header */}
      <header className="mb-8">
        <Link 
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-gray-600">{post.authorTitle}</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime} read</span>
          </div>
        </div>
      </header>
      
      {/* Post content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      
      {/* Related posts with Suspense */}
      <Suspense fallback={<div className="mt-12 pt-8 border-t">Loading related posts...</div>}>
        <RelatedPosts currentSlug={resolvedParams.slug} />
      </Suspense>
    </article>
  );
}