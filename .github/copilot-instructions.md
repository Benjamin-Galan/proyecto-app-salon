## Purpose
This file gives concise, actionable guidance for AI coding agents working on this Laravel + Inertia (React) project so they can be productive immediately.

## Big picture (what this app is)
- Backend: Laravel (PHP 8.2+, app/). Routes live in `routes/*.php`. Pages are served via Inertia.
- Frontend: React + TypeScript mounted via Inertia (resources/js). Vite is the bundler (see `vite.config.ts`).
- Auth: Laravel Fortify provides authentication UI/actions (`app/Providers/FortifyServiceProvider.php`, `app/Actions/Fortify/`).
- Optional SSR: configured using `resources/js/ssr.tsx` and composer script `dev:ssr` that runs `php artisan pail` + `php artisan inertia:start-ssr`.

Read these files to understand concrete wiring:
- `routes/web.php` — where Inertia pages are mapped (example: `dashboard` route).
- `app/Providers/FortifyServiceProvider.php` — Fortify views and rate-limiting.
- `resources/js/app.tsx` and `resources/js/ssr.tsx` — Inertia client and server setup; pages resolved from `resources/js/pages/*.tsx`.
- `vite.config.ts` — Vite inputs and plugins (wayfinder, tailwind, ssr config).

## Key developer workflows (explicit commands)
- Full setup (creates .env, generates key, migrates DB, installs JS deps, builds):
```powershell
composer run setup
```
- Run the full dev stack (serves PHP, queue listener, and Vite dev server concurrently):
```powershell
composer run dev
```
- Run SSR-enabled dev (builds SSR bundle, runs pail and inertia SSR):
```powershell
composer run dev:ssr
```
- Frontend only dev/watch:
```powershell
npm run dev
```
- Build frontend assets (CSR and SSR bundles):
```powershell
npm run build
npm run build:ssr
```
- Run tests:
```powershell
composer run test
# or vendor/bin/phpunit
```
Notes: composer 'scripts' are defined in `composer.json` and are the recommended entry points because they orchestrate multiple services (server, queue, vite) via `concurrently`.

## Project-specific conventions & patterns
- Inertia pages: each page is a TSX file at `resources/js/pages/<Name>.tsx`. The server uses `Inertia::render('<name>')` to map to these pages (see `routes/web.php`).
- Page resolution: look at `resolvePageComponent` in `resources/js/app.tsx` — Inertia pages are discovered by Vite glob imports (`./pages/**/*.tsx`).
- Forms and UI: Tailwind is used; `resources/css/app.css` is Vite input.
- Wayfinder: used via `@laravel/vite-plugin-wayfinder` (configured in `vite.config.ts`) — look for `formVariants: true` which affects form component styling utilities.
- TypeScript: `tsconfig.json` enforces `strict: true` and sets path alias `@/*` -> `resources/js/*`. Use that alias when adding new modules.
- Auth wiring: Fortify views are Inertia views in `resources/js/pages/auth/*`. Custom Fortify actions are in `app/Actions/Fortify` (create/reset password).

## Integration points & cross-component communication
- Backend -> Frontend: server returns Inertia pages and props (see routes and Fortify provider). Shared props and title handling occur in `createInertiaApp`.
- SSR: The SSR entry `resources/js/ssr.tsx` uses `@inertiajs/react/server` and `react-dom/server` — server-side rendering uses the same page resolution as client.
- Background jobs: composer dev runs `php artisan queue:listen` — new background tasks should be queued via Laravel's queue system. Check `QUEUE_CONNECTION` in `.env`.

## Testing & CI notes
- `phpunit.xml` config runs tests using an in-memory SQLite DB (DB_CONNECTION=sqlite and DB_DATABASE=:memory:). Tests should be fast and isolated.
- Use `composer run test` locally or CI to run the test suite.

## Small examples (how to add common changes)
- Add a new page + route:
  1. Create `resources/js/pages/Reports.tsx`.
  2. Add route in `routes/web.php`: `Route::get('reports', fn() => Inertia::render('Reports'))->name('reports');`

- Change Fortify behavior: modify or add Actions in `app/Actions/Fortify/` and wire in `app/Providers/FortifyServiceProvider.php`.

## Where to look for more context
- `app/` — backend models, providers, controllers.
- `resources/js/pages/` — UI pages; `resources/js/components/` — shared components.
- `tests/` — feature and unit test examples (see `tests/Feature/DashboardTest.php`).

## What not to change lightly
- Do not modify `vite.config.ts` or `package.json` devDependencies without verifying platform-specific optional deps (rollup/tailwind native binaries) — builds can fail on different OSes.
- Don’t change Fortify or authentication flow files without adding tests; these are security-sensitive.

If anything here is unclear or missing, tell me which area you want expanded (for example, CI steps, Docker, or how SSR is hosted) and I will iterate.
