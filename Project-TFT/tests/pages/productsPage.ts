import { expect } from "@playwright/test";
import { Base } from "./base";

const pom = {
    title: "//h2[normalize-space()='All Products']",
    productList: "//div[@class='features_items']//div//div[@class='single-products']",
    viewProductButton: "a[href='/product_details/1']",
    productName:"div[class='product-information'] h2",
    productPrice: "div[class='product-information'] span span",
    productQuantity: "//input[@id='quantity']",
    availability: "//div[@class='product-details']//p[2]",
    condition: "//div[@class='product-details']//p[3]",
    brandName: "//div[@class='product-details']//p[4]",
    searchInput: "//input[@id='search_product']",
    searchButton: "//button[@id='submit_search']",
    addProduct:(name) => `//div[@class="single-products"]//div//img/following-sibling::p[text()="${name}"]/following-sibling::a`,
    brand: (name) => `//a[@href='/brand_products/${name}']`,
    category: {
        categoryName: (category) => `//a[normalize-space()='${category}']`,
        subCategoryName: (category, name) => `//div[@id='${category}']//a[contains(text(),'${name}')]`,
        categoryTitle: "//h2[@class='title text-center']",
    }
}

export class ProductsPage extends Base {
    async verifyProductList() {
        expect(this.page.locator(pom.title)).toBeVisible();
        const productList = await this.page.locator(pom.productList).all();
        expect(productList).not.toHaveLength(0);
    }

    async goToProductDetails(opts) {
        // Click on first product
        await this.page.locator(pom.viewProductButton).click();
        expect(this.page.locator(pom.productName)).toHaveText(opts.name);
        expect(this.page.locator(pom.productPrice)).toHaveText(opts.price);
        expect(this.page.locator(pom.productQuantity)).toHaveValue(opts.quantity);
        expect(this.page.locator(pom.availability)).toContainText(opts.availability);
        expect(this.page.locator(pom.condition)).toContainText(opts.condition);
        expect(this.page.locator(pom.brandName)).toContainText(opts.brand);
    }

    async searchProduct(searchText: string, selectorCount: number) {
        let productList: any = [];
        await this.page.locator(pom.searchInput).clear();
        await this.page.fill(pom.searchInput, searchText);
        await this.page.click(pom.searchButton);
        await this.page.waitForLoadState('domcontentloaded');
        const isVisible = await this.page.locator(pom.productList).first().isVisible();
        if(isVisible) {
            productList = await this.page.locator(pom.productList).all();
        }
        expect(productList).toHaveLength(selectorCount);
    }

    async addProductToCart(products) {
        for (const product of products) {
            await this.page.locator(pom.addProduct(product.name)).click();
            // await this.page.waitForLoadState('domcontentloaded');
            await this.page.click("text= Continue Shopping");
        }
    }

    async changeQuantity(quantity: number) {
        await this.page.fill(pom.productQuantity, quantity.toString());
        await this.page.click("text= Add to cart");
        await this.page.click("text= Continue Shopping");
    }

    async clickOnCategory(category: string, subCategory?: string) {
        await this.page.locator(pom.category.categoryName(category)).click();
        await this.page.locator(pom.category.subCategoryName(category, subCategory)).click();
    }

    async verifyPageTitle(title: string) {
        expect(this.page.locator(pom.category.categoryTitle)).toHaveText(title);
    }

    async selectBrand(brandName: string) {
        await this.page.locator(pom.brand(brandName)).click();
    }
}
