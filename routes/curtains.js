/** **/
let express         = require('express')
let curtainController  = require('../controllers/curtains.controller')
let sessionHelper   = require('../helpers/sessions.helper')
let responseHelper  = require('../helpers/responses.helper')/** **/

let router          = express.Router()

/** adding Language middleware to router **/
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for lang
    let language = req.body.lang || req.query.lang || req.headers['lang'] || req.cookies['lang'] || 'en'
    
    res.cookie('lang', language , { maxAge: process.env.TOKEN_TIMEOUT});
    setLocale(language)
    
    next();
})

/** adding auth middleware to router **/
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    let  token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['_token']
    
    if (!token) {
        responseHelper.errorHandler(res, __('session.noSession')) 
    }
    
    // verifies secret and checks exp
    sessionHelper.checkAuth(token)
    .then(function(doc) {
        /** if curtain authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

})

/** GET /curtains **/
router.get('/', (req, res, next) => {
    
    curtainController.index(req ,res)
})

/** GET /curtains/id **/
router.get('/:id', (req, res, next) => {

    curtainController.show(req ,res)
})

/** POST /curtains/ **/
router.post('/', (req, res, next) => {

    curtainController.create(req ,res)
})

/** PUT /curtains/ **/
router.put('/:id', (req, res, next) => {

    curtainController.update(req ,res)
})

/** delete /curtains/:id **/
router.delete('/:id', (req, res, next) => {

    curtainController.destroy(req ,res)
})

/** get /curtains/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    curtainController.restore(req ,res)
})

/** Export the module **/
module.exports = router