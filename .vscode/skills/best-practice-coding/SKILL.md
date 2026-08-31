---
name: nextjs-best-practices
description: Comprehensive Next.js (App Router) production best practices covering project setup, routing, data fetching/caching, Server Actions vs API routes, SEO, security, performance/optimization, and architecture. Use this skill whenever the user is starting a new Next.js project, scaffolding routes/components/API routes/Server Actions, reviewing or refactoring Next.js code, asking about SEO/metadata/sitemaps, asking about auth/security/headers, asking about caching/rendering strategy (SSR/SSG/ISR), asking about performance or Core Web Vitals, or preparing a Next.js app for production/deployment — even if they don't explicitly say "best practices."
---

# Next.js Production Best Practices

You are acting as a senior Next.js developer. Apply these standards by default to any Next.js (App Router) work in this repo — don't wait for the user to ask for "best practices" explicitly. When writing or reviewing code, actively check it against the relevant checklist below and call out gaps.

Assumes **Next.js 14+ with the App Router**. Never scaffold new work in the legacy Pages Router.

## When to consult which section

- Creating a new project / folder structure → Section 1
- Creating a route, layout, or component → Section 2
- Fetching data, adding caching → Section 3
- Adding a form submission, mutation, or public endpoint → Section 4
- Adding/editing page metadata, sitemaps, social previews → Section 5
- Adding auth, handling env vars, forms, headers → Section 6
- Optimizing images, fonts, bundle size, load speed → Section 7
- Adding middleware, i18n, feature flags, error handling → Section 8
- Writing tests → Section 9
- Preparing to deploy / setting up CI → Section 10
- Reviewing a PR or "is this production ready?" → Section 11 (run the full checklist)

---

## 1. Project Setup & Structure

```bash
npx create-next-app@latest --typescript --tailwind --eslint --app --src-dir
```

Always use TypeScript, `src/` directory, and ESLint+Prettier. Non-negotiable for anything beyond a throwaway prototype.

Recommended structure:

```
src/
  app/                  # routes only — keep thin, composition not logic
    (marketing)/        # route group, no URL segment
    (dashboard)/
    api/                # only for webhooks/third-party integrations
    layout.tsx
    page.tsx
    error.tsx
    not-found.tsx
    global-error.tsx
  components/
    ui/                 # dumb, reusable, presentation-only
    features/           # feature-specific components
  lib/
    db.ts               # database client singleton
    auth.ts
    validations/        # zod schemas
  actions/              # Server Actions grouped by domain
  hooks/
  types/
  config/
```

Route folders under `app/` should contain almost no logic — push it into `lib/`, `actions/`, and `components/features/`.

---

## 2. Routing & Rendering Fundamentals

**Server Components by default.** Only add `"use client"` when you need hooks, browser APIs, or event handlers — and push it as far down the tree as possible (wrap the interactive leaf, not the whole page).

```tsx
// Server Component (default) — no "use client"
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return <ProductDetails product={product} />;
}
```

```tsx
// components/features/AddToCartButton.tsx
"use client";
export function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  // ...
}
```

Use route groups `(group)`, parallel routes `@slot`, and intercepting routes `(.)folder` instead of hacking layouts together for dashboards/modals.

**Always implement these special files per route/segment:**

| File | Purpose |
|---|---|
| `loading.tsx` | Instant loading UI via Suspense |
| `error.tsx` | Catches segment errors (must be Client Component) |
| `not-found.tsx` | Custom 404 for a segment |
| `global-error.tsx` | Root fallback for uncaught errors |

Never ship a route without at least `error.tsx` and `loading.tsx`.

**Stream slow sections instead of blocking the whole page:**

```tsx
<Suspense fallback={<StatsSkeleton />}>
  <Stats />
</Suspense>
```

**Pick rendering strategy per route deliberately:**

| Strategy | When | How |
|---|---|---|
| Static (SSG) | Rarely-changing content | Default, no dynamic functions used |
| ISR | Changes occasionally | `export const revalidate = 3600` |
| Dynamic (SSR) | Per-request/personalized data | `export const dynamic = 'force-dynamic'` or use `cookies()`/`headers()` |
| Edge runtime | Low-latency distributed logic | `export const runtime = 'edge'` |

Don't default everything to `force-dynamic` — it forfeits the performance Next.js gives for free.

---

## 3. Data Fetching & Caching

Fetch directly in Server Components with `async`/`await`. No `useEffect` + `useState` fetch waterfalls.

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}
```

**Every fetch call needs an explicit, intentional caching choice** — don't rely on silent defaults:

| Option | Behavior |
|---|---|
| `cache: 'force-cache'` (default) | Cached indefinitely until revalidated |
| `cache: 'no-store'` | Always fresh — per-request/user-specific data |
| `next: { revalidate: N }` | ISR, cached for N seconds |
| `next: { tags: [...] }` + `revalidateTag()` | On-demand invalidation after a mutation |

Fetch in parallel, not sequentially:

```tsx
// Bad — waterfall
const user = await getUser(id);
const posts = await getPosts(id);

// Good — parallel
const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);
```

Database: use a singleton client (serverless connection limits), use edge-compatible drivers if on Edge runtime, and never query the DB from a Client Component.

---

## 4. Server Actions vs. API Routes

**Server Actions** for mutations from your own UI (forms, buttons):

```tsx
"use server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
});

export async function createProduct(formData: FormData) {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    price: Number(formData.get("price")),
  });
  if (!parsed.success) return { error: parsed.error.flatten() };

  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  await db.product.create({ data: parsed.data });
  revalidatePath("/products");
}
```

**API routes** (`app/api/.../route.ts`) only for: public endpoints for third parties/mobile apps, webhooks, or a REST contract independent of your own frontend. Don't build a REST API just to call it from your own Server Components — fetch data directly instead.

**Always validate input server-side** (zod or similar) in both Server Actions and API routes — never trust `FormData`/`req.json()` blindly, and never rely on client-side validation alone.

---

## 5. SEO Checklist

- [ ] Static `metadata` export on every route (title, description under 160 chars)
- [ ] `generateMetadata()` for dynamic routes
- [ ] Open Graph + Twitter Card metadata for social previews
- [ ] `sitemap.ts` at app root (generates `/sitemap.xml`)
- [ ] `robots.ts` controlling crawler access, pointing to sitemap
- [ ] Canonical URLs to avoid duplicate-content penalties
- [ ] Structured data (JSON-LD) for products/articles/FAQs/breadcrumbs
- [ ] Semantic HTML — one `<h1>` per page, correct heading hierarchy
- [ ] `next/font` for zero-layout-shift font loading
- [ ] `next/image` with meaningful `alt` text everywhere
- [ ] Core Web Vitals kept healthy (Google uses them as ranking signals)

---

## 6. Security Checklist

- [ ] `NEXT_PUBLIC_` env vars never contain secrets — those are shipped to the browser
- [ ] Every Server Action / API route validates input with zod before touching the DB
- [ ] Auth via a proven library (Auth.js/NextAuth, Clerk, Lucia) — don't roll your own
- [ ] Sessions in httpOnly, secure cookies — never `localStorage`
- [ ] Authorization checked **server-side in every mutation** — hiding a button client-side is not a permission check
- [ ] Middleware protects gated routes:
  ```tsx
  export function middleware(request: NextRequest) {
    const session = request.cookies.get('session');
    if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  export const config = { matcher: ['/dashboard/:path*'] };
  ```
- [ ] CSRF protection on any custom form-submitting API routes (Server Actions have built-in origin checks)
- [ ] Rate limiting on public APIs and auth endpoints (login/signup/reset)
- [ ] Security headers set in `next.config.js` (CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy)
- [ ] Third-party scripts loaded via `next/script` with an appropriate `strategy`; no unsanitized content in `dangerouslySetInnerHTML`
- [ ] Dependencies audited regularly (`npm audit`, Dependabot/Snyk)
- [ ] File uploads validated by real MIME type and size — never trust client-reported type
- [ ] All DB queries parameterized via an ORM/query builder (Prisma, Drizzle) — never string-concatenated with user input

---

## 7. Performance & Optimization Checklist

- [ ] `next/image` everywhere — auto compression, lazy loading, responsive sizes, modern formats
- [ ] `next/font` for all custom fonts
- [ ] Heavy client components code-split with `next/dynamic`:
  ```tsx
  const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
    loading: () => <ChartSkeleton />,
    ssr: false,
  });
  ```
- [ ] Bundle size checked periodically with `@next/bundle-analyzer`
- [ ] Explicit caching strategy on every fetch (see Section 3)
- [ ] Minimal client-side JS — Server Components by default
- [ ] Suspense streaming for slow sections instead of blocking full-page render
- [ ] Intentional `<Link>` prefetching (`prefetch={false}` for rarely-visited/heavy routes)
- [ ] Edge runtime used for latency-sensitive logic where Node APIs aren't required
- [ ] DB connection pooling in serverless deployments
- [ ] Core Web Vitals monitored in production (Vercel Analytics, Sentry, or `next/web-vitals`)

---

## 8. Flexibility & Architecture

- [ ] Middleware for cross-cutting concerns: auth gating, redirects, A/B testing, locale detection, feature flags
- [ ] i18n planned from the start if multi-locale is needed (`next-intl` or App Router conventions) — don't bolt on later
- [ ] Environment-based config (`.env.local` / `.env.staging` / `.env.production`) — never hardcode env-specific values
- [ ] Feature-based folder organization as the app scales (group by domain, not file type)
- [ ] Consistent error handling: `error.tsx` per segment + shared logging utility (e.g. Sentry) called from every catch
- [ ] `output: 'standalone'` in `next.config.js` if self-hosting might ever be needed
- [ ] Feature flags for gradual rollouts instead of long-lived branches
- [ ] Shared `components/ui` library on a consistent design system (e.g. shadcn/ui + Tailwind)

---

## 9. Testing

| Layer | Tool | Covers |
|---|---|---|
| Unit | Vitest / Jest | Pure functions, utilities, validation schemas |
| Component | React Testing Library | Component behavior in isolation |
| E2E | Playwright | Critical flows: signup, checkout, auth |

- [ ] Full test suite runs in CI on every PR — no merging on red
- [ ] Critical paths (auth, payments, mutations) have E2E coverage, not just unit tests

---

## 10. Deployment & CI/CD

- [ ] CI runs lint + type-check + tests before deploy (`next lint`, `tsc --noEmit`, test suite)
- [ ] Preview deployments on every PR
- [ ] Env vars managed per environment in the hosting dashboard — never committed (use placeholders in `.env.example` only)
- [ ] `output: 'standalone'` if self-hosting via Docker/Node instead of Vercel
- [ ] Known rollback plan for a bad deploy
- [ ] Monitoring/alerting (Sentry, analytics) wired up before launch

---

## 11. Pre-Launch / PR Review Checklist

Run through this whenever reviewing a PR or asked "is this production ready?":

- [ ] Server Components by default; `"use client"` only where truly needed
- [ ] Every route has `loading.tsx` and `error.tsx`
- [ ] Every fetch call has an explicit caching strategy
- [ ] All mutations validate input and check authorization server-side
- [ ] Metadata (title, description, OG tags) set for every public route
- [ ] `sitemap.ts` and `robots.ts` present and correct
- [ ] Security headers configured
- [ ] No secrets in `NEXT_PUBLIC_` variables
- [ ] Images use `next/image`, fonts use `next/font`
- [ ] Core Web Vitals checked (Lighthouse/PageSpeed Insights)
- [ ] Tests passing in CI; critical flows covered by E2E
- [ ] Error monitoring and analytics connected

If code under review violates any of these, flag it specifically and suggest the fix rather than a generic "looks good."