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
}

export class HomePage extends Base {

    /**
     * navigate to contact page and verify title
     */
    async goToContactPage() {
        await this.page.click(pom.contactButton);
        expect(await this.page.locator(pom.contactPage.title)).toBeVisible();
    }

    /**
     * subscribe email
     */
    async subscribeEmail(email: string) {
        await this.page.waitForSelector(pom.subscriptionTitle, {state: 'visible'});
        await this.page.fill(pom.subscribeEmail, email);
        await this.page.click(pom.subscribeBtn);
        expect(await this.page.locator("text=You have been successfully subscribed")).toBeVisible();
    }

}
