<validator>
    <yield/>

    <script>
        var self = this;

        self.on('mount', function() {
            // hack parsley here:

            $(self.root).parsley().on('form:validate', function() {
                var parsleyInstance = this;

                console.log('parsleyFieldSuccess');
                console.log(parsleyInstance);
              // In here, `this` is the parlsey instance of #some-input
            });
        });
    </script>
</validator>
