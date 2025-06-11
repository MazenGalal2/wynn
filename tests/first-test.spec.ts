import { test, expect } from "@playwright/test";
import { BasePage } from "../tests/utilities-files/base-file";
/**
 * No need to import 'path' or use '__dirname' in Playwright tests for file uploads.
 * You can use a relative or absolute path directly.
 * Example:
 * await fileChooser.setFiles('tests/utilities-files/first-Image.jpg');
 */

// Resolves the current file path (__filename) and directory path (__dirname) for ES module compatibility

const URL = "https://the-internet.herokuapp.com/upload";
let basepage: BasePage; // Declares a variable to hold an instance of ListPage
// const RandomListName = `Playwright_newList_${Math.random()}`;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  basepage = new BasePage(page); // Creates a new BasePage instance for interacting with base-related elements
});

test.afterEach(async ({ page }) => {
  page.close(); // Closes the browser page after each test
});

test.describe("Test run", () => {
  test("Testing", async ({ page }) => {
    await page.waitForTimeout(6000); // Wait for 6 seconds to ensure the page is fully loaded
  });

  test("Uploading image(.jpg)", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser"); // Waits for a file chooser event (triggered when an upload dialog opens)
    await basepage.clickChooseFileButton();
    const fileChooser = await fileChooserPromise; // Waits for the file chooser to appear and captures its instance
    await fileChooser.setFiles("tests/utilities-files/first-Image.jpg");
    await page.waitForTimeout(2000); // Waits for 2 seconds to ensure the file is set
    await basepage.clickUploadButton();
    await page.waitForTimeout(2000);
    await expect(page.getByRole("heading")).toContainText("File Uploaded!");
  });
});
