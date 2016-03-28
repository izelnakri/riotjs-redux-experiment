window.$parse = ngParser;

window.t = function(key, locals) {
    // this function is unstable, still work in progress
    // accept markdown?
    // google this: dot notation on a string:
    var locale = "en", // this will be dynamic from the store for example
        value = lang[locale][key];

    if (_.isUndefined(value)) {
        console.warn('Copy not found, unknown key ' + key);
        return;
    }

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

        console.warn('Array without expression requested for copy key: ' + key);
        return '';
    } else if (_.isObject(value)) {
        if (value.expression) {
            if (parseExpression(value.expression)) {
                return compileString(value.value);
            }
            return '';
        }

        console.warn('Object without expression requested for copy key: ' + key);
        return '';
    }

    return compileString(value);

    function parseExpression(target) {
        return $parse(target)(_.merge(Store.getState(), locals));
    }

    function compileString(target) {
        return Mustache.render(target, _.merge(Store.getState(), locals));
    }

    // . notation in the string
};
