/** **/
const express         = require('express')
const boardController  = require('../controllers/boards.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

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

/** Export the module **/
module.exports = router