import { test, expect, chromium } from "@playwright/test";

test.describe.parallel("LambdaTest Slider Parallel Tests", () => {
  
  const capabilities2 = [
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

  for (const capability of capabilities2) {

    test(`Drag & Drop Slider Test on ${capability.browserName}`, async () => {

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
      await page.getByText("Drag & Drop Sliders").click();

      const slider = page.locator("input[value='15']");
      const targetValue = 95;
      const output = page.locator("#rangeSuccess");

      while (true) {
        const currentValue = Number(await output.textContent());
        if (currentValue === targetValue) break;
        await slider.press("ArrowRight");
      }

      await expect(output).toHaveText(String(targetValue));

      await browser.close();
    });

  }

});
