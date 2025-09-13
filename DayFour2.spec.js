// Below codes are auto generated along with this file through [npx playwright codegen -o tests/filename]

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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
  await page.getByRole('link', { name: 'Logout' }).click();
});