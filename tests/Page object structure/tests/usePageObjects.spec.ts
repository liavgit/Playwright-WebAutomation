import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
});

test("Navigate to form page", async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    await navigateTo.datepickerPage();
    await navigateTo.smartTablePage();
    await navigateTo.toastrPage();
    await navigateTo.tooltipPage();
});

test("using parametrized methods", async ({ page }) => {

    //instanciando las paginas
    const navigateTo = new NavigationPage(page);
    const onFormLayoutsPage = new FormLayoutsPage(page);
    const onDatepickerPage = new DatepickerPage(page);

    await navigateTo.formLayoutsPage();
    
    //login in the using the grid form
    //await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption("test@test.com","Welcome1","Option 1");
    //crdenciales CON VARIABLE DE AMBIENTE
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME,process.env.PASSWORD,"Option 1");
    
    //login in the in line form - selecting the remember me checkbox
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox("John Smith","john@test.com",true);

    //seleccionar fecha
    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatePickerDateFromToday(5)
    await onDatepickerPage.selectDatePickerWithRangeFromToday(6,15)
})

test.only("Testing with argos ci", async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    await navigateTo.datepickerPage();
});