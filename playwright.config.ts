import { defineConfig, devices } from "@playwright/test";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require("dotenv").config();

export const STORAGE_STATE = "./tests/state.json";
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retries are disabled because our e2e tests mutate the dataset => retries for some tests are pointless */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
//   timeout: !process.env.PLAYWRIGHT_BASE_URL ? 5 * 60 * 1000 : 30000,
  // timeout: 5 * 60 * 10000, //TODO: Decrease
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "https://the-internet.herokuapp.com/upload",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    // headless: false // Run in headless mode on CI, otherwise run in headed mode
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"]},
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"]},
    // },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"]},
    },
  ],
});
