# Next.js 15 Skeleton Project

A comprehensive skeleton project that demonstrates the key features of Next.js 15 with React 19 support. Use this as a reference or starting point for your Next.js 15 applications.

## Features

- 🚀 App Router architecture
- ⚛️ React 19 support
- 🖥️ Server Components
- 🧩 Server Actions
- 📱 Responsive design with Tailwind CSS
- 🔄 Dynamic and static routing
- 📊 API routes with the new caching semantics
- 🔒 Authentication patterns
- 🏃‍♂️ Turbopack for faster development
- 📝 TypeScript support
- 🧪 Testing setup with Jest
- 🎨 Styling with Tailwind CSS and its plugins
- 📱 Mobile-first responsive design
- 🔍 SEO optimization with metadata API
- 🌐 Internationalization ready
- 🔄 Form handling with React 19 hooks

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/nextjs15-skeleton.git
cd nextjs15-skeleton

# Install dependencies
npm install

# Run the development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                         # App Router directory
│   ├── api/                     # API Routes
│   ├── blog/                    # Blog section with dynamic routes
│   ├── dashboard/               # Protected dashboard section
│   ├── error.js                 # Global error boundary
│   ├── favicon.ico              # Favicon
│   ├── globals.css              # Global CSS
│   ├── layout.js                # Root layout
│   ├── loading.js               # Global loading UI
│   ├── not-found.js             # 404 page
│   └── page.js                  # Home page
├── components/                  # Shared components
│   ├── layout/                  # Layout components
│   ├── ui/                      # UI components
│   └── hooks/                   # Custom hooks
├── lib/                         # Utility functions and shared code
├── middleware.js                # Next.js middleware
├── public/                      # Static assets
├── KEY_FEATURES.md              # Detailed explanation of Next.js 15 features
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

## Key Features Demonstrated

### App Router

The project uses Next.js 15's App Router for improved routing:

- File-based routing system
- Nested layouts with shared UI
- Loading and error states
- Dynamic routes with parameters

### React 19 Features

- Server Components by default
- Client Components with "use client" directive
- New hooks: useActionState, useFormStatus
- Progressive enhancement with JavaScript

### Data Fetching

- Server-side data fetching in Server Components
- Client-side data fetching with SWR
- Route handlers (API Routes)
- Server Actions for form handling

### Authentication

- Middleware for route protection
- Cookie-based authentication
- Protected dashboard routes
- Conditional UI based on auth state

### Styling

- Tailwind CSS with custom configuration
- Typography plugin for rich text styling
- Forms plugin for form element styling
- Global CSS variables and theming

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
# API Keys
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Authentication
AUTH_SECRET=your-secret-key
```

## Learn More

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SWR Documentation](https://swr.vercel.app)

## License

MIT