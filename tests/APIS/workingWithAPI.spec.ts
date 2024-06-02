/*
let's mock API endpoint responsible for tags 
and instead of providing the list of those tags,
we provide just couple of tags, which is enough for our testing purposes.
And in that way we can speed up the loading of the page 
because we replaced the API response with our own response.
reemplazamos la respuesta con lo que nosotros vamos armar
el mock se debe crear ANTES que el browser llame a una API q existe
para que sepa que API va a interceptar y si no, no sabe
*/

import { test, expect } from "@playwright/test";
import tags from '../constants/tags.json';

test.beforeEach(async ({ page }) => {
  //#1 - mock api
  await page.route(
    //#4
    //"https://conduit-api.bondaracademy.com/api/tags",
    "*/**/api/tags",
    async (route) => {
      //#2 - stringify
      await route.fulfill({
        body: JSON.stringify(tags),
      });
    }
  );

  await page.goto("https://conduit.bondaracademy.com/");
});

test("has title", async ({ page }) => {
  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
});

/*EXPLANATION ________________________________________________________________________________*/

/*
    #1:
        When you want to create a mock, 
        you need to configure it inside of the playwright framework 
        before browser make a call to a certain API.
        Otherwise playwright will not know which API should be intercepted.

        To create a mock:
        - type command "await page.route"
        - First argument: URL that we want to intercept. Go into the networking tab,
        and take the url related to the tags
        - Second argument: a callback function called "route" 
        and we enter in inside of the function. 
        - then inside of the function: create the object that we want to use as the mock.
        Pdemos copiar y pegar el objecto de la respuesta de al api 
        como se ve en el inspect de la pag web. 
        But I don't need all those tags.I want to provide my own tags 
        que son "automation" y "playwright"

    #2:
        And then the last step, we need to fulfill this object as a desired response
        And inside of the full field method, 
        there are different arguments that you can provide.
        So we want to replace a body.
        There is a body property 
        and we need to call the object as the desired response.
        But we cannot simply call the object itself.
        We need to stringify this object. 
        And provide the object as the argument.

    #3:
        mandamos el objeto a un archivo a aparte  y lo mandamos  importar 
        y lo pasamos al stringify

    #4:
        reemplazar "https://conduit-api.bondaracademy.com/api/tags",
        Instead of providing the full path URL,
        we can provide a wildcard 
        replacing some of the base URL with just stars.
        To simplify the look of this URL, 
        which means that we want to match any pattern
        when we call API tags endpoint
*/

/*
Summary

In order to mock the API calls that browser is doing, 
you need to use a method page.route 
and provide the API endpoint that you would like to mock.

It is very important to define all your routes before browser is going to perform a certain API call.
That's why we put this code before we actually navigating to our application 
because browser will perform this API call to get the tags while the application is loading.

We created our own text Json object and put it in the test data folder.
Then we're reading this file importing into the spec file 
and when playwright intercept the call following this pattern of the API URL, 
we provide our own response that we would like to see in the application.
*/
