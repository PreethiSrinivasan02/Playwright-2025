import {test, expect} from '@playwright/test'

test('Soft Assertions',async({page})=>{
     test.setTimeout(60000); // 60 seconds

    await page.goto('https://demo.automationtesting.in/Register.html');

// Hard Assertions:
    // await expect(page).toHaveURL('https://demo.automationtesting.in/Register.html');
    // await expect(page).toHaveTitle('Register123');            // Intentionally fail the assertion
    // await expect(page.getByAltText('image not displaying')).toBeVisible();

// Soft Assertions:
    await expect.soft(page).toHaveURL('https://demo.automationtesting.in/Register.html');
    await expect.soft(page).toHaveTitle('Register123');             //1. Intentionally fail the assertion
    await expect.soft(page.getByAltText('image not displaying')).toBeVisible();
const firstName = page.getByPlaceholder('First Name')
    await expect.soft(firstName).toBeEnabled();
const submitBtn = page.locator('#submitbtn');
    await expect.soft(submitBtn).toHaveAttribute('name','signup');
const text = page.locator('.container.center h2');
    await expect.soft(text).toHaveText('Register123');           //2. Intentionally fail the assertion
const partialText = page.locator('.container.center h2');
    await expect.soft(partialText).toContainText('Reg');
const fName = page.getByPlaceholder('First Name')// Intentionally fail the assertion
    await fName.fill('Preethi');
    await expect.soft(fName).toHaveValue('Preethi');
})