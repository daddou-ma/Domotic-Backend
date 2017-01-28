/** **/
let express         = require('express')
let userController  = require('../controllers/users.controller')
let router          = express.Router()

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

router.delete('/:id', function(req, res, next) {

    userController.destroy(req ,res)
})

router.get('/:id/restore', function(req, res, next) {

    userController.restore(req ,res)
})


module.exports = router