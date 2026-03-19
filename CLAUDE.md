# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build to /dist
npm run preview   # Preview production build
npm run lint      # ESLint validation
```

## Architecture

This is a React 19 + Vite SPA for **Sindikat Sina Roza**, a Seattle Balkan brass band. It has no backend — all dynamic content comes from external sources.

### External Data Sources

- **Calendar events**: Fetched as iCalendar from Gig-o-Matic, parsed with `ical.js` and `luxon`
- **Band members & related bands**: Google Sheets published as CSV, parsed with `papaparse`
- **Song library**: Google Sheets published as CSV

### Routing & Layout

`App.jsx` wraps everything in `BrowserRouter`. The fixed layout is: `Header` (desktop-only) → `Nav` (sticky, responsive) → `<main>` with `AnimatedRoutes` → `Footer`.

`AnimatedRoutes.jsx` uses `React.lazy()` + `Suspense` for all pages, and `AnimatePresence` (Framer Motion) for page transitions. Default route (`/`) renders `Calendar`.

### Pages

- `/` and `/calendar` — Upcoming shows fetched from Gig-o-Matic
- `/home` — Band photo, bio, image gallery with lightbox (`yet-another-react-lightbox`)
- `/about` — Member grid + related bands, both from Google Sheets CSV
- `/contact` — Booking info and press kit download
- `/library` — Searchable/filterable song database (Fuse.js fuzzy search + multi-select filters)

### Styling

Tailwind CSS v4 via the `@tailwindcss/vite` Vite plugin. Custom design tokens are defined in `src/index.css` as CSS variables and utility classes:
- Color palette: dark blue primary, gold accent (`#DFAB29`), red accent (`#D54514`), cream text
- Font stack: Bebas Neue (headers), PT Sans (body), Great Vibes (logo), Orbitron (titles) — loaded via Google Fonts in `index.html`
- Custom utility classes like `.bg-primary`, `.text-accent`, `.font-header` map to these tokens

### Content & Assets

- Static copy (band bio, subtitle, about text) lives in `src/data/content.jsx`
- Images are served from `/public/images/` (band photos, gallery, backgrounds)
- Press kit download is at `/public/downloads/`
- Background image per route is handled by `src/utils/backgroundImages.js`

### Deployment

Netlify. The `public/_redirects` file handles SPA routing (all paths → `index.html`).
