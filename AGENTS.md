# Agent Guidelines — prats.page

This file helps AI agents understand the project conventions before writing code, editing files, or making suggestions.

## Project Identity

This is **prats.page** — Prateek Rathod's personal website and scratchpad. It's a static site built with Eleventy v3, served as flat HTML. No client-side framework. No backend. Content is written in Markdown, templates in Nunjucks.

## Tech Stack Quick Reference

- **Runtime:** Bun (scripts in `package.json`)
- **SSG:** Eleventy v3 (`.eleventy.js`)
- **Templates:** Nunjucks (`.njk`) — layout chain: `base.njk` ← `home.njk` / `post.njk` / `about.njk`
- **Assets:** esbuild (`esbuild.config.js`) — bundles `src/js/main.js` and `src/css/main.css`
- **Styles:** Modular CSS files in `src/css/`, imported via `main.css` (esbuild entry)
- **Formatter:** Biome (`biome.json`) — tab indentation, double quotes
- **Data:** `src/data/site.json` holds author info, nav links, social links, footer config

## Important Conventions

### Eleventy
- **Input dir:** `src/`, **Output dir:** `public/`
- **Layouts:** `src/layouts/` — `base.njk` is the root layout, others extend it
- **Includes (partials):** `src/includes/` — `posts-list.njk`, `tags-list.njk`
- **Data:** `src/data/site.json` globally available as `site.*`
- **Collections:** `posts` (from `src/posts/*.md`), `experiments` (from `src/experiments/*.md`), `tagList` (auto-generated)
- **Passthrough:** `src/images/` → `images/` in output

### CSS Architecture
Each component/page has its own CSS file in `src/css/`:
- `global.css`, `typography.css`, `variable.css` — base styles and design tokens
- `header.css`, `hero.css`, `footer.css` — layout components
- `post.css`, `post-list.css` — blog content
- `about.css`, `experiments.css` — page-specific
- `prism-theme.css` — syntax highlighting
- `not-found.css` — 404 page

All CSS files are imported into `main.css` (the esbuild entry point).

### Frontmatter
- Blog posts in `src/posts/` use `posts.json` for defaults (layout, tags, permalink)
- Experiments in `src/experiments/` use `experiments.json` for defaults
- Tags are managed collectively via `tags.njk`
- Posts are filtered through a `pageTags` filter that strips `all`, `nav`, `post`, `posts` from display

### Shortcodes & Filters
- `{% bundledcss %}` — emits `<link>` for the hashed CSS bundle (reads `public/assets/manifest.json`)
- `{% bundledjs %}` — emits `<script>` for the hashed JS bundle
- `| excerpt` — strips HTML, truncates to 200 chars
- `| readableDate` — formats dates as "dd LLL yyyy" (e.g., "14 May 2026")
- `| htmlDateString` — formats dates as "yyyy-LL-dd"
- `| dateToIso` — converts date string to ISO format
- `| head` — array slice
- `| pageTags` — filters out general tags for display

### Build Pipeline
1. `bun run build` = `clean` → `build:assets` (esbuild prod build) → `build:site` (eleventy)
2. In dev (`bun run dev`), `dev:assets` (esbuild watch) and `dev:site` (eleventy serve) run in parallel via `npm-run-all`
3. Clean removes the entire `public/` directory

### Typical Dev Workflow
- `bun run dev` — starts both watchers, edit and see changes live
- `bun run format` — run Biome before committing
- The `public/` dir is gitignored; it's a build artifact

### Content Types

**Blog posts** (`src/posts/*.md`):
```yaml
---
title: "Post Title"
date: 2025-01-01
tags: ["tag1", "tag2"]
---
Content here...
```

**Experiments** (`src/experiments/*.md`):
```yaml
---
layout: post
title: "Experiment Name"
description: "Short description"
date: 2025-01-01
tags: ["experiment"]
---
Content here...
```

### Mermaid
Mermaid diagrams use a custom markdown highlighter — just use ` ```mermaid ` in Markdown files.

## Rules for Agents

1. **Never edit the `public/` directory.** It's a build artifact. Always edit source files in `src/`.
2. **Format with Biome** after any file edit (`bun run format`). The project uses tab indentation and double quotes.
3. **When the `public/` directory is missing**, run `bun run build` to generate it before any analysis that needs the built output.
4. **Site metadata lives in `src/data/site.json`** — author info, navigation links, social links, footer config. Edit there, not in templates.
5. **CSS is modular** — add new styles in a new file under `src/css/` and import it in `main.css`. Don't dump styles in existing component files.
6. **Don't inline CSS or JS in templates.** Use the `bundledcss` / `bundledjs` shortcodes and add source files via esbuild if needed.
7. **`src/layouts/` contains page-level layout templates.** `base.njk` is the shell. Don't add content there — content comes from pages via `{% content %}` blocks.
8. **The home page is `src/index.md` with `layout: home`.** The hero/intro content lives there.
9. **Biome config** is at `biome.json` — assumes VCS integration with git, uses `.gitignore` for ignored files.

## Common Tasks

- **Add a blog post:** Create `.md` in `src/posts/` with proper frontmatter.
- **Add an experiment:** Create `.md` in `src/experiments/`.
- **Add a CSS module:** Create file in `src/css/`, import in `main.css`.
- **Add a nav link:** Edit `headerLinks` in `src/data/site.json`.
- **Change footer:** Edit `footerLinks` and `showFooterAttribution` in `src/data/site.json`.
- **Update author info:** Edit the `author` section in `src/data/site.json`.
