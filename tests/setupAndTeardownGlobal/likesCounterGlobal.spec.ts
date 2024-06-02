import { expect, test} from "@playwright/test";

test('like counter increase',async ({page}) => {
    await page.goto("https://conduit.bondaracademy.com/");
    await page.getByText('Global Feed').click();
    //await page.locator('app-article-preview').first().locator('button')
    const firstLikeButton = page.locator('app-article-preview').first().locator('button')
    await firstLikeButton.click();
    await page.waitForTimeout(500);
    //expect(firstLikeButton).toContainText('0')
    //await firstLikeButton.click({force: true});
    expect(firstLikeButton).toContainText('1')
    await page.waitForTimeout(500);
})
