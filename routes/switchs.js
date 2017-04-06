/** **/
let express         = require('express')
let switchController  = require('../controllers/switchs.controller')
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
        /** if switch authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

})

/** GET /switchs **/
router.get('/', (req, res, next) => {
    
    switchController.index(req ,res)
})

/** GET /switchs/id **/
router.get('/:id', (req, res, next) => {

    switchController.show(req ,res)
})

/** POST /switchs/ **/
router.post('/', (req, res, next) => {

    switchController.create(req ,res)
})

/** PUT /switchs/ **/
router.put('/:id', (req, res, next) => {

    switchController.update(req ,res)
})

/** delete /switchs/:id **/
router.delete('/:id', (req, res, next) => {

    switchController.destroy(req ,res)
})

/** get /switchs/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    switchController.restore(req ,res)
})

/** Export the module **/
module.exports = router