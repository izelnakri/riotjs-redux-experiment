<page-counter id="page">
    <section class="iz-page-container">
        <div class="row">
            <div class="col-xs-12">
                <p>
                    Counter is {counter}
                </p>

                <button type="button" class="btn btn-primary" onclick="{incrementCounter}">Increment Counter</button>
                <button type="button" class="btn btn-primary" onclick="{decrementCounter}">Decrement Counter</button>
            </div>
        </div>
    </section>

    <script>
        var self = this;

        self.incrementCounter = function() {
            self.counter += 1;
            return self.update();
        };

        self.decrementCounter = function() {
            self.counter -= 1;
            return self.update();
        };

        self.on('mount', function() {
            console.log('page counter mounted');
            self.counter = opts.counter || 0;
            return self.update();
        });

    </script>
</page-counter>
