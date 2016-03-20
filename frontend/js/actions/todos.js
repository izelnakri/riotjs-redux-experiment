// maybe add constants folder
var nextTodoId = 0;

var addTodo = function(text) {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text: text
    };
};

var setVisibilityFilter = function(filter) {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    };
};

var toggleTodo = function(id) {
    return {
        type: 'TOGGLE_TODO',
        id: id
    };
};
