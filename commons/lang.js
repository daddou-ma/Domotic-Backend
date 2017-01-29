let i18n = require("i18n")


/** Configure i18n Multi-language **/
i18n.configure({
    locales:['en', 'fr', 'ar'],
    cookie: 'language',
    directory: __dirname + '/../locales',
    objectNotation: true,
})

module.exports = i18n