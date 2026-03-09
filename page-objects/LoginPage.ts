import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page
    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator
    private readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('#txt-username')
        this.passwordInput = page.locator('#txt-password')
        this.loginButton = page.locator('#btn-login')
        this.errorMessage = page.locator('.lead.text-danger')
    }

    public async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    get errorText(): Locator {
        return this.errorMessage
    }
}