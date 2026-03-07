import { test, expect } from '@playwright/test';

test.describe('Assignment 1: Arrange Act Assert', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await page.click('#btn-make-appointment');
    });

    test('Verify login pass with valid user', async ({ page }) => {
        await page.fill('#txt-username', 'John Doe');
        await page.fill('#txt-password', 'ThisIsNotAPassword');
        await page.click('#btn-login');

        await expect(page.locator('h2')).toHaveText('Make Appointment');
    });

    test('Verify login fail with invalid password', async ({ page }) => {
        await page.fill('#txt-username', 'John Doe');
        await page.fill('#txt-password', 'WrongPassword');
        await page.click('#btn-login');

        const errorMessage = page.locator('.text-danger');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Login failed');
    });

    test('Verify login fail with invalid username', async ({ page }) => {
        await page.fill('#txt-username', 'InvalidUser');
        await page.fill('#txt-password', 'ThisIsNotAPassword');
        await page.click('#btn-login');

        const errorMessage = page.locator('.text-danger');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Login failed');
    });
});