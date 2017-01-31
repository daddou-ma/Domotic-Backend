/** **/
let express         = require('express')
let userController  = require('../controllers/users.controller')
let sessionHelper   = require('../helpers/sessions.helper')
let responseHelper  = require('../helpers/responses.helper')
let lang            = require('../commons/lang')

let router          = express.Router()

/** adding middleware to **/
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    let  token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['_token']
    
    if (!token) {
        responseHelper.errorHandler(res, lang.__('session.noSession')) 
    }
    
    // verifies secret and checks exp
    sessionHelper.checkAuth(token)
    .then(function(doc) {
        /** if user authenticated call next **/
        next()
    })
    .catch(function(err) {
        responseHelper.errorHandler(res, lang.__('session.invalidSession'))
    })

})

/** GET /users **/
router.get('/', function(req, res, next) {
    
    userController.index(req ,res)
})

/** GET /users/id **/
router.get('/:id', function(req, res, next) {

    userController.show(req ,res)
})

/** POST /users/ **/
router.post('/', function(req, res, next) {

    userController.create(req ,res)
})

/** PUT /users/ **/
router.put('/:id', function(req, res, next) {

    userController.update(req ,res)
})

/** delete /users/:id **/
router.delete('/:id', function(req, res, next) {

    userController.destroy(req ,res)
})

/** get /users/:id/restore **/
router.get('/:id/restore', function(req, res, next) {

    userController.restore(req ,res)
})

/** Export the module **/
module.exports = router