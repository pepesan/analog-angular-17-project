# Analog App For Angular 22

This project was generated with [Analog](https://analogjs.org), the fullstack meta-framework for Angular.

## Setup

Run `npm install` to install the application dependencies.

Requires Node.js `^22.22.3`, `^24.15.0`, or `>=26.0.0`.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:5173/`. The application automatically reloads if you change any of the source files.

## Build

Run `npm run build` to build the client/server project. Client artifacts are in `dist/client`; server artifacts are in `dist/ssr`.

## Test

Run `npm run test` to run unit tests with [Vitest](https://vitest.dev).

Run `npx playwright install chromium` once to install the browser, then `npm run e2e` to run the Cucumber/Playwright end-to-end scenarios.

Run `npm run test:coverage` to run the Vitest suite and generate code-coverage reports in `coverage/`.

## Rendering examples (SSR, SSG, hydration)

Linked from the home page. Each shows where and when its HTML was generated (`renderedOn` / `renderedAt`, kept across hydration with `TransferState`, see `src/app/shared/render-info.ts`).

- `/ssr` — **SSR**: HTML rendered on the server for every request. It also fetches `/api/v1/time` on the server; the response is transferred to the browser, so hydration does not repeat the request. Reloading shows `servidor`; arriving through an in-app link shows `navegador` (client-side rendering).
- `/ssg` — **SSG**: listed in `prerender.routes` in `vite.config.ts`, so `npm run build` writes `dist/analog/public/ssg/index.html` once and its date never changes until the next build.
- `/hydration` — **Hydration**: `provideClientHydration(withEventReplay(), withIncrementalHydration())`, a `@defer (hydrate on interaction)` block, and a component opted out with `ngSkipHydration`.

To try the production behaviour: `npm run build && PORT=3000 node dist/analog/server/index.mjs`.

## Docker

`./00_create_and_push_image.sh [version]` builds and pushes `pepesan/analog-app` (requires a prior `docker login`); `./01_launch.sh` runs it on port 3002. The image is built with `npm ci` from `package-lock.json` and runs as the non-root `node` user.

## Community

- Visit and Star the [GitHub Repo](https://github.com/analogjs/analog)
- Join the [Discord](https://chat.analogjs.org)
- Follow us on [Twitter](https://twitter.com/analogjs)
- Become a [Sponsor](https://github.com/sponsors/brandonroberts)
