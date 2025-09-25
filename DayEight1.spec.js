import {test, expect} from '@playwright/test'

test.describe('Alerts',()=>{

// Force sequential execution  (to restrict parallel execution)
  test.describe.configure({ mode: 'serial' });  //If one test fails, the rest of the tests in that describe are skipped automatically.

test.beforeEach(async({page})=>{
    await page.goto("https://demo.automationtesting.in/Alerts.html");
    await expect(page).toHaveTitle("Alerts");
    await expect(page).toHaveURL("https://demo.automationtesting.in/Alerts.html");
})

test('1.Simple Alert',async({page})=>{
// Register the dialog handler --Dialog handler only checks message + accepts.
    page.on('dialog',async dialog=>{
    expect(dialog.type()).toContain('alert');          // vaidate the type of the alert window
    expect(dialog.message()).toContain('I am an alert box!');     // vaidate the text from the alert window
     dialog.accept();
    })
// Click on the alert button
    await page.click("(//a[@class='analystic'])[1]");  // Click the 1st global button
    await page.click("//button[@onclick='alertbox()']");  // Click the specific button 
    await page.waitForTimeout(2000);
})

test('2.Confirm Alert-OK',async({page})=>{
// Trigger the event before clicking alert button -- Register the dialog handler 
    page.on('dialog',async dialog=>{
    expect(dialog.type()).toContain('confirm');
    expect(dialog.message()).toContain('Press a Button !');
     dialog.accept(); // Close by clicking 'OK' button
})
// Click on the alert button
    await page.click("(//a[@class='analystic'])[2]");  // Click the 2nd global button
    await page.click("//button[@onclick='confirmbox()']");  // Click the specific button 
    await expect(page.locator("#demo")).toHaveText('You pressed Ok');    
    await page.waitForTimeout(2000);
})

test('2.Confirm Alert-Cancel',async({page})=>{
// Trigger the event before clicking alert button -- Register the dialog handler 
    page.on('dialog',async dialog=>{
    expect(dialog.type()).toContain('confirm');
    expect(dialog.message()).toContain('Press a Button !');
     dialog.dismiss(); // Close by clicking 'Cancel' button   
})
// Click on the alert button
    await page.click("(//a[@class='analystic'])[2]");  // Click the 2nd global button
    await page.click("//button[@onclick='confirmbox()']");  // Click the specific button 
    await expect(page.locator("#demo")).toHaveText('You Pressed Cancel'); 
    await page.waitForTimeout(2000);
})

test('3.Prompt Alert-OK',async({page})=>{
// Trigger the event before clicking alert button -- Register the dialog handler 
    page.on('dialog',async dialog=>{
    expect(dialog.type()).toContain('prompt');
    expect(dialog.message()).toContain('Please enter your name');
    expect(dialog.defaultValue()).toBe('Automation Testing user');
     dialog.accept('Preethi');         // Pass new text and Close by clicking 'Ok' button simultaneously
})
// Click on the alert button
    await page.click("(//a[@class='analystic'])[3]");  // Click the 3rd global button
    await page.click("//button[@onclick='promptbox()']");  // Click the specific button 
    await expect(page.locator("#demo1")).toHaveText('Hello Preethi How are you today');    
    await page.waitForTimeout(2000);
})

test('3.Prompt Alert-Cancel',async({page})=>{
// Trigger the event before clicking alert button -- Register the dialog handler 
    page.on('dialog',async dialog=>{
    expect(dialog.type()).toContain('prompt');
    expect(dialog.message()).toContain('Please enter your name');
    expect(dialog.defaultValue()).toBe('Automation Testing user');
     dialog.dismiss();    // Close by clicking 'Cancel' button
})
// Click on the alert button
    await page.click("(//a[@class='analystic'])[3]");  // Click the 3rd global button
    await page.click("//button[@onclick='promptbox()']");  // Click the specific button   
    await page.waitForTimeout(2000);
})



})
