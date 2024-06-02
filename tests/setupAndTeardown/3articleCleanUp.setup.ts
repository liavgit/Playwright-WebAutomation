import { test as setup, expect } from "@playwright/test";

//444444444
/*And we need to copy the code that is responsible for creating the article.*/
setup('delete article', async ({request}) => {

    const deleteArticleRequest = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`)
    expect(deleteArticleRequest.status()).toEqual(204)
})

