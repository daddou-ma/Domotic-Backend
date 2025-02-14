/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Node        = require('./nodes.model')
const Room        = require('./rooms.model')
const SwitchHistory = require('./histories/switch-histories.model')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** Switch Schema Declaration **/
let SwitchSchema = new Schema({
    user: {
        type        : Schema.Types
    },
    switch01: {
        type        : Boolean,
        default     : false
    },
    switch02: {
        type        : Boolean,
        default     : false
    },
    switch03: {
        type        : Boolean,
        default     : false
    },
    switch04: {
        type        : Boolean,
        default     : false
    },
    switch05: {
        type        : Boolean,
        default     : false
    },
    switch06: {
        type        : Boolean,
        default     : false
    },
    switch07: {
        type        : Boolean,
        default     : false
    },
    switch08: {
        type        : Boolean,
        default     : false
    },
    switch09: {
        type        : Boolean,
        default     : false
    },
    switch10: {
        type        : Boolean,
        default     : false
    }
})

SwitchSchema.plugin(mongooseAdvancedHook)

SwitchSchema.postUpdate((next, doc, query) => {

    global.sockets.map((socket) => {
        console.log('dfdfdf')
        socket.emit(doc._id, doc)
    })
    next()
})

SwitchSchema.postUpdate(function(next, doc, query) {
    let history = new SwitchHistory({
        switch01    : doc.switch01,
        switch02    : doc.switch02,
        switch03    : doc.switch03,
        switch04    : doc.switch04,
        switch05    : doc.switch05,
        switch06    : doc.switch06,
        switch07    : doc.switch07,
        switch08    : doc.switch08,
        switch09    : doc.switch09,
        switch10    : doc.switch10,
        user        : this._user,
        type        : 'SwitchHistory'
    })
    history.save()
    .then((doc)=> {
    })
    .catch((doc)=> {
        console.log(doc)
    })
    next()
})

SwitchSchema.postUpdate(function(next, doc, query) {
    let Board = mongoose.models.Board

    Board.findOne({_id: doc.board})
    .then((doc)=> {
        if ( tcp_nodes[doc.serial_number]) {
            tcp_nodes[doc.serial_number].sync()
        }
    })
    .catch((err)=> {
        console.log(err)
    })
    
    next()
})

/*SwitchSchema.postCreate((next, doc, query) => {
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

SwitchSchema.preUpdate((next, doc, query) => {
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

SwitchSchema.postUpdate((next, doc, query) => {
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
let Switch = Node.discriminator('Switch', SwitchSchema, {discriminatorKey: 'type'});

/** Export The Switch Model **/
module.exports = Switch