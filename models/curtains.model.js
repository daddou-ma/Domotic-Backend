/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let Node        = require('./node.model')


/** Curtain Schema Declaration **/
let Curtain = Node.discriminator('Curtain', new Schema({
    level: {
        type        : Number    
    }
}), {discriminatorKey: 'type'});


/** Export The Curtain Model **/
module.exports = Curtain