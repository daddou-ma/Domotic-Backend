/** **/
let express         = require('express')
let arduinoController  = require('../controllers/arduinos.controller')
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
        /** if arduino authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res,__('session.invalidSession'))
    })

})

/** GET /arduinos **/
router.get('/', (req, res, next) => {
    
    arduinoController.index(req ,res)
})

/** GET /arduinos/id **/
router.get('/:id', (req, res, next) => {

    arduinoController.show(req ,res)
})

/** POST /arduinos/ **/
router.post('/', (req, res, next) => {

    arduinoController.create(req ,res)
})

/** PUT /arduinos/ **/
router.put('/:id', (req, res, next) => {

    arduinoController.update(req ,res)
})

/** delete /arduinos/:id **/
router.delete('/:id', (req, res, next) => {

    arduinoController.destroy(req ,res)
})

/** get /arduinos/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    arduinoController.restore(req ,res)
})

/** Export the module **/
module.exports = router