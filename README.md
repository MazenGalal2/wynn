# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Prerequisities

Node.js (v18 or later recommended)
npm (comes with Node.js)
Git (for cloning the repository and version control)
Playwright (installed via npm as a dev dependency)

## 📂 Detailed Component Descriptions

### `tests/utilities-files/`
This folder contains all the files used for upload testing.  
You can add any type of file here (images, PDFs, Excel files, videos, etc.), and the automated tests will pick up and attempt to upload each file in this directory.  
**Purpose:**  
- To provide a flexible and easily extendable set of test files for validating the file upload functionality.

---

### `tests/base-file.ts`
This file defines the `BasePage` class, which encapsulates common actions and helper methods for your Playwright tests.  
**Key features:**
- **Selectors for UI elements:** Provides easy access to the "Choose File" and "Upload" buttons.
- **Page verification methods:** Includes methods to verify main page texts and handle error scenarios.
- **Drag-and-drop helper:** Implements a robust `dragAndDropFile` method that simulates dragging and dropping a file onto the upload area using browser events and file data.
- **Reusability:** Centralizes common logic so your test files remain clean and focused on test scenarios.

---

### `tests/first-test.spec.ts` (Uploading Files Tests)
This is your main Playwright test file for file upload scenarios.  
**What it does:**
- **Iterates through all files in `utilities-files`:** Automatically finds and uploads each file in the folder.
- **Uses `BasePage` helpers:** Calls the `dragAndDropFile` method for each file.
- **Assertions:** After each upload, checks that the file name appears in the upload area, ensuring the upload was successful.
- **Debugging:** Optionally logs the upload area’s content for troubleshooting.

**Example test logic:**
```typescript
for (const fileName of files) {
  const filePath = path.join(UTILITIES_DIR, fileName);
  await basepage.dragAndDropFile("#drag-drop-upload", filePath, fileName);
  await expect(page.locator("#drag-drop-upload")).toContainText(fileName);
  await page.waitForTimeout(1000);
}
```

**In summary:**  
- `utilities-files` holds your test materials files.
- `base-file.ts` provides reusable page actions and drag-and-drop logic.
- `first-test.spec.ts` automates the upload and verification of all files in `utilities-files`.
---

