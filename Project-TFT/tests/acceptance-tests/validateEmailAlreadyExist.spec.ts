import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Register User with existing email", () => {   
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
    
    test("Validate that email already exist", async ({page}) => {
        // login a user
        await signupPage.navigateToHomepage("/");
        await signupPage.verifyEmailAlreadyExist(loginFixture.loginUser);
    });
});