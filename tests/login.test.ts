import {chromium, expect, test} from "@playwright/test"


test("Login test demo", async() => {

     const browser = await chromium.launch({headless:false});
     const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://dev-app.packback.co/login");


    let locat= await page.getByPlaceholder("Username");
    locat.clear();
    locat.fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button",{name:'Login'}).click();
    await page.waitForTimeout(5000);
    await page.getByText("//h6[text()='Dashboard']").isVisible();

    await page.fill("//input[@placeholder='Username']","Admin23");
    await page.fill("//input[@placeholder='Password']","admin123");
    await page.click("//button[text()=' Login ']");
    await page.waitForTimeout(5000);
    await page.isVisible("//h6[text()='Dashboard']");

})
// test('test', async ({ page }) => {
//     await page.goto('https://dev-app.packback.co/login');
//     await page.getByRole('button', { name: 'Accept on this Device' }).click();
//     await page.getByRole('textbox', { name: 'Packback Email Address*' }).click();
//     await page.getByRole('textbox', { name: 'Packback Email Address*' }).fill('rahul.mistry+instru@packback.co');
//     await page.getByRole('textbox', { name: 'Packback Email Address*' }).press('Tab');
//     await page.getByRole('textbox', { name: 'Password*' }).fill('');
//     await page.getByRole('textbox', { name: 'Packback Email Address*' }).click();
//     await page.getByRole('textbox', { name: 'Packback Email Address*' }).press('ControlOrMeta+a');
//     await page.getByRole('textbox', { name: 'Packback Email Address*' }).press('ControlOrMeta+c');
//     await page.getByRole('textbox', { name: 'Password*' }).click();
//     await page.getByRole('textbox', { name: 'Password*' }).fill('rahul.mistry+instru@packback.co');
//     await page.getByRole('button', { name: 'Log In', exact: true }).click();
//     await page.getByText('We weren\'t able to log you in').click({
//       button: 'right'
//     });
//     await expect(page.getByRole('alert')).toContainText('We weren\'t able to log you in. The email or password you entered was incorrect.');
//     await page.getByRole('textbox', { name: 'Password*' }).click();
//     await page.getByRole('textbox', { name: 'Password*' }).press('ControlOrMeta+a');
//     await page.getByRole('textbox', { name: 'Password*' }).fill('Test@2912');
//     await page.getByRole('button', { name: 'Log In', exact: true }).click();
//     await page.locator('iframe[title="Button to launch messaging window"]').contentFrame().getByRole('button', { name: 'Open messaging window' }).click();
//     await page.locator('iframe[name="Messaging window"]').contentFrame().getByRole('textbox', { name: 'Type a message' }).click();
//     await page.locator('iframe[name="Messaging window"]').contentFrame().getByRole('textbox', { name: 'Type a message' }).fill('Hello');
//     await page.locator('iframe[name="Messaging window"]').contentFrame().getByRole('textbox', { name: 'Type a message' }).click();
//     await page.locator('iframe[name="Messaging window"]').contentFrame().getByRole('textbox', { name: 'Type a message' }).fill('hello');
//     await page.locator('iframe[name="Messaging window"]').contentFrame().getByRole('button', { name: 'Send message' }).click();
//     await page.locator('iframe[name="Messaging window"]').contentFrame().getByRole('button', { name: 'Yes' }).click();

//      const page2 = await browser.newPage();  // Creating a new page in the same browser context
//     //const [page2] = await Promise.all([ context.waitForEvent('page'), // Wait for the new tab 
//     page.locator('a[target="_blank"]').click() // Click a link that opens a new tab ]);

//     await page2.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dgoogle%26oq%3Dgoogle%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDUzNjlqMGoxqAIAsAIB%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DjS-8Z7WJO6Ln1e8Pi9GqwA0&q=EgRu489jGI7f8L0GIjAYaccOnV5OTsxSaUGjHu_bg8-M_fuoL44Q1EfF2KQ1167T0968PCGGGH2EVrq6DCEyAXJaAUM');
//     await page2.goto('https://dev-app.packback.co/my-communities/current-communities');
//     await page2.getByRole('link', { name: 'Test Jira ticket ENG-2585 -' }).click();
//     await page2.getByRole('link', { name: 'Writing Assignments', exact: true }).click();
//     await page.locator('.questions-link').click();
//     await page2.getByRole('link', { name: 'Go to Polls' }).click();
//     await page2.getByRole('link', { name: 'Manage Assignments' }).click();
//     await page2.getByRole('button', { name: 'Add Assignment' }).click();
//     await page.getByRole('link', { name: 'Go to Writing Assignments' }).click();
//     await page.getByRole('link', { name: 'Manage Assignments' }).click();
//     await page.getByRole('link', { name: 'Add Assignment' }).click();
//     await page2.getByRole('textbox', { name: 'Assignment Name' }).click();
//     await page2.getByText('Back to Manage Poll AssignmentsEdit Poll Assignment Test Jira ticket ENG-2585').click();
//     await page.getByRole('link', { name: 'Select a Saved Prompt' }).click();
//     await page.getByRole('link', { name: 'Select the prompt titled API TEST11' }).click();
//     await page.getByRole('button', { name: 'Publish Assignment' }).click();
//     await page2.getByRole('button', { name: 'Save Assignment' }).click();
  // });