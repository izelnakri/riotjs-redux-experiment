Status: isomorphic RiotJS example is done, testing Redux with RiotJS(still in progress)

I did this in RiotJS on purpose to inspire others. JS code is very high quality.

I didn't use a fancy flux/redux store since there is no adding/removing or no syncing data with a server

I didn't use a bundler like webpack, because I like good DSLs, I know node + GulpJs and I'm not a hipster.

iz namespace is used. For example: ``` <iz-rating-list /> ```

All the css is component specific, bootstrap has been used to its full power.

This frontend structure goes well with a flux architecture. (RiotJS has a built-in EventEmitter)

- ``` npm install http-server gulp riot sequelize-cli -g ```

- ``` npm install ```

Create the models:

- ``` createdb riotjs_example ```

- ``` sequelize db:migrate  ```

``` gulp watch ```

``` node server.js ```

FOR UNIT TESTS:
- ``` createdb riotjs_example_test ```
- ``` sequelize db:migrate --env=test ```


TODO: write TodoList with mapStateToProps for riot tags, action-dispatch routine
- make sourcemaps work for js + css
- make Object.assign + optional parameters work with Babel
- add ES6 modules
- optimize the gulp build process

some other things I might do in future:
- form validations
- store changes
- tests (unit test on the store, API test)
- multiple data set req integration from a server
- form generation from js
- front-end copy + expression read
- copy sharing = backend / frontend / multi-lang
- async load order, ES6 imports, babel transpiling(maybe)
- real-time comm. (socket.io)
- error reporting
- debugging
- Object observer (if needed)
- multi-auth (fb/twitter etc)
- styleguide
- rake routes and schema.rb functionality to the backend
- deployment(probably capistrano)
- api-serializer (maybe) + json+hal
- backend caching with redis smt like fresh_when

maybe turn /pages into /apps
