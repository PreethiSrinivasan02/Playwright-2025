import {test, expect} from '@playwright/test'

test('Bootstrap dropdown',async({page})=>{

    await page.goto("https://admirhodzic.github.io/multiselect-dropdown/demo.html?");
    await page.waitForTimeout(2000);

 // click on the 2nd dropdown
    await page.locator("(//div[@class='multiselect-dropdown'])[2]").click(); 

//Locate all the options present in the dropdown  
    const allOptions = page.locator(".multiselect-dropdown-list input[type=checkbox]");    
    await page.waitForTimeout(2000);
    // 1. Assertion for the count of options     
    await expect(allOptions).toHaveCount(71);

//Locate all the options present in the dropdown  with $$
    const allOptions2 =  await page.$$(".multiselect-dropdown-list input[type=checkbox]");  
    await page.waitForTimeout(2000);
    // 2. Length of options
    expect(allOptions2.length).toBe(71);

// Select options from the drodpown
     const allOptions3 =  await page.$$(".multiselect-dropdown-list label"); // need to find a locator with a text, eg: text is present only inside the label tag not input.
    for (let option of allOptions3)
     {
        const textOfOption = (await option.textContent())?.trim();
        console.log("Option is: ", textOfOption);              //  //Print all the options present in the drodpown

        if (textOfOption?.includes("Abarth") || textOfOption?.includes("Tesla")) {
        // Find the associated input inside this label
        const checkbox = await option.$("input[type='checkbox']");
        if (checkbox) {
            await checkbox.click();
            await page.waitForTimeout(2000);

            // Validation: check if it is checked
               const isChecked = await checkbox.isChecked();
                expect(isChecked).toBe(true);
        }
    }
}
    await page.waitForTimeout(2000);
})