let THG        = require('../models/thgs.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All THGs
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    THG.find()
    .populate('board')
    .populate('room')
    .populate('histories')
    .then((thgs) => {
        res.json(thgs)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get THG by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    THG.findOne({_id : id})
    .populate('board')
    .populate('room')
    .populate('histories')
    .then((thg) => {
        res.json(thg)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a THG
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let thg = new THG(mapParams(req))

    thg.save()
    .then((thg) => {
        response.successHandler(res, __('thg.created'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Update a THG
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find THG
    const params = mapParams(req)
    console.log(params)
    THG.findOne({_id : req.params.id}).update(params)
        .then((thg) => {
            response.successHandler(res, __('thg.updated'))
        })
        .catch((err) => {
            response.errorHandler(res, err)
        })
}

/**
 * Delete THG by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    THG.findOne({_id : req.params.id}).remove()
    .then((doc) => {
        response.successHandler(res, __('thg.deleted'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}


/**
 * Filter Params to create or update
 * @param {Object} THG
 * @return {Object} THG mapped
 */
let mapParams = (req) => {
    let thg = req.body || req.query

    return {
        room          : thg.room,
        name          : thg.name
    }
}

module.exports = {
    index,
    show,
    //create,
    update,
    //destroy,
    //remove,
    //restore
}