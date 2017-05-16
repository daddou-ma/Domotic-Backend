/** **/
const express         = require('express')
const nodeController  = require('../controllers/nodes.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

/** GET /airs **/
router.get('/', (req, res, next) => {
    
    nodeController.index(req ,res)
})

/** GET /airs/id **/
router.get('/:id', (req, res, next) => {

    nodeController.show(req ,res)
})

/** POST /airs/ **/
router.post('/', (req, res, next) => {

    nodeController.create(req ,res)
})

/** PUT /airs/ **/
router.put('/:id', (req, res, next) => {

    nodeController.update(req ,res)
})

/** delete /airs/:id **/
router.delete('/:id', (req, res, next) => {

    nodeController.destroy(req ,res)
})

/** Export the module **/
module.exports = router