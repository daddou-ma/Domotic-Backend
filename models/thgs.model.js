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

THGSchema.postUpdate((next, doc, query) => {

    global.sockets.map((socket) => {
        console.log('dfdfdf')
        socket.emit(doc._id, doc)
    })
    next()
})

/*THGSchema.postUpdate(function(next, doc, query) {
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
            next()
        })
        .catch((err) => {
            console.log(err)
            next()
        })
    })
    .catch((err) => {
        console.log(err)
        next()
    })
    
})
*/
/** Action Done After Saving a Node **/
/*THGSchema.postCreate((next, doc, query) => {
    console.log(doc.room)
    if(!doc.room) {
        next()
        return
    }

    Room.findOne({_id: doc.room})
    .then((room) => {
        let index = room.nodes.indexOf(doc._id)

        if (index < 0) {
            room.nodes.push(doc)
            room.save()
        }
        next()
    })
})

THGSchema.preUpdate((next, doc, query) => {
    this._oldRoom = query._update.$set.room
    console.log('ddd', query._update.$set)
    next()
})
 
THGSchema.postUpdate((next, doc, query) => {
    query.findOne({_id: doc._id}, (err, doca) => {
        console.log('dkhalnaaa')
        if (err || this._oldRoom == doca.room) {
            return
        }

        Room.findOne({_id: this._oldRoom})
        .then((room) => {
            let index = room.nodes.indexOf(doc._id)
            console.log('remoooov', index)

            if (index >= 0) {
                room.nodes.splice(index, 1);
                room.save()
            }


        })
        Room.findOne({_id: doca.room})
            .then((room) => {
                let index = room.nodes.indexOf(doca._id)
                console.log('addd', index)
                if (index < 0) {
                    room.nodes.push(doca)
                    room.save()
                }
            })
      console.log('haaaaaaaaaa', doca.room)
    })  
    next()
})
*/

THGSchema.methods.createHistory = function createHistory () {
    let history = new THGHistory({
        node        : this._id,
        temperature : this.temperature,
        humidity    : this.humidity,
        gaz         : this.gaz,
        light       : this.light,
        type        : 'THGHistory'
    })
    history.save()
    .then((history)=> {
        this.histories.push(history)
        this.save()
    })
    .catch((err)=> {
        console.log(err)
    })
};

let THG = Node.discriminator('THG', THGSchema, {discriminatorKey: 'type'});


/** Export The THG Model **/
module.exports = THG