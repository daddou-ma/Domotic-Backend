/** **/
let express         = require('express')
let userController  = require('../controllers/users.controller')
let sessionHelper   = require('../helpers/sessions.helper')
let responseHelper  = require('../helpers/responses.helper')

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
/*
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    let  token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['_token']
    
    if (!token) {
        responseHelper.errorHandler(res, __('session.noSession')) 
    }
    
    // verifies secret and checks exp
    sessionHelper.checkAuth(token)
    .then(function(doc) {
        /** if user authenticated call next **/
        //next()
    /*})
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

})*/

/** GET /users **/
router.get('/', (req, res, next) => {
    
    userController.index(req ,res)
})

/** GET /users/id **/
router.get('/:id', (req, res, next) => {

    userController.show(req ,res)
})

/** POST /users/ **/
router.post('/', (req, res, next) => {

    userController.create(req ,res)
})

/** PUT /users/ **/
router.put('/:id', (req, res, next) => {

    userController.update(req ,res)
})

/** delete /users/:id **/
router.delete('/:id', (req, res, next) => {

    userController.destroy(req ,res)
})

/** get /users/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    userController.restore(req ,res)
})

/** Export the module **/
module.exports = router