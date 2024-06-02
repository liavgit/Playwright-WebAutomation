/*We added more reusable methods into navigation page.
We made those methods smart enough to be able 
to select any page inside of our menu, 
regardless of the state of the main menu.
Is it expanded or collapsed?
So we created internal method that 
will check the state of the main menu.
Is it expanded or collapsed?
And then based on the state, 
it's either click on this menu item 
or we'll skip this item, 
selecting  the actual item from the menu, 
either tooltip toaster, smart table date picker or form layouts,
and then we can successfully call our page object methods 
to navigate across the pages in test application.*/

import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

/*si no se exporta, no es visible para otras partes del framework*/
export class NavigationPage extends HelperBase{
    /*This line declares a readonly property named page of type Page. 
    readonly means that once the property is assigned a value, it cannot be changed later.*/
    
    readonly formLayoutMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuItem: Locator;

    /*This constructor method initializes a new instance of the NavigationPage class. 
    It takes one parameter page of type Page and assigns it to the page property of the class.
    Then inside of the class we created a field constructor 
    and method constructor will wait a parameter of a page fixture 
    that will be passed from the test inside of the navigation page in order to make sure 
    that we are using the same instance of the page.
    + all locators are placed  inside  of the constructor y se llaman desde  los metodos*/
    constructor(page: Page) {
        super(page);
        //this.page = page;

        //locators
        this.formLayoutMenuItem = page.getByText("Form Layouts");
        this.datePickerMenuItem = page.getByText("Datepicker");
        this.smartTableMenuItem = page.getByText("Smart Table");
        this.toastrMenuItem = page.getByText("Toastr");
        this.tooltipMenuItem = page.getByText("Tooltip");
    }

    /*And then we use this instance of the page fixture inside of the method 
    related to navigation on this page.
    And we use a keyword this in order to read this fixture instance.*/

    async formLayoutsPage() {
        //await this.page.getByText("Forms").click();
        await this.selectGroupMenuItem("Forms");

        //await this.page.getByText("Form Layouts").click();
        await this.formLayoutMenuItem.click();
        //metodo que viene del helper base, no se intacia el helper base porque se esta heredando... 
        await this.waitForNumberOfSeconds(2)
    }

    /*Go to page...*/
    async datepickerPage() {
        await this.selectGroupMenuItem("Forms");
        await this.datePickerMenuItem.click();
    }

    /*Go to page...*/
    async smartTablePage() {
        await this.selectGroupMenuItem("Tables & Data");
        await this.smartTableMenuItem.click();
    }

    /*Go to page...*/
    async toastrPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.toastrMenuItem.click();
    }

    /*Go to page...*/
    async tooltipPage() {
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.tooltipMenuItem.click();
    }

    /*El form es  un menu asi como otros menus...
        y si esos menus ya estan abiertos, 
        al hacer click en el se cerraria otra vez 
        entonces para evitarlo se crea este metodo
        ademas este metodo es privado 
        porque solo sera usado por los metodos de esta clase*/
    private async selectGroupMenuItem(groupItemTitle: string) {
        //se coge el elemento que pertenece al nombre del grupo que se expande
        const groupMenuItem = this.page.getByTitle(groupItemTitle);

        //se coge el valor del attributo que indica si esta expandido o no
        const expandedState = await groupMenuItem.getAttribute("aria-expanded");

        //si esta contraido, se expande
        if (expandedState == "false") {
        await groupMenuItem.click();
        }
    }
}
