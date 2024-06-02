import { expect } from "@playwright/test";
import {test} from '../test-options'

test("drag and drop with iframe", async ({ page, globalSqlUrl }) => {
  //await page.goto("https://www.globalsqa.com/demo-site/draganddrop/");
  await page.goto(globalSqlUrl);
  
  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe'); //#1
  await frame
    .locator("li", { hasText: "High Tatras 2" })
    .dragTo(frame.locator("#trash")); //#2

  //#3 - more precise control
  await frame.locator("li", { hasText: "High Tatras 4" }).hover();
  await page.mouse.down();
  await page.locator("#trash").hover();
  await page.mouse.up();
  //#4
  await expect(frame.locator("#trash li h5")).toHaveText([
    "High Tatras 4",
    "High Tatras 2",
  ]);
});

/*EXPLANATION ________________________________________________________________________________*/

/*What is iframe?
iFrame is a kind of embedded HTML document inside of the existing HTML document.
So it's a kind of a website inside of the website and 
you can tell that by HTML code and body.
So every HTML website has only a single body and every HTML web page begins with 
just a single HTML.
But we have a second HTML.
So this is kind of a page inside of the page 
and playwright is not able to find our web element 
because it is inside of the iframe.
It's not visible. 

es decir dentro del html tenemos una estructura de 
iframe
    html
        head
        body
    /html
/iframe   

So in order to get access to this area 
and find this high tatras two locator, 
first we need to switch into this iframe 
and then within this iframe find the locator 
that we are looking for.
*/

/*
    #1:
        ubicamos el iframe 
        
    #2:
        coge el lemento que queremos mover con drag and drop que esta dentro del iframe
        locator del area donde vamos a ghacer el drag and drop 
        y se hace dragto() a esa area

    #3:
        And the first step, we want to hover over the mouse 
        above the element that we want to drag and drop
        and we need to call a down method in order to click the mouse above this element.
        The next step we need to move a mouse into the direction where
        we want to drop our element (the trash) 
        And perform hover one more time.
        And then the last step we need to release a mouse button

    #4:
        And the last step, let's make an assertion that both of those elements
        are located inside of the drop location.
        So first we find a trash, then child element li, and another child element h5.
        And I want to make sure that it have text.
        And it should be two values array with the two titles.

*/
