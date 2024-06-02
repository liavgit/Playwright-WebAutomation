//importar librerias de pw
//expect es para las assertions
import { state } from '@angular/animations';
import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    //await page.goto('http://uitestingplayground.com/ajax/')
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Locator syntax rules', async({page}) => {
    const successButton = page.locator('.bg-success')

    //espera hasta que el boton este disponible para hacerle click 
    
    await successButton.click()

    /*I can forcefully reduce the timeout.
    So I go to my playwright config file and 
    in define config I can change the default timeout timeout
    en el archivo playwright.config.ts
    export default defineConfig({ timeout: 10000,....
    PERO si no esta disponible en ese tiempo el test falla  y no se ejecuta
    El tiempo por defecto es de 30 segundos  si no se cambia ese valor en el config
    */
    
    //esperar el textContent():
    //textContent() espera el tiempo que necesita
    
    const text1 = await successButton.textContent()
    expect(text1).toEqual('Data loaded with AJAX get request')   

    //esperar el allTextContents():
    /*
    allTextContents no espera a que el elemtno este disponible 
    pero podemos ponerle un wait artificial o sea,
    esperar una determinada condicion
    */
    
    await successButton.waitFor({state: "attached"})
    const text2 = await successButton.allTextContents()
    expect(text2).toContain('Data loaded with AJAX get request.')

    /*
    otra forma - incrementando el timepo. 
    por ej tohavetext espera por defecto solo 5 segundos
    pero se le puede decir que espere 20 con el timeout
    */

    await expect(successButton)
        .toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //caso 1
    //__wait for element... esperamos al boton
    await page.waitForSelector('.bg-success')

    //caso2
    //__wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata/')

    //caso3
    //__wait for networks calls  to be completed (NOT RECOMMENDED)
    //espera que la api termine de responder todos  los request. 
    /*But again, this approach is not recommended 
    because if some of the API calls is stuck, 
    your test will also be stuck at this point 
    and some of those API calls may not be that really important 
    for the functionality of your application.
    So be really careful about these types of wait 
    */
    await page.waitForLoadState('networkidle')


    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

