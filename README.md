/dev is the actual development directory

I did this in RiotJS on purpose to inspire others. JS code is very high quality.

I didn't use a fancy flux/redux store since there is no adding/removing or no syncing data with a server

I didn't use a bundler like webpack, because I like good DSLs, I know node + GulpJs and I'm not a hipster.

iz namespace is used. For example: ``` <iz-rating-list /> ```

All the css is component specific, bootstrap has been used to its full power.

This frontend structure scales really well with a flux architecture. (also RiotJS has a built-in EventEmitter called)

``` npm install http-server gulp -g ```

``` npm install ```

``` gulp watch ```

``` http-server ```
