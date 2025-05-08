import {expect, test} from "@playwright/test";

test("Basic Operations", async({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // console.log("Page title is: "+page.getByTitle);
    const userNameInput = page.locator("//input[@name='username']");
    console.log("Texbox placeholder: "+await userNameInput.getAttribute("placeholder"));
    expect(userNameInput).toHaveAttribute("placeholder","username");
    console.log("Before enter username: "+await userNameInput.inputValue());
    await userNameInput.type("Admin");
    console.log("After enter username: "+await userNameInput.inputValue());

    const passwordInput = page.locator("//input[@name='password']");
    passwordInput.fill("admin123");

    await page.locator("//button[@type='submit']").click();
    const txtDashboard= await page.locator("span h6");
    console.log(await txtDashboard.textContent());
    expect(txtDashboard).toHaveText("Dashboard");

})

test("Checkbox Demo", async({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/checkbox-demo");

    const chkCheckboxDemo = await page.locator("#isAgeSelected");
    expect(chkCheckboxDemo).not.toBeChecked();
    chkCheckboxDemo.check();
    expect(chkCheckboxDemo).toBeChecked();
})

test("Handling alerts", async({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");

    //JavaScript Alert
    // page.on("dialog",async(alert)=>{
    //     const alertMsg = alert.message();
    //     console.log(alertMsg);
    //     alert.accept();
    // })

    // page.locator("//button[text()='Click Me']").nth(0).click();

    // Confirm Box
    // page.on("dialog",async(alert)=>{
    //     const alertMsg = alert.message();
    //     console.log(alertMsg);
    //     alert.accept();
    // })

    // page.locator("//button[text()='Click Me']").nth(1).click();

    //prompt box
    page.on("dialog",async(alert)=>{
        const deValue = alert.defaultValue();
        console.log(deValue);
      //  alert.type("Testing Rahul");
        alert.accept("Hello Rahul");
    })

    await page.locator("//button[text()='Click Me']").nth(2).click();
    expect(page.locator("#prompt-demo")).toContainText("'Hello Rahul'");

})

test("Bootstrap alert message", async({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-alert-messages-demo");

    await page.locator("(//button[@type='button'])[1]").click();

    const alertmsg = await page.locator("//div[contains(@class,'alert alert-success')]").nth(0);
    await expect(alertmsg).toBeVisible(); 

})

test("Hanling Dropdown", async({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
     const ddl =  page.locator("#select-demo") 
     ddl.selectOption("Monday")
    // await page.selectOption("#select-demo",{
    //     label:"Sunday"
    // })
    await page.waitForTimeout(3000);
   await expect(ddl).toHaveValue("Monday");

   const multi = page.selectOption("#multi-select",[
    {
        label: "Florida"
    },
    {
        index:4
    },
    {
        value:"Washington"
    }
   ])
})
