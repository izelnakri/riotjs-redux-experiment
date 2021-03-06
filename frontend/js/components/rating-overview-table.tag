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
            <tr each={rating in store.feedbacks.ratings}>
                <td>
                    <span class="badge">{ rating }</span> { getFeedbackType(rating) }
                </td>
                <td align="right">
                    <span>{ getFeedbackAmount(rating) }</span>
                </td>
            </tr>
        </tbody>
    </table>

    <script>
        var self = this;

        self.mixin('store');

        self.getFeedbackType = function (ratingValue) {
            switch(ratingValue) {
                case 1: return 'Very Bad';
                case 2: return 'Bad';
                case 3: return 'Average';
                case 4: return 'Good';
                case 5: return 'Amazing!';
            }
        };

        self.getFeedbackAmount = function (ratingValue) {
            return _.filter(self.store.feedbacks.items, function (feedback) {
                return feedback.rating === ratingValue;
            }).length;
        };
    </script>

</iz-rating-overview-table>
