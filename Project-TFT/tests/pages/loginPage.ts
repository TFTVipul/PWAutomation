import { expect } from "@playwright/test";
import { Base } from "./base";

const pom = {
    header: "//div[@class='header-middle']//div[@class='container']",
    loginButton: "//a[normalize-space()='Signup / Login']",
    logoutButton: "//a[normalize-space()='Logout']",
    cartButton: "a[href='/view_cart']",
    loginForm: {
        button: "//button[normalize-space()='Login']",
        email: "//input[@data-qa='login-email']",
        password: "//input[@data-qa='login-password']"
    },
}

export class LoginPage extends Base {

    /**
     * login a user
     */
    async loginUser(user) {
        await this.page.click(pom.loginButton);
        await this.page.locator(pom.loginForm.button).waitFor({ state: "visible"});
        await this.page.fill(pom.loginForm.email, user.email);
        await  this.page.fill(pom.loginForm.password, user.password);
        await this.page.click(pom.loginForm.button);
    }

    /**
     * Verify user is logged in and logout
     */
    async verifyUserLoggedIn(user) {
        await this.page.locator(pom.header).waitFor({ state: "visible"});
        expect(await this.page.locator('li', { hasText: `Logged in as ${user.username}`})).toBeVisible();
    }

    /**
     * logout user
     */
    async logoutUser() {
        await this.page.click(pom.logoutButton);
        await this.page.locator(pom.loginForm.button).waitFor({ state: "visible"});
    }

    /**
     * validate login details
     */
    async validateLoginDetails() {
        const validation = await this.page.locator("p", {hasText: "Your email or password is incorrect!"}).isVisible();
        return validation;
    }


    /**
     * navigate to cart page
     */
    async navigateToCartPage() {
        await this.page.click(pom.cartButton);
        await this.page.waitForLoadState("domcontentloaded");
    }
}
