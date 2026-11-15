import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'node:assert';
import { baseUrl } from '../support/hooks.js';

Given('I open the homepage', async function () {
  await this.page.goto(baseUrl);
});

When('I increment the counter', async function () {
  const counter = this.page.getByRole('button', { name: /^Count \d+$/ });
  const before = Number((await counter.innerText()).replace('Count ', ''));
  await counter.click();
  await this.page.getByRole('button', { name: `Count ${before + 1}` }).waitFor();
});

When('I navigate to the About page', async function () {
  await this.page.getByRole('link', { name: 'Go About' }).click();
});

Then('I should see the About page and a link back home', async function () {
  await this.page.getByText('Hello Analog', { exact: true }).waitFor();
  assert.equal(await this.page.getByRole('link', { name: 'Go Back Home' }).getAttribute('href'), '/');
});

When('I open product {int}', async function (productId) {
  await this.page.getByRole('link', { name: `Producto ${productId}` }).click();
});

When('I open the nested product {int}', async function (productId) {
  await this.page.getByRole('link', { name: 'Go Sub Home' }).click();
  await this.page.getByRole('link', { name: `Product ${productId}` }).click();
});

When('I open an unknown route', async function () {
  await this.page.getByRole('link', { name: 'Not found1' }).click();
});

Then('I should see product ID {int}', async function (productId) {
  await this.page.getByRole('heading', { name: `ID: ${productId}` }).waitFor();
});

Then('I should see the not-found page and a link back home', async function () {
  await this.page.getByRole('heading', { name: 'Page Not Found' }).waitFor();
  assert.equal(await this.page.getByRole('link', { name: 'Go Back Home' }).getAttribute('href'), '/');
});

When('I load the {string} page directly', async function (path) {
  this.initialResponse = await this.page.goto(`${baseUrl}/${path}`);
});

When('I open the SSR example', async function () {
  await this.page.getByRole('link', { name: 'Ejemplo SSR' }).click();
});

Then('the page was rendered on the {string}', async function (where) {
  const label = this.page.getByTestId('rendered-on');
  await label.waitFor();
  assert.equal(await label.innerText(), where);
});

Then('the API time is shown', async function () {
  await this.page.getByTestId('api-time').filter({ hasText: /^\d{4}-/ }).waitFor();
});

Then('the rendered date is kept after hydration', async function () {
  const html = await this.initialResponse.text();
  const served = html.match(/data-testid="rendered-at">([^<]+)</)?.[1];
  assert.ok(served, 'the served HTML must contain the render date');
  const shown = await this.page.getByTestId('rendered-at').innerText();
  assert.equal(shown, served);
});

Then('the hydration page reports {string}', async function (value) {
  await this.page.getByTestId('hydrated').filter({ hasText: value }).waitFor();
});

Then('the deferred block hydrates on interaction', async function () {
  const button = this.page.getByRole('button', { name: /Bloque diferido/ });
  await button.click();
  await this.page.getByRole('button', { name: 'Bloque diferido: 1' }).waitFor();
});
