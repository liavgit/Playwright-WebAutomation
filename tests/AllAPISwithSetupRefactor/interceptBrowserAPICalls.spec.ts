import { test, expect, request } from "@playwright/test";
import tags from '../constants/tags.json';

test.beforeEach(async ({ page }) => {
    await page.route("*/**/api/tags", async (route) => {
        await route.fulfill({
            body: JSON.stringify(tags) 
        });
    });

    await page.goto("https://conduit.bondaracademy.com/");
});

test("has title", async ({ page }) => {

    await page.route("**/*api/articles?limit=10&offset=0", async (route) => {
        const response = await route.fetch();
        const responseBody = await response.json()
        responseBody.articles[0].title = "This is a MOCK test title"
        responseBody.articles[0].description = "This is a MOCK test description"
        await route.fulfill({
            body: JSON.stringify(responseBody) 
        });
    });

    await page.getByText('Global Feed').click()
    await expect(page.locator(".navbar-brand")).toHaveText("conduit");
    await page.waitForTimeout(1000)
    await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title');
    await expect(page.locator('app-article-list p').first()).toContainText("This is a MOCK test description");
});

test("Create article using API", async ({ page, request }) => {
    await page.getByText('New Article').click()
    await page.getByRole('textbox', {name:"Article Title"}).fill('Article Title test')
    await page.getByRole('textbox', {name:"What's this article about?"}).fill('article about playwright')
    await page.getByRole('textbox', {name:"Write your article (in markdown)"}).fill('article test')
    await page.getByRole('button', {name:"Publish Article"}).click()
    const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseBody = await articleResponse.json()
    const slugId = articleResponseBody.article.slug
    
    await expect(page.locator('.article-page h1')).toContainText('Article Title test');

    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()
    await expect(page.locator('app-article-list h1').first()).toContainText('Article Title test');

    const deleteArticleRequest = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`)

    expect(deleteArticleRequest.status()).toEqual(204)
});

test("Delete article", async ({ page, request }) => {

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
        data:{
            article: {title: "aaa1", description: "bbb1", body: "ccc1", tagList: []}
        }
    })
    expect(articleResponse.status()).toEqual(201)

    await page.getByText('Global Feed').click()
    await page.getByText('aaa1').click()
    await page.getByRole('button', {name:"Delete Article"}).first().click()
    await page.getByText('Global Feed').click()

    await expect(page.locator('app-article-list h1').first()).not.toContainText('aaa1');
});
