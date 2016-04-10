var initialState = {
    isLoggedIn: false
};

export function user(state = initialState, action) {
    switch(action.type) {
        case 'USER_REGISTER_REQUEST':
            return Object.assign({}, state, {
                isLoggedIn: false
            });
        case 'USER_RECEIVED':
            return Object.assign({}, state, action.user, {
                isLoggedIn: true,
                receivedAt: action.receivedAt
            });
        default:
            return state;
    }
}
