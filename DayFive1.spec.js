import {test, expect} from '@playwright/test'

test('Hard Assertions',async({page})=>{

    await page.goto('https://demo.automationtesting.in/Register.html');

//1. expect(page).toHaveURL()
    await expect(page).toHaveURL('https://demo.automationtesting.in/Register.html');
    
    const pageTitle = await page.title();
    console.log("Title of the page: ",pageTitle);   
//2. expect(page).toHaveTitle()
    await expect(page).toHaveTitle('Register');

//3. expect(locator).toBeVisible
    const logo = await page.getByAltText('image not displaying');
    await expect(logo).toBeVisible();

//4.a. expect(locator).toBeEnabled()
    const firstName = await page.getByPlaceholder('First Name')
    await expect(firstName).toBeEnabled();
//b. expect(locator).toBeDisabled()

//5. expect(locator).toBeChecked()
    const genderMale = await page.locator("//input[@value='Male']");
    await genderMale.click();
    await expect(genderMale).toBeChecked();

//6. expect(locator).toHaveAttribute() --Element is having specifc attribute or not
    const submitBtn = await page.locator('#submitbtn');
    await expect(submitBtn).toHaveAttribute('name','signup');

//7. expect(locator).toHaveText('text') --exact text match
    const text = await page.locator('.container.center h2');
    await expect(text).toHaveText('Register');

//8. expect(locator).toContainText() -- partial text match
    const partialText = await page.locator('.container.center h2');
    await expect(partialText).toContainText('Reg');

//9. expect(locator).toHaveValue(value)  --Input field is having value or not
    const fName = await page.getByPlaceholder('First Name')
    await fName.fill('Preethi');
    await expect(fName).toHaveValue('Preethi');

//10. expect(locator).toHaveCount(count)  -- List of options/links/elements present in the webpage
    const skills = await page.locator('#Skills option');
    const skillTexts = await skills.allTextContents();  // to get the text
    await expect(skills).toHaveCount(78);
    console.log("List of Skills: ", skills);
  
})