import {test,expect} from '@playwright/test'

test('Hidden options dropdown', async ({page}) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

  await page.locator("[name='username']").fill('Admin');
  await page.locator("[name='password']").fill('admin123');
  await page.locator("[type='submit']").click();
  await page.waitForTimeout(3000);
// Navigate to PIM tab
  await page.locator("//span[normalize-space()='PIM']").click()
  await page.waitForTimeout(3000);

// CLick on the Job title dropdown
  page.locator("div:nth-child(6) div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1) div:nth-child(2) i:nth-child(1)").click();
   await page.waitForTimeout(3000);
  const allOptions = await page.$$("//div[@role='listbox']//span")

for(let option of allOptions){         //Options
    const jobText = await option.textContent();    // Text
   // Print all the options' text
    console.log("Job title is: ",jobText); 
      
    if(jobText.includes('HR Manager')){
        await option.click();   //Click the option
        await page.waitForTimeout(5000);
    //Print the text
        console.log("Currently selected option is: ",jobText.trim());   //Log the text that already extracted with textContent()
        break;
    }
}
})