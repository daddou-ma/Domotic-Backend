/** Includes **/
let express     = require('express')
let lang        = require('./commons/lang')
let mongoose    = require('mongoose')
let bodyParser  = require('body-parser')
let dotenv      = require('dotenv')
let cookieParser = require('cookie-parser')
let tcpServer	= require('./handler/tcp/tcp.handle')

/** loading .ENV file and Configuration **/
dotenv.config()


/** Includes Routes **/
let users       = require('./routes/users')
let sessions    = require('./routes/sessions')
let boards    	= require('./routes/boards')
let rooms   	= require('./routes/rooms')

let nodes       = require('./routes/nodes')
let airs    	= require('./routes/airs')
let curtains	= require('./routes/curtains')
let switchs    	= require('./routes/switchs')
let thgs    	= require('./routes/thgs')

let airHistory       = require('./routes/histories/air-histories')
let curtainHistory   = require('./routes/histories/curtain-histories')
let switchHistory    = require('./routes/histories/switch-histories')
let thgHistory       = require('./routes/histories/thg-histories')

let airSchedule       = require('./routes/schedules/air-schedules')
let curtainSchedule   = require('./routes/schedules/curtain-schedules')
let switchSchedule    = require('./routes/schedules/switch-schedules')


/** Creating App Server **/
let app = express()
let server = require('http').Server(app)

app.use(lang.init)

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization")
    next()
});


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
app.use('/rooms',	 rooms)

app.use('/nodes',    nodes)
app.use('/airs', 	 airs)
app.use('/curtains', curtains)
app.use('/switchs',	 switchs)
app.use('/thgs',	 thgs)

app.use('/air-histories',       airHistory)
app.use('/curtain-histories',   curtainHistory)
app.use('/switch-histories',    switchHistory)
app.use('/thg-histories',       thgHistory)

app.use('/air-schedules',       airSchedule)
app.use('/curtain-schedules',   curtainSchedule)
app.use('/switch-schedules',    switchSchedule)

/** Export App & Server to use it in bin/www **/
module.exports = {app: app, server: server}
