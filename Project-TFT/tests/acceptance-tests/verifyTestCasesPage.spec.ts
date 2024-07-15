import { expect, test } from '@playwright/test';
import { POManager } from '../pages/poManager';
import { TestCasePage } from '../pages/testCasesPage';

test.describe("Navigate to test cases page", () => {   
    let poManager: POManager;
    let loginPage;
    let testCasePage;

    test.beforeEach(async ({ page}) => {
        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        testCasePage = poManager.getTestCasesPage();
    });
    
    test("verify that user navigates to test cases page successfully", async ({page}) => {
        // login a user
        await loginPage.navigateToHomepage("/");
        // Click on 'Test Cases' button
        await page.click('text=Test Cases');

        // Verify navigation to Test Cases page
        await testCasePage.verifyTestCasesPage();
    });
});