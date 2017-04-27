/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Node        = require('./nodes.model')
const Board       = require('./boards.model')
const THGHistory  = require('./histories/thg-histories.model')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')


/** THG Schema Declaration **/
let THGSchema = new Schema({
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
THGSchema.plugin(mongooseAdvancedHook)

THGSchema.postUpdate(function(next, doc, query) {
    let history = new THGHistory({
        node        : doc._id,
        temperature : doc.temperature,
        humidity    : doc.humidity,
        gaz         : doc.gaz,
        light       : doc.light,
        type        : 'THGHistory'
    })
    history.save()
    .then((history)=> {
        doc.histories.push(history)
    })
    .catch((err)=> {
        console.log(err)
    })
    next()
})

let THG = Node.discriminator('THG', THGSchema, {discriminatorKey: 'type'});


/** Export The THG Model **/
module.exports = THG