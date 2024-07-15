import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Remove product from cart", () => {   
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
    
    test("verify that user can remove product from cart", async ({page}) => {
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
        // remove products from cart
        await cartPage.removeProductsFromCart();
    });
});