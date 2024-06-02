import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
})

test.describe('Form layouts page', () =>{

    test.beforeEach(async ({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('checkboxes', async ({page})=>{
        await page.getByText('Modal & Overlays').click()
        await page.getByText('toastr').click()

        await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true})

        /*Check and uncheck commands are checking the status of the checkbox 
        if the checkbox is checked. 
        The check command will not make any selection the same for uncheck.
        If unchecked box is already unchecked, it will not make any selection 
        and the remaining the checkbox in unchecked state.*/
        await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})
        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})

        /*to select all checkboxes or unselect all checkboxes on the page.*/
        const allCheckBoxes = page.getByRole('checkbox')
        for(const box of await allCheckBoxes.all()){
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy
            await box.uncheck({force: true})
            expect(await box.isChecked()).toBeFalsy
        }
    })

})