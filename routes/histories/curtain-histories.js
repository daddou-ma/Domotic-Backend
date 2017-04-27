const express         = require('express')
const curtainHistoryController  = require('../../controllers/histories/curtain-histories.controller')
const langMiddleware  = require('../../middlewares/lang')
const authMiddleware  = require('../../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

/** GET /airs **/
router.get('/', (req, res, next) => {
    
    curtainHistoryController.index(req ,res)
})

/** GET /airs/id **/
router.get('/:id', (req, res, next) => {

    curtainHistoryController.show(req ,res)
})

/** Export the module **/
module.exports = router