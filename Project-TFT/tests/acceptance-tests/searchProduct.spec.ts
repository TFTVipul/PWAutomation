import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';
import { getRandomText } from '../utils/helper';

test.describe("Search Products", () => {   
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
    
    test("verify that user navigate to product page and search for a product", async ({page}) => {
        const searchText = "blue";
        const randomtext = getRandomText({ prefix: "TestUser" })
        // login a user
        await loginPage.navigateToHomepage("/");
        // Click on 'Products' button to naviagte to Products page
        await loginPage.goToProductPage();

        // Verify navigation to Products page
        await productsPage.verifyProductList();
        await productsPage.searchProduct(searchText, 7);
        await productsPage.searchProduct(randomtext, 0);
    });
});