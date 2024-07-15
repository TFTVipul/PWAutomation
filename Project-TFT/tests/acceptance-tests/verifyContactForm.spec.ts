import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Contact Form details", () => {   
    let poManager: POManager;
    let contactPage;
    let homePage;

    test.beforeEach(async ({ page}) => {
        poManager = new POManager(page);
        contactPage = poManager.getContactPage();
        homePage = poManager.getHomePage();
    });
    
    test("verify that contact form is working as expected", async ({page}) => {
        const userDetails = {
            name: "test",
            email: "test@test.com",
            subject: "validate contact form",
            message: "Testing in progress"
        } 
        // login a user
        await homePage.navigateToHomepage("/");
        await homePage.goToContactPage();
        await contactPage.fillContactDetails(userDetails);
    });
});