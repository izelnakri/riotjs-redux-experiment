<validator>
    <yield/>

    <script>
        var self = this;

        self.on('mount', function() {
            $(self.root).parsley({
                trigger: 'keyup focusout',
                errorsContainer: function(parsleyField) {
                    return parsleyField.$element.prev('label');
                },
                errorsWrapper: '<span></span>',
                errorTemplate: '<span></span>'
            });
        });
    </script>
</validator>
