let Board        = require('../models/boards.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Boards
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Board.find()
    .populate('node')
    .then((boards) => {
        res.json(boards)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get Board by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id
    
    Board.findOne({_id : id})
    .populate('node')
    .then((board) => {
        res.json(board)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a Board
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let board = new Board(mapParams(req))

    board.save()
    .then((board) => {
        response.successHandler(res, __('board.created'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Update a Board
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find Board
    Board.findOne({_id : req.params.id})
    .then((board) => {
        // Update Board
        board.update(mapParams(req))
        .then((board) => {
            response.successHandler(res, __('board.updated'))
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
 * Delete Board by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    Board.findOne({_id : req.params.id}).remove()
    .then((doc) => {
        response.successHandler(res, __('board.deleted'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}


/**
 * Filter Params to create or update
 * @param {Object} Board
 * @return {Object} Board mapped
 */
let mapParams = (req) => {
    let board = req.body || req.query

    return {
        serial_number : board.serial_number,
        type          : board.type,
        ipv4          : board.ipv4
    }
}

module.exports = {
    index,
    show,
    //create,
    //update,
    //destroy,
    //remove,
    //restore
}