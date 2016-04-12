<form onsubmit="{dispatchAction}">
    <yield/>

    <script>
        var self = this;

        self.mixin('store');

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
                $(self.root).removeAttr('novalidate');
            }
        });

        self.dispatchAction = function (event) {
            if (self.opts.bindaction) { // checks if form tag has bindaction attr: <form bindaction="registerUser">
                Store.dispatch(
                    actions[self.opts.bindaction]($(self.root).serializeObject())
                );
            } else {
                return true;
            }
        }
    </script>
</form>
