/** Includes **/
let i18n = require("i18n")


/** Configure i18n Multi-language **/
i18n.configure({
    locales:['en', 'fr', 'ar'],
    cookie: 'lang',
    queryParameter: 'lang',
    directory: __dirname + '/../locales',
    objectNotation: true,
    updateFiles: false,
    syncFiles: false
})

/** Export Module **/
module.exports = i18n