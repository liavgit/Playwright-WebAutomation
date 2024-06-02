/*
how to intercept API response? 
and how to modify this API response?
So in previous lesson, what we intercepted API request for the tags.
We intercepted the request and provided our own response.
now. we will intercept articles API call and we will get the response.
Update the first article and we'll display our own title and description on this page.
*/

import { test, expect } from "@playwright/test";
import tags from '../constants/tags.json';

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
      await route.fulfill({
        body: JSON.stringify(tags) 
    });
  });

  await page.route("**/*api/articles?limit=10&offset=0", async (route) => {                    //...#1
    const response = await route.fetch();                                     //...#2
    const responseBody = await response.json()                                //...#3
    responseBody.articles[0].title = "This is a test title"                   //...#4
    responseBody.articles[0].description = "This is a test description"       //...#5
    await route.fulfill({                                                     //...#6
      body: JSON.stringify(responseBody) 
    });
  });

  await page.goto("https://conduit.bondaracademy.com/");
  
});

test("has title", async ({ page }) => {
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await page.waitForTimeout(1000)                                                                         //...#8
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a test title');        //...#7
  await expect(page.locator('app-article-list p').first()).toContainText("This is a test description");   //...#7
});

/*EXPLANATION ___________________________________________________________________________________________________*/

/*
    #1:
        First of all, we need to provide a URL that we want to intercept.
        And we can replace with just wildcards.

    #2:
        The next step after we intercepted this, we need to continue the API call and get the response.
        In order to do this, we need to call the command, await route and call method fetch.
        With this command, we tell playwright to complete the API call and return us the result.\
        And we want to save the result of the response into the constant
        So this variable will have a response of this API endpoint.

    #3:
        Now we need to get a Json body from this response body 
        what options do we have?
        we can take body, we can have headers, we can have okay status.
        in our case we need to take a body, but we will not take the body property.
        We will take a Json property, body will return us a string.
        since we want to update the first article in our response, 
        and this response body variable will have a Json object in the form of the response.

    #4y5:
      So what we want to do is take the first object from this array and MODIFY title and description.

    #6: 
      We updated the response body and now we need to just fulfill 
      the modified response as a desired response to the application.

    #7:
      And it works perfectly fine.
      You can see that first article of the application was replaced with our own text 
      assertion passed as well: "This is a test title" "This is a test description"
      So when you provide the assertion, 
      assertion gives enough time for the application to be loaded 
      and to display this article so the route will work.
      or give a time to it has time to process
        
*/

/*SUMMARY
In this lesson, we intercepted second API call of our application, which is articles endpoint.
This articles endpoint returns the list of the articles that are displayed on the main page.
But we intercepted the response of this API call, modified it and fulfilled updated the response as
the desired response for our application.
This concept have three main steps.
First, you intercept desired URL, 
then you perform the fetch to complete the API call and get the response.
Then update the response and fulfill this response as a desired result in the browser.
*/