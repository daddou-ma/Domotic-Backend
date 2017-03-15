let Arduino        = require('../models/arduinos.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Arduinos
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Arduino.find()
    .then((arduinos) => {
        res.json(arduinos)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get Arduino by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    Arduino.findOne({_id : id})
    .then((arduino) => {
        res.json(arduino)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a Arduino
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let arduino = new Arduino(mapParams(req))

    arduino.save()
    .then((arduino) => {
        response.successHandler(res, __('arduino.created'))
    })
    .catch((err) => {
        if ( err && err.code === 11000 ) {
            err = {
                errors: {
                    email: {
                        "message": __('arduino.fields.email.unique'),
                        "name": "ValidatorError",
                        "properties": {
                            "type": "required",
                            "message": __('arduino.fields.email.unique'),
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
 * Update a Arduino
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find Arduino
    Arduino.findOne({_id : req.params.id})
    .then((arduino) => {
        // Update Arduino
        arduino.update(mapParams(req))
        .then((arduino) => {
            response.successHandler(res, __('arduino.updated'))
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
 * Delete Arduino by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    Arduino.findOne({_id : req.params.id})
    .then((arduino) => {
        // Delete Arduino
        arduino.delete()
        .then((arduino) => {
            response.successHandler(res, __('arduino.deleted'))
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
 * Restore a deleted Arduino by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    Arduino.findOne({_id : req.params.id})
    .then((arduino) => {
        // Restore Arduino
        arduino.restore()
        .then((arduino) => {
            response.successHandler(res,  __('arduino.restored'))
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
 * Filter Params to create or update
 * @param {Object} Arduino
 * @return {Object} Arduino mapped
 */
let mapParams = (req) => {
    let arduino = req.body || req.query

    return {
        "serial_number" : arduino.serial_number,
        "name"          : arduino.name,
        "serial_port"   : arduino.serial_port
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