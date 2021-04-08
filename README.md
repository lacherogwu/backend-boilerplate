# backend-boilerplate

Backend boilerplate for node projects (express & mongo)

## How to use

### Controllers

The format of the controllers is: [method]\_[funcName]

for e.g. get_sample, post_login

#### Build-in Crud Operations

There is a configured Class called "Crud" where you can setup crud operation to your collection
In order to do that you just need to import the class and the model in your controller, create a new instance of the class with the model,
and add the "...crud.defaults()" to the top of "module.exports" object

You also can modify the crud controllers and implement your own controller,
define the crud name (for e.g. post_find, or any other from the CRUD guide below)

You can see /controllers/crud.js - put_update as an example

Notice that the functional decalred after "...crud.defaults()" in the "module.exports", this is important so the function will overwrite the default behavior

### Routes

There are 2 modes in routes: strict | flexible

You can configure the mode by editing the "mode" variable on /routes/index.js

strict mode:

- no middlewares can be applied, and need to configure

Configuration:

- add the route /path in the /routes/index.js on the "routes" array
- create a new file on /controllers/$fileName.js and setup the functions

flexible mode:

- can use middlewares regularly

Configuration:

- create a new file on /routes, the file name will be the /path
- create a new file on /controllers/$fileName.js and setup the functions, make sure the file name is indentical to the /route file name

Middlewares:

There are 2 ways to configure middlewares in the flexible mode.

1. Setup a middleware to a specific controller

- on the /route file, add on the "md" variable each function as a key in the object, and the middlewares inside the value as array

for e.g.

```js
const md = {
	get_sample: [middleware1, middleware2],
	post_login: [middleware2],
};
```

2. Setup global middleware for all the route

- on the /route file, where there is a comment "global middlewares" add to this array all the middlewares you want to apply

for e.g.

```js
const middlewares = [middleware1, middleware2]; // global middlewares
```

### CRUD

- get_find
- post_create
- put_update
- delete_delete

You can also select specific controllers to be active by providing the "crud.defaults('find', 'update')" arguments (find, create, update, delete)

Find:

With find you can find one document or many, return only specific fields, sort and filter by specific criterias

With code:

```js
// find(findOne = true/false, filter = { key: value }, fields = 'fields/-fields', sort = 'createdAt/-createdAt')
// For fields and sort you can use or string or -string
// just string will show all these fields
// using -string will show all except these fields
// on sort just string will sort by the fields, and -string will reverse the sort
const docs = await crud.find(false, { title }, 'title description');
```

### Apis

You can use the Api class to create your own api controller

### Env configuration

Copy the .env.example file and rename the file to .env

NODE_ENV = production/development

PORT = application port

DB_URI = mongodb uri

JWT_SECRET = a random string generated (do not share/use this string anywhere else), you can use https://www.uuidgenerator.net/ to generate a random secured string

## Development

In order to run in development mode, run the following command:
`npm run dev`
\*nodemon is required

Run local mondo db on docker:
`docker run --name mongo -p 27017:27017 -d mongo`

## Production

In order to run the app type:
`npm start`

Developed with ❤️ by LacheRo`
