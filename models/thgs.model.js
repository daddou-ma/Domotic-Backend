/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Node        = require('./nodes.model')
const Room        = require('./rooms.model')
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
    },
    move: {
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

THGSchema.postUpdate(function(next, doc, query) {
    if (!doc.room) {
        next()
        return
    }
    Room.findOne({_id : doc.room})
    .then((room) => {
        room.temperature    = doc.temperature
        room.humidity       = doc.humidity
        room.gaz            = doc.gaz
        room.light          = doc.light
        room.move           = doc.move
        
        room.save()
        .then((room) => {
            console.log('Room infos updated', room.name)
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    })
    next()
})

let THG = Node.discriminator('THG', THGSchema, {discriminatorKey: 'type'});


/** Export The THG Model **/
module.exports = THG