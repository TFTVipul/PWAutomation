import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';
import { getRandomText } from '../utils/helper';

test.describe("Login before Checkout", () => {   
  let poManager: POManager;
  let productPage;
  let loginPage;
  let cartPage;
  let signupPage;
  let loginFixture;

  test.beforeAll(async () => {
    loginFixture = require("../fixtures/loginDetails.json");
  });

  test.beforeEach(async ({ page}) => {
    poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    productPage = poManager.getProductsPage();
    cartPage = poManager.getCartPage();
    signupPage = poManager.getSignupPage();
  });
  
  test("verify that user can enter email address and subscribe for newsletter", async ({page}) => {
    const user = {
      email: `${getRandomText({ prefix: "email" })}@sstk.com`,
      name: `${getRandomText({ prefix: "TestUser" })}`,
      title: "Mr.",
      password: "Test@123",
      newsletter: true,
      firstName: "Test",
      lastName: "User",
      street: "28, B/h Gujarat Bottling, Rakhial",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      zipcode: "380023",
      mobile: "1234567890"
    }
    
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
    ];
      
    // login a user
    await loginPage.navigateToHomepage("/");
    await signupPage.clickSignUp();
    await loginPage.loginUser(loginFixture.loginUser);
    await loginPage.verifyUserLoggedIn(loginFixture.loginUser);
    // remove products if there is any in cart
    await loginPage.navigateToCartPage();
    await cartPage.removeProductsFromCart();
    // go to product page
    await cartPage.goToProductPage();
    // add product to cart
    await productPage.addProductToCart(products);
    // navigate to cart page
    await loginPage.navigateToCartPage();
    // verify products in cart
    await cartPage.verifyCartProducts(products);
    // navigate to checkout page
    await cartPage.proceedToCheckout();
    await cartPage.verifyAddressDetails(user);
    await cartPage.verifyCartProducts(products);
    await cartPage.placeOrder();
    const paymentDetails = {
        name: "Test User",
        cardNumber: "4242424242424242",
        cvc: "123",
        expiryMonth: "12",
        expiryYear: "2023"
    }
    await cartPage.enterPaymentDetails(paymentDetails);
    await cartPage.verifyPaymentSuccess();
    await cartPage.downloadInvoice();
  });
});