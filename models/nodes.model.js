/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Room        = require('./rooms.model')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** Node Schema Declaration **/
let nodeSchema = new Schema({
    board  : {
        type        : Schema.Types.ObjectId,
        ref         : 'Board'
    },
    room  : {
        type        : Schema.Types.ObjectId,
        ref         : 'Room'
    },
    name: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, __('node.fields.name.required')]
    },
    histories : [{
        type        : Schema.Types.ObjectId,
        ref         : 'History'
    }],
    type: {
        type        : String,
        required    : [true, __('node.fields.type.required')],
        enum        : ['Air', 'THG', 'Switch', 'Curtain']
    },
    user  : {
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    },
    deleted: {
        type        : Boolean,
        default     : false
    },
    created_at: {
        type        : Date,
        default     : Date.now
    },
    updated_at: {
        type        : Date,
        default     : Date.now
    },
    deleted_at: {
        type        : Date
    }
})

/* Advanced hooks */
nodeSchema.plugin(mongooseAdvancedHook)

// TODO : Relations

/** Action Done After Saving a Node **/
nodeSchema.postCreate((next, doc, query) => {
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
})

nodeSchema.preUpdate((next, doc, query) => {
    if(!doc.room ) {
        return
    }
    
    Room.findOne({_id: doc.room})
    .then((room) => {
        let index = room.nodes.indexOf(doc._id)

        if (index < 0) {
            room.nodes.splice(index, 1);
            room.save()
        }
    })
})

nodeSchema.postUpdate((next, doc, query) => {
    if(!doc.room) {
        return
    }

    Room.findOne({_id: this.room})
    .then((room) => {
        let index = room.nodes.indexOf(doc._id)

        if (index < 0) {
            room.nodes.push(node)
            room.save()
        }
    })
})
/** Action Done After Update a Node **/
/*
nodeSchema.post('update', function() {
    console.log(this._update.$set)
    if(this._update.$set.room) {
        Room.findOne({_id : this._update.$set.room})
        .then((room) => {
            Node.findOne({_id: this._conditions._id})
            .then((node) => {
                if (room.nodes.indexOf(node._id) < 0) {
                    room.nodes.push(node)
                    room.save()
                }
            })
        })
    }
})
*/
/** Action Done Before Saving a Node **/
nodeSchema.pre('save', function(next) {

    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
})


/** Node Delelte Method **/
nodeSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
}


/** Node Restore Method **/
nodeSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
}

/** Overrinding toJSON to hide fields **/
nodeSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}

/** Node Model **/
let Node = mongoose.model('Node', nodeSchema)

/** Export The Node Model **/
module.exports = Node