/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Node        = require('./nodes.model')
const Board       = require('./boards.model')
const AirHistory  = require('./histories/air-histories.model')
const mongooseAdvancedHook    = require('mongoose-advanced-hooks')

/** Air Schema Declaration **/
let AirSchema = new Schema({
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
AirSchema.plugin(mongooseAdvancedHook)

AirSchema.postUpdate(function(next, doc, query) {
    console.log('preee update')
    let history = new AirHistory({
        temperature : doc.temperature,
        level       : doc.level,
        mode        : doc.mode,
        degre       : doc.degre,
        type        : 'AirHistory'
    })
    history.save()
    .then((doc)=> {
        console.log(doc)
    })
    .catch((doc)=> {
        console.log(doc)
    })
    next()
})

AirSchema.postUpdate(function(next, doc, query) {
    Board.findOne({_id: doc.board})
    .then((doc)=> {
        console.log(doc)
        if ( tcp_nodes[doc.serial_number]) {
            tcp_nodes[doc.serial_number].sync()
        }
    })
    .catch((err)=> {
        console.log(err)
    })
    
    next()
})


let Air = Node.discriminator('Air', AirSchema, {discriminatorKey : 'type'});

/** Export The Air Model **/
module.exports = Air