import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Add products by Brand", () => {   
    let poManager: POManager;
    let signupPage;
    let loginPage;
    let productsPage;


    test.beforeEach(async ({ page}) => {
        poManager = new POManager(page);
        signupPage = poManager.getSignupPage();
        loginPage = poManager.getLoginPage();
        productsPage = poManager.getProductsPage();
    });
    
    test("Selecting any brand using filters and add products to cart", async ({page}) => {
      const products = [
        {
            name: "Blue Top",
            price: "Rs. 500",
            quantity: "1",
        }
      ]  
      await loginPage.navigateToHomepage("/");
      await loginPage.goToProductPage();
      await productsPage.selectBrand("Polo");
      // add product to cart
      await productsPage.addProductToCart(products);
    });
});