/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let History        = require('./history.model')

/** AirHistory Schema Declaration **/
let AirHistorySchema = new Schema({
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

let AirHistory = History.discriminator('AirHistory', AirHistorySchema, {discriminatorKey : 'type'});


/** Export The Air Model **/
module.exports = AirHistory