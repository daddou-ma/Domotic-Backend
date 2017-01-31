/**
 * handle error messages
 * @param {Object|Object} Response, Error Messages
 */
let errorHandler = (res ,err) => {
    res.status(400).json({
        "success": false,
        "errors" : err
    })
}

/**
 * Handle success messages
 * @param {Object|Object} Response, Success Messages
 */
let successHandler = (res, doc) => {
    res.status(200).json({
        "success": true,
        "message": doc
    })
}

/** Export the module **/
module.exports = {
    successHandler,
    errorHandler
}