<form>
    <yield/>

    <script>
        var self = this;

        self.on('mount', function() {
            var hasValidateAttr = _.isString(self.opts.validate);
            
            if (hasValidateAttr) {
                $(self.root).parsley({
                    trigger: 'keyup focusout',
                    errorsContainer: function(parsleyField) {
                        var input = parsleyField.$element,
                            inputGroup = input.parent('.input-group');

                        if (inputGroup[0]) {
                            return inputGroup.prev('label');
                        }

                        return parsleyField.$element.prev('label');
                    },
                    errorsWrapper: '<span></span>',
                    errorTemplate: '<span></span>'
                });
            }
        });
    </script>
</form>
