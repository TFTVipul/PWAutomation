import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Navigate to Products page", () => {   
    let poManager: POManager;
    let loginPage;
    let testCasePage;
    let productsPage;

    test.beforeEach(async ({ page}) => {
        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        testCasePage = poManager.getTestCasesPage();
        productsPage = poManager.getProductsPage();
    });
    
    test("verify that user navigate to product page and all products are visible with details", async ({page}) => {
        // login a user
        await loginPage.navigateToHomepage("/");
        // Click on 'Products' button to naviagte to Products page
        await loginPage.goToProductPage();
        // Verify navigation to Products page
        await productsPage.verifyProductList();

        const opts = {
            name: "Blue Top",
            price: "Rs. 500",
            quantity: "1",
            availability: "In Stock",
            condition: "New",
            brand: "Polo"
        }
        await productsPage.goToProductDetails(opts);
    });
});