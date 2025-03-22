import Link from 'next/link';

export const metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to Next.js 15
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explore the latest features and capabilities of Next.js 15 with this demo project.
          Built with React 19 and the App Router.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/blog" className="btn btn-primary">
            Explore Blog
          </Link>
          <Link href="/dashboard" className="btn btn-secondary">
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3">App Router</h3>
            <p className="text-gray-600 mb-4">
              Next.js 15 introduces an improved App Router with enhanced layouts, loading states, and error handling.
            </p>
            <Link href="/blog/app-router-guide" className="text-blue-600 hover:underline">
              Learn more →
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3">React 19 Support</h3>
            <p className="text-gray-600 mb-4">
              Take advantage of the latest React features including Server Components and improved hooks.
            </p>
            <Link href="/blog/react-19-features" className="text-blue-600 hover:underline">
              Learn more →
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="card">
            <h3 className="text-xl font-semibold mb-3">Partial Prerendering</h3>
            <p className="text-gray-600 mb-4">
              Combine static and dynamic content in the same page for optimal performance and freshness.
            </p>
            <Link href="/blog/partial-prerendering" className="text-blue-600 hover:underline">
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to build with Next.js 15?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get started with this template and explore all the features Next.js 15 has to offer.
        </p>
        <a 
          href="https://github.com/vercel/next.js" 
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}