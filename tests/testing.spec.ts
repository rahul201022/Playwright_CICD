import { test, expect } from "@playwright/test";

test.beforeEach("User is able to login in application", async ({ page }) => {
  await page.goto("https://qa.loyaltylanders.com/login");
  await expect(page.getByText("LOYALTY LANDERS")).toBeVisible();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("rahulm@york.ie");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("Test@123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText("Testing-Store-Wolf", { exact: true }).click();
  await expect(page.getByText("My Landers")).toBeVisible();
});

test.only("User is able to publish Standard Video template", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByText("Templates").click();
  await expect(page.getByText("Standard Video Templates")).toBeVisible();
  await page
    .locator("div")
    .filter({ hasText: /^Standard Video TemplatesUse Template$/ })
    .getByRole("button")
    .click();
  await expect(page.getByText("Lander Details")).toBeVisible();
  await expect(page.getByText("Lander Title")).toBeVisible();
  await expect(page.getByText("Lander Description")).toBeVisible();
  await page.getByRole("textbox", { name: "* Lander Title" }).click();
  const landerName = "Test Automation Standard Template 01";
  await page.getByRole("textbox", { name: "* Lander Title" }).fill(landerName);
  await page.getByRole("textbox", { name: "Enter Here..." }).click();
  await page
    .getByRole("textbox", { name: "Enter Here..." })
    .fill("test description");
  await expect(page.getByText("Landers Configurations")).toBeVisible();
  await page.getByText("Landers Configurations").click();
  await expect(page.getByText("Standard")).toBeVisible();
  await expect(page.getByText("With Product Offer")).toBeVisible();
  await expect(page.getByText("Gated Offer")).toBeVisible();
  await page
    .getByRole("button", { name: "right Banner Configurations" })
    .click();
  await page.getByRole("button", { name: "right Select" }).click();
  await page.locator(".logo-wrapper").first().click();
  await page.getByRole("button", { name: "Choose Logo" }).click();
  await page.getByText("Logo (Light)").click();
  await page.getByRole("textbox", { name: "Banner Copy" }).click();
  await page.getByRole("textbox", { name: "Banner Copy" }).fill("Test banner");
  await page.getByRole("button", { name: "right eye Headline" }).click();
  await page.getByRole("textbox", { name: "Headline Text" }).click();
  await page
    .getByRole("textbox", { name: "Headline Text" })
    .fill("Test Headline Automation ");
  await page.getByRole("button", { name: "right Upload Media" }).click();
  await page.getByRole("button", { name: "Upload", exact: true }).click();

  await page
    .locator("video")
    .first()
    .evaluate((video) => {
      const v = video as HTMLVideoElement;
      v.removeAttribute("controls");
      v.muted = true;
      v.playsInline = true;
      v.style.pointerEvents = "auto"; // Ensures clicks work
    });
  const videolocator = page.locator("video").first();
  await videolocator.waitFor({ state: "visible", timeout: 50000 });
  //await page.waitForLoadState("networkidle");
  await videolocator.click();
  await page.getByRole("button", { name: "Add Video to Lander" }).click();

  // await page.locator("div.selection-mask").click();
  // await page.locator("//button[contains(.,'Add Video to Lander')]/span").click();
  await page.getByRole("button", { name: "right Manage CTA" }).click();
  await page.getByRole("textbox", { name: "Button Text" }).click();
  await page.getByRole("textbox", { name: "Button Text" }).fill("Get Offer");
  await expect(page.getByRole("button", { name: "Publish" })).toBeVisible();
  await page.getByRole("button", { name: "Publish" }).click();

  const confirmationMessage = await page.getByText(
    "The lander has been published."
  );
  await confirmationMessage.waitFor({ state: "visible", timeout: 50000 });
  await expect(page.locator("body")).toContainText(
    "The lander has been published."
  );

  const copyButton = page.getByRole("button", { name: "link" });
  await expect(copyButton).toBeVisible();
  await copyButton.click();
  await expect(page.getByText("Link Copied Successfully!")).toBeVisible();

  // Get clipboard content
  const clipboardText = await page.evaluate(() =>
    navigator.clipboard.readText()
  );

  //Redirect to new window to do verification
  const page1 = await context.newPage();
  console.log(clipboardText);
  await page1.goto(clipboardText);
  await expect(page1.locator("#video-element-main-div")).toContainText(
    "Test Headline Automation"
  );
  await expect(page1.locator("#footerElementID")).toContainText("Get Offer");
  await expect(page1.getByRole("link", { name: "logo" })).toBeVisible();
  await page.bringToFront();
  await page.locator("(//div[@class='ant-menu-submenu-title'])[1]").hover();
  await page
    .locator(
      "(//li[@class='ant-menu-item ant-menu-item-only-child']/span[text()='Landers'])[1]"
    )
    .click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("My Landers")).toBeVisible();
  // await expect(page.getByText('test 01')).toBeVisible();
  await expect(page.locator("tbody")).toContainText(landerName);
  await expect(page.locator("tbody")).toContainText("Standard Video Page");
});