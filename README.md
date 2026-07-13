# CRACKTROZ — CRT / Glitch Brand Site

Single-page brand site with a CRT/VHS glitch aesthetic (reference: Oxbow x Liam Warr).

## Stack
- React 18 + Vite
- React Three Fiber (custom GLSL analog-static shader in the hero)
- GSAP + ScrollTrigger (section reveals)
- Lenis (smooth scroll)
- Framer Motion (preloader / nav transitions)
- Pure CSS glitch & CRT overlay effects (scanlines, noise, vignette, flicker)

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Font
Headings use [HACKED](https://hackedfont.com) by David Libeau (CC-BY — credit required, already in the footer).
It loads from jsDelivr CDN. To self-host: download HACKED.ttf into `public/fonts/` and change the
`@font-face` src in `src/styles/global.css` to `/fonts/HACKED.ttf`.

## Whitelist form → Supabase
1. [supabase.com](https://supabase.com) → New project (free tier is fine).
2. Dashboard → **SQL Editor** → New query → paste all of `supabase/setup.sql` → **Run**.
   This creates the `whitelist` table with Row Level Security (visitors can only
   INSERT — nobody can read the list from the site) and a safe live counter.
3. Copy `.env.example` to `.env.local`. In **Project Settings > API**, copy the
   Project URL to `VITE_SUPABASE_URL` and the publishable key to
   `VITE_SUPABASE_PUBLISHABLE_KEY`. Legacy projects can use the anon key via
   `VITE_SUPABASE_ANON_KEY`. Never use a service-role or secret key in a
   `VITE_` variable: Vite exposes those variables to every site visitor.
4. `npm install` (adds @supabase/supabase-js), then restart the dev server.
5. Submissions land in Dashboard → **Table Editor → whitelist**.
   Duplicate wallets are rejected automatically (max 1 per wallet).
   Until configured, submissions just log to the browser console.

Quest links (X profile, pinned post, Discord invite) are in `QUESTS` in `src/data/collection.js`.

The SQL applies server-side format constraints, RLS, and minimal grants. Direct
anonymous submission is still public; before a high-traffic launch, put it
behind a rate-limited server/Edge Function with bot protection. Run
`node scripts/security-check.mjs` in CI to catch accidentally packaged
environment files, privileged keys, or weakened SQL.

## Customize
- Colors / fonts: `src/styles/global.css` (`:root` variables)
- Hero shader: `src/three/StaticScene.jsx`
- Projects list: `src/components/Work.jsx`
- Boot sequence text: `src/components/Preloader.jsx`
- Lottie: install `lottie-react` and drop animations into any section
- Spline: alternative to R3F — `npm i @splinetool/react-spline` and replace `StaticScene`
