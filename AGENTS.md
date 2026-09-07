# NetraSoft Solutions — Website

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript.

- Sections live one-per-file in `src/components/site/`. `src/app/page.tsx` is
  only the running order.
- Design tokens are CSS variables in `src/app/globals.css`, exposed to Tailwind
  through `@theme inline` — use `bg-brand`, `text-ink`, `border-line`, never a
  raw hex in a component unless it is a one-off tint.
- All illustration is hand-built SVG. No icon or component libraries.
- The isometric primitive lives in `src/components/site/iso.tsx`; anything that
  draws a slab imports `Slab` from there rather than redefining it.
- Forms post to `/api/brief` and `/api/call`, which share `src/lib/mail.ts`.
  Both carry a honeypot field — keep it when editing.
- Run `npm run build` and `npm run lint` before calling a change done.
