# Testing & Performance Documentation

## Overview

SwitchBoard is built for production use with a focus on reliability, performance, and accessibility. This document covers testing strategy, performance targets, scalability, and how to replicate the pipeline for other web applications.

## Performance targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.0s | Lighthouse |
| Largest Contentful Paint | < 2.0s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Time to Interactive | < 2.5s | Lighthouse |
| Lighthouse score | 95+ | All categories |
| Build time | < 60s | CI |

## Reliability targets

| Metric | Target |
|--------|--------|
| Uptime | 99.9% |
| Error rate | < 0.1% |
| Build success rate | 100% on main |
| Test coverage | 80%+ (components + utilities) |

## Accessibility

- WCAG 2.2 AA contrast compliance (4.5:1 body text, 3:1 large text/UI boundaries)
- OKLCH color system tuned for both dark and light modes
- Perceptually uniform color steps (no false boundaries)
- Keyboard navigable sidebar and header
- Focus-visible ring on all interactive elements
- Screen reader friendly (aria-labels, semantic HTML)
- Reduced motion support (animations respect `prefers-reduced-motion`)

## Scalability / concurrent users

SwitchBoard is a client-side dashboard with optional backend API routes. Scalability characteristics:

| Deployment | Concurrent users | Notes |
|------------|-----------------|-------|
| Vercel (serverless) | 1,000+ | Automatic scaling, edge network |
| Docker + Node.js | 500+ | Single container, horizontal scaling possible |
| Local development | 1-5 | Single user per instance |

The frontend is a static Next.js export with minimal server load. API routes (`/api/switch/*`, `/api/slack/*`) are lightweight and can be scaled independently.

## Load testing

Run load tests against deployed API routes:

```bash
# Install autocannon
npm install -g autocannon

# Test API status endpoint
autocannon -c 100 -d 30 https://your-app.vercel.app/api/switch/status

# Test rooms endpoint
autocannon -c 50 -d 30 https://your-app.vercel.app/api/switch/rooms
```

Expected results for a serverless deployment:
- 95th percentile response time: < 200ms
- Error rate: < 0.1%
- Requests per second: 500+ (Vercel edge)

## Browser support

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | 120+ | Full support including Speech Recognition API |
| Edge | 120+ | Full support |
| Safari | 16+ | Web Speech API via webkit prefix |
| Firefox | 120+ | Voice capture falls back gracefully |

## CI/CD pipeline

### GitHub Actions workflows

- `.github/workflows/ci.yml` — Runs on every push/PR: lint, typecheck, build
- `.github/workflows/deploy.yml` — Deploys to Vercel on push to main

### Required secrets (Vercel deploy)

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

### Local pipeline replication

Copy this pipeline to any other Next.js web app:

1. Copy `.github/workflows/ci.yml` to your repo
2. Copy `.github/workflows/deploy.yml` to your repo
3. Add Vercel secrets to your GitHub repository settings
4. Ensure `npm run build` passes locally before pushing

## How to run tests locally

```bash
# Install dependencies
npm install

# Lint
npm run lint

# TypeScript check
npx tsc --noEmit

# Production build
npm run build

# Start dev server
npm run dev
```

## Monitoring

Recommended production monitoring:

- **Vercel Analytics** — Core Web Vitals, performance
- **Sentry** — Error tracking (add `@sentry/nextjs`)
- **LogRocket** — Session replay for debugging
- **UptimeRobot** — Uptime monitoring (free tier, 5-minute intervals)

## Pipeline for other web apps (OpenCode, etc.)

To replicate this pipeline for another Next.js app:

```
1. Copy .github/workflows/ to your other repo
2. Update vercel-project-id in deploy.yml
3. Add VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID to GitHub secrets
4. Ensure your app has:
   - next.config.js
   - tailwind.config.js
   - postcss.config.js
   - tsconfig.json with strict mode
   - npm run build script
5. Push to main — CI runs automatically, deploy on success
```

Stats you get from this pipeline:
- Build success/failure rate
- Lint error count
- TypeScript error count
- Build duration
- Deploy success/failure
- Vercel performance scores (via Vercel Analytics)
