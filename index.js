/** Includes **/
let express = require('express')
let mongoose = require('mongoose')

let users = require('./routes/users')

let app = express()
let server = require('http').Server(app)

/** Database Connection **/
let mongoDB = 'mongodb://localhost/data'
mongoose.connect(mongoDB, function(err) {
    if (err) { throw err }
})

let db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


/** Routes Setup **/

app.use('/users', users)

console.log("Manaytek")

/** Export App & Server to use it in bin/www **/
module.exports = {app: app, server: server}