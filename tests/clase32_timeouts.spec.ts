//importar librerias de pw
//expect es para las assertions
import { state } from '@angular/animations';
import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax/')
    await page.getByText('Button Triggering AJAX Request').click()
})

/*
So let's say you want to modify the test timeout for a particular test suite.
You can do it using a beforeeach hook.
So inside of the before each hook, you need to provide the second argument, 
which is testInfo and then you can type like testInfo.setTimeout
and then you can take the test info, object the
existing default time value and increase.
Let's say this time value for two seconds.
And this will modify the default timeout for plus 
two seconds and it will be applied for every test
in this particular test suite. 
This is another option how you can override the timeout values.
*/
test.beforeEach(async({page},testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax/')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('timeouts with test timeout', async({page}) => {

    /*EJEMPLO1
    este test pasa  porque  por defecto espera 30 seg 
    y el boton se demora 15 en cargar para poder hacerle click 
    */
    const successButton = page.locator('.bg-success')
    await successButton.click()

    /*EJEMPLO2
    seria configurando el tiempo desde el config.ts
    y anadiendo la variable timeout en el defineConfig
    entonces tendriamos  por ejemplo timeout:10000 
    pero como  el boton demora mas de eso que son 15 segundos, entonces falla
    */

    /*EJEMPLO3
    seria configurando el global timeout desde el config.ts
    y anadiendo la variable globalTimeout en el defineConfig
    */

    /*EJEMPLO4
    seria configurando el action timeout desde el config.ts
    y anadiendo la variable globalTimeout en el use
    entonces tendriamos  por ejemplo actionTimeout:5000 
    entonces tendriamos  por ejemplo navigationTimeout:5000 
    */
   
})

test('timeout inside of the command', async({page}) => {

    /*You can always override the timeout for the action 
    by providing the timeout inside of the command.
    And for example, we want to provide a timeout for this particular click of, 
    let's say, 16 seconds.
    We know that this element should show up within 15 seconds, 
    so timeout of 16 seconds will be enough
    and this action timeout setting will override the action 
    timeout that we configured in the playwright config.*/

    const successButton = page.locator('.bg-success')
    await successButton.click({timeout:16000})
})

test('override the test timeout for a particular test', async({page}) => {

    /*if you want to override the test timeout for a particular test, 
    you type test set timeout and provide the value.
    So let's say if we put a 10s we will fail this test. 
    Then the test failed is because our test timeout is just 10s.
    But button to show out is 15 seconds.*/

    test.setTimeout(10000) //esta  x encima del timeout que hay mas abajo 

    const successButton = page.locator('.bg-success')
    await successButton.click({timeout:16000}) //este timeout se ignora, el que manda es el de arriba
})


test('timeouts in the comand', async({page}) => {

    /*Also, let's say you know that you have a slow test 
    that is flaky and you want to increase the timeout
    just for this particular test.
    And playwright has a command test.slow.
    If you mark your test with this command slow will increase 
    the default timeout in three times to allow
    your test a little bit more time to continue the execution.*/

    test.slow() // multiplica el tiempo q se configuro en el config
    
    const successButton = page.locator('.bg-success')
    await successButton.click()
})

/*And the very last thing for the expected timeout for locator assertions, 
If you want to override,expect timeout for locator assertion, 
you can add it into the settings as well.
So you can type expect and provide the object with the value of the timeout timeout.
And let's say instead of five seconds, we want to use, let's say two seconds 
timeout for our locator assertion and it will work like that.

so in config file>
expect:{
    timeout:2000
}

*/


test('timeout inside of the assertion', async({page}) => {

    const successButton = page.locator('.bg-success')
    expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})
})


/*So let me quickly summarize what we did in this lesson.

Playwright has global timeout, test timeout and different 
- action navigation timeouts 
- action navigation 
- expect timeouts 
are within test timeout and test timeout within a global timeout.

Only test timeout has a default configuration of 30s 
and expect timeout has default configuration of five seconds.

The rest of the timeouts are not configured by default.

You can configure timeouts globally for the framework 
in the configuration object of the playwright.
Define a timeout for the test.
Global timeout.
Expect timeout navigation timeout and action timeout.
Also, you can override the settings defined in the config object by providing them 
directly inside of the test.

You can set the settings for the particular test for the timeout
or the particular action command that you want to override the waiting time.*/
