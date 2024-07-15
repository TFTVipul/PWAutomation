import { expect } from "@playwright/test";
import type { Page } from "playwright";

const pom = {
  header: "//div[@class='header-middle']//div[@class='container']",
  productButton: "a[ href='/products']",
  productPage: {
    title: "//h2[normalize-space()='All Products']"    
  },
  scrollUp: 'a[id="scrollUp"]',
}

export abstract class Base {
  protected page: Page;
  /**
   * Constructor
   * @param page Page Context from Playwright
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
  * Navigate to the base URL
  */
   async navigateToHomepage() {
     await this.page.goto("/", { waitUntil: "domcontentloaded", timeout: 5000}); // { waitUntil: "domcontentloaded", timeout: 5000}
     await this.page.waitForSelector(pom.header, { state: "visible"});
  }

  /**
  * navigate to product page and verify title
  */
   async goToProductPage() {
     await this.page.click(pom.productButton);
     expect(await this.page.locator(pom.productPage.title)).toBeVisible();
  }

  /**
  * verify scroll button is visible on the page
  */
  async verifyScrollUpButtonVisible() {
    await this.page.mouse.wheel(0, 2000);
    await this.page.click(pom.scrollUp);
    expect(await this.page.locator('text = Full-Fledged practice website for Automation Engineers').first()).toBeVisible();
  }
}
