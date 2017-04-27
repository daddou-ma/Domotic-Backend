let Node        = require('../models/nodes.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Nodes
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Node.find()
    .populate('board')
    .populate('room')
    .populate('histories')
    .then((nodes) => {
        res.json(nodes)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get Node by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    Node.findOne({_id : id})
    .populate('board')
    .populate('room')
    .populate('histories')
    .then((node) => {
        res.json(node)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a Node
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let node = new Node(mapCreateParams(req))

    node.save()
    .then((node) => {
        response.successHandler(res, __('node.created'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Update a Node
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find Node
    Node.findOne({_id : req.params.id})
    .then((node) => {
        // Update Node
        node.update(mapUpdateParams(req))
        .then((node) => {
            response.successHandler(res, __('node.updated'))
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
 * Delete Node by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    Node.findOne({_id : req.params.id})
    .then((node) => {
        // Delete Node
        node.delete()
        .then((node) => {
            response.successHandler(res, __('node.deleted'))
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
 * Restore a deleted Node by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    Node.findOne({_id : req.params.id})
    .then((node) => {
        // Restore Node
        node.restore()
        .then((node) => {
            response.successHandler(res,  __('node.restored'))
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
 * @param {Object} Node
 * @return {Object} Node mapped
 */
let mapCreateParams = (req) => {
    let node = req.body || req.query

    return {
        board : node.board,
        room  : node.room,
        name  : node.name,
    }
}

let mapUpdateParams = (req) => {
    let node = req.body || req.query

    return {
        room  : node.room,
        name  : node.name,
    }
}

module.exports = {
    index,
    show,
    //create,
    //update,
    //destroy,
    //restore
}