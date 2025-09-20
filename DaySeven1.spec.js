import{test, expect} from '@playwright/test'

test('Single Dropdown',async({page})=>{

 await page.goto('https://demo.automationtesting.in/Register.html');

    await page.locator('#Skills').selectOption({label:'Adobe InDesign'}); //1. Select by 'label'-keyword, visible text
await page.waitForTimeout(3000);
    await page.locator('#Skills').selectOption('Android');      //2.a) Select by visible text
await page.waitForTimeout(3000);
    await page.locator('#Skills').selectOption({value:'Analytics'});   //3. Select by value
await page.waitForTimeout(3000);
    await page.locator('#Skills').selectOption({index:5});      //4. Select by index
await page.waitForTimeout(3000);
    await page.selectOption("#Skills",'Android');      //2.b) Select by visible text
await page.waitForTimeout(3000);

//1. Check number of options present in a dropdown:
    const allOptions = await page.$$('#Skills option');     // $$ - returns element in array
    console.log("Total no.of options: ", allOptions.length);

    expect(allOptions.length).toBe(78); // Check expected count after printing it.
    // Print all the options
    console.log("The below are the list of options present in the dropdown:")
    for(const option of allOptions){
        const text = await option.textContent();
       console.log(text?.trim());
    }

//2. Check presence of option in the dropdown    
     const allOptionsText = await page.locator('#Skills option').allTextContents();  // captures the content of the element 
        if (allOptionsText.includes('Android')) {
    console.log('Android option is present in the dropdown');
    }
     else {
    console.log('Android option is not present in the dropdown');
    }

//3. Select specific option from the dropdown
    const options = await page.$$('#Skills option');  // get all <option> elements
   for (const option of options) {
        const value = await option.textContent();
        if (value?.trim() === 'Android') {  // target option
            await page.selectOption('#Skills', value.trim());
            console.log(`Selected option: ${value.trim()}`);
            break;  // stop loop once found
        }
    }
    await page.waitForTimeout(2000);
})


