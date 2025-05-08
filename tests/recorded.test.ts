// import { test, expect } from '@playwright/test';

// // test('test', async ({ page }) => {
// //   await page.goto('https://demoqa.com/');
// //   await page.locator('div:nth-child(2) > div > .avatar > svg').click();
// //   await page.getByText('Elements').click();
// //   await page.getByText('Text Box').click();
// //   await page.getByRole('textbox', { name: 'Full Name' }).click();
// //   await page.getByRole('textbox', { name: 'Full Name' }).fill('Rahul');
// //   await page.getByRole('textbox', { name: 'Full Name' }).press('Tab');
// //   await page.getByRole('textbox', { name: 'name@example.com' }).fill('rahultest@123.com');
// //   await page.getByRole('textbox', { name: 'name@example.com' }).press('Tab');
// //   await page.getByRole('textbox', { name: 'Current Address' }).fill('Test address');
// //   await page.getByRole('textbox', { name: 'Current Address' }).press('Tab');
// //   await page.locator('#permanentAddress').fill('test per address');
// //   await page.getByRole('button', { name: 'Submit' }).click({
// //     button: 'right'
// //   });
// //   await page.getByRole('button', { name: 'Submit' }).click();
// //   await page.getByText('Name:Rahul').click();
// //   await page.getByText('Email:rahultest@123.com').click();
// //   await page.getByText('Permananet Address :test per').click();
// //   await page.getByText('Current Address :Test address').click();
// //   await page.getByText('Check Box').click();
  
// // });

// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://build-development.d4h4ppw98jki7.amplifyapp.com/login');

//   //const input = await page.locator("#0 xpath=(//input[@placeholder='Email'])[2]");


//   // const shadowHost = page.locator("//flutter-view[@flt-view-id='0']");
//   // const input = shadowHost.locator("(//input[@placeholder='Email'])[2]");

//   //const email = await page.locator("#shadow-host-for-open (//input[@placeholder='Email'])[2]");
//   const email = await page.locator("(//input[@placeholder='Email'])[2]");
//   email.first.evaluate("node => node.shadowRoot.innerHTML");
//   await email.click();
//   await email.fill('test1@gmail.com');

//   // await page.locator('flutter-view').click();
//   // await page.getByRole('textbox', { name: 'Password' }).fill('dsfdsfdsf');
// });

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://build-development.d4h4ppw98jki7.amplifyapp.com/login');

  const shadowHost = page.locator('shadow-host-selector'); // Change this


  const emailField = await shadowHost.locator("input[placeholder='Email']");
    // const passwordField = await shadowHost.locator('input[type="password"]');
    // const loginButton = await shadowHost.locator('button[type="submit"]');

    await emailField.fill("test@gmail.com");
    // await passwordField.fill("test");
    // await loginButton.click();

  // await page.goto('https://build-development.d4h4ppw98jki7.amplifyapp.com/login');

  // const locatorShowdow = page.locator("flutter-view[flt-view-id='0'] flt-glass-pane")
  // locatorShowdow.locator("form input[placeholder='Email']").click();
  // //locatorShowdow.locator("input[placeholder='Email']").fill("test@gmail.com");
  // await page.waitForTimeout(5000);
  //const email = await page.locator("input.flt-text-editing.transparentTextEditing");
  //const email = await page.fill("input.flt-text-editing.transparentTextEditing","test@gmail.com")
  
   
   //await page.waitForTimeout(5000);
  //  await email.click();
  //  await email.fill("test@gmail.com")
 

//   const emailHandle = await page.evaluateHandle(() => {
//     return document
//         .querySelector('shadow-host-selector') // Replace with actual shadow host selector
//         ?.shadowRoot?.querySelector('input[placeholder="Email"]');
// });

// const passwordHandle = await page.evaluateHandle(() => {
//     return document
//         .querySelector('shadow-host-selector') // Replace with actual shadow host selector
//         ?.shadowRoot?.querySelector('input[placeholder="Password"]');
// });

// // Convert JSHandle to ElementHandle
// const emailField = emailHandle.asElement();
// const passwordField = passwordHandle.asElement();

// if (emailField && passwordField) {
//     await emailField.type('your_email@example.com');
//     await passwordField.type('your_password');
// } else {
//     throw new Error('Email or Password field not found in Shadow DOM');
// }

});