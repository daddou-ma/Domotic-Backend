/** **/
const express         = require('express')
const thgController  = require('../controllers/thgs.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

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