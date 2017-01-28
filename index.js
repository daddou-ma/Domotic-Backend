/** Includes **/
let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

/** Includes Routes **/
let users = require('./routes/users')


/** Creating App Server **/
let app = express()
let server = require('http').Server(app)


/** Database Connection **/
let mongoDB = 'mongodb://localhost/data'
mongoose.connect(mongoDB, function(err) {
    if (err) { throw err }
})

let db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


/** Body Parser **/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/** Routes Setup **/
app.use('/users', users)



/** Export App & Server to use it in bin/www **/
module.exports = {app: app, server: server}