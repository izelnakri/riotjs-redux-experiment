window.$parse = ngParser;

window.t = function(key, locals) {
    // this function is half-finished, still work in progress
    // google this: dot notation on a string:
    var locale = "en", // this will be dynamic from the store for example
        value = lang[locale][key];

    if (_.isArray(value)) {
        if (value[0].expression) {
            var defaultObject, targetObject;

            if (_.isUndefined(locals)) {
                defaultObject = _.find(value, { expression: 'true' });
                return compileString(defaultObject.value);
            }

            targetObject = _.find(value, function(el) {
                return parseExpression(el.expression) === true;
            });

            if (_.isUndefined(targetObject)) {
                defaultObject = _.find(value, { expression: 'true' });
                if (defaultObject) {
                    return compileString(defaultObject.value);
                }

                return '';
            }

            return compileString(targetObject.value); //(locals);
        }

        return '';
    } else if (_.isObject(value)) {
        if (value.expression) {
            if (parseExpression(value.expression)) {
                return compileString(value.value);
            }
            return '';
        }
    }

    return compileString(value);

    function parseExpression(target) {
        return $parse(target)(_.merge(Store.getState(), locals));
    }

    function compileString(target) {
        return Mustache.render(target, _.merge(Store.getState(), locals));
    }

    // add copy couldn't find found

    // . notation in the string
};
