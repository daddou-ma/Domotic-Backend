/** Includes **/
let express     = require('express')
let lang        = require('./commons/lang')
let mongoose    = require('mongoose')
let bodyParser  = require('body-parser')
let dotenv      = require('dotenv')
let cookieParser = require('cookie-parser')

/** loading .ENV file and Configuration **/
dotenv.config()


/** Includes Routes **/
let users       = require('./routes/users')
let sessions    = require('./routes/sessions')
let boards    	= require('./routes/boards')
let airs    	= require('./routes/airs')
let rooms   	= require('./routes/rooms')

/** Creating App Server **/
let app = express()
let server = require('http').Server(app)

app.use(lang.init)



/** Database Connection **/

let mongoDB = 'mongodb://' + process.env.PROD_DB_HOST + '/' + process.env.PROD_DB_NAME

if (process.env.APP_ENV == "production") {
    mongoDB = 'mongodb://' + process.env.PROD_DB_HOST + '/' + process.env.PROD_DB_NAME
}
if (process.env.APP_ENV == "developement") {
    mongoDB = 'mongodb://' + process.env.DEV_DB_HOST + '/' + process.env.DEV_DB_NAME
}
if (process.env.APP_ENV == "test") {
    mongoDB = 'mongodb://' + process.env.TEST_DB_HOST + '/' + process.env.TEST_DB_NAME
}


mongoose.connect(mongoDB, function(err) {
    if (err) { throw err }
})

let db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



/** Body Parser **/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/** Cookie Parser **/
app.use(cookieParser())


/** Routes Setup **/
app.use('/users',    users)
app.use('/sessions', sessions)
app.use('/boards', 	 boards)
app.use('/airs', 	 airs)
app.use('/rooms',	 rooms)

/** Export App & Server to use it in bin/www **/
module.exports = {app: app, server: server}
