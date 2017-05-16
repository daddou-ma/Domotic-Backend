/** Includes **/
let mongoose    = require('mongoose')
let Schema      = mongoose.Schema
let Node        = require('./nodes.model')
const Room      = require('./rooms.model')
let AirHistory  = require('./histories/air-histories.model')

let mongooseAdvancedHook    = require('mongoose-advanced-hooks')

/** Air Schema Declaration **/
let AirSchema = new Schema({
    power : {
        type        : Boolean
    },
    temperature: {
        type        : Number    
    },
    level: {
        type        : Number
    },
    mode: {
        type        : Number
    },
    degree: {
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

AirSchema.postCreate((next, doc, query) => {
    if(!doc.room) {
        next()
        return
    }

    Room.findOne({_id: doc.room})
    .then((room) => {
        room.nodes.push(doc)
        room.save()
    })
    next()
})

AirSchema.preUpdate((next, doc, query) => {

    if(!doc.room ) {
        next()
        return
    }

    this.oldRoom = doc.room

    Room.findOne({_id: doc.room})
    .then((room) => {
        let index = room.nodes.indexOf(doc._id)

        if (index >= 0) {
            room.nodes.splice(index, 1);
            room.save()
        }
    })
    next()
})

AirSchema.postUpdate((next, doc, query) => {
    console.log(doc.room)
    if(!doc.room == this._oldRoom) {
        next()
        return
    }

    Room.findOne({_id: doc.room})
    .then((room) => {
        let index = room.nodes.indexOf(this._oldRoom)

        if (index < 0) {
            room.nodes.splice(index, 1);
        }

        room.nodes.push(doc)
        room.save()
    })
    next()
})


let Air = Node.discriminator('Air', AirSchema, {discriminatorKey : 'type'});

/** Export The Air Model **/
module.exports = Air