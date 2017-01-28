let User = require('../models/users.model')


/**
 * Get All Users
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    User.find({}, function(err, users) {
        res.json(users)
    })
}

/**
 * Get User by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    User.findOne({_id : req.params.id})
    .then(function(user) {
        res.json(user)
    })
    .catch(function(err) {
        errorHandler(res, err)
    })
}

/**
 * Create a User
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let user = new User(mapParams(req.body))

    user.save()
    .then(function(user) {
        successHandler(res, "User Created")
    })
    .catch(function(err) {
        errorHandler(res, err)
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
        user.update(mapParams(req.body))
        .then(function(user) {
            successHandler(res, "User Updated")
        })
        .catch(function(err) {
            errorHandler(res, err)
        })
    })
    .catch(function(err) {
        errorHandler(res, err)
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
            successHandler(res, "User Deleted")
        })
        .catch(function(err) {
            errorHandler(res, err)
        })
    })
    .catch(function(err) {
        errorHandler(res, err)
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
            successHandler(res, "User Restored")
        })
        .catch(function(err) {
            errorHandler(res, err)
        })
    })
    .catch(function(err) {
        errorHandler(res, err)
    })
}

let errorHandler = (res ,err) => {
    res.status(400).json({
        "success": false,
        "errors" : err
    })
}

let successHandler = (res, doc) => {
    res.status(200).json({
        "success": true,
        "message": doc
    })
}

/** Map Params **/
let mapParams = (user) => {
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