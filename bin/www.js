/** Includes **/
let app = require('../index').app
let http = require('http')
let server = require('../index').server

/** Set Application Port **/

let port = 3000

if (process.env.APP_ENV == "production") {
    port = process.env.PROD_PORT
}
if (process.env.APP_ENV == "developement") {
    port = process.env.DEV_PORT
}
if (process.env.APP_ENV == "test") {
    port = process.env.TEST_PORT
}

app.set('port', port)

/** Listen to Port **/
server.listen(port)
