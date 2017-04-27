let Schedule        = require('../models/schedules.model')
let response    = require('../helpers/responses.helper')


/**
 * Get All Schedules
 * @param {Object|Object} request & response
 */
let index = (req, res) => {
    Schedule.find()
    .then((schedules) => {
        res.json(schedules)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Get Schedule by Id
 * @param {Object|Object} request & response
 */
let show = (req, res) => {
    let id = req.params.id

    Schedule.findOne({_id : id})
    .then((schedule) => {
        res.json(schedule)
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Create a Schedule
 * @param {Object|Object} request & response
 */
let create = (req, res) => {
    let schedule = new Schedule(mapCreateParams(req))

    schedule.save()
    .then((schedule) => {
        response.successHandler(res, __('schedule.created'))
    })
    .catch((err) => {
        response.errorHandler(res, err)
    })
}

/**
 * Update a Schedule
 * @param {Object|Object} request & response
 */
let update = (req, res) => {
    // Find Schedule
    Schedule.findOne({_id : req.params.id})
    .then((schedule) => {
        // Update Schedule
        schedule.update(mapUpdateParams(req))
        .then((schedule) => {
            response.successHandler(res, __('schedule.updated'))
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
 * Delete Schedule by Id
 * @param {Object|Object} request & response
 */
let destroy = (req, res) => {
    Schedule.findOne({_id : req.params.id})
    .then((schedule) => {
        // Delete Schedule
        schedule.delete()
        .then((schedule) => {
            response.successHandler(res, __('schedule.deleted'))
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
 * Restore a deleted Schedule by Id
 * @param {Object|Object} request & response
 */
let restore = (req, res) => {
    Schedule.findOne({_id : req.params.id})
    .then((schedule) => {
        // Restore Schedule
        schedule.restore()
        .then((schedule) => {
            response.successHandler(res,  __('schedule.restored'))
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
 * @param {Object} Schedule
 * @return {Object} Schedule mapped
 */
let mapCreateParams = (req) => {
    let schedule = req.body || req.query

    return {
        node        : schedule.node,
        user        : schedule.user,
        time        : schedule.time,
        type        : schedule.type,
        level       : schedule.level,
        mode        : schedule.mode,
        degre       : schedule.degre,
        switch01    : schedule.switch01,
        switch02    : schedule.switch02,
        switch03    : schedule.switch03,
        switch04    : schedule.switch04,
        switch05    : schedule.switch05,
        switch06    : schedule.switch06,
        switch07    : schedule.switch01,
        switch08    : schedule.switch01,
        switch09    : schedule.switch01,
        switch10    : schedule.switch01,
    }
}

let mapUpdateParams = (req) => {
    let schedule = req.body || req.query

    return {
        time        : schedule.time,
        type        : schedule.type,
        level       : schedule.level,
        mode        : schedule.mode,
        degre       : schedule.degre,
        switch01    : schedule.switch01,
        switch02    : schedule.switch02,
        switch03    : schedule.switch03,
        switch04    : schedule.switch04,
        switch05    : schedule.switch05,
        switch06    : schedule.switch06,
        switch07    : schedule.switch01,
        switch08    : schedule.switch01,
        switch09    : schedule.switch01,
        switch10    : schedule.switch01,
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