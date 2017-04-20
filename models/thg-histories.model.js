/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let History     = require('./history.model')

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


let THGHistory = History.discriminator('THGHistory', THGHistorySchema, {discriminatorKey : 'type'});

/** Export The THG Model **/
module.exports = THGHistory