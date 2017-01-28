/** **/
let express = require('express')
let userController = require('../controllers/users')
let router = express.Router()

router.get('/', function(req, res, next) {

    userController.index(req ,res)
})

router.get('/:id', function(req, res, next) {

    userController.show(req ,res)
})

router.post('/', function(req, res, next) {

    userController.create(req ,res)
})

router.put('/', function(req, res, next) {

    userController.update(req ,res)
})

router.delete('/:id', function(req, res, next) {

    userController.destroy(req ,res)
})

router.get('/:id/restore', function(req, res, next) {

    userController.restore(req ,res)
})


module.exports = router