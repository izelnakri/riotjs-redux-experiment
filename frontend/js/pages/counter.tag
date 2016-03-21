<page-counter id="page">
    <section class="iz-page-container">
        <div class="row">
            <div class="col-xs-12">
                <h1>
                    Counter is {store.counter}
                </h1>

                <button type="button" class="btn btn-primary" onclick="{incrementCounter}">Increment Counter</button>
                <button type="button" class="btn btn-primary" onclick="{decrementCounter}">Decrement Counter</button>
            </div>
        </div>
    </section>

    <script>
        var self = this;

        self.mixin('store');
        console.log('Store is');
        console.log(Store);

        // maybe mixin should do this repetition
        self.incrementCounter = function() {
            return dispatch(actions.incrementCounter());
        };

        self.decrementCounter = function() {
            return dispatch(actions.decrementCounter());
        };
    </script>
</page-counter>
