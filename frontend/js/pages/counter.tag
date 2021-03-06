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

        self.on('mount', function () {
            console.log(self);
        });
    </script>
</page-counter>
