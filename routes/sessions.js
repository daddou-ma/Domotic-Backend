/** **/
let express         = require('express')
let sessionController  = require('../controllers/sessions.controller')
let router          = express.Router()
let lang            = require('../commons/lang')


/** adding Language middleware to router **/
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for lang
    let language = req.body.lang || req.query.lang || req.headers['lang'] || req.cookies['lang'] || 'en'
    
    res.cookie('lang', language , { maxAge: process.env.TOKEN_TIMEOUT});
    lang.setLocale(language)
    
    next()
})

/** POST /auth **/
router.post('/auth', (req, res, next) => {

    sessionController.create(req ,res)
})

/** DELETE /logout **/
router.delete('/logout', (req, res, next) => {

    sessionController.destroy(req ,res)
})


module.exports = router