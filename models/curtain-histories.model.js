/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const History        = require('./history.model')
const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** CurtainHistory Schema Declaration **/
let CurtainHistorySchema = new Schema({
	user  : {
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    },
    level: {
        type        : Number
    }
})

/* Advanced hooks */
CurtainHistorySchema.plugin(mongooseAdvancedHook)

let CurtainHistory = History.discriminator('CurtainHistory', CurtainHistorySchema, {discriminatorKey : 'type'});


/** Export The Curtain Model **/
module.exports = CurtainHistory