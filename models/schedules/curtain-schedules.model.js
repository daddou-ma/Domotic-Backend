/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Schedule        = require('../schedules.model')
const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** AirSchedule Schema Declaration **/
let CurtainScheduleSchema = new Schema({
    level: {
        type        : Number
    }
})

/* Advanced hooks */
CurtainScheduleSchema.plugin(mongooseAdvancedHook)

let CurtainSchedule = Schedule.discriminator('CurtainSchedule', CurttainScheduleSchema, {discriminatorKey : 'type'});


/** Export The Air Model **/
module.exports = CurtainSchedule