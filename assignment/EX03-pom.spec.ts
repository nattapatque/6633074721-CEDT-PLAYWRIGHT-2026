import { test, expect } from "../fixture"
import { ConfirmAppointmentPage } from "../page-objects/ConfirmAppointmentPage"

test.describe('EX03: POM', () => {
    const URL = process.env.URL || ''
	const USERNAME = process.env.TEST_USERNAME || ''
	const PASSWORD = process.env.TEST_PASSWORD || ''

    const visitDate = new Date().toLocaleDateString('en-GB', {
		timeZone: 'Asia/Bangkok',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
    const facility = 'Hongkong CURA Healthcare Center'
	const readmission = true
	const program = 'Medicaid'
	const comment = 'This is a test appointment.'

    test.beforeEach(async ({ homePage, loginPage, page }) => {
        await page.goto(URL)
        await homePage.makeAppointment()
        await loginPage.login(USERNAME, PASSWORD)

        await expect(page.locator('#appointment')).toBeVisible()
    })

    test('Make an appointment successfully', async ({
        makeAppointmentPage,
        confirmAppointmentPage,
    }) => {
        await makeAppointmentPage.bookAppointment({
			facility: facility,
			hospitalReadmission: readmission,
			program: program,
			visitDate: visitDate,
			comment: comment,
		})
        await expect(confirmAppointmentPage.getFacility).toHaveText(facility)
		await expect(confirmAppointmentPage.getHospitalReadmission).toHaveText(
			readmission ? 'Yes' : 'No'
		)
		await expect(confirmAppointmentPage.getProgram).toHaveText(program)
		await expect(confirmAppointmentPage.getVisitDate).toHaveText(visitDate)
		await expect(confirmAppointmentPage.getComment).toHaveText(comment)
    })


})