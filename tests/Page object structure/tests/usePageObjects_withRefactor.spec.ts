import { test, expect } from "@playwright/test";
import { PageManager} from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
});

test("Navigate to form page", async ({ page }) => {
    
    const pageManager = new PageManager(page);
    
    await pageManager.navigateTo().formLayoutsPage();
    await pageManager.navigateTo().datepickerPage();
    await pageManager.navigateTo().smartTablePage();
    await pageManager.navigateTo().toastrPage();
    await pageManager.navigateTo().tooltipPage();
});

test("using parametrized methods", async ({ page }) => {

    const pageManager = new PageManager(page);

    await pageManager.navigateTo().formLayoutsPage();
    //login in the using the grid form
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@test.com","Welcome1","Option 1");
    //login in the in line form - selecting the remember me checkbox
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox("John Smith","john@test.com",true);
    //seleccionar fecha
    await pageManager.navigateTo().datepickerPage()
    await pageManager.onDatepickerPage().selectCommonDatePickerDateFromToday(5)
    await pageManager.onDatepickerPage().selectDatePickerWithRangeFromToday(6,15)
})


/*Summary

In order to remove the duplication of the instances of page objects inside of your test, 
a good way is to create a page manager 
that will be responsible for building all of your instances of the pages in the single place.

So in page mangaer class ..  you need to initialize constructor that will create instances of your pages, 
assign those instances into the fields, and then create individual methods that will return this instance to you.

Then, inside of the test you just simply create instance of this page manager 
and interact with your page objects.*/