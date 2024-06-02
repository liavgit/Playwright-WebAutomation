import { request, expect } from "@playwright/test"
import user from '../pw-practice-app/.auth/user.json';
import fs from 'fs';

async function globalSetup() {
    const authFile = '.auth/user.json'
    /*we are right now at the very low level of the framework 
    and we need to create a new context*/
    const context = await request.newContext()
    
    //token
    const responseToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data:{
            user: {email: "pwtest@yopmail.com", password: "pwtest"}
        }
    })
    const responseBody = await responseToken.json()
    const accessToken = responseBody.user.token

    user.origins[0].localStorage[0].value = accessToken     //#2.1
    fs.writeFileSync(authFile, JSON.stringify(user))        //#2.2

    process.env['ACCESS_TOKEN'] = accessToken
    
    
    //create article
    const articleResponse = await context.post('https://conduit-api.bondaracademy.com/api/articles/',{      //#6                                 //#6
        data:{
            article: {title: "global LIKES TEST ARTICLE", description: "bbb1", body: "ccc1", tagList: []}
        },
        headers:{
            Authorization: `Token ${process.env.ACCESS_TOKEN}`
        }
    })
    expect(articleResponse.status()).toEqual(201)

    const response = await articleResponse.json()
    console.log(response)
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
}

export default globalSetup