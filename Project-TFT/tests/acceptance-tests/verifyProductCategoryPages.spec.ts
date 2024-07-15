import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';

test.describe("Login User", () => {   
    let poManager: POManager;
    let signupPage;
    let loginPage;
    let productPage;

    test.beforeEach(async ({ page}) => {
      poManager = new POManager(page);
      signupPage = poManager.getSignupPage();
      loginPage = poManager.getLoginPage();
      productPage = poManager.getProductsPage();
    });
    
    test("Register a user for e-commerce website", async ({page}) => {
      let category = "Women";
      let subCategory = "Dress";
      let title = "Women - Dress Products";
      // login a user
      await loginPage.navigateToHomepage("/");
      await productPage.clickOnCategory(category, subCategory);
      await productPage.verifyPageTitle(title);
      await page.waitForLoadState('domcontentloaded');
      category = "Men";
      subCategory = "Tshirts";
      title = "Men - Tshirts Products";
      await productPage.clickOnCategory(category, subCategory);
      await productPage.verifyPageTitle(title);
    });
});