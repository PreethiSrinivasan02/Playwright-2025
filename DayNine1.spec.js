import {test,expect} from '@playwright/test'

test.describe('IFrames',()=>{

    // Force sequential execution  (to restrict parallel execution)
  test.describe.configure({ mode: 'serial' });  //If one test fails, the rest of the tests in that describe are skipped automatically.

test.beforeEach(async({page})=>{
  await page.goto('https://ui.vision/demo/webtest/frames/');
  await expect (page).toHaveURL('https://ui.vision/demo/webtest/frames/');
})

test('1. Total frames',async({page})=>{
    const allFrames = page.frames();  // to get the total no. of frames present in a webpage
    console.log("Total no. of frames: ",allFrames.length);  //.length is a property, not a method
})

test('1. Approach 1 = Frame object => Name / Url',async({page})=>{  
// Name of the frame / URL of the frame  (Cannot use locator)
    //const frame0 = await page.frame('name value')         //1. Name of the frame
//Get into the frame via name/url, then interact with the inputbox.
    const frame1 = page.frame({url : 'https://ui.vision/demo/webtest/frames/frame_1.html'})   //2. Url of the frame
    await frame1.locator("//input[@name='mytext1']").fill("Frame 1");
    await page.waitForTimeout(2000);
})

test('1. Approach 2 = Frame Locator',async({page})=>{  
//Get into the frame via frameLocator(get from SelectorHub), then interact with the inputbox.
    const frame1 = page.frameLocator("frame[src='frame_1.html']").locator("//input[@name='mytext1']");
    await frame1.fill("Frame 1");
    await page.waitForTimeout(2000);
})

test('2. IFrame = frame 2,3,4',async({page})=>{  
//Get into the frame via frameLocator, then interact with the inputbox.
    const frame_2 = page.frameLocator("frame[src='frame_2.html']").locator("//input[@name='mytext2']");
    await frame_2.fill("Frame 2");
    await page.waitForTimeout(2000);

    const frame_3 = page.frameLocator("frame[src='frame_3.html']").locator("//input[@name='mytext3']");
    await frame_3.fill("Frame 3");
    await page.waitForTimeout(2000);
   
    const frame_4 = page.frameLocator("frame[src='frame_4.html']").locator("//input[@name='mytext4']");
    await frame_4.fill("Frame 4");
    await page.waitForTimeout(2000);
})

test('3. Nested frame (inside frame 3)',async({page})=>{  
     // Step 1: Get the parent frame
    const frame3 = page.frame({ url: /frame_3.html/ });

    // Step 2: Interact with input in frame 3
    await frame3.locator("//input[@name='mytext3']").fill("Frame 3");
    await page.waitForTimeout(2000);

    // Step 3: Get child frames of parent frame
    const childFrames = frame3.childFrames();
    console.log("Child frames inside frame 3:", childFrames.length);

    // Step 4: Interact inside nested frame (child frame 0)
    const innerFrame = childFrames[0];

    // Radio button
    await innerFrame.locator("(//div[@class='AB7Lab Id5V1'])[2]").click();
    await page.waitForTimeout(2000);

    // Checkbox
    await innerFrame.locator("(//div[@class='uHMk6b fsHoPb'])[1]").click();
    await page.waitForTimeout(2000);

    // Dropdown: click container first
    await innerFrame.locator("div[role='listbox']").waitFor({ state: 'visible', timeout: 5000 });
    await innerFrame.locator("div[role='listbox']").click();

    await page.waitForTimeout(1000);
    await innerFrame.locator("(//span[text()='Yes'])[2]").click();
    await page.waitForTimeout(2000);

    //Next button
    await childFrames[0].locator("(//span[@class='l4V7wb Fxmcue'])[2]").click();
    await page.waitForTimeout(2000);
})
})

