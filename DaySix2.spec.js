import {test,expect} from '@playwright/test'

test('Checkbox',async({page})=>{

 await page.goto('https://demo.automationtesting.in/Register.html');

// 1. Single checkbox
    await expect(page.locator('#checkbox1')).toBeVisible();
    page.locator('#checkbox1').check();
    await expect(page.locator('#checkbox1')).toBeChecked();
    expect((await page.locator('#checkbox1').isChecked())).toBeTruthy();

    await page.waitForTimeout(2000);

    page.locator('#checkbox1').uncheck();
    await expect(page.locator('#checkbox1')).not.toBeChecked();
    expect((await page.locator('#checkbox1').isChecked())).toBeFalsy();

// 2. Mutiple checkboxes
    const allcheckboxes = [ '#checkbox1',
                            '#checkbox2',
                            '#checkbox3' ];
// Check all the located checkboxes
   for(const checkbox of allcheckboxes)                         
   {
    await expect(page.locator(checkbox)).toBeVisible();
    await page.locator(checkbox).check();
    await expect(page.locator(checkbox)).toBeChecked();
    expect(await page.locator(checkbox).isChecked()).toBeTruthy();
   }

    await page.waitForTimeout(2000);

// Uncheck all the selected checkboxes
   for(const checkbox of allcheckboxes)
   {
    if(await page.locator(checkbox).isChecked())        // If they are checked, need to be unchecked
        await page.locator(checkbox).uncheck();  
        await expect(page.locator(checkbox)).not.toBeChecked();
        expect(await page.locator(checkbox).isChecked()).toBeFalsy();
   }
})