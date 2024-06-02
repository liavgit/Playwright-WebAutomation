/*por la ui... Click on new article, fill out the field, click submit 
and navigate to the home page Global Feed and then select the article.
How to speed up this process? 
perform API call to create the article and then through UI we will delete it*/

import { test, expect, request } from "@playwright/test";
import tags from '../constants/tags.json';

test.beforeEach(async ({ page }) => {
    await page.route("*/**/api/tags", async (route) => {
        await route.fulfill({
            body: JSON.stringify(tags) 
        });
    });
    await page.goto("https://conduit.bondaracademy.com/");
    await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name:"Email"}).fill('pwtest@yopmail.com')
    await page.getByRole('textbox', {name:'Password'}).fill('pwtest')
    await page.getByRole('button').click()
});

test("has title", async ({ page }) => {

    await page.route("**/*api/articles?limit=10&offset=0", async (route) => {
        const response = await route.fetch();
        const responseBody = await response.json()
        responseBody.articles[0].title = "This is a MOCK test title"
        responseBody.articles[0].description = "This is a MOCK test description"
        await route.fulfill({
            body: JSON.stringify(responseBody) 
        });
    });

    await page.getByText('Global Feed').click()                                                                  //#1
    await expect(page.locator(".navbar-brand")).toHaveText("conduit");
    await page.waitForTimeout(1000)
    await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title');
    await expect(page.locator('app-article-list p').first()).toContainText("This is a MOCK test description");
});


test("Delete article", async ({ page, request }) => {                                                       //#2
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{           //#3
        data:{
            user: {email: "pwtest@yopmail.com", password: "pwtest"}
        }
    })
    const responseBody = await response.json()                                                              //#4
    //console.log(responseBody.user.token)                                                                  //#5
    const accessToken = responseBody.user.token                                                             //#5

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{      //#6                                 //#6
        data:{
            article: {title: "aaa1", description: "bbb1", body: "ccc1", tagList: []}
        },
        headers:{
            Authorization: `Token ${accessToken}`
        }
    })
    expect(articleResponse.status()).toEqual(201)

    await page.getByText('Global Feed').click()                                                             //#7
    await page.getByText('aaa1').click()
    await page.getByRole('button', {name:"Delete Article"}).first().click()
    await page.getByText('Global Feed').click()

    await expect(page.locator('app-article-list h1').first()).not.toContainText('aaa1');
});

/*EXPLANATION ___________________________________________________________________________________________________*/

/*
    #0:    
    Se hace un refactor del codigo... 

    #1:
    just navigate on the global feed, click on it and the page will refresh

    #2:
    Step number one is to make API call to obtain the token step.
    Number two, make second API call to publish the article 
    and use this token to actually publish the article as a authorized user.

    #3:
    se mandan las crdenciales del api de autenticacion 
    se enviand en "data" 
    So I put comma put object and in playwright the request body for some reason called data.
    This is very strange to me to be honest, because in all other frameworks 
    the request payload called as request body, but in the playwright for some reason they called as a data.
    se envian las crdenciales tomand el payload o request payload como viene de la api que se ve en broowser

    #4:
    After the request is performed, we want to get the result and process the response body.
    So I create a new constant response.
    we are looking for Json object, so Json object will give us a representation of the response.

    #5: 
    Para ver en la consola el resultado de la api... se ve el token y lo guardamos en una variable

    #6:
    creo un articulo y me fijo en las apis que se usaron y cojo la que hace el post del articulo 
    y luego pego el payload
    y necesito el autentication header con el token 

    #7:
    hacer click en el articulo que esta en  global feed y borrarlo dede el boton y recargar la pagina
*/

/*SUMMARY
When you want to perform API call in playwright, 
You need to use method request. and then type the method type that you want to use.
In this example, we use a POST request.
Then inside of the post request you need to provide a data object.
Data object represent the request body for your post request.
Then you process a response.
You can read response body using a Json method and get access to all data response through this method.
Then we saved a variable of access token from this request and perform a second request using headers
with authorization token to successfully create the article using the API call and then perform the
actual test to validate that functionality to delete the article on this web page is working successfully.
*/