import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Load Inter font with specific subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata for SEO
export const metadata = {
  title: {
    template: '%s | Next.js 15 Demo',
    default: 'Next.js 15 Demo - Exploring New Features',
  },
  description: 'A demonstration of Next.js 15 features and capabilities.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'Next.js 15 Demo',
    description: 'Exploring the new features of Next.js 15',
    url: 'https://example.com',
    siteName: 'Next.js 15 Demo',
    images: [
      {
        url: 'https://example.com/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Viewport configuration
export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Root layout (wraps all pages)
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}