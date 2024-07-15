import { expect } from "@playwright/test";
import { Base } from "./base";
import path from "path";

const pom = {
    name: "//input[@placeholder='Name']",
    email: "//input[@placeholder='Email']",
    subject: "//input[@placeholder='Subject']",
    message: "//textarea[@id='message']",
    uploadFile: "//input[@name='upload_file']",
    submitBtn: "//input[@name='submit']",
    successMsg: "//div[@class='status alert alert-success']",
    homeBtn: "//span[normalize-space()='Home']",
}

export class ContactPage extends Base {

    /**
     * fill contact details
     */

    async fillContactDetails(contactDetails) {
        const filePath = "../fixtures/sample.txt";
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(pom.name).fill(contactDetails.name);
        await this.page.locator(pom.email).fill(contactDetails.email);
        await this.page.locator(pom.subject).fill(contactDetails.subject);
        await this.page.locator(pom.message).fill(contactDetails.message);
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.locator(pom.uploadFile).click()
        ])
        await fileChooser.setFiles(path.join(__dirname, filePath));

    }
}
