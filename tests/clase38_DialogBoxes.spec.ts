/*So let's quickly summarize what we did in this lesson.

When you are dealing with dialog boxes, if this is a regular web dialog box, you automate it as usual,
inspect element, find the element, interact with this.

But if you are dealing with the browser dialog boxes 
in order to accept it, you need to call page on
dialog listener and then inside of the dialog box need to call dialog accept.
Then playwright will accept this dialog and you will be able to move forward. */

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://localhost:4200/");
});

test("browser dialog boxes", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //escuchar el evento de dialogo
  //por defecto playwright cancela pero hay que forzarlo a que acepte la accion q es borrar...
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete");
    dialog.accept();
  });

  //de la tabla, seleccione larow q tiene ese email, localize el trash icon y haga click para borrar
  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();

  //assert que la priemra linea de la tabla fue borrada
  await expect(page.locator("table tr").first()).not.toHaveText(
    "mdo@gmail.com"
  );
});
