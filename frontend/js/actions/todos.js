// maybe add constants folder
var nextTodoId = 0;

export var addTodo = function(text) {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text: text
    };
};

export var setVisibilityFilter = function(filter) {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    };
};

export var toggleTodo = function(id) {
    return {
        type: 'TOGGLE_TODO',
        id: id
    };
};
