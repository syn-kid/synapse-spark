import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

page.on("pageerror", err => console.log("ERR:", err.message));
page.on("console", msg => { if (msg.type() === "error") console.log("CONSOLE_ERR:", msg.text()); });

await page.goto("http://localhost:3000/explore.html", { waitUntil: "load", timeout: 10000 });
await page.waitForTimeout(2000);

// Check GSAP is NOT loaded (should use fallback now)
const hasGSAP = await page.evaluate(() => typeof gsap !== "undefined");
console.log("1. GSAP loaded:", hasGSAP ? "YES (CDN)" : "NO (using fallback)");

// Type and send
await page.fill("#seedTextarea", "设计");
await page.click("#dialogSend");
await page.waitForTimeout(1000);

// Check result
const nodesBefore = await page.$$("#nodeLayer .node");
console.log("2. Nodes after send:", nodesBefore.length);

// Double-click via JS (simulating real dblclick sequence)
const result = await page.evaluate(() => {
  const node = document.querySelector("#nodeLayer .node");
  if (!node) return "NO_NODE";
  const rect = node.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  
  // full event sequence
  node.dispatchEvent(new MouseEvent("mousedown", { clientX: cx, clientY: cy, bubbles: true }));
  node.dispatchEvent(new MouseEvent("mouseup", { clientX: cx, clientY: cy, bubbles: true }));
  node.dispatchEvent(new MouseEvent("click", { clientX: cx, clientY: cy, bubbles: true }));
  node.dispatchEvent(new MouseEvent("mousedown", { clientX: cx, clientY: cy, bubbles: true }));
  node.dispatchEvent(new MouseEvent("dblclick", { clientX: cx, clientY: cy, bubbles: true }));
  node.dispatchEvent(new MouseEvent("mouseup", { clientX: cx, clientY: cy, bubbles: true }));
  node.dispatchEvent(new MouseEvent("click", { clientX: cx, clientY: cy, bubbles: true }));
  
  const all = document.querySelectorAll("#nodeLayer .node");
  return { count: all.length, words: [...all].map(n => n.textContent.replace("★","").trim()) };
});

console.log("3. After dblclick:", JSON.stringify(result));

const pass = result.count >= 6;
console.log("\n=== " + (pass ? "PASS" : "FAIL") + " ===");
await browser.close();
