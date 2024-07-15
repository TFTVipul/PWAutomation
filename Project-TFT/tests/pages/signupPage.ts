import { expect } from "@playwright/test";
import { Base } from "./base";

const pom = {
    signUpButton: "//a[normalize-space()='Signup / Login']",
    loggedInUser: '//i[@class="fa fa-user"]/parent::a',
    SignupForm: {
        button: "//button[normalize-space()='Signup']",
        email: "//input[@data-qa='signup-email']",
        name: "//input[@placeholder='Name']"
    },
    accountInfo: {
        title: (gender) => `//label[normalize-space()='${gender}']`,
        password: "//input[@id='password']",
        newsletter: "//input[@id='newsletter']",
        firstName: "//input[@id='first_name']",
        lastName: "//input[@id='last_name']",
        address: "//input[@id='address1']",
        country: "//select[@id='country']",
        selectCountry: (country) => `//select[@id='country']//option[normalize-space()='${country}']`,
        state: "//input[@id='state']",
        city: "//input[@id='city']",
        zipcode: "//input[@id='zipcode']",
        mobile: "//input[@id='mobile_number']",
        createAccount: "//button[normalize-space()='Create Account']"
    },
    continueBtn: "//a[normalize-space()='Continue']",
    deleteAccount: {
        button: "//a[normalize-space()='Delete Account']"    
    }

}

export class SignupPage extends Base {

    /**
     * Register a user 
     */
    async registerUser(user) {
        await this.page.fill(pom.SignupForm.email, user.email);
        await  this.page.fill(pom.SignupForm.name, user.name);
        await this.page.click(pom.SignupForm.button);
        await this.fillUserDetails(user);
        await this.verifyAccountCreation();
    }

    async clickSignUp() {
        await this.page.click(pom.signUpButton);
        await this.page.locator(pom.SignupForm.button).waitFor({ state: "visible"});
    }

    /**
     * Fill user details
     */
    async fillUserDetails(user) {
        await this.page.click(pom.accountInfo.title(user.title));
        await this.page.fill(pom.accountInfo.password, user.password);
        await this.page.check(pom.accountInfo.newsletter);
        await this.page.fill(pom.accountInfo.firstName, user.firstName);
        await this.page.fill(pom.accountInfo.lastName, user.lastName);
        await this.page.fill(pom.accountInfo.address, user.street);
        await this.page.fill(pom.accountInfo.state, user.state);
        await this.page.fill(pom.accountInfo.city, user.city);
        await this.page.fill(pom.accountInfo.zipcode, user.zipcode);
        await this.page.fill(pom.accountInfo.mobile, user.mobile);
        await this.page.click(pom.accountInfo.createAccount);
    } 

    /**
     * Verify account creation
     */
    async verifyAccountCreation() {
        await this.page.waitForSelector("//p[contains(text(),'Congratulations! Your new account has been success')]", { state: "visible"});
        await this.page.locator(pom.continueBtn).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    /**
     * Delete user account after registration
     */
    async deleteUser() {
        await this.page.click(pom.deleteAccount.button);
        await this.page.waitForSelector("//p[contains(text(),'Your account has been permanently deleted!')]", { state: "visible"});
    }

    /**
     * Verify email already exist
     */
    async verifyEmailAlreadyExist(user) {
        await this.page.click(pom.signUpButton);
        await this.page.locator(pom.SignupForm.button).waitFor({ state: "visible"});
        await this.page.fill(pom.SignupForm.email, user.email);
        await  this.page.fill(pom.SignupForm.name, user.username);
        await this.page.click(pom.SignupForm.button);
        const validation = await this.page.locator("p", {hasText: "Email Address already exist!"}).isVisible();
        expect(validation).toBeTruthy();
    }

    async verifyUserLoggedIn(username: string) {
        expect(await this.page.locator(pom.loggedInUser)).toHaveText(`Logged in as ${username}`);
    }
}
