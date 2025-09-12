import {test, expect} from '@playwright/test'

test('Locating Multiple WebElements',async({page})=>{

    await page.goto('https://demoblaze.com/')
// 1. To locate all the links:
    // await page.$$('locator')  -- Command to locate multiple elements
    // Used anchor tag to locate multiple elements in a webpage
    const allLinks = await page.$$('a');
    // for loop
    for(const link of allLinks){
            const linkText = await link.textContent();
            console.log(linkText);
    }
    console.log("----------------------");
    console.log("The below are the texts of the products:");

// 2. To locate the all the products:
    await page.waitForSelector("//div[@id='tbodyid']//div//h4//a");      // wait for all elements to be loaded
    const allProducts = await page.$$("//div[@id='tbodyid']//div//h4//a");
   
    // Print total count of the located products
  console.log(`Total number of products: ${allProducts.length}`);
      
    // for loop
    let count = 1;
    for (const product of allProducts) {
        const productText = await product.textContent();
        console.log(`${count}. ${productText}`);
  count++;
}
})