/*esta clase se hace con una copia ajustada del test
C:\Users\laura\Documents\CURSOS\UdemyPlaywight\gitRepo\pw-practice-app\tests\Page object structure\tests\usePageObjects_withRefactor.spec.ts*/

//1 - importamos el test desde el archivo donde creamos el fixture
import { test } from "../test-options";
import { PageManager} from "../tests/Page object structure/page-objects/pageManager";

/* >>>> test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
});*/

//PASANDO EL FIXTURE - VERSION1 
// 2 - we need to pass a newly created fixture as the argument inside of our test, which is form layouts page.
test("using parametrized methods", async ({ page, formLayoutsPage1 }) => {
    const pageManager = new PageManager(page);
    // >>>>>> await pageManager.navigateTo().formLayoutsPage();
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@test.com","Welcome1","Option 1");
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox("John Smith","john@test.com",true);

})

//SIN PASAR  EL FIXTURE - VERSION2
// formLayoutsPage2 - we can now remove this fixture from the test itself, run it again.
test("using parametrized methods - fixture 2", async ({ page }) => {
    const pageManager = new PageManager(page);
    // >>>>>> await pageManager.navigateTo().formLayoutsPage();
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@test.com","Welcome1","Option 1");
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox("John Smith","john@test.com",true);

})

//CON FIXTURE PARA MANEJAR EL pageManager
/* pageManager fixture - So we changed the default fixture of the page playwright to our custom page manager fixture, which
is responsible right now for building the page manager object that will responsible for all of our objects.*/
test("using page manager as a fixture", async ({ pageManager }) => {
    //const pageManager = new PageManager(page); >>>> esto se borra
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@test.com","Welcome1","Option 1");
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox("John Smith","john@test.com",true);
})

//>>>> estos pasos marcado asi no nlos necesitamos  porque el fixture formLayoutsPage que esta en test-options.ts  se encarga de eso 
