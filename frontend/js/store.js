import * as actions from './actions';
import * as reducers from './reducers';

// REDUX HERE ==========================================
//normalizr and camelCase libraries + Babel probably needed

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

function storeLogic(state, action) {
    if (!state) {
        state = initialState;
    }

    // maybe iterate from reducers object and create these:

    return {
        user: reducers.user(state.user, action),
        todos: reducers.todos(state.todos, action),
        todo: reducers.todo(state.todo, action),
        counter: reducers.counter(state.counter, action),
        todosVisibilityFilter: reducers.todosVisibilityFilter(state.todosVisibilityFilter, action),
        feedbacks: reducers.feedbacks(state.feedbacks, action)
    };
    // namespace these reducers with ES6 imports:
    // return {
    //     user: user(state.user, action),
    //     todos: todosReducer(state.todos, action),
    //     todo: todoReducer(state.todo, action),
    //     counter: counterReducer(state.counter, action),
    //     todosVisibilityFilter: todosVisibilityFilter(state.todosVisibilityFilter, action),
    //     feedbacks: feedbacksReducer(state.feedbacks, action)
    // };
}

window.Store = Redux.createStore(storeLogic);

Store.subscribe(function() {
    console.log(Store.getState());
});

riot.mixin('store', {
    init: function() {
        var self = this;

        Store = Store;
        dispatch = Store.dispatch;

        self.on('mount', function() {
            self.store = Store.getState();

            Store.subscribe(function() {
                self.store = Store.getState();
                // performance optimization: find which selector is used
            });
            console.log('Store mount is called for a tag: ' + self.root.tagName);
            self.update();
        });

        self.on('update', function() {
            console.log('Store update is called for a tag: ' + self.root.tagName);
        });

        // performance optimization: unsubscribe on unmount if its necessary

        // register actions to the global namespace
    }
});
