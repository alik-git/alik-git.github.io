const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: ".",
  testMatch: "site.spec.js",
  timeout: 30000,
  use: {
    baseURL: process.env.SITE_URL || "http://127.0.0.1:4002",
    channel: process.env.BROWSER_CHANNEL,
    screenshot: "only-on-failure",
  },
  webServer: process.env.SITE_URL
    ? undefined
    : {
        cwd: require("node:path").resolve(__dirname, ".."),
        command: "python3 -m http.server 4002 --bind 127.0.0.1 --directory _site",
        url: "http://127.0.0.1:4002",
        reuseExistingServer: !process.env.CI,
      },
});
