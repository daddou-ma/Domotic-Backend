/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const History        = require('../history.model')
const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** AirHistory Schema Declaration **/
let AirHistorySchema = new Schema({
    user  : {
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    },
    temperature: {
        type        : Number    
    },
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
AirHistorySchema.plugin(mongooseAdvancedHook)

let AirHistory = History.discriminator('AirHistory', AirHistorySchema, {discriminatorKey : 'type'});


/** Export The Air Model **/
module.exports = AirHistory