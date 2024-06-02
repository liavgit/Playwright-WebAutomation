import { test, expect } from '@playwright/test';

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200')
})

test.describe('Form layouts page', () =>{
    
    
    test.beforeEach(async ({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input field', async ({page},testInfo)=>{
        if (testInfo.retry) {
            //do something...for example clean the database
        }
        test.describe.configure({retries:2})

        const usingThegridEmailInput = page
            .locator('nb-card', {hasText:"Using the Grid"})
            .getByRole('textbox', {name: "Email"})

        //metodo1 para fill input
        await usingThegridEmailInput.fill('test@test.com')

        //metodo clear input
        await usingThegridEmailInput.clear()

        //metodo2 para fill input
        await usingThegridEmailInput.pressSequentially('test2@test.com')

        /*And what also this press sequentially method can do 
        is to create a delay between the keystrokes.
        If for some reason in your test scenario you want to simulate 
        like slower typing into the input field,
        you can simulate that as well.
        You need to provide a second argument with the object delay 
        and type the amount in milliseconds. 
        How long you want to delay between the keystrokes.
        For example, I want to type half a second and if I run*/
        await usingThegridEmailInput.clear()
        await usingThegridEmailInput.pressSequentially('test2@test.com', {delay: 500})

        //generic assertion
        /*So method input value will extract the text from the input field 
        and we'll save into the constant.*/
        const inputValue = await usingThegridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingThegridEmailInput).toHaveValue('test2@test.com')

        /*In order to type any text into the input fields, 
        you need to use method fill and provide the argument as a string.
        What you want to type into this input field.\
        In order to clear the input field, you need to use method clear 
        that have to be called from the locator.
        If you want to simulate a keystrokes on the keyboard, 
        you can use method press sequentially 
        and if you want to simulate delays between the keystroke, 
        you can pass additional argument providing the amount in milliseconds.
        How long do you want to delay a keystrokes?
        
        Also, for generic assertion, 
        you need to use a method input value that will extract the value 
        from the locator from the input field 
        and assign to the constant or variable.
        And then you can call generic assertion to perform the validations.
        
        If you use a locator assertion, you provide the locator 
        and use a method to have value.
        Assigning the value inside of the input field.*/
    })

    
})