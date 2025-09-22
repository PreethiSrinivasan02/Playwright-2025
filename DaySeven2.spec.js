import { test, expect } from '@playwright/test';

test('Multi-Select Dropdown', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://testpages.eviltester.com/styled/basic-html-form-test.html');
   await page.waitForTimeout(2000);
  const dropdown = page.locator("select[name='multipleselect[]']");

  // Select multiple options
  await dropdown.selectOption(['ms1', 'ms3']);
   await page.waitForTimeout(2000);
  // Capture selected options text
  const selectedTexts = await dropdown.evaluate(el =>
    Array.from(el.selectedOptions).map(o => o.text)
  );
   await page.waitForTimeout(2000);
  console.log('Selected multiple options ->', selectedTexts);

  // Assertion: Verify exact options selected
  expect(selectedTexts).toEqual(['Selection Item 1', 'Selection Item 3']);

  // Assertion: Check one of the options exists
  expect(selectedTexts).toContain('Selection Item 1');

  // Assertion: Verify number of selected options
  expect(selectedTexts.length).toBe(2);
     await page.waitForTimeout(2000);
});
