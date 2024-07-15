import { expect } from "@playwright/test";
import { Base } from "./base";

const pom = {
    header: "//div[@class='header-middle']//div[@class='container']",
    loginButton: "//a[normalize-space()='Signup / Login']",
    logoutButton: "//a[normalize-space()='Logout']",
    contactButton: "//a[normalize-space()='Contact us']",
    contactPage: {
        title: "//h2[normalize-space()='Get In Touch']"
    },
    subscriptionTitle: "div[class='single-widget'] h2",
    subscribeEmail: "//input[@id='susbscribe_email']",
    subscribeBtn: "//button[@id='subscribe']",

    cartPage: {
        itemName:(index) => `//tr[@id="product-${index}"]/td[@class="cart_description"]/h4/a`,
        itemPrice:(index) => `//tr[@id='product-${index}']/td[@class='cart_price']/p`,
        itemQuantity:(index) => `//tr[@id='product-${index}']/td[@class="cart_quantity"]/button`,
        itemTotal:(index) => `//tr[@id='product-${index}']/td[@class='cart_total']/p`,
    },

    deliveryDetails: {
        name: '//ul[@id="address_delivery"]//li[@class="address_firstname address_lastname"]',
        address: "ul[id='address_delivery'] li:nth-child(4)",  //'//ul[@id="address_delivery"]//li[@class="address_address1 address_address2"]', 
        address2: '//ul[@id="address_delivery"]//li[@class="address_city address_state_name address_postcode"]',
        country: '//ul[@id="address_delivery"]//li[@class="address_country_name"]',
        phone: '//ul[@id="address_delivery"]//li[@class="address_phone"]'
    },

    paymentDetails: {
        name: 'input[name="name_on_card"]',
        cardNumber: 'input[name="card_number"]',
        cvc: 'input[name="cvc"]',
        expiryMonth: 'input[name="expiry_month"]',
        expiryYear: 'input[name="expiry_year"]',
        payButton: 'button[data-qa="pay-button"]'
    }
}

export class CartPage extends Base {

    /**
     * navigate to contact page and verify title
     */
    async verifyCartProducts(products) {
        await this.page.waitForLoadState('domcontentloaded');
        for (let i = 0; i < products.length; i++) {
            const totalAmount = parseFloat(products[i].price.replace("Rs.", "")) * parseInt(products[i].quantity);
            expect(this.page.locator(pom.cartPage.itemName(i+1))).toHaveText(products[i].name);
            expect(this.page.locator(pom.cartPage.itemPrice(i+1))).toHaveText(products[i].price);
            expect(this.page.locator(pom.cartPage.itemQuantity(i+1))).toHaveText(products[i].quantity);
            expect(this.page.locator(pom.cartPage.itemTotal(i+1))).toHaveText(`Rs. ${totalAmount}`);
        }
    }

    async proceedToCheckout() {
        await this.page.click("text= Proceed To Checkout");
        await this.page.waitForSelector("text= Checkout", { state: "visible"});
    };

    async navigateToLoginPage() {
        await this.page.click('//div[@class="modal-content"]/div[@class="modal-body"]/p/a');
        await this.page.waitForSelector(pom.header, { state: "visible"});
    }

    async verifyAddressDetails(address) {
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(pom.deliveryDetails.name, { state: "visible"});
        expect(this.page.locator(pom.deliveryDetails.name)).toHaveText(`${address.title} ${address.firstName} ${address.firstName}`);
        expect(this.page.locator(pom.deliveryDetails.address)).toHaveText(address.street);
        expect(this.page.locator(pom.deliveryDetails.address2)).toHaveText(`${address.city} ${address.state} ${address.zipcode}`);
        expect(this.page.locator(pom.deliveryDetails.country)).toHaveText(address.country);
        expect(this.page.locator(pom.deliveryDetails.phone)).toHaveText(address.mobile);
    }

    async placeOrder() {
        await this.page.click("text= Place Order");
        await this.page.waitForLoadState('load');
    }

    async enterPaymentDetails(paymentDetails) {
        await this.page.fill(pom.paymentDetails.name, paymentDetails.name);
        await this.page.fill(pom.paymentDetails.cardNumber, paymentDetails.cardNumber);
        await this.page.fill(pom.paymentDetails.cvc, paymentDetails.cvc);
        await this.page.fill(pom.paymentDetails.expiryMonth, paymentDetails.expiryMonth);
        await this.page.fill(pom.paymentDetails.expiryYear, paymentDetails.expiryYear);
        await this.page.click(pom.paymentDetails.payButton);
    }

    async verifyPaymentSuccess() {
        await this.page.waitForSelector("text= Congratulations! Your order has been confirmed!", { state: "visible"});
    }

    async downloadInvoice() {
        await this.page.click("text= Download Invoice");
    }

    async removeProductsFromCart() {
        const productRemoveIcons = await this.page.locator('a[class="cart_quantity_delete"]').all();
        for (const icon of productRemoveIcons) {
            await this.page.locator('a[class="cart_quantity_delete"]').first().click();
        }
    }
}
