/** Includes **/
let User        = require('../models/users.model')
let Auth        = require('../helpers/sessions.helper').auth
let checkAuth        = require('../helpers/sessions.helper').checkAuth
let Logout      = require('../helpers/sessions.helper').logout

let response    = require('../helpers/responses.helper')


/**
 * Check a session
 * @param {Object|Object} request & response
 */

let check = (req, res) => {

    // Getting username & password from the request
    let  token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['_token']
    
    if (!token) {
        response.errorHandler(res, __('session.noSession')) 
    }
    
    // verifies secret and checks exp
    checkAuth(token)
    .then(function(doc) {
        response.successHandler(res,__('session.validSession'))
    })
    .catch(function(err) {
        response.errorHandler(res,__('session.invalidSession'))
    })
}


let create = (req, res) => {

    // Getting username & password from the request
    let username = req.body.username || req.query.username
    let password = req.body.password || req.query.password
    
    // User authentication
    Auth(username, password)
    .then((token) => {
        // add token to cookies for Browsers
        res.cookie('_token', token, { maxAge: process.env.TOKEN_TIMEOUT});
        
        // respond with token is success auth
        response.successHandler(res, {
            message : 'Authentication Done !',
            token   : token
        })
    })
    .catch((err) => {
      response.errorHandler(res, err)
    })
}

/**
 * Destroy a session
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    // get the token from the request or the cookies
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['_token']
    
    // Logout user
    Logout(token)
    .then((doc) => {
        res.cookie('_token', '', { maxAge: process.env.TOKEN_TIMEOUT});
        response.successHandler(res, doc)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

module.exports = {
    create,
    check,
    destroy
}