/** **/
let express         = require('express')
let roomController  = require('../controllers/rooms.controller')
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
        /** if room authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

})

/** GET /rooms **/
router.get('/', (req, res, next) => {
    
    roomController.index(req ,res)
})

/** GET /rooms/id **/
router.get('/:id', (req, res, next) => {

    roomController.show(req ,res)
})

/** POST /rooms/ **/
router.post('/', (req, res, next) => {

    roomController.create(req ,res)
})

/** PUT /rooms/ **/
router.put('/:id', (req, res, next) => {

    roomController.update(req ,res)
})

/** delete /rooms/:id **/
router.delete('/:id', (req, res, next) => {

    roomController.destroy(req ,res)
})

/** get /rooms/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    roomController.restore(req ,res)
})

/** Export the module **/
module.exports = router