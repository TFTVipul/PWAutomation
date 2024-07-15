import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Add product to cart", () => {   
    let poManager: POManager;
    let productPage;
    let loginPage;
    let cartPage;

    test.beforeEach(async ({ page}) => {
        poManager = new POManager(page);
        loginPage = poManager.getLoginPage();
        productPage = poManager.getProductsPage();
        cartPage = poManager.getCartPage();
    });
    
    test("verify that user can add prodcuts to the cart", async ({page}) => {
        const products = [
            {
                name: "Blue Top",
                price: "Rs. 500",
                quantity: "1",
            },
            {
                name: "Men Tshirt",
                price: "Rs. 400",
                quantity: "1",
            }
        ]
        
        // login a user
        await loginPage.navigateToHomepage("/");
        // go to product page
        await loginPage.goToProductPage();
        // add product to cart
        await productPage.addProductToCart(products);
        // navigate to cart page
        await loginPage.navigateToCartPage();
        // verify products in cart
        await cartPage.verifyCartProducts(products);
    });
});