import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const errors = [];
page.on("pageerror", err => errors.push(err.message));
page.on("console", msg => { if (msg.type() === "error") errors.push(msg.text()); });

// Step 1: Open index.html
await page.goto("http://localhost:3000/index.html", { waitUntil: "networkidle", timeout: 15000 });
await page.waitForTimeout(1500);
console.log("1. Index page: OK — " + await page.title());

// Step 2: Click "Try Now" → navigate to explore.html
const tryNow = await page.$("a[href='explore.html']");
if (!tryNow) { console.log("FAIL: Try Now button not found"); process.exit(1); }
await tryNow.click();
await page.waitForLoadState("networkidle");
await page.waitForTimeout(2000);
console.log("2. Navigate to explore: OK — " + await page.title());

// Step 3: Check WebGL iridescence background loaded
const iriContainer = await page.$(".iridescence-container");
const iriCanvas = await page.$(".iridescence-container canvas");
console.log("3. Iridescence bg container:", iriContainer ? "FOUND" : "MISSING");
console.log("   Iridescence bg canvas:", iriCanvas ? "FOUND" : "MISSING");

// Step 4: Click identity avatar
const devAvatar = await page.$("#identityRow .identity-avatar.developer");
if (devAvatar) {
  await devAvatar.click();
  await page.waitForTimeout(200);
  const sel = await devAvatar.evaluate(el => el.classList.contains("selected"));
  console.log("4. Identity select (developer):", sel ? "OK" : "FAIL");
}

// Step 5: Type word and send
await page.fill("#seedTextarea", "创意");
await page.waitForTimeout(100);
await page.click("#dialogSend");
await page.waitForTimeout(800);

// Step 6: Verify canvas has nodes
const nodes = await page.$$("#nodeLayer .node");
console.log("5. Canvas nodes after send:", nodes.length > 0 ? `OK (${nodes.length} nodes)` : "FAIL");

// Step 7: Verify dock bar
const dockVisible = await page.$eval("#dockBar", el => el.classList.contains("visible"));
console.log("6. Dock bar visible:", dockVisible ? "OK" : "FAIL");

// Step 8: Switch identity via dock
const dockWriter = await page.$("#dockAvatars .dock-avatar.writer");
if (dockWriter) {
  await dockWriter.click();
  await page.waitForTimeout(200);
  const sel = await dockWriter.evaluate(el => el.classList.contains("selected"));
  console.log("7. Dock identity switch (writer):", sel ? "OK" : "FAIL");
}

console.log("\nPage errors:", errors.length > 0 ? errors.join("\n  ") : "none");

const allPass = iriContainer && iriCanvas && nodes.length > 0 && dockVisible;
console.log("\n=== " + (allPass ? "ALL CHECKS PASSED" : "SOME CHECKS FAILED") + " ===");

await browser.close();
