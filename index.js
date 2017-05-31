/** Includes **/
const express     = require('express')
const lang        = require('./commons/lang')
const mongoose    = require('mongoose')
const bodyParser  = require('body-parser')
const dotenv      = require('dotenv')
const cookieParser = require('cookie-parser')
const tcpServer	= require('./handler/tcp/tcp.handle')

/** loading .ENV file and Configuration **/
dotenv.config()


/** Includes Routes **/
const users       = require('./routes/users')
const sessions    = require('./routes/sessions')
const boards    	= require('./routes/boards')
const rooms   	= require('./routes/rooms')

const nodes       = require('./routes/nodes')
const airs    	= require('./routes/airs')
const curtains	= require('./routes/curtains')
const switchs    	= require('./routes/switchs')
const thgs    	= require('./routes/thgs')

const airHistory       = require('./routes/histories/air-histories')
const curtainHistory   = require('./routes/histories/curtain-histories')
const switchHistory    = require('./routes/histories/switch-histories')
const thgHistory       = require('./routes/histories/thg-histories')

const airSchedule       = require('./routes/schedules/air-schedules')
const curtainSchedule   = require('./routes/schedules/curtain-schedules')
const switchSchedule    = require('./routes/schedules/switch-schedules')


/** Creating App Server **/
const app = express()

const server = require('http').Server(app)

const io = require('socket.io').listen(server)

global.io = io
global.sockets = []

app.use(lang.init)

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
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

io.on('connection', (socket) => {  
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  sockets.push(socket)
})

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
