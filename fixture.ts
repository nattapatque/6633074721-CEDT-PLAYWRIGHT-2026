import { ConfirmAppointmentPage } from "./page-objects/ConfirmAppointmentPage";
import { MakeAppointmentPage } from "./page-objects/MakeAppointmentPage";
import { HomePage } from "./page-objects/HomePage";
import { LoginPage } from "./page-objects/LoginPage";
import { test as base } from "@playwright/test";

export const test = base.extend<{
    homePage: HomePage;
    loginPage: LoginPage;
    makeAppointmentPage: MakeAppointmentPage;
    confirmAppointmentPage: ConfirmAppointmentPage;
}>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    makeAppointmentPage: async ({ page }, use) => {
		const makeappointmentPage = new MakeAppointmentPage(page)
		await use(makeappointmentPage)
	},
	confirmAppointmentPage: async ({ page }, use) => {
		const confirmAppointmentPage = new ConfirmAppointmentPage(page)
		await use(confirmAppointmentPage)
	},
});

export { expect } from "@playwright/test";