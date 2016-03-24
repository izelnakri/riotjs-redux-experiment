// make the async creators with tunk middleware

export function feedbacks(state = {}, action) {
    switch(action.type) {
        case 'REQUEST_FEEDBACKS':
            return state;
        case 'RECEIVE_FEEDBACKS':
            // return {
            //     receivedAt: action.receivedAt
            // };
            return Object.assign({}, action.feedbacks, {
                receivedAt: action.receivedAt,
                ratings: [1, 2, 3, 4, 5]
            });
        default:
            return state;
    }
}
