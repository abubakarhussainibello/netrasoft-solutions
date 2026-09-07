# NetraSoft Solutions — Website

Marketing site for the NetraSoft modular stack. Next.js 16 (App Router,
Turbopack), React 19, Tailwind v4 — the same setup as the Binarify site.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Full homepage — hero through to footer |
| `/about` | Story, leadership, principles |
| `/deployments` | Case studies with the numbers behind them |
| `/api/brief` | POST — deployment brief from the `Pricing` form |
| `/api/call` | POST — call request from the `BookCall` modal |

## Structure

```
src/app/layout.tsx          fonts + metadata
src/app/globals.css         design tokens and utility classes
src/app/icon.svg            favicon
src/app/page.tsx            homepage section order
src/app/about/page.tsx      about page
src/app/deployments/page.tsx
src/app/api/{brief,call}/route.ts
src/lib/mail.ts             Resend transport + shared email shell
src/components/site/        one file per section
```

Homepage order: `Hero · LogoStrip · About · Problems · Solutions · Features ·
HowItWorks · Work · Growth · Tools · Testimonials · Pricing · Faq · CtaSection ·
Footer`.

## Design system

Defined as CSS variables in `src/app/globals.css` and exposed to Tailwind
through `@theme inline`, so they are usable as `bg-brand`, `text-ink`,
`border-line`, etc.

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#f7f7f5` | page ground |
| `--ink` | `#17181a` | headlines, badges |
| `--brand` | `#f1521c` | primary actions, accents |
| `--brand-soft` | `#fdeee8` | active chip and icon-tile fills |
| `--line` / `--line-strong` | black at 7% / 13% | hairlines and blueprint rules |

Type: **EB Garamond** for display (its italic carries the `Synthesise, Simulate`
emphasis), **Inter** for UI, **JetBrains Mono** for labels and eyebrows.

Utilities: `.btn-brand`, `.btn-outline`, `.panel` / `.panel-hover`, `.well`,
`.callout`, and the background textures `.blueprint`, `.hatch`, `.dot-grid`,
`.fade-edges`, `.fade-bottom`.

## Illustration

All artwork is hand-built SVG — no icon or component libraries.

- `src/components/site/iso.tsx` is the isometric primitive. A `Slab` is a diamond
  top face plus two extruded sides, given by the top face's centre (`cx`, `cy`),
  a horizontal radius (`hw`), a vertical radius (`hh`) and a thickness (`t`).
  Anything that draws a slab imports it from here.
- `IsoScene.tsx` is the hero diagram: platforms, the module tiles resting on
  them, names laid flat on the top faces via the `FLAT` matrix, plus callouts and
  leader lines. Positions are data at the top of the file — move a module with
  its `cx`/`cy`, nudge its engraved name with `dx`/`dy`.
- `HowItWorks.tsx` reuses the same primitive for the four-stage loop.
- `icons.tsx` is the UI icon set; `tech-icons.tsx` is the stack grid.

## Forms and email

`Pricing` (deployment brief) and `BookCall` (call request) post JSON to their
routes. Both carry a honeypot field the server silently accepts and drops.
Delivery goes through Resend via `src/lib/mail.ts`.

Set these in `.env.local` (and in the host's dashboard for production):

- `RESEND_API_KEY` — from https://resend.com/api-keys
- `BRIEF_TO` — recipient(s), comma-separated
- `BRIEF_FROM` — sender; `onboarding@resend.dev` works untested but only
  delivers to the Resend account owner until you verify a domain

Without them the routes return a 500 with a clear message and log the reason —
the rest of the site is unaffected.

## Deploying

`render.yaml` is a Render blueprint for a Node web service (not a static site —
the API routes need a server). Set the three secrets in the dashboard; they are
never committed.
