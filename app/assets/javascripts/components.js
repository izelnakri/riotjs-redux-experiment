
(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(function(require, exports, module) { tagger(require('riot'), require, exports, module)})
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'), require, exports, module)
  } else {
    tagger(window.riot)
  }
})(function(riot, require, exports, module) {
riot.tag2('iz-rating-chart', '<canvas class="hidden-xs"></canvas> <canvas class="hidden-sm hidden-md hidden-lg"></canvas>', '', '', function(opts) {
        var self = this;

        self.items = _.sortBy(store['items'], function(item) {
            return item.creation_date;
        });

        self.drawChart = function (context, items, options) {
            var dates = _.map(items, function (item) {
                    return moment(item.creation_date).format('h:mm a');
                }),
                ratings = _.map(items, function (item) {
                    return item.rating;
                });

            options = _.defaults(options, {
                scaleShowVerticalLines: false,
                bezierCurve: false

            });

            new Chart(context).Line({
                labels: _.uniq(dates),
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "#337ab7",
                        pointColor: "#337ab7",
                        pointStrokeColor: "#337ab7",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: ratings
                    }
                ]
            }, options);
        };

        self.drawDesktopChart = function () {
            var context = self.root.querySelector('canvas.hidden-xs')
                            .getContext("2d");

            self.drawChart(context, self.items);

            self.update();
        };

        self.drawMobileChart = function () {
            var context = self.root.querySelector('canvas.hidden-md')
                            .getContext("2d");

            self.drawChart(context, self.items, { showScale: false });

            self.update();
        };

        self.on('mount', function () {
            self.drawDesktopChart();
            self.drawMobileChart();
        });

});

riot.tag2('iz-rating-list', '<div class="row"> <iz-rating-list-filters class="col-xs-12"> <iz-circle each="{number in [1,2,3,4,5]}" onclick="{parent.toggleRating}">{number}</iz-circle> </iz-rating-list-filters> </div> <div class="row"> <div class="col-xs-12"> <table class="table"> <thead> <tr> <td class="hidden-sm hidden-md hidden-lg"></td> <td> Rating </td> <td class="hidden-xs"> Comment </td> <td>Browser</td> <td>Device</td> <td>Platform</td> </tr> </thead> <tbody each="{item in items}"> <tr> <td class="hidden-sm hidden-lg hidden-md"> Feedback </td> <td> <iz-circle>{item.rating}</iz-circle> </td> <td class="hidden-xs"> <p> {item.comment} </p> </td> <td> <p> {item.computed_browser.Browser} {item.computed_browser.Version} </p> </td> <td> <p> {getScreenType(item)} </p> </td> <td> <p> {item.computed_browser.Platform} </p> </td> </tr> <tr class="hidden-sm hidden-md hidden-lg"> <td width="20%"> Comment </td> <td colspan="4"> {item.comment} </td> </tr> </tbody> </table> </div> </div>', '', '', function(opts) {
        var self = this;

        self.toggleRating = function (event) {

            var ratingNo = event.item.number,
                displayed = _.find(self.items, function(item) {
                    return item.rating === ratingNo;
                });

            $(event.currentTarget).toggleClass('iz-toggled');

            if (displayed) {
                self.items = _.reject(self.items, function (item) {
                    return item.rating === ratingNo;
                });
                return self.update();
            }

            var ratingItems = _.filter(store['items'], function (item) {
                return item.rating === ratingNo;
            });

            self.items = _.merge(self.items, ratingItems);
            return self.update();
        };

        self.getScreenType = function(item) {
            var viewportWidth = parseInt(item.viewport.width);

            if (viewportWidth <= 736) {
                return 'Mobile';
            } else if (viewportWidth <= 992) {
                return 'Tablet';
            }

            return 'Desktop';

        };

        self.on('mount', function () {
            self.items = store['items'];
            self.update();
        });
}, '{ }');

riot.tag2('iz-rating-overview-table', '<table class="table table-hover"> <thead> <tr> <td align="left"> Rating </td> <td align="right"> # Items </td> </tr> </thead> <tbody> <tr each="{item in ratings}"> <td> <span class="badge">{item[0].rating}</span> {getRating(item[0].rating)} </td> <td align="right"> <span>{item.length}</span> </td> </tr> </tbody> </table>', '', '', function(opts) {

        var self = this;

        self.ratings = [[], [], [], [], []];

        self.on('mount', function () {
            _.each(store['items'], function(item) {
                self.ratings[item.rating - 1].push(item);
            });

            self.update();
        });

        self.getRating = function (ratingValue) {
            switch(ratingValue) {
                case 1: return 'Very Bad';
                case 2: return 'Bad';
                case 3: return 'Average';
                case 4: return 'Good';
                case 5: return 'Amazing!';
            }
        };
}, '{ }');
});