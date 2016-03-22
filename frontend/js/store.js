import * as actions from './actions';
import * as reducers from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
// REDUX HERE ==========================================
//normalizr and camelCase libraries

var initialState = {
    todosVisibilityFilter: 'SHOW_ALL',
    todos: [],
    todo: {},
    user: {},
    counter: 0,
    feedbacks: {
        count: 0,
        count_nolimit: 0,
        items: [],
        total: 0,
        ratings: [1, 2, 3, 4, 5]
    }
};

/**
 * Logs all actions and states after they are dispatched.
 */
// const logger = store => next => action => {
//     console.group(action.type);
//     console.info('dispatching', action);
//     let result = next(action);
//     console.log('next state', store.getState());
//     console.groupEnd(action.type);
//     return result;
// };

const logger = createLogger();


/**
 * Sends crash reports as state is updated and listeners are notified.
 */
const crashReporter = store => next => action => {
    try {
        return next(action);
    } catch (err) {
        console.error('Caught an exception!', err);
        // Raven.captureException(err, {
        //   extra: {
        //     action,
        //     state: store.getState()
        //   }
        // });
        throw err;
    }
};

/**
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 *
 * Useful for early exits (conditions over `getState()`), as well
 * as for async control flow (it can `dispatch()` something else).
 *
 * `dispatch` will return the return value of the dispatched function.
 */
// const thunk = store => next => action =>
//     typeof action === 'function' ?
//         action(store.dispatch, store.getState) :
//         next(action);


// You can use all of them! (It doesn’t mean you should.)
let reducer = Redux.combineReducers(reducers);
var Store = Redux.createStore(
    reducer,
    initialState,
    Redux.applyMiddleware(
        thunk,
        crashReporter,
        logger
    )
);

window.Store = Store;
window.actions = actions;
window.reducers = reducers;

riot.mixin('store', {
    init: function() {
        var self = this;

        // store = Store.getState();
        window.dispatch = Store.dispatch;

        _.each(Object.keys(actions), function(action) {
            self[action] = function() {
                return dispatch(actions[action]());
            };
        });

        self.on('mount', function() {
            self.store = Store.getState();

            Store.subscribe(function() {
                console.log('called');
                self.store = Store.getState();
                self.update();
                // performance optimization: find which selector is used
            });

            console.log('Store mount is called for a tag: ' + self.root.tagName);
            self.update();
        });

        self.on('update', function() {
            console.log('Store update is called for a tag: ' + self.root.tagName);
        });

        // performance optimization: unsubscribe on unmount if its necessary
    }
});

// unused middlewares:

/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the timeout in this case.
 */
// const timeoutScheduler = store => next => action => {
//     if (!action.meta || !action.meta.delay) {
//         return next(action);
//     }
//
//     let timeoutId = setTimeout(
//         () => next(action),
//         action.meta.delay
//     );
//
//     return function cancel() {
//         clearTimeout(timeoutId);
//     };
// };

/**
 * Schedules actions with { meta: { raf: true } } to be dispatched inside a rAF loop
 * frame.  Makes `dispatch` return a function to remove the action from the queue in
 * this case.
 */
// const rafScheduler = store => next => {
//     let queuedActions = [];
//     let frame = null;
//
//     function loop() {
//         frame = null;
//         try {
//             if (queuedActions.length) {
//                 next(queuedActions.shift());
//             }
//         } finally {
//             maybeRaf();
//         }
//     }
//
//     function maybeRaf() {
//         if (queuedActions.length && !frame) {
//             // frame = requestAnimationFrame(loop);
//         }
//     }
//
//     return action => {
//         if (!action.meta || !action.meta.raf) {
//             return next(action);
//         }
//
//         queuedActions.push(action);
//         maybeRaf();
//
//         return function cancel() {
//             queuedActions = queuedActions.filter(a => a !== action);
//         };
//     };
// };

/**
 * Lets you dispatch promises in addition to actions.
 * If the promise is resolved, its result will be dispatched as an action.
 * The promise is returned from `dispatch` so the caller may handle rejection.
 */
// const vanillaPromise = store => next => action => {
//     if (typeof action.then !== 'function') {
//         return next(action);
//     }
//
//     return Promise.resolve(action).then(store.dispatch);
// };

/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
// const readyStatePromise = store => next => action => {
//     if (!action.promise) {
//         return next(action);
//     }
//
//     function makeAction(ready, data) {
//         let newAction = Object.assign({}, action, { ready }, data);
//         delete newAction.promise;
//         return newAction;
//     }
//
//     next(makeAction(false));
//     return action.promise.then(
//         result => next(makeAction(true, { result })),
//         error => next(makeAction(true, { error }))
//     );
// };
