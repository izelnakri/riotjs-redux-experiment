// Performance optimization possible for field error and success
window.Parsley.on('field:error', function() {
    var self = this,
        input = self.$element,
        formGroup = input.closest('.form-group'),
        formControlFeedback = formGroup.find('.form-control-feedback');

    if (formGroup.hasClass('has-success')) {
        formGroup.removeClass('has-success');
    }

    formGroup.addClass('has-error has-feedback');

    if(!formGroup.find('.form-control-feedback')[0]) {
        formGroup.append($("<span class='form-control-feedback fa fa-lg fa-times'></span>"));
    } else if(formControlFeedback) {
        formControlFeedback.first().removeClass('fa-check').addClass('fa-times');
    }
});

window.Parsley.on('field:success', function() {
    var self = this,
        input = self.$element,
        formGroup = input.closest('.form-group'),
        formControlFeedback = formGroup.find('.form-control-feedback');

    if (formGroup.hasClass('has-error')) {
        formGroup.removeClass('has-error');
    }

    formGroup.addClass('has-success has-feedback'); // toggle error/success logic

    if(!formControlFeedback[0]) {
        formGroup.append($("<span class='form-control-feedback fa fa-lg fa-check'></span>"));
    } else if(formControlFeedback) {
        formControlFeedback.first().removeClass('fa-times').addClass('fa-check');
    }
});

_.each(Object.keys(lang), function(langKey) {
    Parsley.addMessages(langKey, _.reduce(lang[langKey]['parsley'], function(hash, value, key) {
        hash[key] = value;
        return hash;
    }, {}));
});

// // Parsley.setLocale('de'); // will be called for locale change on the store
