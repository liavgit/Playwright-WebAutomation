//importar librerias de pw
//expect es para las assertions
import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

//class 24
test('Locator syntax rules', async({page}) => {
    
    /*html
    <input _ngcontent-buu-c287="" type="email" nbinput="" fullwidth="" id="inputEmail1" 
    placeholder="Email" ng-reflect-full-width="" 
    class="input-full-width size-medium status-basic shape-rectangle nb-transition">
    */

    /*los elementos deben ser unicos*/

    //by tag name... cogiendo el primero porque hay muchos sino se especifica saca error
    await page.locator('input').first().click();

    //by id con hash
    await page.locator('#inputEmail1').click();

    //by class con punto - todos los elementos q tengan esta clase .shape-rectangle
    page.locator('.shape-rectangle')

    //by attribute en []  -->> aTTribute=[]
    page.locator('[placeholder="Email"]')

    //by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //by combination of locators  - more unique > web element by tag and by attribute
    //sin espacio
    page.locator('input[placeholder="Email"]')

    //by 3 attributos
    page.locator('input[placeholder="Email"][nbinput]')

    //by xpath - NOT RECOMMENDED
    page.locator('//*[@id=inputEmail1]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})


//clase 25
test('user facing locators', async({page}) => {

    //getByRole - role es el tipo de elemtno 
        //hcer cllick en un primer textbox que tiene el nombre email 
        /*<input ... type="text" ... placeholder="Email" ...>*/
        /*este es el textbox que dice Email*/
        await page.getByRole('textbox', {name: "Email"}).first().click()
        
        //hcer cllick en un boton que tiene el nombre sign in 
        /*<button ... data-testid="SignIn" ....">Sign in</button>*/
        await page.getByRole('button', {name: "Sign in"}).first().click()

    //getByLabel
        //hacer click en el textox desde el label 
        /*<label ... for="inputEmail1" class="label col-sm-3 col-form-label">Email</label>*/
        await page.getByLabel('Email').first().click()

    //getByPlaceholder
        /*<input ... type="text" nbinput="" ... placeholder="Jane Doe" ...>*/
        await page.getByPlaceholder('Jane Doe').click()

    //getByText
        /*<nb-card-header _ngcontent-fkg-c287="">Using the Grid</nb-card-header>*/
        await page.getByText('Using the Grid').click()

    //getByTestId    
        //data-testId es como un parametro reservado de pw que uno puede  poner en el html 
        /*<button data-testid="SignIn" type="submit" nbButton status="primary">Sign in</button>*/
        await page.getByTestId('SignIn').click()

    //getByTitle
        /*<a class="ng-tns-c140-0 ng-star-inserted active" ... title="IoT Dashboard" ...*/
        await page.getByTitle('IoT Dashboard').click()

})


//clase 26
test('locating child elements', async({page}) => {

    //forma1
    //Then in order to find the child element within the same method locator, 
    //you just put space and put the next element
    /*When you use a locator element and want to find a child element, 
    just separate your locators, each of your locator by space within the 
    string of your locator and playwright will search the child elements*/
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    //forma2- no tan recomendable xq es menos compacta
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()
    
    //combinacion de regular locator  and user facing locator
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    /*we will use our NB card again is using index of the element
    nth and we provide the index para encontrar el boton que queremos. 
    Los indices empiezan en cero*
    OJO Always try to find more unique elements without using index 
    or the order of the web elements and how*/
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

////clase 27
test('locating parent elements', async({page}) => {

    //find the text and then the parent
    
    //forma1 - nb-card es el parent de textbox y se filtra x texto
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    
    //forma2 nb-card es el parent de textbox y se filtra x id
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click()

    //forma 3 con filtro
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    //encontrar el campo email en en una de las formas que tiene checkbox y el boton sign in 
    /*
    first we found all DnB cards, 										
    then initial input We filtered once finding only those cards that have a checkboxes.										
    Then the filtered checkboxes card we filtered one more time only with those that have a sign in.										
    And since this is a unique combination of those, eventually only one DnB card was returned										
    And then within this DnB card we found a text box with name email and we performed the click										
    */
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByRole('textbox', {name: "Email"}).click()

    //xpath ... subir  un nivel arriba al nivel padre con los dos puntos ..   
    /* como using the grid  y email son siblings, entonces se encuentra using the grid , se sube  un nivel y 
    desde ahi se llama al otro sibling*/  
    await page.locator(':text-is("Using the Grid').locator('..').getByRole('texbox', {name: "Email"}).click()
})

////clase 28
test('Reusing the locators', async({page}) => {

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com')
    
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

