let Air        = require('../models/airs.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Airs
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Air.find()
    .populate('board')
    .populate('room')
    .populate('histories')
    .then((airs) => {
        res.json(airs)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get Air by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    Air.findOne({_id : id})
    .populate('board')
    .populate('room')
    .populate('histories')
    .then((air) => {
        res.json(air)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a Air
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let air = new Air(mapCreateParams(req))

    air.save()
    .then((air) => {
        response.successHandler(res, __('air.created'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Update a Air
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find Air
    Air.findOne({_id : req.params.id})
    .then((air) => {
        // Update Air
        air.update(mapUpdateParams(req))
        .then((air) => {
            response.successHandler(res, __('air.updated'))
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
 * Delete Air by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    Air.findOne({_id : req.params.id})
    .then((air) => {
        // Delete Air
        air.delete()
        .then((air) => {
            response.successHandler(res, __('air.deleted'))
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
 * Restore a deleted Air by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    Air.findOne({_id : req.params.id})
    .then((air) => {
        // Restore Air
        air.restore()
        .then((air) => {
            response.successHandler(res,  __('air.restored'))
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
 * @param {Object} Air
 * @return {Object} Air mapped
 */
let mapCreateParams = (req) => {
    let air = req.body || req.query

    return {
        board : air.board,
        room  : air.room,
        name  : air.name,
        level : air.level,
        mode  : air.mode,
        degre : air.degre,
        user  : req._user
    }
}

let mapUpdateParams = (req) => {
    let air = req.body || req.query

    return {
        room  : air.room,
        name  : air.name,
        level : air.level,
        mode  : air.mode,
        degre : air.degre,
        user  : req._user
    }
}

module.exports = {
    index,
    show,
    //create,
    update,
    //destroy,
    //restore
}