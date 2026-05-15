# Kingdom Builders Publishing — Website

A modern, faith-inspired website for **Kingdom Builders Publishing** — a publisher of books, devotionals, and resources that spread God's Word and empower mission-driven organizations.

Built with [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [React Router](https://reactrouter.com/).

## Pages

- `/` — Home (hero with real book covers, mission strip, featured books, featured audio series, real reader reviews, newsletter signup)
- `/about` — Mission, who we are, impact stats, goals, values
- `/books` — Searchable, filterable catalog of digital books from the backend
- `/listen` — Audio series catalog with in-line preview player (real cover art + real audio)
- `/store` — Physical books on Amazon (real prices, real reviews, real affiliate links)
- `/newsletter` — Newsletter archive and signup
- `/contact` — Contact form with reason picker
- `*` — 404 Not Found

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server.           |
| `npm run build`   | Type-check and build for production. |
| `npm run preview` | Preview the production build.        |
| `npm run lint`    | Run ESLint.                          |

## Project Structure

```
src/
  components/      Reusable UI building blocks (Header, Footer, BookCover, …)
  data/            Static content for books, products, newsletters, and projects
  pages/           Top-level route components
  App.tsx          Route configuration
  index.css        Tailwind base + design tokens
  main.tsx         App entry
```

## Design

- **Brand colors:** deep "ink" navy/purple paired with warm "gold" accents on a parchment background — evoking heritage, Scripture, and craftsmanship.
- **Type:** Fraunces (serif headings) with Inter (sans body) loaded from Google Fonts.
- **Tone:** warm, hopeful, reverent — avoiding clichés while leaning into Kingdom-building imagery.

## Backend Integration

The site is wired to the live **Kingdom Builders / Godly Kids backend** (Express + Mongoose, hosted on Render):

- **API base:** `https://backendgk2-0.onrender.com`
- **Admin Portal:** `https://portalgk2-0.netlify.app` (Vite + React 19, the existing book CMS — linked from the site footer)

Wired endpoints:

| Page / UI | Endpoint | Method |
| --- | --- | --- |
| Home hero (floating book covers) | `/api/books?status=published&isFeatured=true&limit=12` | GET |
| Home → Featured Books | `/api/books?status=published&isFeatured=true` | GET |
| Home → Featured Audio Series | `/api/playlists?limit=12` | GET |
| Home → Reader reviews | `/api/amazon-books?limit=25` (real Amazon reviews) | GET |
| Books catalog | `/api/books?status=published&limit=100` | GET |
| Listen catalog + in-page preview player | `/api/playlists?limit=100` (item `audioUrl` plays in-browser) | GET |
| Store (Amazon physical books) | `/api/amazon-books?status=published&limit=100` | GET |
| Newsletter signup (footer + dedicated card + inline) | `/api/email-subscribers` | POST |
| Contact form | `/api/email-subscribers` (lead capture, `source=contact_…`) | POST |

Override the API base or portal URL in `.env.local` (copy `.env.example`):

```bash
VITE_API_BASE_URL=https://backendgk2-0.onrender.com
VITE_PORTAL_URL=https://portalgk2-0.netlify.app
```

The only remaining placeholder data is the Newsletter archive (`src/data/content.ts → newsletters`); everything else on the site renders real production content from the backend.

### Next steps to deepen the integration

- Replace the Newsletter archive with `GET /api/newsletters` (or whichever collection holds past issues)
- Add a full audio player (queue + scrubber) on `/listen`
- Optional: surface admin functions directly inside this app at `/admin/*` reusing the portal's `apiClient.ts`

---

> "Unless the Lord builds the house, the builders labor in vain." — Psalm 127:1
