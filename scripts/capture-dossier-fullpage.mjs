/**
 * Full-page dossier capture for visual review.
 * Scrolls the page first so Framer whileInView content renders, then screenshots.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public/screenshots/compare");

const pages = [
  { id: "openai-v1", url: "http://localhost:3000/openai" },
  { id: "openai-v2", url: "http://localhost:3000/openai/v2" },
];

async function hydratePage(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const max = document.body.scrollHeight;
    for (let y = 0; y <= max; y += 480) {
      window.scrollTo(0, y);
      await delay(120);
    }
    window.scrollTo(0, 0);
    await delay(400);
  });
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const entry of pages) {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2,
    });

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(entry.url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.waitForTimeout(800);
    await hydratePage(page);

    const pngPath = path.join(outDir, `${entry.id}-capture.png`);
    const jpgPath = path.join(outDir, `${entry.id}-capture.jpg`);

    await page.screenshot({ path: pngPath, fullPage: true, type: "png" });
    await page.screenshot({ path: jpgPath, fullPage: true, type: "jpeg", quality: 90 });

    const size = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    }));

    console.log(`${entry.id}: ${size.width}x${size.height}px`);
    console.log(`  PNG: ${pngPath}`);
    console.log(`  JPG: ${jpgPath}`);

    await page.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
