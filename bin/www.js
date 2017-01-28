
let app = require('../index').app
let http = require('http')
let server = require('../index').server

app.set('port', 3000)

server.listen(3000);