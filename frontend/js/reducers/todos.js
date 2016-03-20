// import undoable, { distinctState } from 'redux-undo'

export function todo(state, action) {
    switch (action.type) {
    case 'ADD_TODO':
        return {
            id: action.id,
            text: action.text,
            completed: false
        };
    case 'TOGGLE_TODO':
        if (state.id !== action.id) {
            return state;
        }

        return _.assign({}, state, {
            completed: !state.completed
        }); // Object.assign is ES6
    default:
        return state;
    }
}

export function todos(state, action) {
    _.defaults(state, []);

    switch (action.type) {
    case 'ADD_TODO':
        return [
            ...state, // this is ES6
            todo(undefined, action)
        ];
    case 'TOGGLE_TODO':
        return state.map(function(t) {
            todo(t, action);
        });
    default:
        return state;
    }
}

export function visibilityFilter(state, action) {
    _.defaults(state, 'SHOW_ALL');

    switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
        return action.filter;
    default:
        return state;
    }
}

// const undoableTodos = undoable(todos, {
//   filter: distinctState()
// })

// export default undoableTodos
