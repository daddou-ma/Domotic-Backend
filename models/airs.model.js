/** Includes **/
let mongoose    = require('mongoose')
let Schema      = mongoose.Schema
let Node        = require('./nodes.model')
let AirHistory  = require('./histories/air-histories.model')

let mongooseAdvancedHook    = require('mongoose-advanced-hooks')

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
    let history = new AirHistory({
        temperature : doc.temperature,
        level       : doc.level,
        mode        : doc.mode,
        degre       : doc.degre,
        user        : doc.user,
        type        : 'AirHistory'
    })
    history.save()
    .then((doc)=> {
        console.log("History Created : ", doc.name)
    })
    .catch((doc)=> {
        console.log(doc)
    })
    next()
})

AirSchema.postUpdate(function(next, doc, query) {
    let Board = mongoose.models.Board

    Board.findOne({_id: doc.board})
    .then((doc)=> {
        console.log("Action Received : ", doc.serial_number)
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