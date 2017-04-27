/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const History     = require('./history.model')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** THGHistory Schema Declaration **/
let THGHistorySchema = new Schema({
    temperature: {
        type        : Number    
    },
    humidity: {
        type        : Number
    },
    gaz: {
        type        : Number
    },
    light: {
        type        : Number
    }
})

/* Advanced hooks */
THGHistorySchema.plugin(mongooseAdvancedHook)

let THGHistory = History.discriminator('THGHistory', THGHistorySchema, {discriminatorKey : 'type'});

/** Export The THG Model **/
module.exports = THGHistory