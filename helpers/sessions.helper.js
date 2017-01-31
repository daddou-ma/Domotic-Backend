let User    = require('../models/users.model.js')
let lang    = require('../commons/lang')
let jwt     = require('jsonwebtoken')


/**
 * Authenticate user and return token if valid credentials
 * @param {String|String} username(email), password
 * @return {Promise} Token is success / error if failed
 */
let auth = (username, password) => {
    
    let promise = new Promise(function(resolve, reject) {
        
        User.findOne({email: username})
        .then(function(user) {
            if (user.password === password) {
                let token = createToken(user)
                user.connect(token)
                resolve(token)
            }
            else {
                reject(lang.__('session.wrongPassword'))
            }
        })
        .catch(function(err) {
            reject(lang.__('session.userNotFound'))
        })
    })
    
    return promise
}


/**
 * Middleware Check if a token is valid (used in routes)
 * @param {String} token
 * @return {Promise} 
 */
let checkAuth = (token) => {
    let promise = new Promise(function(resolve, reject) {
        
        jwt.verify(token, process.env.API_SECRET, function(err, decoded) {
            if (err) {
                reject(err)
            }
            resolve(lang.__('session.authenticated'))
        })
    })
    return promise
}

/**
 * Logout a user
 * @param {String} token
 * @return {Promise}
 */
let logout = (token) => {
    
    /** decode the token **/
    let decoded = undefined
    
    /** must use try catch in case no **/
    try {
        decoded = jwt.verify(token, process.env.API_SECRET)
    }
    catch(err) {
    }
    
    let promise = new Promise(function(resolve, reject) {
        if (!decoded) {
            reject(lang.__('session.invalidSession'))
        }
        
        User.findOne({email: decoded.email})
        .then(function(user) {
            // empty the token field in database
            user.disconnect()
            resolve(lang.__('session.logout'))
        })
        .catch(function(err) {
            reject(err)
        })
        
    })
    return promise
}

/**
 * create a token from user attributes
 * @param {Object} user
 * @return {String} token
 */
let createToken = (user) => {
    let token = jwt.sign({ 
            user: user.name,
            email: user.email
        }, process.env.API_SECRET, {
            expiresIn: process.env.TOKEN_TIMEOUT
        })
    return token
}

/** Export the module **/
module.exports = {
    auth,
    checkAuth,
    logout
}