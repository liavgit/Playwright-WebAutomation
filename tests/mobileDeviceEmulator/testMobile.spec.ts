import { test, expect } from '@playwright/test';


test('input field', async ({page},testInfo)=>{

    await page.goto('http://localhost:4200/pages/iot-dashboard')
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    const usingThegridEmailInput = page
        .locator('nb-card', {hasText:"Using the Grid"})
        .getByRole('textbox', {name: "Email"})
    await usingThegridEmailInput.fill('test@test.com')
    await usingThegridEmailInput.clear()
    await usingThegridEmailInput.pressSequentially('test2@test.com')
})