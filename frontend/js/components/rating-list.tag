<iz-rating-list>
    <div class="row">
        <iz-rating-list-filters class="col-xs-12">
            <iz-circle each={number in [1,2,3,4,5]} onclick={parent.toggleRating}>{number}</iz-circle>
        </iz-rating-list-filters>
    </div>

    <div class="row">
        <div class="col-xs-12">
            <table class="table">
                <thead>
                    <tr>
                        <td class="hidden-sm hidden-md hidden-lg"></td>
                        <td>
                            Rating
                        </td>
                        <td class="hidden-xs">
                            Comment
                        </td>
                        <td>Browser</td>
                        <td>Device</td>
                        <td>Platform</td>
                    </tr>
                </thead>
                <tbody each={item in selectors.filterFeedbacks()}>
                    <tr>
                        <td class="hidden-sm hidden-lg hidden-md">
                            Feedback
                        </td>
                        <td>
                            <iz-circle>{item.rating}</iz-circle>
                        </td>
                        <td class="hidden-xs">
                            <p>
                                {item.comment}
                            </p>
                        </td>
                        <td>
                            <p>
                                {item.computed_browser.Browser} {item.computed_browser.Version}
                            </p>
                        </td>
                        <td>
                            <p>
                                {getScreenType(item)} <!-- item.screen function for desktop / mobile -->
                            </p>
                        </td>
                        <td>
                            <p>
                                {item.computed_browser.Platform}
                            </p>
                        </td>
                    </tr>
                    <tr class="hidden-sm hidden-md hidden-lg">
                        <td width="20%">
                            Comment
                        </td>
                        <td colspan="4">
                            {item.comment}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script>
        var self = this;

        self.mixin('store');

        // THIS IS AN INTERESTING PROBLEM = CHECK HOW TO DO THIS WITH THE STORE:

        self.toggleRating = function (event) {
            // there is a bug here in one of the lodash funct is wrong:

            var ratingNo = event.item.number;
                // displayed = _.find(self.store.feedbacks.items, function(item) {
                //     return item.rating === ratingNo;
                // });

            $(event.currentTarget).toggleClass('iz-toggled');

            selectors.filterFeedbacks(ratingNo);

            // if (displayed) {
            //     self.items = _.reject(self.store.feedbacks.items, function (item) {
            //         return item.rating === ratingNo;
            //     });
            //     return self.update();
            // }
            //
            // var ratingItems = _.filter(self.store.items, function (item) {
            //     return item.rating === ratingNo;
            // });
            //
            // self.items = _.merge(self.items, ratingItems);
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
            // values are from Bootstrap ;)
        };

        self.on('mount', function () {
            self.update();
        });
    </script>
</iz-rating-list>
