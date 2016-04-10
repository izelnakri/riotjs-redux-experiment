// export function

export function requestUserRegister() {
    return {
        type: 'USER_REGISTER_REQUEST'
    };
}

export function postUserRegister(userData) {
    return (dispatch) => {
        Store.dispatch(requestUserRegister());
        console.log(userData);

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
