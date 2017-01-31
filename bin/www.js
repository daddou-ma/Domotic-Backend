/** Includes **/
let app = require('../index').app
let http = require('http')
let server = require('../index').server

/** Set Application Port **/
app.set('port', process.env.APP_PORT)

/** Listen to Port **/
server.listen(process.env.APP_PORT)
