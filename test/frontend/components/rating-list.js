// move these to mocha config:
require('mocha-generators').install();
var Nightmare = require('nightmare'),
    expect = require('chai').expect,
    browser = Nightmare({ show: true }), // jshint ignore:line
    _ = require('lodash');
// move end

describe('<iz-rating-list>', function() {
    it('renders 100 feedbacks at initial render', function*() {
        var circles = yield browser
            .goto('http://localhost:3000')
            .wait(2000)
            .evaluate(function() {
                return $('iz-rating-list').find('table').find('iz-circle');
            });
        expect(circles.length).to.equal(100);
    });

    it('filters the rating:1 after clicking filter button', function*() {
        var listedFeedbacks = yield browser
            .evaluate(function() {
                    $('iz-rating-list').find('iz-rating-list-filters')
                        .children()[0].click();

                var $listedRatings = $('iz-rating-list').find('table').find('iz-circle'),
                    listedRatings = _.map($listedRatings, function (listedRating) {
                        return $(listedRating).text();
                    });
                return _.uniq(listedRatings);
            });
        expect(_.includes(listedFeedbacks, 1)).to.equal(false);
    });

});
