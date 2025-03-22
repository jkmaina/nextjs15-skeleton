import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Dashboard layout metadata
export const metadata = {
  title: {
    template: '%s | Dashboard',
    default: 'Dashboard',
  },
  description: 'Manage your account and settings',
};

// Dashboard menu items
const menuItems = [
  { name: 'Overview', path: '/dashboard' },
  { name: 'Profile', path: '/dashboard/profile' },
  { name: 'Settings', path: '/dashboard/settings' },
];

// Dashboard layout component with authentication check
export default async function DashboardLayout({ children }) {
  // Check for authentication
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  
  // Redirect to login if not authenticated
  // In a real app, you would validate the token
  if (!token) {
    redirect('/api/auth/login?callbackUrl=/dashboard');
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="md:col-span-1">
        <div className="sticky top-20 card">
          <h2 className="text-lg font-bold mb-4">Dashboard</h2>
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="block px-4 py-2 rounded hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="border-t my-2 pt-2">
                <Link
                  href="/api/auth/logout"
                  className="block px-4 py-2 rounded text-red-600 hover:bg-red-50"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="md:col-span-3">
        {children}
      </div>
    </div>
  );
}