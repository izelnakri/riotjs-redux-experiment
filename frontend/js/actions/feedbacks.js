export function requestFeedbacks() {
    return {
        type: 'REQUEST_FEEDBACKS'
    };
}


export function fetchFeedbacks() {

    return (dispatch) => {
        Store.dispatch(requestFeedbacks());

        return fetch('/api/feedbacks')
              .then(response => response.json())
              .then(json => Store.dispatch(receiveFeedbacks(json)));
    };
}

export function receiveFeedbacks(feedbacks) {
    return {
        type: 'RECEIVE_FEEDBACKS',
        feedbacks,
        receivedAt: Date.now()
    };
}

export function shouldFetchFeedbacks(state) {
    if (state.feedbacks.receivedAt && moment(state.feedbacks.receivedAt) > moment().subtract(10, 'minutes')) {
        return false;
    }

    return true;
}

export function fetchFeedbacksIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchFeedbacks(Store.getState())) {
            // Dispatch a thunk from thunk!
            return Store.dispatch(fetchFeedbacks());
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}
