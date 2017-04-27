/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Schedule        = require('../schedules.model')
const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** AirSchedule Schema Declaration **/
let AirScheduleSchema = new Schema({
    level: {
        type        : Number
    },
    mode: {
        type        : Number
    },
    degre: {
        type        : Number
    }
})

/* Advanced hooks */
AirScheduleSchema.plugin(mongooseAdvancedHook)

let AirSchedule = Schedule.discriminator('AirSchedule', AirScheduleSchema, {discriminatorKey : 'type'});


/** Export The Air Model **/
module.exports = AirSchedule