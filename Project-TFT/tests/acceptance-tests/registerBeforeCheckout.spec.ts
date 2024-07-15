import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';
import { getRandomText } from '../utils/helper';

test.describe("Checkout before Register", () => {   
  let poManager: POManager;
  let productPage;
  let loginPage;
  let cartPage;
  let signupPage;
  test.beforeEach(async ({ page}) => {
      poManager = new POManager(page);
      loginPage = poManager.getLoginPage();
      productPage = poManager.getProductsPage();
      cartPage = poManager.getCartPage();
      signupPage = poManager.getSignupPage();
  });
  
  test("verify that user can checkout before registration and then create order", async ({page}) => {
    const user = {
      email: `${getRandomText({ prefix: "email" })}@sstk.com`,
      name: `${getRandomText({ prefix: "TestUser" })}`,
      title: "Mr.",
      password: "Test@123",
      newsletter: true,
      firstName: "Test",
      lastName: "User",
      street: "123 Main St",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      zipcode: "560001",
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
    await signupPage.registerUser(user);
    await signupPage.verifyUserLoggedIn(user.name);
    // go to product page
    await loginPage.goToProductPage();
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