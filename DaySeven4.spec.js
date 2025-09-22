import { test, expect } from '@playwright/test';

test('Dynamic Dropdown Selection - India', async ({ page }) => {
  // Navigate to the practice page
  await page.goto('https://codenboxautomationlab.com/practice/');
   await page.waitForTimeout(2000);

  // Type "Ind" into the autocomplete box
  const dynamicInput = page.locator('#autocomplete');
  await dynamicInput.fill('Ind');
   await page.waitForTimeout(2000);

  // Wait for suggestions to appear
  await page.waitForSelector('.ui-menu-item div');

  // Get all suggestion options
  const options = await page.$$('.ui-menu-item div');

  for (const option of options) {
    const text = await option.textContent();
    if (text?.trim() === 'India') {
      await option.click();
      break;
    }
  }
 await page.waitForTimeout(2000);
  // Assertion: Verify "India" is selected
  await expect(dynamicInput).toHaveValue('India');
   await page.waitForTimeout(2000);
});
