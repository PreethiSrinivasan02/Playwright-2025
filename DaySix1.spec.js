import {test,expect} from '@playwright/test'

test('InputBox & Radiobuttons',async({page})=>{

    await page.goto('https://demo.automationtesting.in/Register.html');

//1. Inputbox - firstname

const firstName = page.locator("//input[@placeholder='First Name']");

  // await expect(page.locator("//input[@placeholder='First Name']")).toBeVisible();
  await expect(firstName).toBeVisible();
  await expect(firstName).toBeEmpty();
  await expect(firstName).toBeEditable();
  await expect(firstName).toBeEnabled();

    await firstName.fill("Preethi");
    // await page.fill(firstName, 'John');

    await page.waitForTimeout(5000); // pausing the execution for sometime

// 2. Radiobutton:

    const femaleRadio = page.locator("//input[@value='FeMale']");
    const maleRadio = page.locator("//input[@value='Male']");

// Female should be checked   
  await expect(femaleRadio).toBeVisible();
  await femaleRadio.check();        // check female radiobutton
  await expect(femaleRadio).toBeChecked();
// await expect((page.locator("//input[@value='FeMale']")).isChecked()).toBeTruthy();
  expect(await femaleRadio.isChecked()).toBeTruthy();

// Male should be unchecked
  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).not.toBeChecked();
  expect(await maleRadio.isChecked()).toBeFalsy();

    await page.waitForTimeout(3000); // pausing the execution for sometime
})