let Switch        = require('../models/switchs.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Switchs
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Switch.find()
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
    .then((switch) => {
        res.json(switch)
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
    let switch = new Switch(mapParams(req))

    switch.save()
    .then((switch) => {
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
    .then((switch) => {
        // Update Switch
        switch.update(mapParams(req))
        .then((switch) => {
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
    .then((switch) => {
        // Delete Switch
        switch.delete()
        .then((switch) => {
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
    .then((switch) => {
        // Restore Switch
        switch.restore()
        .then((switch) => {
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
    let switch = req.body || req.query

    return {
        "swich01"   : switch.swich01,
        "swich02"   : switch.swich02,
        "swich03"   : switch.swich03,
        "swich04"   : switch.swich04,
        "swich05"   : switch.swich05,
        "swich06"   : switch.swich06,
        "swich07"   : switch.swich07,
        "swich08"   : switch.swich08,
        "swich09"   : switch.swich09,
        "swich10"   : switch.swich10
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