<iz-rating-overview-table>
    <table class="table table-hover">
        <thead>
            <tr>
                <td align="left">
                    Rating
                </td>
                <td align="right">
                    # Items
                </td>
            </tr>
        </thead>
        <tbody>
            <tr each={item in ratings}>
                <td>
                    <span class="badge">{ item[0].rating }</span> { getRating(item[0].rating) }
                </td>
                <td align="right">
                    <span>{ item.length }</span>
                </td>
            </tr>
        </tbody>
    </table>

    <script>
        // REFACTOR the getJSON and better data-structure get/set
        var self = this;
        console.log('hello world');
        console.log(_.VERSION);

        self.mixin('store');

        self.ratings = [[], [], [], [], []];

        self.on('mount', function () {
            _.each(self.store.items, function(item) {
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
    </script>

</iz-rating-overview-table>
