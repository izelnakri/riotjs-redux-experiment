import {createSelector} from 'reselect';

var feedbackVisibility = [1, 2, 3, 4, 5];

var getFeedbacks = () => Store.getState().feedbacks.items;

var toggleVisibleRatings = (ratingNo) => {
    if (_.includes(feedbackVisibility, ratingNo)) {
        feedbackVisibility = _.reject(feedbackVisibility, (no) => {
            return no === ratingNo;
        });
    } else {
        feedbackVisibility.push(ratingNo);
    }

    return _.assign([], feedbackVisibility);
    // reason for assign: data has to be a new object for selector to work!!
};

function getFeedbackVisibility() {
    return feedbackVisibility;
}

export var filterFeedbacks = createSelector(
    [getFeedbacks, toggleVisibleRatings],
    (feedbacks, feedbackVisibility) => {
        console.log('SELECTOR IS CALLED');
        return _.filter(feedbacks, function(feedback) {
            return _.includes(feedbackVisibility, feedback.rating);
        });
    }
);
