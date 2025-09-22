import { test, expect } from '@playwright/test';

test.describe('Static Select Dropdown', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to app
    await page.goto('https://adactinhotelapp.com/');
      await page.waitForTimeout(2000);
    // Login
    await page.fill('#username', 'SriPree0');
    await page.fill('input[name="password"]', 'preesri002');
    await page.click('//input[contains(@value,"Login")]');
    await page.waitForTimeout(2000);
    // Verify login worked
    await expect(page).toHaveTitle(/Adactin.com/);
  });

  test('Select By Index - Location dropdown', async ({ page }) => {
    const locationDropdown = page.locator('#location');

    // Get all options
    const options = await locationDropdown.locator('option').allTextContents();
    console.log('Total options:', options.length);

    if (options.length > 2) {
      // Select by index (2 = 3rd element)
      await locationDropdown.selectOption({ index: 2 });
      const selected = await locationDropdown.inputValue();
      console.log('Selected by index (2):', selected);
      expect(options[2]).not.toBeNull();
    } else {
      console.warn('Not enough options to select index 2');
    }
  });

  test('Select By Visible Text - Hotels dropdown', async ({ page }) => {
      await page.waitForTimeout(2000);
    const hotelDropdown = page.locator('#hotels');
    const options = await hotelDropdown.locator('option').allTextContents();

    if (options.includes('Hotel Hervey')) {
      await hotelDropdown.selectOption({ label: 'Hotel Hervey' });
      const selected = await hotelDropdown.inputValue();
      console.log('Selected by visible text:', selected);
      expect(selected).toBe('Hotel Hervey'); // Will match option label
    } else {
      console.warn('Hotel Hervey not found in dropdown');
    }
  });

  test('Select By Value - Room Type dropdown', async ({ page }) => {
      await page.waitForTimeout(2000);
    const roomDropdown = page.locator('#room_type');
    const values = await roomDropdown.locator('option').evaluateAll(opts => opts.map(o => o.value));

    if (values.includes('Deluxe')) {
      await roomDropdown.selectOption({ value: 'Deluxe' });
      const selectedValue = await roomDropdown.inputValue();
      console.log('Selected by value:', selectedValue);
      expect(selectedValue).toBe('Deluxe');
    } else {
      console.warn('Deluxe not found as a value in room_type dropdown');
    }
  });
});
