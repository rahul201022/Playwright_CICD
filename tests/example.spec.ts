// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
import { test, expect ,Browser, chromium,BrowserContext } from '@playwright/test';
let newpage;
test.beforeEach('User is able to login in application', async ({ browser, page }) => {
    const context: BrowserContext = await browser.newContext({
        permissions: ['clipboard-read', 'clipboard-write'] // Grant clipboard access
    });
     newpage = await context.newPage();
  await newpage.goto('https://qa.loyaltylanders.com/login');
  await expect(newpage.getByText('LOYALTY LANDERS')).toBeVisible();
  await newpage.getByRole('textbox', { name: 'Email' }).click();
  await newpage.getByRole('textbox', { name: 'Email' }).fill('rahulm@york.ie');
  await newpage.getByRole('textbox', { name: 'Password' }).click();
  await newpage.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await newpage.getByRole('button', { name: 'Login' }).click();
  await newpage.getByText('Testing-Store-Wolf', { exact: true }).click();
  await expect(newpage.getByText('My Landers')).toBeVisible();
})
test.only('User is able to publish SCA with Standard Video template', async ({  }) => {
  await newpage.getByText('Templates').click();
  await expect(newpage.getByText('SCA With Standard Video')).toBeVisible();
  await newpage.locator('div').filter({ hasText: /^SCA With Standard VideoUse Template$/ }).getByRole('button').click();
  await expect(newpage.getByText('Lander Details')).toBeVisible();
  await expect(newpage.getByText('Lander Title')).toBeVisible();
  await expect(newpage.getByText('Lander Description')).toBeVisible();
  await newpage.getByRole('textbox', { name: '* Lander Title' }).click();
  const landerName =  "Test Automation SCA Standard Video Template 01";
  await newpage.getByRole('textbox', { name: '* Lander Title' }).fill(landerName);
  await newpage.getByRole('textbox', { name: 'Enter Here...' }).click();
  await newpage.getByRole('textbox', { name: 'Enter Here...' }).fill('test description');
  await expect(newpage.getByText('Web Configurations')).toBeVisible();
  await newpage.getByText('Web Configurations').click();
  await newpage.getByRole('textbox', { name: 'Banner Copy' }).click();
  await newpage.getByRole('textbox', { name: 'Banner Copy' }).fill('Test banner copy');
  await newpage.getByRole('button', { name: 'right Manage CTA' }).click();
  await expect(newpage.getByText('Button Text')).toBeVisible();
  await newpage.getByRole('textbox', { name: 'Button Text' }).click();
  await newpage.getByRole('textbox', { name: 'Button Text' }).fill('Click me');
  await newpage.getByText('Mobile Configurations').click();
  await newpage.getByRole('button', { name: 'right Banner Configurations' }).click();
  await newpage.getByRole('button', { name: 'right Select' }).click();
  await newpage.locator('.logo-wrapper').first().click();
  await newpage.getByRole('button', { name: 'Choose Logo' }).click();
  await newpage.getByText('Logo (Light)').click();
  await newpage.getByRole('textbox', { name: 'Banner Copy' }).click();
  const strBannerCopy = "Test banner copy"
  await newpage.getByRole('textbox', { name: 'Banner Copy' }).fill(strBannerCopy);
  await newpage.getByRole('button', { name: 'right Upload Media' }).click();
  await newpage.getByRole('button', { name: 'Upload', exact: true }).click();
  const videolocator=await newpage.locator("(//div[@class='videos'])[1]");
  await videolocator.waitFor({ state: 'visible',timeout: 5000000  });
  await videolocator.click();
  await newpage.getByRole('button', { name: 'Add Video to Lander' }).click();
  await newpage.getByRole('button', { name: 'right Product Buy Box' }).click();
  await newpage.getByRole('textbox', { name: 'eye Product Callout' }).click();
  await newpage.getByRole('textbox', { name: 'eye Product Callout' }).fill('callout');
  await newpage.getByRole('button', { name: 'right Manage CTA' }).click();
  await expect(newpage.getByRole('button', { name: 'Publish' })).toBeVisible();
  await newpage.getByRole('button', { name: 'Publish' }).click();
  const confirmationMessage = await newpage.getByText('The lander has been published.');
  await confirmationMessage.waitFor({ state: 'visible',timeout: 50000  });
  await expect(newpage.locator('body')).toContainText('The lander has been published.');
  await expect(newpage.getByRole('button', { name: 'link' })).toBeVisible();
  const link = await newpage.locator("span[aria-label='link']");
  await link.click();
  await newpage.evaluate(() => {
    const originalCopyFunction = document.execCommand;
    document.execCommand = function (command) {
        if (command === 'copy') {
            console.log('Copy command triggered');
        }
        return originalCopyFunction.apply(this, arguments);
    };
});
  const copiedLink = await newpage.evaluate(async () => {
    return await navigator.clipboard.readText()
  });
  console.log(copiedLink);
  //Redirect to new window to do verification
  const context = await newpage.context();
  const newpage1 = await context.newPage();
 await newpage1.goto(copiedLink);
//  const urlText = await newpage.locator("span[aria-label='link']").innerText();
//   console.log(urlText);
//   const newpage1 = await context.newnewpage();
//   await newpage1.goto(urlText);
  await expect(newpage1.locator('#banner_copy')).toContainText(strBannerCopy);
  await expect(newpage1.getByRole('link', { name: 'logo' })).toBeVisible();
  await newpage.pause();
const h4Text = await newpage1.locator('h4').textContent();
  await expect(h4Text.trim()).toBe(strBannerCopy);
  await newpage.bringToFront();
  await newpage.locator("(//div[@class='ant-menu-submenu-title'])[1]").hover();
  await newpage.locator("(//li[@class='ant-menu-item ant-menu-item-only-child']/span[text()='Landers'])[1]").click();
  await newpage.getByRole('button', { name: 'Continue' }).click();
  await expect(newpage.getByText('My Landers')).toBeVisible();
  await expect(newpage.locator('tbody')).toContainText(landerName);
  await expect(newpage.locator('tbody')).toContainText('SCA With Standard Video');
});