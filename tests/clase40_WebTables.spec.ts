/*automation of the web tables sometimes can be tricky 
just because of the structure of the web tables.

So table always starts with a table tag.
When you open this, usually it has table head or table body, 
sometimes without the table head, it's just a table, body tag.

And then inside of table body, we have a table rows, 
which is TR tag and each TR has TDs. TD is table down, which is table column**/

import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("https://localhost:4200/");
});

//test filter of the table make sure results have selected filter
test("web tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  const ages = ["20", "30", "40", "200"]; //#1
  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear(); //#2
    await page.locator("input-filter").getByPlaceholder("Age").fill(age); //#2
    await page.waitForTimeout(500); //#7
    const ageRows = page.locator("tbody tr"); //#3
    //#4
    for (let row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent(); //#5
      //#6
      if (age == "200") {
        //#8
        expect(await page.getByRole("table").textContent()).toContain(
          "No data found"
        );
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
});

/*EXPLANATION ________________________________________________________________________________*/

/*
  #1: 
    We created all the test data that we want to use.
    valores de edad por  los que vamos a filtrar la tabla

  #2: 
    Then we created a loop to loop through each of the values .
    buscar el campo de edad, limpiarlo y poner el valor con el q voy a filtrar

  #3:
    Then we find the all rows as a result of the search output.
    localizar todas las filas que aparecen con cada edad con la que se filtra

  #4:
    And then we are looping through each of the rows.
    Ahora nos movemos por cada una de las filas. 
    .all() will create array for us of the web element
    and we need to use await to get each of the row

  #5:
    y en cada fila seleccionamos la ultima columna con last()
    y cogemos el valor que tiene >> Row number one, getting the text content, row number two, getting the text content and so on.

  #6:
    And we should make an assertion that each row as a result will be equal to the selected age
    y comparamos el valor de cada fila , que si tenga el valor que usamos para filtrar
    y en el rango de 200 como n hay que resultados hay que hacer el if
    para que vea que sale el error de no data
    
  #7:
    en este caso pasa algo particular  y es que cuando se filtra, 
    la tabla toma  un tiempo para cargar las filas que cumplen la condicion del filtro
    y entonces no le da tiempo de coger los valores que tiene que coger cundo termina de hacer el filtro
    entonces  se produce un erro  y en el assertion dice que no encuentra los valores que son 
    entonces hay que poner un tiempo de espera para que capture los valores
    correctos cuando termina de cargarsen las filas filtradas
  
  #8:
    Dentro de toda la tabla busque el texto de no data
*/
