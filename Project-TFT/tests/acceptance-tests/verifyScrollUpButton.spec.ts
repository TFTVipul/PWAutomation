import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Verify Scroll up button", () => {   
    let poManager: POManager;
    let signupPage;
    let loginPage;
    let loginFixture;

    test.beforeAll(async () => {
        loginFixture = require("../fixtures/loginDetails.json");
    });

    test.beforeEach(async ({ page}) => {
        poManager = new POManager(page);
        signupPage = poManager.getSignupPage();
        loginPage = poManager.getLoginPage();
    });
    
    test("Register a user for e-commerce website", async ({page}) => {
        // login a user
        await loginPage.navigateToHomepage("/");
        await loginPage.verifyScrollUpButtonVisible();
    });
});