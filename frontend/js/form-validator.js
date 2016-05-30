// Performance optimization possible for field error and success
(function() {
    window.Parsley.on('field:error', function() {
        var self = this,
            input = self.$element,
            formGroup = input.closest('.form-group');
            // formControlFeedback = formGroup.find('.form-control-feedback');

        if (formGroup.hasClass('has-success')) {
            formGroup.removeClass('has-success');
        }

        formGroup.addClass('has-error has-feedback');

        // this shouldnt work on password
        // if(!formGroup.find('.form-control-feedback')[0]) {
        //     formGroup.append($("<span class='form-control-feedback fa fa-lg fa-times'></span>"));
        // } else if(formControlFeedback) {
        //     formControlFeedback.first().removeClass('fa-check').addClass('fa-times');
        // }
    });

    window.Parsley.on('field:success', function() {
        var self = this,
            input = self.$element,
            formGroup = input.closest('.form-group');
            // formControlFeedback = formGroup.find('.form-control-feedback');

        if (formGroup.hasClass('has-error')) {
            formGroup.removeClass('has-error');
        }

        formGroup.addClass('has-success has-feedback'); // toggle error/success logic

        // this shouldnt work on password
        // if(!formControlFeedback[0]) {
        //     formGroup.append($("<span class='form-control-feedback fa fa-lg fa-check'></span>"));
        // } else if(formControlFeedback) {
        //     formControlFeedback.first().removeClass('fa-times').addClass('fa-check');
        // }
    });

    function putValidationErrorMessage(input) {
        var message = $("<span class='form-control-feedback fa fa-lg fa-times'></span>");

        if (!hasFormFeedback(input)) {
            // check if there is a
            // there is no control
            return formGroup.append(message);
        }
        return formControlFeedback.first().removeClass('fa-check').addClass('fa-times');
        // this shouldnt work on password
        // if(!formGroup.find('.form-control-feedback')[0]) {
        //     formGroup.append($("<span class='form-control-feedback fa fa-lg fa-times'></span>"));
        // } else if(formControlFeedback) {
        //     formControlFeedback.first().removeClass('fa-check').addClass('fa-times');
        // }
    }

    function putValidationSuccessMessage(input) {
        var message = $("<span class='form-control-feedback fa fa-lg fa-check'></span>");

        // this shouldnt work on password
        // if(!formControlFeedback[0]) {
        //     formGroup.append($("<span class='form-control-feedback fa fa-lg fa-check'></span>"));
        // } else if(formControlFeedback) {
        //     formControlFeedback.first().removeClass('fa-times').addClass('fa-check');
        // }
    }


    _.each(Object.keys(lang), function(langKey) {
        Parsley.addMessages(langKey, _.reduce(lang[langKey]['parsley'], function(hash, value, key) {
            hash[key] = value;
            return hash;
        }, {}));
    });

    window.ServerErrorService = (function() {
        return {
            display: function(errors) {
                var resources = _.difference(Object.keys(errors), ['general', 'url']);
                // destructuring for resources resource[attr]
                if (errors.general) {

                }

                _.each(resources, (resource) => {
                    _.each(Object.keys(errors[resource]), (key) => {
                        var input = $('body').find("input[name='" + resource + "[" + key + "]']"),
                            formGroup = input.closest('.form-group'),
                            inputGroup = input.parent('.input-group'),
                            containerLabel;

                        if (formGroup.hasClass('has-success')) {
                            formGroup.removeClass('has-success');
                        }

                        formGroup.addClass('has-error has-feedback');

                        if (inputGroup[0]) {
                            containerLabel = inputGroup.prev('label');
                        } else {
                            containerLabel = input.prev('label');
                        }

                        var serverFeedback = $("<span>" + errors[resource][key] + "</span>");
                        containerLabel.append(serverFeedback);
                        input.one('keyup', () => { serverFeedback.remove(); });
                    });
                });
            }
        };
    })();
})();





// // server should return the errors always in this format: {errors: resource: { attrs }, general: ''(if any), url: ''}
// // attrs could be in string or array format
// errors: {
//     user: {
//         email: '', // or array format
//         password: '' // these will get executed as $(body).find(input[name='user[password]']) then show at the prespecified error location
//     },
//     general: '', // errors that shouldn't be attr specific.
//     url: '/' // which form in the page? => from url: this is the key for $(form[action=url]) lookup for general errors.
// };
//
// ServerErrorService.display(errors);


        // server-errors return here !!



// // Parsley.setLocale('de'); // will be called for locale change on the store
