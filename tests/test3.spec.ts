import { test, expect, chromium } from "@playwright/test";

test.describe.parallel("LambdaTest Inputform Parallel Tests", () => {
  
  const capabilities3 = [
    {
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Sample Build',
        'name': 'Playwright Slider Test - Chrome',
        'user': 'anoopas',
        'accessKey': 'LT_pK0Rg2iikmXpeUJF0xqmbvtWRbyxxEA0Bag8vNVHhiOjk80',
        'network': true,
        'video': true,
        'console': true
      }
    },
    {
      'browserName': 'MicrosoftEdge',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Sample Build',
        'name': 'Playwright Slider Test - Edge',
        'user': 'anoopas',
        'accessKey': 'LT_pK0Rg2iikmXpeUJF0xqmbvtWRbyxxEA0Bag8vNVHhiOjk80',
        'network': true,
        'video': true,
        'console': true
      }
    }
  ];

  for (const capability of capabilities3) {

    test(`Form submission Test on ${capability.browserName}`, async () => {

      console.log("Initialising test::", capability["LT:Options"]["name"]);

      const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capability)
        )}`,
      });

      const page = await browser.newPage();
      test.setTimeout(120000);
      page.setDefaultTimeout(20000);

    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await page.getByText("Input Form Submit").click();

    await page.locator("//button[text()='Submit']").click();

    // Fill fields (locators preserved)
    await page.fill("#name", "Anoop");
    await page.fill("#inputEmail4", "anooptest@example.com");
    await page.fill("#inputPassword4", "Test@12345");
    await page.waitForTimeout(2000);
    await page.fill("#company", "Test Company");
    await page.fill("#websitename", "https://example.com");

    await page.selectOption("select[name='country']", { label: "United States" });

    await page.fill("#inputCity", "Mumbai");
    await page.fill("#inputAddress1", "Test Street 1");
    await page.fill("#inputAddress2", "Test Street 2");
    await page.fill("#inputState", "Maharashtra");
    await page.fill("#inputZip", "400001");

    await page.locator("//button[text()='Submit']").click();

    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    const message = page.locator("//p[text()='Thanks for contacting us, we will get back to you shortly.']");
    await expect(message).toBeVisible();

    await browser.close();
  });

}

});
