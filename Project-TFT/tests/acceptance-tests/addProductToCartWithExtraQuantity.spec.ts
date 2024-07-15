import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Add product to cart with Extra Qunatity", () => {   
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
    
    test("verify that user can add number of products to cart", async ({page}) => {
       
        // login a user
        await loginPage.navigateToHomepage("/");
        // go to product page
        await loginPage.goToProductPage();

        const opts = {
            name: "Blue Top",
            price: "Rs. 500",
            quantity: "1",
            availability: "In Stock",
            condition: "New",
            brand: "Polo"
        }

        await productPage.goToProductDetails(opts);
        await productPage.changeQuantity(4);
        // navigate to cart page
        await loginPage.navigateToCartPage();
        const products = [
            {
                name: "Blue Top",
                price: "Rs. 500",
                quantity: "4",
            }
        ]
        await cartPage.verifyCartProducts(products);
    });
});