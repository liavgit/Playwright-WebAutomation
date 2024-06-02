import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
})

test.describe('Form layouts page', () =>{

    test.beforeEach(async ({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('tooltips', async ({page})=>{
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
        
        const tooltipCard = page.locator('nb-card', {hasText:'Tooltip Placements'})
        await tooltipCard.getByRole('button', {name: "Top"}).hover()

        //forma1 to get the locator
        page.getByRole('tooltip')//if you have a role tooltip created
        //forma2 to get the locator
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    })

})