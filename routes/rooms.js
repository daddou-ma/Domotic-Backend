/** **/
const express         = require('express')
const roomController  = require('../controllers/rooms.controller')
const langMiddleware  = require('../middlewares/lang')
const authMiddleware  = require('../middlewares/auth')
const router          = express.Router()
const multer 	 	  = require('multer')

/** adding Language middleware to router **/
router.use(langMiddleware.lang)

/** adding auth middleware to router **/
router.use(authMiddleware.auth)


var uploading = multer({
  	dest: __dirname + '../public/uploads/'
  })

/** GET /rooms **/
router.get('/', (req, res, next) => {
    
    roomController.index(req ,res)
})

/** GET /rooms/id **/
router.get('/:id', (req, res, next) => {

    roomController.show(req ,res)
})

/** POST /rooms/ **/
router.post('/', uploading.single('image'), (req, res, next) => {
    roomController.create(req ,res)
})

/** PUT /rooms/ **/
router.put('/:id', (req, res, next) => {

    roomController.update(req ,res)
})

/** delete /rooms/:id **/
router.delete('/:id', (req, res, next) => {

    roomController.destroy(req ,res)
})

/** get /rooms/:id/restore **/
router.get('/:id/restore', (req, res, next) => {

    roomController.restore(req ,res)
})

/** Export the module **/
module.exports = router