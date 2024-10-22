let User        = require('../models/users.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Users
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    User.find()
    .then((users) => {
        res.json(users)
    })
    .catch((err) => {
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
    .then((user) => {
        res.json(user)
    })
    .catch((err) => {
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
    .then((user) => {
        response.successHandler(res, __('user.created'))
    })
    .catch((err) => {
        if ( err && err.code === 11000 ) {
            err = {
                errors: {
                    email: {
                        "message": __('user.fields.email.unique'),
                        "name": "ValidatorError",
                        "properties": {
                            "type": "required",
                            "message": __('user.fields.email.unique'),
                            "path": "email"
                        },
                        "kind": "unique",
                        "path": "email"
                    }
                },
                name : "ValidationError"
            }
        }
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
    .then((user) => {
        // Update User
        user.update(mapParams(req))
        .then((user) => {
            response.successHandler(res, __('user.updated'))
        })
        .catch((err) => {
            response.errorHandler(res, err)
        })
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Delete User by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    User.findOne({_id : req.params.id}).remove()
    .then((doc) => {
        response.successHandler(res, __('user.deleted'))
    })
    .catch((err) => {
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
        name      : user.name,
        email     : user.email,
        password  : user.password
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}