import { test as setup } from "@playwright/test";
import user from '../.auth/user.json';
import fs from 'fs';

const authFile = '.auth/user.json'

setup('authentication', async ({page, request}) => {
    
    //#1 ---- esta forma de loguearse es con la ui 
    // await page.goto("https://conduit.bondaracademy.com/");
    // await page.getByText('Sign in').click()
    // await page.getByRole('textbox', {name:"Email"}).fill('pwtest@yopmail.com')
    // await page.getByRole('textbox', {name:'Password'}).fill('pwtest')
    // await page.getByRole('button').click()
    // //esperar que salga esta api para ver que si nos logueamos
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')
    // await page.context().storageState({path: authFile})

    //#2 ---- esta forma de loguearse es con la API
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data:{
            user: {email: "pwtest@yopmail.com", password: "pwtest"}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    user.origins[0].localStorage[0].value = accessToken     //#2.1
    fs.writeFileSync(authFile, JSON.stringify(user))        //#2.2

    process.env['ACCESS_TOKEN'] = accessToken
})

/*

    //#1 --------------------------------------------------------------------------
        de aca nos vamos para el config  file porque tenemos que dejar que el maneje 
        el metodo de setup que se acaba de crear
        en la linea de proyectos se agrega 
            {
                name: 'setup',
                testMatch: 'auth.setup.ts'
            },

        y en los browsers se agrega
        storageState: '.auth/user.json'
        
        y tambien agregar
        dependencies: ['setup']

        So this dependencies block means that before running the chromium project,
        we need first to run the setup project as our precondition step.
        And after this precondition step is done, the browser part can be executed.
        And since this precondition step will generate for us authenticated user state, 
        this project, when it will start, it will read this authenticated state from .auth/user.json' file 
        and our application will be authenticated.

        Summary 

            we created a dedicated file auth.setup.ts 
            that is responsible for authentication
            and we are doing this through the user interface 
            and run username password and clicking on the button.
            And then at the end we have the step that saves our authenticated state of the application.
            All the information related to authenticated state into the Json file, which is user.Json.
            la informacion del usuario se crea  "magicamente" en ese archivo e user.json

    //#2 --------------------------------------------------------------------------

    * hacemos la autenticacion via api
    
    //#2.1
    the next step is to update the user object with the new value.
    user.origins[0].localStorage[0].value = accessToken
    we use origins.Origins is array. So we select the first value from the array dot local storage.
    This is array as well. We want to select the first value
    So now this user object that we imported from here has the new value token received from the API.
    
    //#2.2
    All right, So now this user object that we imported has the new value token received from the API.
    But then we need to update this user object, right? 
    Those changes inside of the file. 
    And for that purpose we will use FS library.
    I call FS right file sync and two arguments.
    First argument we provide the path to the file which is auth file.
    And the second argument will be a user object itself and we need to use Json stringify.
    And provide the user object.

    SUMMARY
    In this lesson, we replaced the authentication process by just calling the API 
    and saving our token inside of the user.Json 
    because this is the way how our application is authenticated in this particular case.
    And also we know that our access token is needed to make an API calls 
    and in order to reuse this value again and again inside of the test 
    and avoid calling the authorization URL multiple times for every test, 
    we save the value of access token in the process environment variable.
    Then we configure this process environment variable as authorization header globally for the framework
    and then we can simply remove all those instances of calling the authorization URL or headers inside
    of the API call, which is simplify the code, make it nicer and easier to read.

    IN THE CONFIG FILE WE ADDED
    extraHTTPHeaders:{
        'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    }

*/

