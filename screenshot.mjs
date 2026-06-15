import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Screenshot of index.html
await page.goto("http://localhost:3000/index.html", { waitUntil: "networkidle", timeout: 15000 });
await page.waitForTimeout(1000);
await page.screenshot({ path: "index-screen.png", fullPage: false });
console.log("index screenshot saved");

// Screenshot of explore.html (initial dialog state)
await page.goto("http://localhost:3000/explore.html", { waitUntil: "networkidle", timeout: 15000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: "explore-dialog.png", fullPage: false });
console.log("explore dialog screenshot saved");

// Type and send on explore
await page.fill("#seedTextarea", "思维");
await page.click("#dialogSend");
await page.waitForTimeout(800);
await page.screenshot({ path: "explore-canvas.png", fullPage: false });
console.log("explore canvas screenshot saved");

await browser.close();
