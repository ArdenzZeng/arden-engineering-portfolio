import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const playwrightPath = resolve(
  process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,
  "playwright/index.mjs",
);
const { chromium } = await import(pathToFileURL(playwrightPath));
const browser = await chromium.launch({ headless: true });
const failures = [];

await mkdir("artifacts", { recursive: true });

async function check(viewport, screenshot, mobile = false) {
  const page = await browser.newPage({ viewportSize: viewport });
  page.on("console", (message) => {
    if (message.type() === "error") failures.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => failures.push(`page: ${error.message}`));

  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await page.locator(".hero-copy").waitFor({ state: "visible" });

  if (mobile) {
    await page.locator(".nav-toggle").click();
    if ((await page.locator(".nav-toggle").getAttribute("aria-expanded")) !== "true") {
      failures.push("mobile navigation did not open");
    }
    await page.locator('#site-nav a[href="#projects"]').click();
  }

  await page.locator('[data-filter="Research"]').click();
  if ((await page.locator("[data-project-id]").count()) !== 1) {
    failures.push(`${mobile ? "mobile" : "desktop"} project filtering failed`);
  }
  await page.locator('[data-filter="All"]').click();
  await page.locator('[data-project-id="optical-alignment"]').click();
  if (!(await page.locator("[data-project-dialog]").isVisible())) failures.push("project dialog did not open");
  await page.locator(".dialog-close").click();

  const themeBefore = await page.locator("html").getAttribute("data-theme");
  await page.locator(".theme-toggle").click();
  const themeAfter = await page.locator("html").getAttribute("data-theme");
  if (themeBefore === themeAfter) failures.push("theme toggle failed");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) failures.push(`${mobile ? "mobile" : "desktop"} overflowed by ${overflow}px`);

  await page.screenshot({ path: screenshot, fullPage: true });
  await page.close();
}

await check({ width: 1440, height: 1000 }, "artifacts/desktop.png");
await check({ width: 390, height: 844 }, "artifacts/mobile.png", true);
await browser.close();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Desktop and mobile interaction checks passed.");
