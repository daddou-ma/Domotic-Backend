let Switch        = require('../models/switchs.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Switchs
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Switch.find()
    .populate('board')
    .then((switchs) => {
        res.json(switchs)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get Switch by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    Switch.findOne({_id : id})
    .populate('board')
    .then((switchh) => {
        res.json(switchh)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a Switch
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let switchh = new Switch(mapParams(req))

    switchh.save()
    .then((switchh) => {
        response.successHandler(res, __('switch.created'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Update a Switch
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find Switch
    Switch.findOne({_id : req.params.id})
    .then((switchh) => {
        // Update Switch
        switchh.update(mapParams(req))
        .then((switchh) => {
            response.successHandler(res, __('switch.updated'))
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
 * Delete Switch by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    Switch.findOne({_id : req.params.id})
    .then((switchh) => {
        // Delete Switch
        switchh.delete()
        .then((switchh) => {
            response.successHandler(res, __('switch.deleted'))
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
 * Restore a deleted Switch by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    Switch.findOne({_id : req.params.id})
    .then((switchh) => {
        // Restore Switch
        switchh.restore()
        .then((switchh) => {
            response.successHandler(res,  __('switch.restored'))
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
 * @param {Object} Switch
 * @return {Object} Switch mapped
 */
let mapParams = (req) => {
    let switchh = req.body || req.query

    return {
        room       : switchh.room,
        switch01   : switchh.swich01,
        switch02   : switchh.swich02,
        switch03   : switchh.swich03,
        switch04   : switchh.swich04,
        switch05   : switchh.swich05,
        switch06   : switchh.swich06,
        switch07   : switchh.swich07,
        switch08   : switchh.swich08,
        switch09   : switchh.swich09,
        switch10   : switchh.swich10
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