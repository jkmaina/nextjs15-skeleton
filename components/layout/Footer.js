import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-600">
              This demo showcases the latest features of Next.js 15 and React 19.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                  Next.js Docs
                </a>
              </li>
              <li>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                  React Docs
                </a>
              </li>
              <li>
                <a href="https://github.com/vercel/next.js" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600">Have questions about Next.js 15?</p>
            <p className="text-gray-600">
              <a href="mailto:example@example.com" className="text-blue-600 hover:underline">
                example@example.com
              </a>
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Next.js 15 Demo. All rights reserved.</p>
          <p className="mt-2">
            Built with{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Next.js 15
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}