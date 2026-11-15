import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';

export const baseUrl = 'http://127.0.0.1:4173';
const serverLog = 'e2e-server.log';
let server;
let browser;

setDefaultTimeout(30_000);

BeforeAll({ timeout: 120_000 }, async function () {
  const log = createWriteStream(serverLog);
  server = spawn(process.execPath, ['node_modules/@angular/cli/bin/ng.js', 'serve', '--port', '4173'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.pipe(log, { end: false });
  server.stderr.pipe(log, { end: false });

  const deadline = Date.now() + 90_000;
  let ready = false;
  while (Date.now() < deadline && !ready) {
    if (server.exitCode !== null) {
      throw new Error(`Development server exited with code ${server.exitCode} (see ${serverLog})`);
    }
    try {
      ready = (await fetch(baseUrl)).ok;
    } catch {
      // The development server is not listening yet.
    }
    if (!ready) await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!ready) throw new Error(`Development server did not become ready (see ${serverLog})`);

  browser = await chromium.launch({ headless: true });
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
  if (server && server.exitCode === null) {
    const exited = new Promise((resolve) => server.once('exit', resolve));
    server.kill('SIGTERM');
    await exited;
  }
});
