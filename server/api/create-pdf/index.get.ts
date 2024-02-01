import puppeteer from "puppeteer-core";

export default defineEventHandler(async () => {
  const browser = import.meta.dev
    ? await puppeteer.launch({
        executablePath: process.env.VITE_CHROME_EXECUTABLE_PATH,
        headless: "new",
      })
    : await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.VITE_BROWSERLESS_TOKEN}`,
      });
  const page = await browser.newPage();

  const websiteUrl = "https://dsm23-nuxt-portfolio.netlify.app/";

  await page.goto(websiteUrl, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    displayHeaderFooter: true,
    margin: { top: "50px", right: "50px", bottom: "50px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  return new Blob([pdf], { type: "application/pdf" });
});
