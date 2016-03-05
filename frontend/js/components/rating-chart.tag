<iz-rating-chart>
    <canvas class="hidden-xs"></canvas>
    <canvas class="hidden-sm hidden-md hidden-lg"></canvas>

    <script>
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

    </script>
</iz-rating-chart>
