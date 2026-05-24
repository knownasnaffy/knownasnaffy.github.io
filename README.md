# Personal Blog & Portfolio

A modern full-stack blog and portfolio website built with Next.js 16, Payload CMS, and TypeScript. Features a clean design with syntax highlighting, expandable code blocks, and responsive layout.

## Features

- 📝 **Blog System** - Full-featured blog with rich text editor
- 💼 **Portfolio Section** - Showcase projects, skills, and experience
- 🎨 **Syntax Highlighting** - Beautiful code blocks with Shiki
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Performance** - Built with Next.js 16 and optimized for speed
- 🔧 **CMS Integration** - Easy content management with Payload CMS
- 🌙 **Dark Mode** - Built-in dark theme (only supported theme)

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **CMS**: Payload CMS 3.x
- **Database**: MongoDB
- **Styling**: Tailwind CSS with custom components from shadcn/ui
- **Syntax Highlighting**: Shiki
- **Icons**: Lucide React
- **Storage**: Vercel Blob (for media)

## Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/knownasnaffy/blog
   cd blog
   bun install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your MongoDB URI and other required environment variables.

3. **Start development server**
   ```bash
   bun dev
   ```

4. **Open in browser**
   Visit `http://localhost:3000` and follow the setup instructions to create your admin user.

## Environment Variables

```env
PAYLOAD_SECRET=your-secret-key
DATABASE_URI=mongodb://127.0.0.1/blog
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Development

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server

## Project Structure

```
src/
├── app/(frontend)/          # Frontend pages and components
│   ├── blog/               # Blog pages
│   ├── components/         # Reusable components
│   └── styles.css         # Global styles
├── components/             # Shared components
├── lib/                   # Utilities and converters
└── payload.config.ts      # Payload CMS configuration
```

## License

[The Unlicense](./LICENSE). Do whatever you want with it.
