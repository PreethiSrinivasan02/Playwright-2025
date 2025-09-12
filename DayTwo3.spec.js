const {test, expect} = require ('@playwright/test');
// import {test, expect} from '@playwright/test'

// Test Block. (Load 'page' fixture inside anonymous function which performs all actions)
test('Homepage',async({page})=>{

 await page.goto('https://www.way2automation.com/way2auto_jquery/registration.php#load_box');
    
    const pageTitle = await page.title();
console.log('Title of the Page is: ',pageTitle);
// Validation
await expect(page).toHaveTitle('Welcome');

    const pageUrl = await page.url();
console.log('Url of the page is: ',pageUrl);
// Validation
await expect(page).toHaveURL('https://www.way2automation.com/way2auto_jquery/registration.php#load_box');

await page.close();

})