/*how to intercept browser API calls 
and how to use the response of these calls in the future API requests.

So in order to delete the article from the list of the articles, 
we need to know the ID of this article.
But in order to know this id,
we need to intercept this ID during the step of the article creation 
and then when the test is complete at the end we can make an API call to delete this article.*/


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

test("Create article using API", async ({ page, request }) => {                                                          //#1
    await page.getByText('New Article').click()
    await page.getByRole('textbox', {name:"Article Title"}).fill('Article Title test')
    await page.getByRole('textbox', {name:"What's this article about?"}).fill('article about playwright')
    await page.getByRole('textbox', {name:"Write your article (in markdown)"}).fill('article test')
    await page.getByRole('button', {name:"Publish Article"}).click()
    const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')   //#2
    const articleResponseBody = await articleResponse.json()                                                    //#3
    const slugId = articleResponseBody.article.slug
    
    await expect(page.locator('.article-page h1')).toContainText('Article Title test');

    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()
    await expect(page.locator('app-article-list h1').first()).toContainText('Article Title test');

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{               //#4
        data:{
            user: {email: "pwtest@yopmail.com", password: "pwtest"}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token   

    const deleteArticleRequest = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`,{
        headers:{
            Authorization: `Token ${accessToken}`
        }
    } )

    expect(deleteArticleRequest.status()).toEqual(204)
    //after refreshing the page, the article is not there anymore
});

/*EXPLANATION ___________________________________________________________________________________________________*/

/*
    #0:    

    #1:
    creamos el articulo con su informacion... 
    y assert que e articulo queda creado
    navigate to the home page
    Click on the global feed 
    and validate that this article is presented.
    
    #2:
    So after publish article button is click, 
    we want to wait for this API call to be executed 
    and we want to receive the response of this API call.
    playwright will wait for this API call to be completed 
    and when it will be completed, it will save the response into this article response object.

    #3:
    After that, we need to get the article response body 
    And then from the Json response body, we can get a slug ID which is the id of the article

    #4:
    get the token to access de delete api

*/

/*SUMMARY
In this lesson, we created a new test to test the article creation 
and we deleting the article to clean up the test data using the API call.
In order to do that, we can intercept the browser API calls using wait for the response method.
Wait for the response providing us the response object.
With this response object, we can get the response body of this object in the Json format 
and process this object to get the needed slug ID in order to make a future API call to delete the article.
Then we make a request to delete the article providing slug ID as a part of the URL 
using JavaScript interpolation. Delete the article and make assertion.
The article successfully deleted.
*/

