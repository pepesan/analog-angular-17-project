import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'node:assert';

Given('I open the homepage', async function () {
  await this.page.goto('http://127.0.0.1:4173');
});

When('I increment the counter', async function () {
  const counter = this.page.getByRole('button', { name: 'Count 0' });
  await counter.click();
  await this.page.getByRole('button', { name: 'Count 1' }).waitFor();
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
