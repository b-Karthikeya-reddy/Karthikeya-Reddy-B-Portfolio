# Karthik — Portfolio

Personal portfolio site built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Single scrolling page, dark-mode first, ready to deploy on Vercel.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Local development server |
| `npm run build` | Production build         |
| `npm run start` | Serve production build   |
| `npm run lint`  | ESLint                   |

## Edit your content

| File                 | What to change                                      |
| -------------------- | --------------------------------------------------- |
| `data/site.ts`       | Name, bio, links, research placeholders, skills     |
| `data/projects.ts`   | Projects (`summary`, `description`, stack, links)   |
| `public/resume.pdf`  | Drop your resume PDF here (linked from the hero)    |
| Project screenshots  | Set `image` on a project (e.g. `/projects/tutorly.png`) |

Placeholder slots for more projects are commented at the bottom of `data/projects.ts`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (defaults are fine).
4. Deploy — Vercel builds with `next build` automatically.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

## Ambient audio & demos

- Drop your lofi track at `public/ambient.mp3` (already included from your Downloads file).
- Project demo videos: put MP4s in `public/demos/` and point each project's `video` field in `data/projects.ts` (e.g. `/demos/tutorly.mp4`). Until a file exists, the card shows a placeholder.
