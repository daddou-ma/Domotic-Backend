/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let History        = require('./history.model')

/** CurtainHistory Schema Declaration **/
let CurtainHistorySchema = new Schema({
    level: {
        type        : Number
    }
})

let CurtainHistory = History.discriminator('CurtainHistory', CurtainHistorySchema, {discriminatorKey : 'type'});


/** Export The Curtain Model **/
module.exports = CurtainHistory