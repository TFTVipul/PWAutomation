import { expect } from "@playwright/test";
import { Base } from "./base";
import path from "path";

const pom = {
    title: 'h2[class="title text-center"] b',
}

export class TestCasePage extends Base {
    async verifyTestCasesPage() {
        await this.page.waitForSelector(pom.title);
        const testCasesPageTitle = await this.page.locator(pom.title).innerText();
        expect(testCasesPageTitle).toContain('TEST CASES');
    }
}
