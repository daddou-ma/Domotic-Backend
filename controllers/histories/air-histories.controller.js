let History        = require('../../models/histories/air-histories.model')
let response    = require('../../helpers/responses.helper')


/**
 * Get All Historys
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    History.find()
    .then((historys) => {
        res.json(historys)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get History by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id

    History.findOne({_id : id})
    .then((history) => {
        res.json(history)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

module.exports = {
    index,
    show,
}