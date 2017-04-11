/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let Node        = require('./node.model')

/** Air Schema Declaration **/
let Air = Node.discriminator('Air', new Schema({
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
}), {discriminatorKey : 'type'});


/** Export The Air Model **/
module.exports = Air