# Vantra Studio

A Next.js implementation of the Vantra Studio site: an independent design studio's portfolio with case studies, a
journal, an about page, a contact form and a few utility pages. The site is statically generated (App Router, React 19,
TypeScript), styled with one global stylesheet and animated with GSAP and Lenis.

## Requirements

Node.js 20.9 or newer and npm.

## Getting started

```bash
npm ci            # install exactly what package-lock.json pins
npm run dev       # development server on http://localhost:3000
npm run build     # production build
npm run start     # serve the production build on http://localhost:3000 (PORT / -p to change)
```

| script              | what it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)                 |
| `npm run typecheck` | generates the route types, then `tsc --noEmit`                      |

The build needs no network access and no environment variables. `NEXT_DIST_DIR=.next-other npm run build` builds into a
different directory, which lets a second build or server run next to the dev server.

## Environment variables

All optional; see `.env.example`. Set them in `.env.local` while developing and in the host's environment in production.

| variable                | used by            | purpose                                                                                                                                                      |
| ----------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`  | metadata (build)   | Public origin, no trailing slash. Makes the social-image URLs (`og:image`, `twitter:image`) absolute. Read at **build** time; defaults to the production domain on Vercel, else `http://localhost:3000`. |
| `CONTACT_WEBHOOK_URL`   | `/api/contact`     | Every valid enquiry is forwarded there as a JSON `POST`. Without it enquiries are acknowledged but **not delivered or stored**. Treat the URL as a secret.    |
| `SITE_PASSWORD`         | `/api/unlock`      | Password accepted on `/401`. While unset every attempt is rejected.                                                                                          |

## Routes

32 pages, all prerendered except `/401`, which reads its query string per request.

| route                                                                                       | page                                                    |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `/`                                                                                         | home                                                    |
| `/about-us`, `/contact-us`, `/journal`, `/work`                                             | main pages                                              |
| `/work/[slug]`                                                                              | 8 case studies                                          |
| `/journal/[slug]`                                                                           | 4 articles                                              |
| `/categories/[slug]`, `/journal-categories/[slug]`                                          | 6 work categories, 4 journal categories                 |
| `/changelog`, `/licenses`, `/style-guide`                                                   | documentation pages                                     |
| `/401`                                                                                      | password screen (no header or footer)                   |
| `/404`                                                                                      | the not-found page, served with status 200 (see below)  |

Dynamic segments use `generateStaticParams` with `dynamicParams = false`, so an unknown slug is a 404. Unknown URLs get
the same not-found page with status 404. The page also lives at `/404` with status 200 (Next.js would answer a route
literally named `404` with a 404 status); internally it is `app/(compact)/error-404`, rewritten from `/404`, and a direct
visit to `/error-404` redirects to `/404`. Trailing slashes redirect to the slash-less URL (`/about-us/` becomes `/about-us`).

API routes:

- `POST /api/contact`: JSON `{ name, email, phone, message }`. Validated against the same field rules as the form;
  `200 { ok: true }`, or `400`/`413`/`415`/`502` with `{ ok: false, error }`. Bodies over 32 KB are refused and only
  `application/json` is accepted. Nothing but a redacted note (message length, whether a phone was given) is logged.
- `POST /api/unlock`: the native form post of `/401`. Redirects (303) to `/` for the right password and to `/401?e=1`
  (which shows the error message) otherwise. It sets no cookie: the redirect is the whole effect.

## Project structure

```
src/
  app/
    layout.tsx             root layout: <html>, fonts, global CSS, motion root
    globals.css            the whole stylesheet: reset, design tokens (CSS custom properties), every component class
    fonts.css              points the font tokens at the next/font families
    global-error.tsx, not-found.tsx
    (site)/                pages with header and footer (layout.tsx wraps them in PageShell)
    (compact)/error-404/   the 404 page: header, no footer
    (bare)/401/            the password page: no shell at all
    api/contact, api/unlock
  components/
    layout/                Header, Footer, PageShell
    ui/                    small parts: Button, Heading, Label, cards, filter bar, icons, NavLink
    sections/<page>/       the sections of each page (home, about, case, article, contact, docs, error, shared)
    widgets/               interactive parts: Slider, BackgroundVideo, EnquiryForm, PasswordForm
  data/                    all content as typed modules (see below)
  lib/                     small helpers: fonts, page metadata, class names, request-body limits
  motion/                  animation layer (see below)
public/assets/             images (AVIF, SVG, PNG), video, social images, keeping the URLs the pages use
```

Server Components by default. `"use client"` is limited to what needs the browser: the header and links (they read the
current pathname), the slider, the background video, the enquiry form, the motion root and the global error screen.

Images are plain `<img>` elements on purpose: `src`, `srcset`, `sizes` and `loading` are written by hand and must reach
the browser unchanged, which `next/image` would rewrite. The matching ESLint rule is switched off in `eslint.config.mjs`.

## Content and data

There is no CMS. The pages render typed data from `src/data`: `work.ts` and `work-cases.ts` (case study cards and pages),
`journal.ts` and `journal-articles.ts` (posts, with rich text as a small block model), `categories.ts`,
`journal-categories.ts`, `site.ts` (menu, footer links, the tagline per page), `pages.ts` (title, description and social
image of every route), plus the home, about, contact, style-guide and documentation copy. To add a case study or a post:
add its slug to the union in `types.ts`, an entry in the card list and one in the long-form module, its metadata in
`pages.ts`, and the images under `public/assets`. `generateStaticParams` picks it up.

The class names, ids and attribute values in the markup are part of the design: the stylesheet, the animation data and the
grid placement rules refer to them, so change them together.

## Styling and fonts

One global stylesheet (`src/app/globals.css`), no CSS-in-JS and no CSS modules. The design tokens (colours, type scale,
spacing, radii) are CSS custom properties on `:root`. Instrument Sans and Inter are self-hosted by `next/font`
(`src/lib/fonts.ts`) and bound to the font tokens in `src/app/fonts.css`.

## Motion

`src/motion` holds the animation layer. It is data-driven:

- `data/*.generated.ts` are machine-generated data files: the 34 interaction definitions (hover, click, scroll and load
  triggers with their timelines and breakpoints), the interaction ids each route registers, and the per-page CSS that
  hides elements until their entrance animation is ready. The generator is not part of this repository, so the files
  themselves are the source of truth: edit them with care and re-check the affected animations in a browser.
- `engine/runner.ts` turns the definitions into GSAP timelines, ScrollTriggers and SplitText splits, gated by breakpoint
  through `gsap.matchMedia`. `MotionRoot` (mounted once in the root layout) starts it per pathname, after the page has
  loaded, and tears it down before the next page replaces the DOM, so a client-side navigation behaves like a fresh load.
- GSAP (with ScrollTrigger and SplitText) and Lenis (smooth scrolling) come from the `gsap` and `lenis` packages and only ever run
  in the browser: everything is started from effects in `MotionRoot`.
- `InitialHidden` renders each page's pre-animation CSS into `<head>` (keyed on `html.js:not(.motion-ready)`); a tiny inline
  script in the root layout sets `html.js` and `html.is-touch` before first paint; `motion-ready` is added by the runner.
  Without JavaScript nothing stays hidden.
- `anchors.ts` handles same-page hash links (eased scroll offset by the fixed header) and placeholder `#` links.

## Production notes

- Security headers are set in `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and
  `frame-ancestors 'self'`, `Permissions-Policy`; `X-Powered-By` is off. No fuller Content-Security-Policy is set: the
  document has a small inline script and inline style blocks, so a strict policy needs a per-request nonce, which would turn
  every page dynamic. `Strict-Transport-Security` belongs to the host that terminates TLS.
- Not included, and worth adding for a real deployment: `robots.txt` and a sitemap, a `<link rel="canonical">`, rate limiting
  in front of `/api/contact` and `/api/unlock` (a honeypot field or a CAPTCHA for the form), long-lived caching headers for
  `/assets`, and a delivery target (`CONTACT_WEBHOOK_URL`).
- `global-error.tsx` is the fallback for any uncaught rendering error (it answers 500 for a failed server render and replaces
  the page on the client, with a "Try again" button). There is no segment-level `error.tsx`: it would add about 6 KB (gzip) to
  the first-load JavaScript of every page for a case this static site should not reach.
- `/401` only gates its own screen: it holds no session, so it does not protect other pages.
- The enquiry form is submitted with JavaScript. Before hydration (or with scripting off) it falls back to a native `GET`
  submit, which puts the field values in the URL; the form markup is kept as designed, so if that matters, hide the form
  until it is hydrated or change its `method`.
- `/changelog` and `/licenses` carry a `robots` meta tag as designed, written with typographic quotes
  (`“robots”` / `“noindex”`), so browsers and crawlers do not treat it as a robots directive.
- Accessibility limits that come with the design, which the markup reproduces (an axe-core run reports the same rules as the
  reference on every page): the header menu button, its expandable sections and the FAQ rows are `div`s that react to clicks
  only, so they cannot be reached or operated with the keyboard (the footer repeats the main navigation); the client-logo
  links on the home page have no accessible name; the light-on-blue captions of the style guide fall just under the contrast
  minimum; the closing "careers" banner sits outside a landmark; and the grid cells and rows that share a placement hook
  repeat the same `id`. The slider arrows and dots, the video control and the forms are keyboard operable.
- The hero and every other image are `loading="lazy"`, as designed; mark the first hero image `eager` (and give it
  `fetchPriority="high"`) when Largest Contentful Paint matters more than a byte-identical document.
- `next start` logs `Error: Internal: NoFallbackError` for a request to an unknown `/work/…`, `/journal/…` or `/categories/…`
  slug. That is Next.js signalling, for a route with `dynamicParams = false`, that the slug has no prerendered page; the
  answer is the normal 404 page.

## Checking fidelity

The site is a rebuild of an existing static site (code comments call it "the export" or "the original site"), so its
behaviour is checked against that reference with Puppeteer scripts kept outside this repository. They compare (1) the server-rendered markup of every route with the reference DOM, (2) screenshots
at seven viewport widths (1920, 1440, 1280, 991, 767, 479, 375 px) while scrolling, with a pixel diff, and (3) sampled
computed styles (opacity, transform, size, colour) over time during hover, click and scroll interactions. None of this is
needed to build or run the site; `npm run lint` and `npm run typecheck` are the checks that belong to the repository.

## Third-party licences

- [GSAP](https://gsap.com/standard-license) (`gsap`, including ScrollTrigger and SplitText): GreenSock "no charge" standard licence, free for
  this kind of use, declared in the package metadata. It ships in the browser bundle.
- [Lenis](https://github.com/darkroomengineering/lenis) (`lenis`), Next.js, React: MIT.
- Instrument Sans and Inter (`src/lib/font-files`): SIL Open Font License 1.1, text in `src/lib/font-files/LICENSE.txt`.
