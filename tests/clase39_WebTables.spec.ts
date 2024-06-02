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

test("web tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //***
  //FORMA 1 DE INTERACTURA CON UNA FILA DE LA TABLA
  //es a traves de especificar un texto que este en la fila, en cualquier parte de esa fila

  //get the row by any text on the row, like an email and click on edit button
  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await targetRow.locator(".nb-edit").click();

  //en esta pagina, cuando se hace click en el edit, el html cambia
  //entonces necesitamos  un nuevo localizador para esa linea
  //y se limpia
  //y se pone el valor con el vamos a editar, en este caso la edad
  //y se hace clic en el chulito para guardar los cambios
  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("35");
  await page.locator(".nb-checkmark").click();

  //***
  //FORMA 2 DE INTERACTURA CON UNA FILA DE LA TABLA
  //seleccionar por un attributo o columna en especifico por ej el id

  /*Test: We will navigate to the second page of this table 
  and then we update a user with ID 11.
  And we want to update, let's say this email to some new value.*/

  //seleccionar la segunda pagina de la tabla
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  //seleccionar la fila que tiene el id  11, id es la columna de indice 1 por eso nth es 1
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") });
  //seleccionar el boton de editar
  await targetRowById.locator(".nb-edit").click();
  //limpiar el campo donde esta el email y llenarlo con el nuevo email
  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("test@test.com");
  //guardar el nuevo valor
  await page.locator(".nb-checkmark").click();
  //assert que el texto del email si cambio en la columna de email de la linea que tiene el id 11
  await expect(targetRowById.locator("td").nth(5)).toHaveText("test@test.com");
});

//SUMMARY

/*DE LA FORMA 1
If you want to locate any row in the table 
and your table has a unique text, you can use this for get
by row and provide the text that is displayed in the table.
*/

/*DE LA FORMA 2
Keep in mind the text that displayed in the table is Not always text.
It sometimes can be a value.
In this case, You will need to use a different identifier 
such as get by placeholder or something else.
If the text that you are looking for in the row is not unique 
but unique for the certain column, you can use a filter 
narrowing down the output of your row by a specific column using using a locator filter.
Then when you want to make the assertion, 
you can always navigate into the desired column by the index
of this column and make an assertion.
*/
