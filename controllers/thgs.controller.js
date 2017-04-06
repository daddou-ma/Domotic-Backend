let THG        = require('../models/thgs.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All THGs
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    THG.find()
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
    THG.findOne({_id : req.params.id})
    .then((thg) => {
        // Update THG
        thg.update(mapParams(req))
        .then((thg) => {
            response.successHandler(res, __('thg.updated'))
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
 * Delete THG by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    THG.findOne({_id : req.params.id})
    .then((thg) => {
        // Delete THG
        thg.delete()
        .then((thg) => {
            response.successHandler(res, __('thg.deleted'))
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
 * Hard Delete THG by Id
 * @param {Object|Object} request & response
 */
let remove = (req, res) => {
    THG.findOne({_id : req.params.id}).remove()
    .then((board) => {
        // Delete THG
        response.successHandler(res, __('haaaaa'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Restore a deleted THG by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    THG.findOne({_id : req.params.id})
    .then((thg) => {
        // Restore THG
        thg.restore()
        .then((thg) => {
            response.successHandler(res,  __('thg.restored'))
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
 * @param {Object} THG
 * @return {Object} THG mapped
 */
let mapParams = (req) => {
    let thg = req.body || req.query

    return {
        "level"  : thg.level,
        "mode"   : thg.mode,
        "degre"  : thg.degre
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    remove,
    restore
}