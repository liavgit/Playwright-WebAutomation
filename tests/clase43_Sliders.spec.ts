/*Temperature slider: 
When I move it left and right, 
you can see that in the Dom there are two attributes Cx and Cy that are updated.
Those are the x and Y coordinates in pixel for the location of our web element.
So technically we can just update the desired coordinates 
of this web element and it should work without 
actual simulation of moving the mouse.*/

import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("https://localhost:4200/");
});

test("Sliders", async ({ page }) => {
  //FORMA 1 - Update attribute
  //#1
  const tempGauge = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger circle'
  );
  //#2
  await tempGauge.evaluate((node) => {
    node.setAttribute("cx", "232.630");
    node.setAttribute("cy", "232.630");
  });
  //#3
  await tempGauge.click();

  //FORMA 2 - Update with mouse movement
  //#4
  const tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger'
  );
  //#5
  await tempBox.scrollIntoViewIfNeeded();
  //#6
  const box = await tempBox.boundingBox();
  //#7
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  //#8
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();
  //#9
  await expect(tempBox).toContainText("30");
});

/*EXPLANATION ________________________________________________________________________________*/

/*
  #1:
    coge el lemento de temperatura q es el circulo que se puede deslizar 
    primero cogemos el tab de temperatura  y luego vamos mas abajo en el dom 
    y lo encontramos con ese localizador
    
  #2: 
    se hace un callback, se llama al metodo set attribute 
    que es el que permite cambiar el valor de un atributo en el dom 
    aca cambiamos cx  y cy que son los que mueven el slider 
    
  #3:
    hasta aca, los valores del cx se cambiaron 
    pero en pantalla no se ve el el slider como cuando uno lo mueve desde la ui
    We physically changed the position of the UI element, 
    but we didn't trigger the event of this change.
    So that's why browser did not react on this change.
    So now we need just to trigger any command to this particular web element 
    to trigger the event to happen and reflect the change on the UI.
    para eso se hace el click 

  #4:
    nos damos cuenta que al mover el mouse dentro de area del circulo, 
    los valores de cx  y cy cambian 
    entonces enfocamos el area donde esta el circulo 

  #5:
    you need to make sure that the 
    area where you going to move your mouse 
    is completely in the view of the browser.
    So that's why we need kind of a scroll down this section a little bit down 
    to make sure that this entire view is located in the browser view.
    That's why we will call the method to scroll into view if needed.
    So this method will make sure that our page scroll down appropriately 
    and this entire box is displayed on the page.
    
  #6:
    The next step we need to define a bounding box.
    So here is our web element that we define temperature dragger 
    and this temperature dragger is nothing but a box 300 by 300 pixels.
    When you call a method bounding box for this particular web element, 
    playwright creates a coordinates around this bounding box with X and Y coordinates 
    which start in the top left corner.
    X coordinates are horizontal coordinates and y coordinates are vertical coordinates, 
    and the top left corner has a coordinates, zero and zero by pixels.
    And for example, if you want to put your mouse pointer down to 100 pixels, 
    you define like this x is zero pixels and Y is 100 pixels 
    and your mouse will move down to this point.
    Or if you want to move mouse 100 pixels to the right on the x coordinates 
    and 50 pixels down on the Y coordinates 
    and your mouse pointer will be located right here. 

    0,0 --------->...
    |
    |
    |...
    
    And also keep in mind that you are not limited by this bounding box. 
    And if you want to move your pointer somewhere outside of the bounding box,
    you just provide the negative values.
    For example, here we are saying X is equal 100, but y is -50 pixels 
    and your mouse pointer moved above the bounding box, closer to the temperature area.

    se mete dentro de una constante para poder nteractuar con esa area y setear los valores
    
  #7:
    And this way we created a starting coordinates of our bounding box 
    in the center of our bounding box.

            | (0,0)
    <-------|------->
            |
  
  #8:
    I am putting my mouse cursor to the location where I want to start from.
    Second, I want to click the mouse button to begin movement so i go down
    then i move horizontally y luego nos movemos hacia abajo otra vez en esa x
    y por ultimo release  o soltar el mouse  con up()
  
  #9:
    Hacemos el assertion de que se ve el valor correcto
*/

/*summary

You have two ways how you can move the sliders on the web page.

 -  Approach number one 
      is simply updating HTML attributes that are responsible 
      for coordinates of this web element. In order to do that, 
      you need to use evaluate expression 
      and then set the values of the desired coordinates.
      Then you need to trigger action on this web element 
      in order to trigger the event to make this change.

 - The second approach 
      is using the actual mouse movement. 
      You need to define a bounding box of the area where you want to start with bounding box.
      Always start on the top left corner of the box with initial coordinates.
      You can also get the center of your bounding box using the formula 
      and then simply move the mouse around the screen, 
      triggering the mouse commands and providing x and y coordinates 
      to your mouse movement.
      
*/
