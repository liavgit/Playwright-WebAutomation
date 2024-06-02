//importar librerias de pw
//expect es para las assertions
import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

//clase 30 - Assertions
test('assertions', async({page}) => {

    //GENERAL ASSERTIONS
    /*You just provide expect with the value that you want to assert 
    and the desired method with the expectation.
    General assertions will not wait for any conditions.
    It simply perform the assertion when it's time to execute 
    this particular line of code locator assertion.
    */
    const value = 5
    expect(value).toEqual(5)

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")


    //LOCATOR ASSERTION
    /*
    And what is the different for the locator assertion?
    We also use expect, but instead of providing the exact value inside of the expect.
    en el GENERAL we use text which had the exact value we will provide.
    Pero ahora en el LOCATOR... A locator  is basic form here 
    and if I click do now I have more assertions to be available. 
    For example, to be attached, or to be checked, etc...
    And because this is a locator assertion, 
    we need to provide a await  in front of the expect.
    and also locator assertions has their own timeout.
    So when you use the await, expect and locator assertion, 
    this type of assertion will wait up to five seconds for the element to be available.
    While the GENERAL  assertions will not wait any, 
    it will be just executed when it is time.
    este es como averiguar sobre el elemtno como tal sin extraer el texto antes 
    sino como revisar el boton y mirar de una si tiene tal texto en vez de extraerlo 
    con metodos como textcontent ()
    */
    await expect(basicFormButton).toHaveText("Submit")

    //SOFT ASSERTION
    /*
    Soft assertion is a kind of the assertion when the test can be continue 
    the execution even if the assertion is failed.
    NOT A GOOD PRACTICE
    */ 
    await expect.soft(basicFormButton).toHaveText("Submit")
    await basicFormButton.click()
})

