import { SignupPage } from "./signupPage";
import { LoginPage } from "./loginPage";
import { ContactPage } from "./contactPage";
import { HomePage } from "./homePage";
import { TestCasePage } from "./testCasesPage";
import { ProductsPage } from "./productsPage";
import { CartPage } from "./cartPage";

export class POManager {
    request: any;
    page: any;
    signupPage: SignupPage;
    loginPage: LoginPage;
    contactPage: ContactPage;
    homePage: HomePage;
    testCasesPage: TestCasePage;
    productsPage: ProductsPage;
    cartPage: CartPage;

    constructor(page) {
        this.page = page;
        this.signupPage = new SignupPage(page);
        this.loginPage = new LoginPage(page);
        this.contactPage = new ContactPage(page);
        this.homePage = new HomePage(page);
        this.testCasesPage = new TestCasePage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
    }

    getSignupPage() {
        return this.signupPage;
    }

    getLoginPage() {
        return this.loginPage;
    }

    getContactPage() {
        return this.contactPage;
    }

    getHomePage() {
        return this.homePage;
    }

    getTestCasesPage() {
        return this.testCasesPage;
    }

    getProductsPage() {
        return this.productsPage;
    }

    getCartPage() {
        return this.cartPage;
    }
}
