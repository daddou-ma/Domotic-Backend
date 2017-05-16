/** **/
const express         = require('express')
const userController  = require('../controllers/users.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

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

/** Export the module **/
module.exports = router