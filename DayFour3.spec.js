// Below code generated through codegen via language specification command -[npx playwright codegen --target javascript]
// Slightly modified the import codeline and test block to execute successfully

const { test, expect } = require('@playwright/test');

test('Codegen - Adactin Hotel Booking flow', async ({ page }) => {
 
  await page.goto('https://adactinhotelapp.com/');
  await page.locator('#username').click();
  await page.locator('#username').press('CapsLock');
  await page.locator('#username').fill('P');
  await page.locator('#username').press('CapsLock');
  await page.locator('#username').fill('Preethi');
  await page.locator('#username').press('CapsLock');
  await page.locator('#username').fill('PreethiS');
  await page.locator('#username').press('CapsLock');
  await page.locator('#username').fill('PreethiSri');
  await page.locator('#password').click();
  await page.locator('#password').fill('pree@0212');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#location').selectOption('Sydney');
  await page.locator('#hotels').selectOption('Hotel Creek');
  await page.locator('#room_type').selectOption('Double');
  await page.locator('#room_nos').selectOption('2');
  await page.locator('#adult_room').selectOption('2');
  await page.locator('#child_room').selectOption('2');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
})