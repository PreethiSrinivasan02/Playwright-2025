// Built-in Locators in Playwright:
// page.getByAltText()    → to locate an element, usually Images with alt attribute
// page.getByPlaceholder() → to locate an input by its placeholder text.
// page.getByRole()         → Elements with ARIA roles
// page.getByText()         → Any element with given text
// page.getByLabel()        → to locate a form control by associated label’s text. [eg: html: <label for="fullName">Employee Full Name</label> ] [code : await page.getByLabel('Employee Full Name').fill('Malli Konda');]
// page.getByTitle()        → to locate an element by its "title" attribute.
// page.getByTestId()       → to locate an element based on its "data-testid" attribute.

import {test, expect} from '@playwright/test'

test('Built-in Locators', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

//1. page.getByAltText() - to locate an element, usually Images with alt attribute
    const logo = await page.getByAltText('company-branding');
    await expect(logo).toBeVisible();
    
//2. page.getByPlaceholder() - to locate an input by its placeholder text.
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');

//3. page.getByRole() - to locate Elements with ARIA roles
                     //  ('role',  {attribute : 'value'})   --- syntax of getByRole method
    await page.getByRole('button',{type : 'submit'}).click();
    // Locate the profile name
    const profileName = await page.locator('//p[@class="oxd-userdropdown-name"]').textContent();  // to get the text
//4. page.getByText() → Any element with given text
    await expect(page.getByText(profileName)).toBeVisible();  // (Assertion by getting the profile name using 'getByText'))
    console.log(profileName);

//5. page.getByTitle() → to locate an element by its title attribute.
  const helpButton = await page.getByTitle('Help');
  await helpButton.click();
  await expect(helpButton).toBeVisible();


});