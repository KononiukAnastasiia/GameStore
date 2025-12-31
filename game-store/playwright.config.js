import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  // ✅ Автоматично запускаємо сервер і фронт
  webServer: [
    {
      command: "npm run dev -- --host 127.0.0.1 --port 5173",
      url: "http://localhost:5173",
      reuseExistingServer: true,
      timeout: 60_000
    },
    {
      command: "npm --prefix server start",
      url: "http://localhost:4000/api/health",
      reuseExistingServer: true,
      timeout: 60_000
    }
  ],

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } }
  ]
});
