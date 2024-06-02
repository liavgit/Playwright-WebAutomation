//OJO esto es sol un ejemplo y esta malo

import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

