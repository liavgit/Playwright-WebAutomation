import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
})

test.describe('Form layouts page', () =>{

    test.beforeEach(async ({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('lists and dropdowns', async ({page})=>{

        //click en el  boton ppal del dropdwn 
        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()

        page.getByRole('list')//when the list has ul tag
        page.getByRole('listitem')//when the list has li tag

        //forma 1 de coger los elementos del dropdwon 
        const optionList1 = page.getByRole('list').locator('nb-option')
        //forma 2 de coger los elementos del dropdwon 
        const optionList2 = page.locator('nb-option-list nb-option')

        //asser it has the expected values
        await expect(optionList2).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

        //select an item
        await optionList2.filter({hasText: "Cosmic"}).click()

        //verificar que el estilo  tenga el color seleccionado en background-color
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color','rgb(50, 50, 89)')

        const colors = {
            "Light":"rgb(255, 255, 255)",
            "Dark":"rgb(34, 43, 69)",
            "Cosmic":"rgb(50, 50, 89)",
            "Corporate":"rgb(255, 255, 255)"
        }
        
        //seleccionar todas las opciones y verificar que el color es correcto
        await dropdownMenu.click()
        for (const color in colors) {
            await optionList2.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color',colors[color])
            if (color != "Corporate") {
                await dropdownMenu.click()
            }
        }
    })

})