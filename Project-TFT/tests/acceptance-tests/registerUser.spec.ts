import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';
import { getRandomText } from '../utils/helper';

test.describe("Register User", () => {   
    let poManager: POManager;
    let signupPage;
    let loginPage;

    test.beforeEach(async ({ page}) => {
        poManager = new POManager(page);
        signupPage = poManager.getSignupPage();
        loginPage = poManager.getLoginPage();
    });
    
    test("Register a user for e-commerce website", async () => {

        const user = {
            email: `${getRandomText({ prefix: "email" })}@sstk.com`,
            name: `${getRandomText({ prefix: "TestUser" })}`,
            title: "Mr",
            password: "Test@123",
            newsletter: true,
            firstName: "Test",
            lastName: "User",
            street: "123 Main St",
            country: "India",
            state: "Karnataka",
            city: "Bangalore",
            zipcode: "560001",
            mobile: "1234567890"
        }

        // Register a user
        await signupPage.navigateToHomepage("/");
        await signupPage.clickSignUp();
        await signupPage.registerUser(user);
        await signupPage.deleteUser();
    });
});