//importar librerias de pw
//expect es para las assertions
import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

////clase 29 - extracting values
test('Extracting values', async({page}) => {

    //single test value - para verificar que algo si se llama como debe por ejemplo un boton
    //o un texto en la pnatalla ya escrito
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})

    //textContent()
    //es para extraer el texto
    /*If you want to grab a single text from the web page for your web element, 
    you need to use method textContent().*/
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //allTextContents() 
    //get all text values de los checkboxes y los ppone en un array
    /*If you want to grab all text elements for the list of the web elements.*/
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    //toContain >>  luego verificamos que haya almenos un valor con el nombre que buscamos
    expect(allRadioButtonsLabels).toContain("Option 1")

    //inputValue()
    //find the value of the iput field - get the property value of the input fields,
    //para cosas que el usuario escribe en un campo que no estan como tal dentro de un html 
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual("test@test.com")

    /*getAttribute
    And if you want to get the value of any attributes on the web page, 
    use method, get attribute and as an argument, 
    provide the name of the attribute 
    and you will get the value of that particular attribute.
    */
    //get the value of a placeholder
    const emailPlaceHolderValue = await emailField.getAttribute('placeholder')
    expect(emailPlaceHolderValue).toEqual("Email")
})

