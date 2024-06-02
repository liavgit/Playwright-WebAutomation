import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
});

//test para seleccionar un dia quemado
test("datepicker quemado", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  //abre el calendario
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  /*por la clase que es unica, seleccionamos todos los dias del mes actual 
  y luego seleccionamos el dia 14 o el 1, para que la seleccion sea exacta  
  ponemo exact true
  porque sino lo que pasa es que si ponemos  por eje june 1, 
  el trae todos los dias que tengan el 1 como 10, 11, etc*/
  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText("14", { exact: true })
    .click();

  //assert the value is selected correctly
  await expect(calendarInputField).toHaveValue("Apr 14, 2024");
});

//test para seleccionar un dia cualquiera que necesite, por ej mañana  o ayer.
test("datepicker variable for the current month", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  //abre el calendario
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  //crear una  instancia del objeto date 
  //la informacion de date esta en js date
  let date = new Date()
  //queremos el dia actual mas 1
  date.setDate(date.getDate() + 1)
  const expectedDate = date.getDate().toString()
  //get the short version of the month for ex june=jun
  const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})
  const expectedYear = date.getFullYear()
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

  await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true }).click();
  await expect(calendarInputField).toHaveValue(dateToAssert);
});

//test para seleccionar un dia cualquiera que necesite, por ej mañana  o ayer.
test("datepicker variable for another month different from current", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  //abre el calendario
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  //crear una  instancia del objeto date 
  //la informacion de date esta en la documentacion de js date
  let date = new Date()
  //queremos el dia actual mas 200 dias mas para que se coja otro dia del siguiente mes o incluso año
  date.setDate(date.getDate() + 200)
  const expectedDate = date.getDate().toString()
  //get the short version of the month for ex june=jun
  const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})
   //get the long version of the month for ex june=june
  const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
  //get the year
  const expectedYear = date.getFullYear()
  //la fecha que estamos esperando que aparezca seleccionada en el campo de texto del calendario x ej "Apr24, 2020"
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

  //get el  mes que muestra el calendario cuando el calendario se abre
  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

  //mientras el mes que quiero seleccionar no sea igual al que sale en el calendario, 
  //haga click en next para pasar el sg mes 
  //y vuvelva a leer el mes que salio para comparar con el que si quiero 
  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
  }

  //seleccionar la fecha del calendario cuando encuntre la fecha que estoy buscando
  await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true }).click();
  //la fecha aparece en el text field y se hace el assertion para asegurar que si es la seleccionada
  await expect(calendarInputField).toHaveValue(dateToAssert);
});

/*
Summary> 

Using the JavaScript date object, you can get current date and time 
and then modify this date and time object with the values you need.
You can extract, date, you can extract month, year 
and format result a string to the value that you actually need.

Then we created a while loop 
that can select the desired month in our calendar in order to select a correct date.
And then we replaced the variable with expected date 
and date to assert in our assertion to make the assertion of date that we selected.
*/