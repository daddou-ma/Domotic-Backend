/** **/
const express         = require('express')
const switchScheduleController  = require('../../controllers/schedules/switch-schedules.controller')
const langMiddleware  = require('../../middlewares/lang')
const authMiddleware  = require('../../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)

/** GET /airs **/
router.get('/', (req, res, next) => {
    
    switchScheduleController.index(req ,res)
})

/** GET /airs/id **/
router.get('/:id', (req, res, next) => {

    switchScheduleController.show(req ,res)
})

/** POST /airs/ **/
router.post('/', (req, res, next) => {

    switchScheduleController.create(req ,res)
})

/** PUT /airs/ **/
router.put('/:id', (req, res, next) => {

    switchScheduleController.update(req ,res)
})

/** delete /airs/:id **/
router.delete('/:id', (req, res, next) => {

    switchScheduleController.destroy(req ,res)
})

/** get /airs/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    switchScheduleController.restore(req ,res)
})

/** Export the module **/
module.exports = router