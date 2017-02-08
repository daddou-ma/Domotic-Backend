/** **/
let express         = require('express')
let sessionController  = require('../controllers/sessions.controller')
let router          = express.Router()



/** POST /auth **/
router.post('/auth', (req, res, next) => {

    sessionController.create(req ,res)
})

/** DELETE /logout **/
router.delete('/logout', (req, res, next) => {

    sessionController.destroy(req ,res)
})


module.exports = router