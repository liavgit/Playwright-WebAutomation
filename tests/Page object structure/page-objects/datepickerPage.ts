import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{
    
    constructor(page: Page) {
        //this.page = page;
        super(page)
    }

    /*Then I will create a method related to selection of the date in the common date picker calendar a sync
    we're going to select the date based on the current date in the calendar, 
    and we will add plus some number of days to select the date in the future.*/

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    
        const calendarInputField = this.page.getByPlaceholder("Form Picker");
        await calendarInputField.click();
        const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday);
        await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    async selectDatePickerWithRangeFromToday(startnumberOfDaysFromToday: number, endDayFromToday: number) {
    
        const calendarInputField = this.page.getByPlaceholder("Range Picker");
        await calendarInputField.click();
        const dateToAssertStart = await this.selectDateInCalendar(startnumberOfDaysFromToday);
        const dateToAssertEnd = await this.selectDateInCalendar(endDayFromToday);
        const dateToAssert =  `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert);
    }


    private async selectDateInCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        //Para los dos calendarios funciona la clase .day-cell.ng-star-inserted
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true }).click();
        return dateToAssert
    }
}