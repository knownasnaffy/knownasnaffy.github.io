<img width="1630" height="933" alt="Blog" src="https://github.com/user-attachments/assets/8cd97fc0-5e8d-4ae8-804f-de9f5b04d9df" />

# Devosfera

This is a personal blog project based on the AstroPaper theme, featuring a heavy Terminal/Cyberpunk aesthetic.

This project was forked from [0xdres/astro-devosfera](https://github.com/0xdres/astro-devosfera) (MIT license) and has been modified to be written in English, along with several other features and refinements I was interested in.

## Features

- **Astro 5.0** - High-performance static site generation.
- **Markdown & MDX** - Write your content in your preferred format.
- **Cyberpunk Aesthetic** - Custom terminal-inspired design with aurora effects and glassmorphism.
- **Global Search** - Fast, static search powered by Pagefind.
- **Image Galleries** - Built-in support for image collections and lightboxes.
- **SEO Ready** - Sitemap, RSS, and dynamically generated OG images.

## Quick Start

Ensure you have [Bun](https://bun.sh/) installed. Or use `npm` or equivalent if you want to use Node.js.

```bash
# 1. Install dependencies
bun install

# 2. Start the development server
bun run dev
```

The search index is generated during the build process. To test search locally, run:

```bash
bun run build && bun run preview
```

## Customization

- **Posts**: Add .md or .mdx files to `src/data/blog/`.
- **Galleries**: Create a folder in `src/data/galleries/` with an `index.md` and your images.
- **Journey**: Add milestones to `src/data/journey/`.
- **Skills**: Update your skill set and experience in `src/data/home/skills.ts`.

## License

This project is licensed under the MIT License. It is based on AstroPaper by Sat Naing and the Devosfera fork by Andrés.
