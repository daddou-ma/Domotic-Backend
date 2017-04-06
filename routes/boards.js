/** **/
let express         = require('express')
let boardController  = require('../controllers/boards.controller')
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
        /** if board authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

})

/** GET /boards **/
router.get('/', (req, res, next) => {
    
    boardController.index(req ,res)
})

/** GET /boards/id **/
router.get('/:id', (req, res, next) => {

    boardController.show(req ,res)
})

/** POST /boards/ **/
router.post('/', (req, res, next) => {

    boardController.create(req ,res)
})

/** PUT /boards/ **/
router.put('/:id', (req, res, next) => {

    boardController.update(req ,res)
})

/** delete /boards/:id **/
router.delete('/:id', (req, res, next) => {

    boardController.destroy(req ,res)
})

/** hard delete /boards/:id/hard **/
router.delete('/:id/hard', (req, res, next) => {

    boardController.remove(req ,res)
})

/** get /boards/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    boardController.restore(req ,res)
})

/** Export the module **/
module.exports = router