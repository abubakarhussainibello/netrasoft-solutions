# NetraSoft Solutions — Website

Marketing site for NetraSoft Solutions, a software development studio. Next.js 16
(App Router, Turbopack), React 19, Tailwind v4 — the same setup as the Binarify
site.

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
| `/about` | Story, principles, what we believe |
| `/work` | Case studies with the numbers behind them |
| `/api/brief` | POST — project brief from the `Pricing` form |
| `/api/call` | POST — call request from the `BookCall` modal |

## Structure

```
src/app/layout.tsx          fonts + metadata
src/app/globals.css         design tokens, textures, keyframes
src/app/icon.svg            favicon
src/app/page.tsx            homepage section order
src/app/about/page.tsx      about page
src/app/work/page.tsx       case studies
src/app/api/{brief,call}/route.ts
src/lib/mail.ts             Resend transport + shared email shell
src/components/site/        one file per section
```

Homepage order: `SiteHeader · Hero · LogoStrip · Services · Problems · Solutions ·
HowItWorks · Work · Growth · Tools · Testimonials · Pricing · Faq · CtaSection ·
Footer`.

`SiteHeader` is rendered by each page rather than by a section, because it is
`position: sticky` and would be clipped by the hero's `overflow-hidden`.

## Design system

Defined as CSS variables in `src/app/globals.css` and exposed to Tailwind through
`@theme inline`, so they are usable as `bg-brand`, `text-ink`, `border-line`, etc.

The palette is taken from the logo: `#0060fc` is the bright blue of the ribbon
and the "Soft" wordmark, `#001860` the navy of "Netra".

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#f6f6f3` | page ground |
| `--ink` | `#001860` | headlines, dark cards, badges |
| `--foreground` | `#16161a` | body copy (stays graphite, not navy) |
| `--brand` | `#0060fc` | primary actions, accents |
| `--brand-dark` | `#0047c4` | pressed / hover depth |
| `--brand-soft` | `#e8f0ff` | active chip and icon-tile fills |
| `--live` | `#2fa84f` | running / passing states only |
| `--line` / `--line-strong` | black at 7% / 13% | hairlines and blueprint rules |

## Brand assets

`public/brand/` holds the logo, trimmed to its alpha bounding box from the
supplied artwork:

- `netrasoft-logo.png` — full lockup, used in the header and footer
- `netrasoft-mark.png` — the N on its own, used in the CTA and the call modal
- `src/app/icon.png` — favicon, generated from the mark

The source is raster, not vector. If a vector original turns up, swap these for
SVG — the lockup is set at `h-7` in the header and would sharpen noticeably.

Type: **EB Garamond** for display (its italic carries the headline emphasis),
**Inter** for UI, **JetBrains Mono** for labels and eyebrows.

Utilities: `.btn-brand`, `.btn-outline`, `.btn-ink`, `.panel` / `.panel-hover`,
`.well`, `.callout`, `.glass`, and the textures `.blueprint`, `.blueprint-fine`,
`.hatch`, `.dot-grid`, `.spotlight`, `.fade-edges`, `.fade-bottom`, `.fade-x`.

## Motion

`src/components/site/motion.tsx` holds the primitives — `Reveal`, `CountUp`,
`Typewriter`, `Tilt`, `Spotlight`, `Parallax`, `Meter` — all built on one
IntersectionObserver hook. There is no animation library.

Every keyframe lives in `globals.css`, so the single `prefers-reduced-motion`
block at the bottom of that file switches the entire site to a static page. Keep
new animation as CSS keyframes for that reason — SMIL would escape the guard.

## Illustration

All artwork is hand-built SVG — no icon or component libraries.

- `iso.tsx` is the isometric primitive. A `Slab` is a diamond top face plus two
  extruded sides, given by the top face's centre (`cx`, `cy`), a horizontal
  radius (`hw`), a vertical radius (`hh`) and a thickness (`t`). Anything that
  draws a slab imports it from here.
- `PipelineScene.tsx` is the hero — four podiums climbing scope → build → test →
  ship, with packets riding the rails between them.
- `iso-scenes.tsx` carries that language into the rest of the page:
  `IsoSprintLoop` (Process), `IsoChart` (Track record), `IsoScopeStack` and
  `IsoHandover` (How we work), `IsoLaunch` (CTA).
- `icons.tsx` is the UI icon set, `tech-icons.tsx` the stack grid, and
  `sector-icons.tsx` the marks in the sector marquee.

Two things to watch when editing a scene:

- **Engraved names.** Text is laid on a top face with the `FLAT` matrix and reads
  down-right. Its `dx`/`dy` are fractions of `hw`/`hh` — push `dy` much past `0`
  and the word falls off the front edge onto the side face.
- **Paint order.** There is no z-buffer. `IsoChart` runs along the "away" axis and
  therefore renders far-to-near; laid along the other axis the ground drops
  faster than the values grow and a rising series reads as a falling one.

## Content that is still placeholder

Replace before launch:

- **Testimonials** (`Testimonials.tsx`) — every quote, name and role.
- **Case studies** (`Work.tsx`) — described by sector rather than client name;
  swap in real names once each client has agreed to be referenced.
- **Headline numbers** — the hero counters, `Growth.tsx` bars and the `/about`
  and `/work` stat rows.
- **Partner logos** (`public/partners/`) — carried over from Binarify. Google
  Workspace, DigitalOcean and Cloud Clusters are platform vendors; NDPC is an
  institutional relationship worth confirming for NetraSoft specifically.

## Forms and email

`Pricing` (project brief) and `BookCall` (call request) post JSON to their routes.
Both carry a honeypot field the server silently accepts and drops. Delivery goes
through Resend via `src/lib/mail.ts`.

Set these in `.env.local` (and in the host's dashboard for production):

- `RESEND_API_KEY` — from https://resend.com/api-keys
- `BRIEF_TO` — recipient(s), comma-separated
- `BRIEF_FROM` — sender; `onboarding@resend.dev` works with no setup but only
  delivers to the Resend account owner until you verify a domain

Without them the routes return a 500 with a clear message and log the reason —
the rest of the site is unaffected.

## Deploying

`render.yaml` is a Render blueprint for a Node web service (`netrasoft-web`), not
a static site — the API routes need a server. It mirrors the Binarify service:
free plan, Frankfurt, auto-deploy from `main`.

1. Push this repo to GitHub.
2. Render dashboard → **New → Blueprint** → pick the repo. Render reads
   `render.yaml`.
3. Set `RESEND_API_KEY`, `BRIEF_TO` and `BRIEF_FROM` in the dashboard. They are
   marked `sync: false`, so they are never committed and must be entered there.

`buildCommand` uses `npm ci --include=dev` deliberately: Render sets
`NODE_ENV=production`, which makes npm skip devDependencies — and the build needs
TypeScript and Tailwind.

Note that each Render web service runs one app, so this deploys as a **second
service** in the same Render account rather than onto the Binarify instance. On
the free plan a service spins down when idle and takes a few seconds to wake.
