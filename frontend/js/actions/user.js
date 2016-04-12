// export function

export function requestRegisterUser() {
    return {
        type: 'USER_REGISTER_REQUEST'
    };
}

export function registerUser(userData) {
    return (dispatch) => {
        Store.dispatch(requestRegisterUser());

        return fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(response => response.json()).then(json => {
            riot.visit('user-home');
            return Store.dispatch(receiveUser(json));
        });
    };
}

export function loginUser(userData) {
    return (dispatch) => {

        return fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.status === 200) {
                riot.visit('user-home');
                return response.json().then((json) => {
                    return Store.dispatch(receiveUser(json));
                });
            } else {
                console.log('error is');
                response.json().then((json) => {
                    ServerErrorService.display(json.errors);
                });
            }
        });
    };
}


export function logoutUser() {
    return {
        type: 'USER_LOGOUT'
    };
}

export function receiveUser(user) {
    return {
        type: 'USER_RECEIVED',
        user: user,
        receivedAt: Date.now()
    };
}


//
// export function userRegisterError() {
//
// }
//
//
// export function requestUserLogin() {
//     return {
//         type: 'USER_LOGIN'
//     };
// }
//
// export function requestUserLogout() {
//     return {
//         type: 'USER_LOGOUT'
//     };
// }
//
// export function userLogoutSuccess() {
//     return {
//
//     };
// }
//
// export function userLogoutError() {
//     return {
//
//     };
// }
