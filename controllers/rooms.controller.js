let Room        = require('../models/rooms.model')
let Node        = require('../models/nodes.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Rooms
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Room.find()
    .populate('nodes')
    .then((rooms) => {
        res.json(rooms)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get Room by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    Room.findOne({_id : id})
    .then((room) => {
        Node.find({room: id})
        .then((nodes) => {
            room.nodes = nodes
            res.json(room)
        })                
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a Room
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let room = new Room(mapParams(req))

    room.save()
    .then((room) => {
        response.successHandler(res, __('room.created'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Update a Room
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find Room
    Room.findOne({_id : req.params.id})
    .then((room) => {
        // Update Room
        room.update(mapParams(req))
        .then((room) => {
            response.successHandler(res, __('room.updated'))
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
 * Delete Room by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    Room.findOne({_id : req.params.id}).remove()
    .then((doc) => {
        response.successHandler(res, __('room.deleted'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Filter Params to create or update
 * @param {Object} Room
 * @return {Object} Room mapped
 */
let mapParams = (req) => {
    let room = req.body || req.query

    return {
        name : room.name,
        image : room.image
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}