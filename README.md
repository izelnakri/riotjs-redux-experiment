/frontend is the actual frontend directory

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

STATUS: Writing unit tests for has_many_password implementation for a User model in Node.js (sequelize model)

some other things I might do in future:
- form validations
- store changes
- multiple data set req integration from a server
- form generation from js
- tests
- async load order
- real-time comm.
- error reporting
- debugging
- Object observer
- isomorphic example(needs backend rendering engine)

maybe turn /pages into /apps
