# Personal Website

Ultra-minimal, professional personal website built with SvelteKit. Features a clean typography-focused design with dark/light theme support.

## 🎯 Features

### 📄 **Pages**

- **Homepage** - Professional introduction with key interests and contact info
- **Posts** - Markdown blog with frontmatter support and clean typography
- **Garage** - Development tools and utilities

### 🔧 **Tools**

- **JSON Viewer** - Parse JSON, format output, and extract TypeScript interfaces
  - Real-time JSON validation and formatting
  - TypeScript type generation from JSON structure
  - Search functionality with highlighting
  - Copy to clipboard support

### 🎨 **Design**

- **Ultra-minimal** aesthetic with professional typography
- **Three-font system**: Crimson Text (serif), Inter (sans-serif), JetBrains Mono (monospace)
- **Fully accessible** with WCAG 2.1 AA compliance
- **Responsive design** optimized for all devices
- **Dark/light theme** with system preference detection

### 📝 **Content**

- **Markdown blog** with YAML frontmatter
- **Automatic post parsing** and metadata extraction
- **Tag support** and date-based sorting
- **SEO optimized** with proper meta tags

## 🛠️ Tech Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: CSS with custom properties
- **Fonts**: Google Fonts (Inter, Crimson Text, JetBrains Mono)
- **Markdown**: gray-matter + marked
- **Package Manager**: Bun
- **Deployment**: Static adapter ready

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📁 Project Structure

```
src/
├── routes/
│   ├── +layout.svelte          # Global layout with theme toggle
│   ├── +page.svelte             # Homepage
│   ├── posts/
│   │   ├── +page.svelte         # Posts listing
│   │   ├── +page.server.ts      # Posts data loading
│   │   └── [slug]/              # Individual post pages
│   └── garage/
│       ├── +page.svelte         # Tools listing
│       └── json-viewer/         # JSON viewer tool
├── lib/
│   ├── posts.ts                 # Markdown post utilities
│   └── stores/
│       └── theme.ts             # Theme management
└── app.css                      # Global styles

posts/                           # Markdown blog posts
├── dndr.md                      # Flutter reader app post
├── pdwm.md                      # DWM customization post
└── syncp.md                     # Media sync tool post
```

## ✨ Key Highlights

- **Performance**: Optimized bundle with minimal JavaScript
- **Accessibility**: Full keyboard navigation and screen reader support
- **SEO**: Proper meta tags and structured data
- **Developer Experience**: TypeScript, hot reload, and modern tooling
- **Content Management**: Simple markdown-based blog system

## 📄 License

MIT
