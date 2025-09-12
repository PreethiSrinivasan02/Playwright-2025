import {test, expect} from '@playwright/test'

test('Locating Single WebElements',async({page})=>{

await page.goto('https://demoblaze.com/')
     
    const pageTitle = await page.title();
console.log('Title of the Page is: ',pageTitle);
await expect(page).toHaveTitle('STORE');

    const pageUrl = await page.url();
console.log('Url of the page is: ',pageUrl);
await expect(page).toHaveURL('https://demoblaze.com/');

// Click on the Login header menu - 1. Attribute locator
    await page.locator('id=login2').click();
    // await page.click('id=login2');

// Enter username and password - 2. CSS locator
    await page.locator('#loginusername').fill("Preethisn");
    //await page.fill('#loginusername','Preethisn');
    //await page.type('#loginusername','Preethisn');

    // "input[attribute='value']" -- aslo a CSS locator
    await page.locator("input[id='loginpassword']").fill("test@123");

// Click on Login button - 3.Xpath
    await page.click("//button[@onclick='logIn()']");

// Validate Log out button visibility after successful log in -- Xpath
    const logOut = await page.locator("//a[@id='logout2']");
    await expect(logOut).toBeVisible();

// Close the browser
    await page.close();
})