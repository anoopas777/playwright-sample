import { test, expect, chromium } from "@playwright/test";

test.describe.parallel("LambdaTest Parallel Tests", () => {
  
  const capabilities = [
    {
      'browserName': 'Chrome',
      'browserVersion': 'latest',
      'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Sample Build',
        'name': 'Chrome Parallel Test',
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
        'name': 'Edge Parallel Test',
        'user': 'anoopas',
        'accessKey': 'LT_pK0Rg2iikmXpeUJF0xqmbvtWRbyxxEA0Bag8vNVHhiOjk80',
        'network': true,
        'video': true,
        'console': true
      }
    }
  ];

  for (const capability of capabilities) {
    test(`Run on ${capability.browserName}`, async () => {
      
      console.log("Running:", capability["LT:Options"]["name"]);

      const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capability)
        )}`,
      });

      const page = await browser.newPage();
      await page.goto("https://www.lambdatest.com/selenium-playground/");
      await page.getByText("Simple Form Demo").click();

      await expect(page).toHaveURL(/.*simple-form-demo/);

      const message = "Welcome to Lambda Test"; 
      const inputBox = page.locator("//input[@id='user-message']"); 
      await inputBox.fill(message); 
      await page.locator('#showInput').click(); 
      const outputText = await page.locator('#message').textContent(); 
      expect(outputText?.trim()).toBe(message);

      await browser.close();
    });
  }

});
