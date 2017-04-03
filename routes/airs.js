/** **/
let express         = require('express')
let airController  = require('../controllers/airs.controller')
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
        /** if air authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

})

/** GET /airs **/
router.get('/', (req, res, next) => {
    
    airController.index(req ,res)
})

/** GET /airs/id **/
router.get('/:id', (req, res, next) => {

    airController.show(req ,res)
})

/** POST /airs/ **/
router.post('/', (req, res, next) => {

    airController.create(req ,res)
})

/** PUT /airs/ **/
router.put('/:id', (req, res, next) => {

    airController.update(req ,res)
})

/** delete /airs/:id **/
router.delete('/:id', (req, res, next) => {

    airController.destroy(req ,res)
})

/** get /airs/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    airController.restore(req ,res)
})

/** Export the module **/
module.exports = router