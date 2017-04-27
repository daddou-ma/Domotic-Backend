/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Schedule        = require('../schedules.model')
const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** ScheduleSchedule Schema Declaration **/
let ScheduleScheduleSchema = new Schema({
    switch01: {
        type        : Boolean,
        default     : false
    },
    switch02: {
        type        : Boolean,
        default     : false
    },
    switch03: {
        type        : Boolean,
        default     : false
    },
    switch04: {
        type        : Boolean,
        default     : false
    },
    switch05: {
        type        : Boolean,
        default     : false
    },
    switch06: {
        type        : Boolean,
        default     : false
    },
    switch07: {
        type        : Boolean,
        default     : false
    },
    switch08: {
        type        : Boolean,
        default     : false
    },
    switch09: {
        type        : Boolean,
        default     : false
    },
    switch10: {
        type        : Boolean,
        default     : false
    }})

/* Advanced hooks */
ScheduleScheduleSchema.plugin(mongooseAdvancedHook)

let ScheduleSchedule = Schedule.discriminator('ScheduleSchedule', ScheduleScheduleSchema, {discriminatorKey : 'type'});


/** Export The Schedule Model **/
module.exports = ScheduleSchedule