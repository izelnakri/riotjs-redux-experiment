export function user(state, action) {
    if(!state) { state = {}; }
    switch(action.type) {
        case 'USER_REGISTER':
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
        case 'USER_LOGIN':
            return {

            };
        case 'USER_LOGOUT':
            return {

            };
        case 'USER_REGISTER_REQUEST':
            return {
                email: action.email
            };
        default:
            return state;
    }
}
