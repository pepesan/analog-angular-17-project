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

## Docker

`./00_create_and_push_image.sh [version]` builds and pushes `pepesan/analog-app` (requires a prior `docker login`); `./01_launch.sh` runs it on port 3002. The image is built with `npm ci` from `package-lock.json` and runs as the non-root `node` user.

## Community

- Visit and Star the [GitHub Repo](https://github.com/analogjs/analog)
- Join the [Discord](https://chat.analogjs.org)
- Follow us on [Twitter](https://twitter.com/analogjs)
- Become a [Sponsor](https://github.com/sponsors/brandonroberts)
