import { expect, Locator, Page } from "@playwright/test";
import fs from 'fs';

export  const UTILITIES_DIR = "./tests/utilities-files";
export class BasePage {
  readonly page: Page;
  readonly ChooseFileButton: Locator;
  readonly UploadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ChooseFileButton = page.getByRole('button', { name: 'Choose File' });
    this.UploadButton = page.getByRole('button', { name: 'Upload' });
  }
  
  async mainPageTextsVerification() {
    await expect(this.page.getByRole("heading")).toContainText("File Uploader");
    await expect(this.page.getByRole("paragraph")).toContainText(
      "Choose a file on your system and then click upload. Or, drag and drop a file into the area below."
    );
  }
  async clickUploadButtonWithoutFiles() {
    await this.UploadButton.click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByRole("heading")).toContainText(
      "Internal Server Error"
    );
  }
  async clickChooseFileButton() {
    await this.ChooseFileButton.click();
  }
  async clickUploadButton() {
    await this.UploadButton.click();
  }
  async dragAndDropFile(targetSelector: string, filePath: string, fileName: string) {
    const buffer = fs.readFileSync(filePath);
    await this.page.evaluate(
      async ({ selector, name, bufferBase64 }) => {
        const target = document.querySelector(selector);
        const bStr = atob(bufferBase64);
        const n = bStr.length;
        const u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
          u8arr[i] = bStr.charCodeAt(i);
        }
        const file = new File([u8arr], name);
        const dt = new DataTransfer();
        dt.items.add(file);

        const event = new DragEvent('drop', {
          dataTransfer: dt,
          bubbles: true,
          cancelable: true,
        });
        if (target) {
          target.dispatchEvent(event);
        } else {
          throw new Error(`Element with selector "${selector}" not found.`);
        }
      },
      { selector: targetSelector, name: fileName, bufferBase64: buffer.toString("base64") }
    ); 
  }
}
export default BasePage;
