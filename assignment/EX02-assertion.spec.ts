import { test, expect } from '@playwright/test';

test.describe('Assignment 2: Assertion', () => {
    
    test.beforeEach(async ({ page }) => {
        const URL = 'https://katalon-demo-cura.herokuapp.com/';
        const user = 'John Doe';
        const pass = 'ThisIsNotAPassword';

        await page.goto(URL);
        
        await page.locator('#menu-toggle').click();
        await page.getByRole('link', { name: 'Login' }).click();

        await page.getByLabel('Username').fill(user);
        await page.getByLabel('Password').fill(pass);
        await page.getByRole('button', { name: 'Login' }).click();
        
        await expect(page).toHaveURL(/#appointment/);
    });

    test('should validate all fields in the appointment form', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();

        const facilityDropdown = page.locator('select#combo_facility');
        const locations = ['Tokyo CURA Healthcare Center', 'Hongkong CURA Healthcare Center', 'Seoul CURA Healthcare Center'];
        
        for (const city of locations) {
            await facilityDropdown.selectOption(city);
            await expect(facilityDropdown).toHaveValue(city);
        }

        const readmissionCheckbox = page.getByLabel('Hospital Readmission');
        await readmissionCheckbox.check();
        await expect(readmissionCheckbox).toBeChecked();

        const programs = ['Medicare', 'Medicaid', 'None'];
        for (const type of programs) {
            const radio = page.getByLabel(type);
            await radio.check();
            await expect(radio).toBeChecked();
        }

        const testDate = '30/12/2026'; 
        await page.getByPlaceholder('dd/mm/yyyy').fill(testDate);
        
        const commentArea = page.getByPlaceholder('Comment');
        const message = 'Test booking via Playwright.';
        await commentArea.fill(message);
        await expect(commentArea).toHaveValue(message);

        const submitBtn = page.locator('#btn-book-appointment');
        await expect(submitBtn).toBeVisible();
        await expect(submitBtn).toBeEnabled();
    });
});