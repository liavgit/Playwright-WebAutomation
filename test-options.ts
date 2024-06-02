import {test as base} from '@playwright/test'
import { PageManager } from './tests/Page object structure/page-objects/pageManager'

export type TestOptions = {
    globalSqlUrl: string
    formLayoutsPage1: string
    formLayoutsPage2: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalSqlUrl: ['', {option: true}],
    //I would prefer to keep this as an empty string as a placeholder and we will override this value later

    //fixture para fromalayout - version 1 
    formLayoutsPage1: async({page}, use) => {
        await page.goto('http://localhost:4200')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        /*Then, in order to activate this feature, we need to use a keyword use 
        and inside we need to provide the argument of the string.
        And in our example it can be just a simple empty string 
        because we will not use this value for anything else.*/
        await use('')
    },

    //fixture para fromalayout - version 2 - en []
    /*You are saying that forms layout fixtures 
    should be automatically initialized as a very very first thing when we run the test.
    So forms layout fixture run even before Before each or before all hook as a very first thing.*/
    formLayoutsPage2: [async({page}, use) => {
        await page.goto('http://localhost:4200')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        /*Then, in order to activate this feature, we need to use a keyword use 
        and inside we need to provide the argument of the string.
        And in our example it can be just a simple empty string 
        because we will not use this value for anything else.*/
        await use('')
    }, {auto:true}],

    pageManager: async({page}, use) => {
        const pageManag = new PageManager(page)
        await use(pageManag)
    }
})