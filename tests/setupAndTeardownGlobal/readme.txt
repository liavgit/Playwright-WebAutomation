Sometimes regardless the project that you want to run inside of the framework, 
you need to make certain global setup or the teardown after all test is completed.
So playwright also have this capability.

And just for this demonstration, let's create a new spec file 
that will do exactly the same thing as a like counter, 
but will not be dependent on any other project 
and will be dependent on global setup and global teardown.

1 - crear tests/setupAndTeardownGlobal/likesCounterGlobal.spec.ts

2 - crear un nuevo proyecto en playwright config name: 'likeCounterGlobal',
este proyecto no tiene dependencias pero si va a estar atado al global setup

3 - entonces se crean dos archivos:
global-setup.ts (will be responsible for creating a new article.)
global-teardown.ts
And inside of these files we need to put implementation for setup and teardown

4 - debemos colocar el globalSetup en el ppw config

5 - en el global setup 
Also, to perform this API request, we're going to need a token.
Since we will not execute auth setup, we need to make a separate API call to get the token 
como este es un archivo independiente del config, 
necesita tener toda la informacion que requiera 
por eso se llama al token y toda la informacion que tiene ese archivo 

6 - ....
entonces  lo q entiendo es que se crea el arcivo de like que se mete como proyecto en el playwright, 
y el global setup se ejecuta antes independientemente y crea el post
para que le]uego entre este proyecto y termine de hacer el click en el boton del like 
...

7 - ahora se crea  un global teardown en el config file
  globalTeardown: require.resolve('./global-teardown.ts'),

8 - en el archivo global-teardown.ts vamos a poner la logica para borrar el post

9 - para correr el proyecto, ir a donde estan los tests en el icono de probeta de laboratorio y 
seleccionar arriba en la flecha doble, expadir, y seleccionar el proyecto likeCounterGlobal


****

summary

When you need to create a global setup or global teardown for the entire project, 
no matter what projects do you want to run inside of your test

You can use a global setup or global teardown settings inside of the playwright.
For that you will need to create a TypeScript file responsible for either global setup or teardown.
Inside of this file you need to declare a JavaScript function that will perform a certain operation
for you that you want to be executed as a global setup.

In our example, we created a new article 
and then important to create an export of this function at the end.

The same thing for the global teardown.
You create a function that perform a certain operation for you and then make an export 

and inside of the config file you create a reference to global setup and teardown 
to execute those functions.

Global setup and teardown will be executed for any project 
and any spec file executed inside of theframework.