# World Kit - test-branch

A modern, customizable Svelte 5 starter kit with authentication and database integration, powered by SvelteKit and Supabase.

## Features

- 🚀 Built with Svelte 5 and SvelteKit 2
- 🔐 Authentication system using Supabase
- 💾 Database integration for storing user data
- 🎨 Tailwind CSS for styling with components from bits-ui
- 📱 Responsive design out of the box
- 🔧 TypeScript support for type safety
- 🧩 Customizable branding (name and logo)

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- pnpm (v8.14.3 or newer)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd world-kit

# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory with your Supabase credentials:

```
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Development

Start the development server:

```bash
pnpm dev

# or open it in a new browser tab automatically
pnpm dev -- --open
```

### Building for Production

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Project Structure

- `/src/routes` - SvelteKit routes
- `/src/lib` - Shared components and utilities
- `/src/lib/components/ui` - UI components

## Customization

1. Edit the homepage to change the default "WorldKit" name
2. Update styling in the Tailwind configuration
3. Modify the authentication flow in the `/auth` routes
4. Extend the database functionality in the `/dashboard` section

## Deployment

This project can be deployed to any platform that supports SvelteKit applications. For optimal performance with Supabase, consider using Vercel, Netlify, or Cloudflare Pages.

## License

[MIT](LICENSE)
