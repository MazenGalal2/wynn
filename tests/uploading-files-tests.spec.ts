import { test, expect } from "@playwright/test";
import { BasePage } from "./base-file";
import fs from "fs";
import path from "path";

// Resolves the current file path (__filename) and directory path (__dirname) for ES module compatibility
const UTILITIES_DIR = "./tests/utilities-files";
const URL = "https://the-internet.herokuapp.com/upload";
let basepage: BasePage; // Declares a variable to hold an instance of ListPage

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  basepage = new BasePage(page); // Creates a new BasePage instance for interacting with base-related elements
});

test.afterEach(async ({ page }) => {
  page.close(); // Closes the browser page after each test
});

test.describe("UI Testing for the internet.herokuapp", () => {
  test("Uploading without files", async ({ page }) => {
    await basepage.clickUploadButtonWithoutFiles();
  });
  test("Uploading file with very long name", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser"); // Waits for a file chooser event (triggered when an upload dialog opens)
    await basepage.clickChooseFileButton();
    const fileChooser = await fileChooserPromise; // Waits for the file chooser to appear and captures its instance
    await fileChooser.setFiles(
      "tests/utilities-files/docx file_1MB as a text for uploading files with a long name.docx"
    );
    await basepage.clickUploadButton();
    await expect(page.getByRole("heading")).toContainText("File Uploaded!");
  });
  test("Uploading file with special characters in the name", async ({
    page,
  }) => {
    const fileChooserPromise = page.waitForEvent("filechooser"); // Waits for a file chooser event (triggered when an upload dialog opens)
    await basepage.clickChooseFileButton();
    const fileChooser = await fileChooserPromise; // Waits for the file chooser to appear and captures its instance
    await fileChooser.setFiles(
      "tests/utilities-files/docx file$$%%{wynn}.docx"
    );
    await basepage.clickUploadButton();
    await expect(page.getByRole("heading")).toContainText("File Uploaded!");
  });
  test("Uploading .zip file", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser"); // Waits for a file chooser event (triggered when an upload dialog opens)
    await basepage.clickChooseFileButton();
    const fileChooser = await fileChooserPromise; // Waits for the file chooser to appear and captures its instance
    await fileChooser.setFiles("tests/utilities-files/kick.zip");
    await basepage.clickUploadButton();
    await expect(page.getByRole("heading")).toContainText("File Uploaded!");
  });
  test("Uploading image(.jpg)", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser"); // Waits for a file chooser event (triggered when an upload dialog opens)
    await basepage.clickChooseFileButton();
    const fileChooser = await fileChooserPromise; // Waits for the file chooser to appear and captures its instance
    await fileChooser.setFiles("tests/utilities-files/first-Image.jpg");
    await basepage.clickUploadButton();
    await expect(page.getByRole("heading")).toContainText("File Uploaded!");
  });
  test("Uploading video(.mp4)", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser"); // Waits for a file chooser event (triggered when an upload dialog opens)
    await basepage.clickChooseFileButton();
    const fileChooser = await fileChooserPromise; // Waits for the file chooser to appear and captures its instance
    await fileChooser.setFiles("tests/utilities-files/wynn-las-vigas.mp4");
    await basepage.clickUploadButton();
    await expect(page.getByRole("heading")).toContainText("File Uploaded!");
  });
  test("Uploading xlsx", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser"); // Waits for a file chooser event (triggered when an upload dialog opens)
    await basepage.clickChooseFileButton();
    const fileChooser = await fileChooserPromise; // Waits for the file chooser to appear and captures its instance
    await fileChooser.setFiles("tests/utilities-files/sample.xlsx");
    await basepage.clickUploadButton();
    await expect(page.getByRole("heading")).toContainText("File Uploaded!");
  });
  test("Uploading pdf", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser"); // Waits for a file chooser event (triggered when an upload dialog opens)
    await basepage.clickChooseFileButton();
    const fileChooser = await fileChooserPromise; // Waits for the file chooser to appear and captures its instance
    await fileChooser.setFiles("tests/utilities-files/sample.pdf");
    await basepage.clickUploadButton();
    await expect(page.getByRole("heading")).toContainText("File Uploaded!");
  });

  test("Drag and drop all files in utilities-files", async ({ page }) => {
    // Read all file names from the utilities-files directory
    const files = fs.readdirSync(UTILITIES_DIR);
    // Loop through each file and upload it via drag-and-drop
    for (const fileName of files) {
      // Build the full path to the file
      const filePath = path.join(UTILITIES_DIR, fileName);
      // Use the BasePage helper to perform the drag-and-drop upload
      await basepage.dragAndDropFile("#drag-drop-upload", filePath, fileName);
      // Assert that the drop area contains the uploaded file name
      await expect(page.locator("#drag-drop-upload")).toContainText(fileName);
      await page.waitForTimeout(1000); // Wait a bit between uploads if needed
    }
  });
});
