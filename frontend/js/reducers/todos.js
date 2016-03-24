// import undoable, { distinctState } from 'redux-undo'

export function todo(state = {}, action) {
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

        return Object.assign({}, state, {
            completed: !state.completed
        });
    default:
        return state;
    }
}

export function todos(state = [], action) {
    switch (action.type) {
    case 'ADD_TODO':
        return [
            ...state,
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

export function visibilityFilter(state = 'SHOW_ALL', action) {
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
