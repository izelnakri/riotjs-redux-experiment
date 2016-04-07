export function requestUserRegister() {
    console.log('requestUserRegisterCalled');
    return {
        type: 'USER_REGISTER_REQUEST'
    };
}

export function requestUserLogin() {
    return {
        type: 'USER_LOGIN'
    };
}

export function receiveUser() {
    return {

    };
}

export function requestUserLogout() {
    return {
        type: 'USER_LOGOUT'
    };
}

export function userLogoutSuccess() {
    return {

    };
}

export function userLogoutError() {
    return {

    };
}
