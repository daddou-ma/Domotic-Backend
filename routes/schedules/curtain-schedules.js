/** **/
const express         = require('express')
const curtainScheduleController  = require('../../controllers/schedules/curtain-schedules.controller')
const langMiddleware  = require('../../middlewares/lang')
const authMiddleware  = require('../../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

/** GET /airs **/
router.get('/', (req, res, next) => {
    
    curtainScheduleController.index(req ,res)
})

/** GET /airs/id **/
router.get('/:id', (req, res, next) => {

    curtainScheduleController.show(req ,res)
})

/** POST /airs/ **/
router.post('/', (req, res, next) => {

    curtainScheduleController.create(req ,res)
})

/** PUT /airs/ **/
router.put('/:id', (req, res, next) => {

    curtainScheduleController.update(req ,res)
})

/** delete /airs/:id **/
router.delete('/:id', (req, res, next) => {

    curtainScheduleController.destroy(req ,res)
})

/** get /airs/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    curtainScheduleController.restore(req ,res)
})

/** Export the module **/
module.exports = router