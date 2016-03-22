<iz-rating-chart>
    <canvas class="hidden-xs"></canvas>
    <canvas class="hidden-sm hidden-md hidden-lg"></canvas>

    <script>
        // store['items'] is actual store

        var self = this;

        self.mixin('store');

        // self.items = _.sortBy(store['items'], function(item) {
        //     return item.creation_date;
        // });

        self.drawChart = function (context, options) {
            // make this from the store:
            var dates = _.map(self.store.feedbacks.items, function (item) {
                    return moment(item.creation_date).format('h:mm a');
                }),
                ratings = _.map(self.store.feedbacks.items, function (item) {
                    return item.rating;
                });

            options = _.defaults(options, {
                scaleShowVerticalLines: false,
                bezierCurve: false
                // add responsive
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
            // if check for server-side rendering error fix
            if (self.root.querySelector) {
                var context = self.root.querySelector('canvas.hidden-xs')
                                .getContext("2d");

                self.drawChart(context);
            }

            self.update();
        };

        self.drawMobileChart = function () {
            // if check for server-side rendering error fix
            if (self.root.querySelector) {
                var context = self.root.querySelector('canvas.hidden-md')
                                .getContext("2d");

                self.drawChart(context, { showScale: false });
            }

            self.update();
        };

        self.on('update', function () {
            console.log(self);
            if (self.store && self.store.feedbacks) {
                console.log(self.store.feedbacks);
                console.log('this is called');
                self.drawDesktopChart();
                self.drawMobileChart();
            }
        });

    </script>
</iz-rating-chart>
