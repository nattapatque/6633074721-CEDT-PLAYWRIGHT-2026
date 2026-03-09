import { Locator, Page } from "@playwright/test";

export class HomePage {
    private readonly page : Page
    private readonly makeAppointmentLnk : Locator

    constructor(page: Page) {
        this.page = page
        this.makeAppointmentLnk = page.getByRole('link', {
			name: 'Make Appointment',
		})
    }

    public async makeAppointment(): Promise<void> {
        await this.makeAppointmentLnk.click()
    }
}