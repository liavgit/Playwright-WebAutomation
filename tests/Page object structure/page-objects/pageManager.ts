import { expect, Page } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";

export class PageManager {

    private readonly page:Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page:Page) {
        this.page = page;

        /*But instead of passing just page, we need to pass the page fixture related to the page object manager,
        This way we will make sure that navigation page, we will use the fixture of the page that we passed
        from the test into the page manager and then from the page manager we are cascading it down to the navigation
        page right here. So that's why we need to use this dot page.*/
        
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }
}