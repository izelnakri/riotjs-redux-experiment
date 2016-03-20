function user(state, action) {
    if(!state) { state = 0; }
    switch(action.type) {
        case 'USER_CREATE':
            return {
                username: action.username,
                email: action.email,
                name: action.name,
                firstName: action.firstName,
                lastName: action.lastName,
                created_at: '',
                updated_at: '',
                passwordDigest: ''
            };
        default:
            return state;
    }
}
