let User        = require('../models/users.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Users
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    User.find({})
    .then(function(users) {
        res.json(users)
    })
    .catch(function(err) {
        response.errorHandler(res, err)
    })
}

/**
 * Get User by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    User.findOne({_id : id})
    .then(function(user) {
        res.json(user)
    })
    .catch(function(err) {
        response.errorHandler(res, err)
    })
}

/**
 * Create a User
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let user = new User(mapParams(req))

    user.save()
    .then(function(user) {
        response.successHandler(res, req.__('user.created'))
    })
    .catch(function(err) {
        response.errorHandler(res, err)
    })
}

/**
 * Update a User
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find User
    User.findOne({_id : req.params.id})
    .then(function(user) {
        // Update User
        user.update(mapParams(req))
        .then(function(user) {
            response.successHandler(res, req.__('user.updated'))
        })
        .catch(function(err) {
            response.errorHandler(res, err)
        })
    })
    .catch(function(err) {
        response.errorHandler(res, err)
    })
}

/**
 * Delete User by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    User.findOne({_id : req.params.id})
    .then(function(user) {
        // Delete User
        user.delete()
        .then(function(user) {
            response.successHandler(res, req.__('user.deleted'))
        })
        .catch(function(err) {
            response.errorHandler(res, err)
        })
    })
    .catch(function(err) {
        response.errorHandler(res, err)
    })
}

/**
 * Restore a deleted User by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    User.findOne({_id : req.params.id})
    .then(function(user) {
        // Restore User
        user.restore()
        .then(function(user) {
            response.successHandler(res,  req.__('user.restored'))
        })
        .catch(function(err) {
            response.errorHandler(res, err)
        })
    })
    .catch(function(err) {
        response.errorHandler(res, err)
    })
}


/**
 * Filter Params to create or update
 * @param {Object} User
 * @return {Object} User mapped
 */
let mapParams = (req) => {
    let user = req.body || req.query

    return {
        "name"      : user.name,
        "email"     : user.email,
        "password"  : user.password
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    restore
}