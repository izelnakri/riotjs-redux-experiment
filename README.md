Status: isomorphic RiotJS example is done, testing Redux with RiotJS(still in progress)

I did this in RiotJS on purpose to inspire others. JS code is high quality.

I didn't use a bundler like webpack, because I like good DSLs, I know node + GulpJs and I'm not a hipster.

iz namespace is used. For example: ``` <iz-rating-list /> ```

All the css is component specific, bootstrap has been used to its full power.

- ``` npm install gulp riot sequelize-cli browserify -g ```

- ``` npm install ```

Create the models:

- ``` createdb riotjs_example ```

- ``` sequelize db:migrate  ```

``` gulp watch ```

``` npm run server ```

FOR UNIT TESTS:
- ``` createdb riotjs_example_test ```
- ``` sequelize db:migrate --env=test ```

TODO:
- use ngParse for copy: https://github.com/rodyhaddad/ngParser.js/blob/master/dist/ngParser.min.js
- test that store change should update selector
- remove redundant package.json dependencies, check them for README(git clone from VPS and check everything)
- find the redux-form and redux-localstorage solution without react
- make sourcemaps work for js + css
- optimize the gulp build process

some other things I might do in future:
- form validations
- tests (unit test on the store, API test)
- form generation from js
- front-end copy + expression read
- copy sharing = backend / frontend / multi-lang
- async load order
- real-time comm. (socket.io)
- error reporting(needs Raven)
- multi-auth (fb/twitter etc) - OAuth
- styleguide
- rake routes and schema.rb functionality to the backend
- deployment(probably capistrano), heroku deployment works
- api-serializer (maybe) + json+hal
- backend caching with redis smt like fresh_when

maybe turn /pages into /apps
