import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
})

test.describe('Form layouts page', () =>{
    
    test.beforeEach(async ({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('radio buttons', async ({page})=>{
        const usingThegridForm = page.locator('nb-card', {hasText:"Using the Grid"})

        /*el force es  porque hay una restriccion en el codigo de visiibilidad  y 
        sino se pone  no hara check en el radio buttn*/
        await usingThegridForm.getByLabel('Option 1').check({force: true})

        await usingThegridForm.getByRole('radio', {name:'Option 1'}).check({force: true})

        //generic assertion
        const radioStatus = usingThegridForm.getByRole('radio', {name:'Option 1'}).isChecked()
        expect(radioStatus).toBeTruthy()
        
        //locator assertion
        await expect(usingThegridForm.getByRole('radio',{name:"Option 1"})).toBeChecked()

        //cuando seleccionamos la 2  la uno se deselecciona
        await usingThegridForm.getByRole('radio', {name:'Option 2'}).check({force: true})
        expect(usingThegridForm.getByRole('radio', {name:'Option 1'}).isChecked()).toBeFalsy()
        expect(usingThegridForm.getByRole('radio', {name:'Option 2'}).isChecked()).toBeTruthy()

    })

})