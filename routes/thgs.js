/** **/
let express         = require('express')
let thgController  = require('../controllers/thgs.controller')
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
        /** if thg authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

})

/** GET /thgs **/
router.get('/', (req, res, next) => {
    
    thgController.index(req ,res)
})

/** GET /thgs/id **/
router.get('/:id', (req, res, next) => {

    thgController.show(req ,res)
})

/** POST /thgs/ **/
router.post('/', (req, res, next) => {

    thgController.create(req ,res)
})

/** PUT /thgs/ **/
router.put('/:id', (req, res, next) => {

    thgController.update(req ,res)
})

/** delete /thgs/:id **/
router.delete('/:id', (req, res, next) => {

    thgController.destroy(req ,res)
})

/** delete /thgs/:id **/
router.delete('/:id/hard', (req, res, next) => {

    thgController.remove(req ,res)
})

/** get /thgs/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    thgController.restore(req ,res)
})

/** Export the module **/
module.exports = router