import { expect, Locator, Page } from "@playwright/test";

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
}
export default BasePage;
