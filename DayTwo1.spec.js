const {test, expect} = require ('@playwright/test');
// import {test, expect} from '@playwright/test'

// Test Block. (Load 'page' fixture inside anonymous function which performs all actions)
test('Homepage',async({page})=>{

 await page.goto('https://demo.automationtesting.in/Register.html');
    
    const pageTitle = await page.title();
console.log('Title of the Page is: ',pageTitle);
// Validation
await expect(page).toHaveTitle('Register');

    const pageUrl = await page.url();
console.log('Url of the page is: ',pageUrl);
// Validation
await expect(page).toHaveURL('https://demo.automationtesting.in/Register.html');

await page.close();

})