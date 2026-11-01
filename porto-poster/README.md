# porto-poster

Homepage: a pile of draggable, subtly 3D-tilting
cards over a big poster headline. Click a card to jump to its section
(About / Skills / Projects / Reel / Contact) on the same page; drag any
card around just because it's satisfying.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize

- All content and layout lives in `app/page.tsx` — one file by design.
- `cards` array at the top of `app/page.tsx` controls the pile: position
  (`top`/`left` as %), resting rotation, color, and which section id it
  scrolls to.
- Colors and fonts are tokens in `tailwind.config.ts`
  (`paper`, `ink`, `cobalt`, `coral`, `sun`, `moss`).
- Drop a clip at `public/reel.mp4` (+ `public/reel-poster.jpg` thumbnail)
  for the Reel section — currently points at files that don't exist yet.
- Swap the placeholder email/GitHub/LinkedIn links in the Contact section
  for your real ones.
- Add more projects by copying an `<article>` block in the Projects
  section.

## Stack

Next.js 14 (App Router) + Tailwind CSS + Framer Motion for drag and the
mouse-tilt effect. No 3D engine — the tilt is CSS 3D transforms driven by
pointer position, which keeps it light and fast.
