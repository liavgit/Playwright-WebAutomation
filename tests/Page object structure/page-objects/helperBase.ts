import { Page } from "@playwright/test";

export class HelperBase {
    
    readonly page: Page

    constructor(page: Page) {
        this.page= page;
    }

    async waitForNumberOfSeconds(timeInSeconds : number){
        await this.page.waitForTimeout(timeInSeconds*1000)
    }
}

/*We have created a helper base class 
that we can use for keeping some of the methods or functions that
can be reused across different page objects.
Then, inside of this page object, 
we use a concept from object oriented programming called inheritance.

When we extended a base class and then simply can read the method from this base class 
without creating the instance of this class.

Also, we change the approach, how we read the instance of the page fixture.

Since we use inheritance, we need to read a page fixture from the helper base class and in order to 
do this we need to use a constructor super(page) and that's it.

After that, you simply call the methods inside of the page objects that are inside of the helper base as usual.*/