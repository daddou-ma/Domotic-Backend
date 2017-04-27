/** **/
let express         = require('express')
let sessionController  = require('../controllers/sessions.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()

/** adding Language middleware to router **/
router.use(langMiddleware.lang)


/** POST /auth **/
router.post('/auth', (req, res, next) => {

    sessionController.create(req ,res)
})

/** POST /auth **/
router.post('/check', (req, res, next) => {

    sessionController.check(req ,res)
})

/** DELETE /logout **/
router.delete('/logout', (req, res, next) => {

    sessionController.destroy(req ,res)
})


module.exports = router