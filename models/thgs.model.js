/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let Node        = require('./node.model')


/** THG Schema Declaration **/
let THG = Node.discriminator('THG', new Schema({
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
}), {discriminatorKey: 'type'});


/** Export The THG Model **/
module.exports = THG