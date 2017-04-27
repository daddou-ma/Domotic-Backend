/** **/
const express         = require('express')
const airController  = require('../controllers/airs.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

/** GET /airs **/
router.get('/', (req, res, next) => {
    
    airController.index(req ,res)
})

/** GET /airs/id **/
router.get('/:id', (req, res, next) => {

    airController.show(req ,res)
})

/** POST /airs/ **/
router.post('/', (req, res, next) => {

    airController.create(req ,res)
})

/** PUT /airs/ **/
router.put('/:id', (req, res, next) => {

    airController.update(req ,res)
})

/** delete /airs/:id **/
router.delete('/:id', (req, res, next) => {

    airController.destroy(req ,res)
})

/** get /airs/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    airController.restore(req ,res)
})

/** Export the module **/
module.exports = router