let Curtain        = require('../models/curtains.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Curtains
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Curtain.find()
    .populate('board')
    .populate('room')
    .populate('histories')
    .then((curtains) => {
        res.json(curtains)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get Curtain by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    Curtain.findOne({_id : id})
    .populate('board')
    .populate('room')
    .populate('histories')
    .then((curtain) => {
        res.json(curtain)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a Curtain
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let curtain = new Curtain(mapParams(req))

    curtain.save()
    .then((curtain) => {
        response.successHandler(res, __('curtain.created'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Update a Curtain
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find Curtain
    Curtain.findOne({_id : req.params.id})
    .then((curtain) => {
        // Update Curtain
        curtain.update(mapParams(req))
        .then((curtain) => {
            response.successHandler(res, __('curtain.updated'))
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
 * Delete Curtain by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    Curtain.findOne({_id : req.params.id})
    .then((curtain) => {
        // Delete Curtain
        curtain.delete()
        .then((curtain) => {
            response.successHandler(res, __('curtain.deleted'))
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
 * Restore a deleted Curtain by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    Curtain.findOne({_id : req.params.id})
    .then((curtain) => {
        // Restore Curtain
        curtain.restore()
        .then((curtain) => {
            response.successHandler(res,  __('curtain.restored'))
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
 * @param {Object} Curtain
 * @return {Object} Curtain mapped
 */
let mapParams = (req) => {
    let curtain = req.body || req.query

    return {
        room   : curtain.room,
        name   : curtain.name,
        level  : curtain.level
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