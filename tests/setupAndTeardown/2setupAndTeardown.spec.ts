import { expect, test} from "@playwright/test";

//111111111
//este metodo cuenta los likes que se han hecho a un articulo 
test('like counter increase',async ({page}) => {
    await page.goto("https://conduit.bondaracademy.com/");
    await page.getByText('Global Feed').click();
    //await page.locator('app-article-preview').first().locator('button')
    const firstLikeButton = page.locator('app-article-preview').first().locator('button')
    await firstLikeButton.click();
    //expect(firstLikeButton).toContainText('0')
    //await firstLikeButton.click({force: true});
    expect(firstLikeButton).toContainText('1')
    
})

//2222222222
/*...Now we need to create a precondition 
that will create a test article that we will use 
and we will use it using a helper for the setup.
este archivo es> newArticle.setup.ts*/