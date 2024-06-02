import { test as setup, expect } from "@playwright/test";

//2222222222
/*And we need to copy the code that is responsible for creating the article.*/
setup('create new article', async ({request}) => {

    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{      //#6                                 //#6
        data:{
            article: {title: "LIKES TEST ARTICLE", description: "bbb1", body: "ccc1", tagList: []}
        }
        /*headers:{
            Authorization: `Token ${accessToken}`
        }*/
    })
    expect(articleResponse.status()).toEqual(201)

    const response = await articleResponse.json()
    console.log(response)
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
})


//333333
/*And now we can create a new project 
that will call this setup as a dependency for our test.
esto se hace en >>>> playwright.config

el proyecto name: 'likeCounter', es el que hace el click en el boton de like
el proyecto name: 'articleSetup', es el que crea el articulo nuevo 

articleSetup depende de setup (el que hace el login y crea el token) y 
likeCounter depende de articleSetup*/