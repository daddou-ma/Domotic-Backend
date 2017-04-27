/** **/
const express         = require('express')
const switchController  = require('../controllers/switchs.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

/** GET /switchs **/
router.get('/', (req, res, next) => {
    
    switchController.index(req ,res)
})

/** GET /switchs/id **/
router.get('/:id', (req, res, next) => {

    switchController.show(req ,res)
})

/** POST /switchs/ **/
router.post('/', (req, res, next) => {

    switchController.create(req ,res)
})

/** PUT /switchs/ **/
router.put('/:id', (req, res, next) => {

    switchController.update(req ,res)
})

/** delete /switchs/:id **/
router.delete('/:id', (req, res, next) => {

    switchController.destroy(req ,res)
})

/** get /switchs/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    switchController.restore(req ,res)
})

/** Export the module **/
module.exports = router