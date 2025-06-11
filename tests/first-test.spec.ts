import { test } from "@playwright/test";

const URL = "https://the-internet.herokuapp.com/upload";
// let listpage: ListPage; // Declares a variable to hold an instance of ListPage
// const RandomListName = `Playwright_newList_${Math.random()}`;

// test.beforeEach(async ({ page }) => {
//   await page.goto(URL);
// //   listpage = new ListPage(page); // Creates a new ListPage instance for interacting with list-related elements
// //   await listpage.clickFormsandListsButtonPage();
// });

// test.afterEach(async ({ page }) => {
//   page.close(); // Closes the browser page after each test
// });

test.describe("Test run", () => {
  test("Testing", async ({ page }) => {
      await page.goto(URL);
      await page.waitForTimeout(6000); // Wait for 6 seconds to ensure the page is fully loaded
  });
});
