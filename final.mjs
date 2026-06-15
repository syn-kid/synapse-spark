import { chromium } from "playwright";

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

const errs = [];
p.on("pageerror", e => errs.push(e.message));
p.on("console", m => { if (m.type()==="error") errs.push(m.text()); });

// INDEX
await p.goto("http://localhost:3000/index.html", { waitUntil: "networkidle", timeout: 15000 });
await p.waitForTimeout(1000);
console.log("INDEX:", await p.title());

// Click Try Now
const btn = await p.$("a[href='explore.html']");
if (!btn) { console.log("FAIL: No Try Now link"); process.exit(1); }
await btn.click();
await p.waitForLoadState("networkidle");
await p.waitForTimeout(2000);
console.log("EXPLORE:", await p.title());

// Type + Send
await p.fill("#seedTextarea", "未来");
await p.click("#dialogSend");
await p.waitForTimeout(1000);

const n1 = await p.$$("#nodeLayer .node");
console.log("After send:", n1.length, "node(s)");

// Double-click expand
const r = await p.evaluate(() => {
  const node = document.querySelector("#nodeLayer .node");
  if (!node) return "NO_NODE";
  const {left,top,width,height} = node.getBoundingClientRect();
  const cx=left+width/2, cy=top+height/2;
  node.dispatchEvent(new MouseEvent("mousedown",{clientX:cx,clientY:cy,bubbles:true}));
  node.dispatchEvent(new MouseEvent("mouseup",{clientX:cx,clientY:cy,bubbles:true}));
  node.dispatchEvent(new MouseEvent("click",{clientX:cx,clientY:cy,bubbles:true}));
  node.dispatchEvent(new MouseEvent("mousedown",{clientX:cx,clientY:cy,bubbles:true}));
  node.dispatchEvent(new MouseEvent("dblclick",{clientX:cx,clientY:cy,bubbles:true}));
  node.dispatchEvent(new MouseEvent("mouseup",{clientX:cx,clientY:cy,bubbles:true}));
  node.dispatchEvent(new MouseEvent("click",{clientX:cx,clientY:cy,bubbles:true}));
  const nodes=document.querySelectorAll("#nodeLayer .node");
  return {count:nodes.length, words:[...nodes].map(n=>n.textContent.replace("★","").trim())};
});

console.log("After expand:", JSON.stringify(r));
console.log("Errors:", errs.length||"none");
console.log("\n" + (r.count>=6?"ALL PASS":"FAIL"));

await b.close();
