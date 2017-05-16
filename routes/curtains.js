/** **/
const express         = require('express')
const curtainController  = require('../controllers/curtains.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

/** GET /curtains **/
router.get('/', (req, res, next) => {
    
    curtainController.index(req ,res)
})

/** GET /curtains/id **/
router.get('/:id', (req, res, next) => {

    curtainController.show(req ,res)
})

/** POST /curtains/ **/
router.post('/', (req, res, next) => {

    curtainController.create(req ,res)
})

/** PUT /curtains/ **/
router.put('/:id', (req, res, next) => {

    curtainController.update(req ,res)
})

/** delete /curtains/:id **/
router.delete('/:id', (req, res, next) => {

    curtainController.destroy(req ,res)
})

/** Export the module **/
module.exports = router