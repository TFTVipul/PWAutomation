import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Catrt Page: Email Subscription", () => {   
    let poManager: POManager;
    let homePage;
    let loginPage;

    test.beforeEach(async ({ page}) => {
        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        homePage = poManager.getHomePage();
    });
    
    test("verify that user can enter email address and subscribe for newsletter from cart page", async ({page}) => {
        // login a user
        await loginPage.navigateToHomepage("/");
        await loginPage.navigateToCart();
        await homePage.subscribeEmail("test13@gmail.com");
    });
});