import { test, expect } from '@playwright/test';

test.describe('Multi-Select & De-select Dropdown', () => {

  // Force sequential execution  (to restrict parallel execution)
  test.describe.configure({ mode: 'serial' });  //If one test fails, the rest of the tests in that describe are skipped automatically.

  test.beforeEach(async ({ page }) => {
    await page.goto('https://testpages.eviltester.com/styled/basic-html-form-test.html');
        await page.waitForTimeout(2000);
  });

  // Multi-select dropdowns in Playwright don’t have a direct deselect() method.
  // So to deselect one option, you re-select everything else except that option

  test('1. Deselect by Index', async ({ page }) => {
    const dropdown = page.locator("select[name='multipleselect[]']");
    await page.waitForTimeout(2000);

    // Select index 2 (3rd option)
    await dropdown.selectOption({ index: 2 });
    let selected = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(o => o.text));
    console.log('Option at index 2 selected:', selected);
    await page.waitForTimeout(2000);

    // Deselect index 2 by selecting all except index 2
    const options = await dropdown.locator('option').all();     //Finds all <option> elements inside the dropdown.
    const values = await Promise.all(options.map(o => o.getAttribute('value')));    // Extracts the value attribute of every <option>
    values.splice(2, 1); // remove index 2,  (2 = index position; 1 = remove 1 element from that index)
    await dropdown.selectOption(values);      //Selects all options except the one removed at index 2.
    await page.waitForTimeout(2000);  
    selected = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(o => o.text));    //Reads the visible text of all currently selected options.
    console.log('After deselect index 2 -> selected:', selected);
  });

  test('2. Deselect by Value', async ({ page }) => {
    const dropdown = page.locator("select[name='multipleselect[]']");
    await page.waitForTimeout(2000);

    // Select by value
    await dropdown.selectOption({ value: 'ms2' });
    let selected = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(o => o.text));
    console.log('Option with value "ms2" selected:', selected);
    await page.waitForTimeout(2000);

    // Deselect by value (reselect everything except ms2)
    const options = await dropdown.locator('option').all();   //Finds all <option> elements inside the dropdown.
    const values = [];      // Creates an empty array to hold the values we want to keep selected.
    for (const option of options) {
      const val = await option.getAttribute('value');   //Reads the value attribute of that option.eg: ms2
      if (val !== 'ms2') values.push(val);      //Pushes every value except "ms2" into the values array
    }
    await dropdown.selectOption(values);    //Re-selects only the values in the values array
    await page.waitForTimeout(2000);
    selected = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(o => o.text));  //Gets the visible text of all selected options after the deselection.
    console.log('After deselect value "ms2" -> selected:', selected);
  });

  test('3. Deselect by Visible Text', async ({ page }) => {
    const dropdown = page.locator("select[name='multipleselect[]']");
    await page.waitForTimeout(2000);

    // Select by visible text
    await dropdown.selectOption({ label: 'Selection Item 1' });
    let selected = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(o => o.text));
    console.log('Option "Selection Item 1" selected:', selected);
    await page.waitForTimeout(2000);

    // Deselect by reselecting others
    const options = await dropdown.locator('option').all();     //Get all <option> elements
    const values = [];            // Creates an empty array to hold the values we want to keep selected.
    for (const option of options) {
      const text = await option.textContent();      //Read their visible text (textContent())
      if (text.trim() !== 'Selection Item 1') {     //Exclude the one with text = "Selection Item 1"
        values.push(await option.getAttribute('value'));    //Push the value attribute of others
      }
    }
    await dropdown.selectOption(values);  //Playwright will clear the current selection and re-select only what you passed in values array)
    await page.waitForTimeout(2000);
    selected = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(o => o.text));    // Collect the selected option texts
    console.log('After deselect "Selection Item 1" -> selected:', selected);
  });

  test('4. Get All Selected Options and Deselect All', async ({ page }) => {
    const dropdown = page.locator("select[name='multipleselect[]']");
    await page.waitForTimeout(2000);

    // Select all options
    const options = await dropdown.locator('option').all();       //gets all <option> elements inside the dropdown.
    const values = await Promise.all(options.map(o => o.getAttribute('value')));    //extracts their value attributes eg: ["ms1", "ms2", "ms3", "ms4"]
    await dropdown.selectOption(values);    //selects all of them at once
    await page.waitForTimeout(2000);

    // Print selected options
    let selected = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(o => o.text));
    console.log('All selected options:', selected);
    await page.waitForTimeout(2000);

    // Deselect all (simply pass empty array)
    await dropdown.selectOption([]);      //In Playwright, if you pass an empty array [] to .selectOption(), it deselects everything in a multi-select dropdown
    await page.waitForTimeout(2000);
    selected = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(o => o.text));
    if (selected.length === 0) {
      console.log('All the options are deselected');
    } else {
      console.log('Unable to deselect all');
    }
        await page.waitForTimeout(2000);
  });

});
