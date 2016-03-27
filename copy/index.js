export function t(key, locale) {
    if (!locale) { locale = 'en'; }

    var langs = {
      "en": { "hello_world": "Hello world!" },
      "ja": { "hello_world": "こんにちは世界!" }
    };

    return langs[locale][key];

    // . notation in the string, accept expressions
}
