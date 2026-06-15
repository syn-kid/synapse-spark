import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Collect ALL console messages
const consoleMsgs = [];
page.on("console", msg => consoleMsgs.push({ type: msg.type(), text: msg.text() }));
page.on("pageerror", err => consoleMsgs.push({ type: "pageerror", text: err.message }));

await page.goto("http://localhost:3000/explore.html", { waitUntil: "load", timeout: 15000 });
await page.waitForTimeout(3000);

// Check dialog state
const state = await page.evaluate(() => {
  const dialog = document.getElementById("dialogOverlay");
  const textarea = document.getElementById("seedTextarea");
  const sendBtn = document.getElementById("dialogSend");
  
  if (!dialog || !textarea || !sendBtn) return { error: "Missing elements", dialog: !!dialog, textarea: !!textarea, sendBtn: !!sendBtn };
  
  const ds = window.getComputedStyle(dialog);
  const ts = window.getComputedStyle(textarea);
  const ss = window.getComputedStyle(sendBtn);
  
  return {
    dialog: { display: ds.display, opacity: ds.opacity, zIndex: ds.zIndex, pointerEvents: ds.pointerEvents },
    textarea: { display: ts.display, disabled: textarea.disabled, readonly: textarea.readOnly },
    sendBtn: { display: ss.display, disabled: sendBtn.disabled, pointerEvents: ss.pointerEvents },
    hasGSAP: typeof gsap !== "undefined",
    hasState: typeof state !== "undefined",
    bodyChildren: document.body.children.length,
  };
});

console.log("Page state:", JSON.stringify(state, null, 2));

// Check for any overlay elements
const overlays = await page.evaluate(() => {
  const all = document.querySelectorAll("body > *");
  return [...all].map(el => ({
    tag: el.tagName,
    id: el.id,
    className: el.className?.substring(0, 40),
    zIndex: window.getComputedStyle(el).zIndex,
    pointerEvents: window.getComputedStyle(el).pointerEvents,
    position: window.getComputedStyle(el).position,
    display: window.getComputedStyle(el).display,
  }));
});
console.log("\nBody children:", JSON.stringify(overlays, null, 2));

// Check for errors
console.log("\nConsole messages:");
consoleMsgs.filter(m => m.type === "error" || m.type === "pageerror" || m.type === "warning").forEach(m => console.log(`  [${m.type}] ${m.text}`));

await browser.close();
