import Link from 'next/link';
import Image from 'next/image';

// Sample blog data (in a real app, this would come from a database or CMS)
const blogPosts = [
  {
    id: 1,
    title: 'Introduction to Next.js 15',
    slug: 'intro-nextjs-15',
    excerpt: 'Learn about the key features and improvements in Next.js 15, including React 19 support and more.',
    date: '2025-03-15',
    readTime: '5 min',
    category: 'Tutorial',
    thumbnail: '/images/nextjs15.png'
  },
  {
    id: 2,
    title: 'React 19 New Features',
    slug: 'react-19-features',
    excerpt: 'Explore the exciting new features in React 19, including improved hooks and optimizations.',
    date: '2025-03-10',
    readTime: '8 min',
    category: 'Framework',
    thumbnail: '/images/react19.png'
  },
  {
    id: 3,
    title: 'Optimizing with Turbopack',
    slug: 'turbopack-optimization',
    excerpt: 'Discover how Turbopack can significantly improve your development experience with faster builds.',
    date: '2025-03-05',
    readTime: '6 min',
    category: 'Performance',
    thumbnail: '/images/turbopack.png'
  },
  {
    id: 4,
    title: 'Server Components vs. Client Components',
    slug: 'server-vs-client-components',
    excerpt: 'Understand when to use Server Components and when to use Client Components in Next.js 15.',
    date: '2025-02-28',
    readTime: '7 min',
    category: 'Architecture',
    thumbnail: '/images/components.png'
  },
  {
    id: 5,
    title: 'Building Data-Intensive Applications',
    slug: 'data-intensive-apps',
    excerpt: 'Learn strategies for building high-performance data-intensive applications with Next.js 15.',
    date: '2025-02-20',
    readTime: '10 min',
    category: 'Advanced',
    thumbnail: '/images/data-apps.png'
  }
];

// Generate metadata for this page
export const metadata = {
  title: 'Blog',
  description: 'Explore articles about Next.js 15 features and modern web development',
  openGraph: {
    title: 'Blog | Next.js 15 Demo',
    description: 'Explore articles about Next.js 15 features and modern web development',
  },
};

// Blog page component
export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold mb-3">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore the latest articles about Next.js 15 features and modern web development
        </p>
      </header>
      
      {/* Featured post */}
      <section className="featured-post mb-12">
        <div className="card p-0 overflow-hidden">
          <div className="relative h-64 w-full">
            <div className="absolute w-full h-full bg-black opacity-50 z-10"></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-3">
                {blogPosts[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{blogPosts[0].title}</h2>
              <p className="mb-4">{blogPosts[0].excerpt}</p>
              <div className="flex items-center text-sm">
                <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{blogPosts[0].readTime} read</span>
              </div>
              <Link 
                href={`/blog/${blogPosts[0].slug}`}
                className="mt-4 inline-block bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
              >
                Read More
              </Link>
            </div>
            <div className="w-full h-full relative">
              {/* In a real app, use actual images */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog posts grid */}
      <section className="blog-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="card overflow-hidden h-full flex flex-col">
              <div className="relative h-48 w-full mb-4">
                {/* In a real app, use actual images */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700"></div>
              </div>
              <div className="flex-grow p-4">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
              </div>
              <div className="px-4 pb-4 mt-auto">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}