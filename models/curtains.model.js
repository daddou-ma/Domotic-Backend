/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Node        = require('./nodes.model')
const Room        = require('./rooms.model')
const CurtainHistory = require('./histories/curtain-histories.model')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')


/** Curtain Schema Declaration **/
let CurtainSchema = new Schema({
    level: {
        type        : Number    
    }
})

/* Advanced hooks */
CurtainSchema.plugin(mongooseAdvancedHook)
CurtainSchema.postUpdate((next, doc, query) => {

    global.sockets.map((socket) => {
        console.log('dfdfdf')
        socket.emit(doc._id, doc)
    })
    next()
})

CurtainSchema.postUpdate(function(next, doc, query) {
    let history = new CurtainHistory({
        level       : doc.level,
        user        : doc.user,
        type        : 'SwitchHistory'
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

CurtainSchema.postUpdate(function(next, doc, query) {
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

/*CurtainSchema.postCreate((next, doc, query) => {
    console.log(doc.room)
    if(!doc.room) {
        return
    }

    Room.findOne({_id: doc.room})
    .then((room) => {
        let index = room.nodes.indexOf(doc._id)

        if (index < 0) {
            room.nodes.push(doc)
            room.save()
        }
        
    })
    next()
})

CurtainSchema.preUpdate((next, doc, query) => {
    console.log(doc.room)
    if(!doc.room ) {
        return
    }
    
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

CurtainSchema.postUpdate((next, doc, query) => {
    console.log(doc.room)
    if(!doc.room) {
        return
    }

    Room.findOne({_id: doc.room})
    .then((room) => {
        let index = room.nodes.indexOf(doc._id)

        if (index < 0) {
            room.nodes.push(doc)
            room.save()
        }
    })
    next()
})
*/
let Curtain = Node.discriminator('Curtain', CurtainSchema, {discriminatorKey: 'type'});


/** Export The Curtain Model **/
module.exports = Curtain