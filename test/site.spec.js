const { test, expect } = require("@playwright/test");

test("home preserves profile, contact placement, navigation, dark mode and search", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.goto("/");
  await expect(page.locator(".profile img")).toHaveCount(2);
  await expect(page.locator('nav a[href="/cv.pdf"]')).toBeVisible();
  await expect(page.locator('nav a[href="https://anchor.fm/chatterpractice"]')).toBeVisible();
  expect(
    await page.locator(".social").evaluate((e) => e.compareDocumentPosition(document.querySelector("article h2")) & Node.DOCUMENT_POSITION_FOLLOWING)
  ).toBeTruthy();
  await page.locator("#light-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator("#search-toggle").click();
  await expect(page.locator("ninja-keys")).toHaveJSProperty("visible", true);
  expect(await page.locator("ninja-keys").evaluate((e) => e.data.map((item) => item.id))).toContain("nav-cv");
});

test("mobile navigation opens and content stays inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator('[data-nav-toggle="navbarNav"]').click();
  await expect(page.locator('nav a[href="/blog/"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
});

test("blog tags, project cards and publication controls remain usable", async ({ page }) => {
  await page.goto("/blog/");
  await expect(page.locator("h1")).toHaveText("ali's blog");
  const tag = page.locator('.tag-category-list a[href*="/blog/tag/"]').first();
  await expect(tag).toBeVisible();
  await tag.click();
  await expect(page.locator("article table a").first()).toBeVisible();
  await page.goto("/projects/");
  await expect(page.locator(".projects .card")).toHaveCount(6);
  await page.goto("/publications/");
  const abstract = page.locator("div.abstract").first();
  const collapsedHeight = (await abstract.boundingBox()).height;
  await page.locator("a.abstract.btn").first().click();
  await expect(abstract).toHaveClass(/open/);
  await expect.poll(async () => (await abstract.boundingBox()).height).toBeGreaterThan(collapsedHeight + 20);
});

test("manual accessibility check", async ({ page }) => {
  test.skip(!process.env.CHECK_ACCESSIBILITY, "Run through the manual accessibility workflow.");
  await page.goto("/");
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  const result = await page.evaluate(async () => window.axe.run());
  expect(result.violations.map((v) => ({ id: v.id, impact: v.impact }))).toEqual([]);
});
