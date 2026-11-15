import { After, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';

const baseUrl = 'http://127.0.0.1:4173';
let server;
let browser;

setDefaultTimeout(30_000);

Before(async function () {
  server = spawn(process.execPath, ['node_modules/@angular/cli/bin/ng.js', 'serve', '--port', '4173'], {
    stdio: 'ignore',
  });
  server.on('error', (error) => {
    throw error;
  });

  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Development server exited with code ${server.exitCode}`);
    }
    try {
      const response = await fetch(baseUrl);
      if (response.ok) break;
    } catch {
      // The development server is not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (Date.now() >= deadline) throw new Error('Development server did not become ready');

  browser = await chromium.launch({ headless: true });
  this.page = await browser.newPage();
});

After(async function () {
  await browser?.close();
  if (server && server.exitCode === null) {
    const exited = new Promise((resolve) => {
      if (server.exitCode !== null) resolve();
      else server.once('exit', resolve);
    });
    server.kill('SIGTERM');
    await exited;
  }
});
