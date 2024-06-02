//OJO esto es sol un ejemplo y esta malo

import { test } from '@playwright/test';

/*test.beforeAll(()=>{})*/

/*When you group your test by the test suites using describe, 
you can skip them independently and run them independently and each scope 
for the before each hook inside of the describe will work only 
for that particular describe or the test suite.*/

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Suite1', ()=>{

    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click()
    })

    //page is for the blank web page that is needed to run the test
    test('The first test', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe('Suite2', ()=>{

    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    //page is for the blank web page that is needed to run the test
    test('The first test1', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test('navigate to datepicker', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})

/*test.afterAll(()=>{})*/