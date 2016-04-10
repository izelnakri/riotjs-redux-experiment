// make the async creators with tunk middleware

var initialState = {
    count: 0,
    count_nolimit: 0,
    items: [],
    total: 0,
    ratings: [1, 2, 3, 4, 5]
};

export function feedbacks(state = initialState, action) {
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
