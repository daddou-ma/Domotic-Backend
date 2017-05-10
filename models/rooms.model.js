/** Includes **/
const mongoose    = require('mongoose')
const Schema      = mongoose.Schema


const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** Room Schema Declaration **/
let roomSchema = new Schema({
    name: {
        type        : String,
        required    : [true, __('room.fields.name.required')]
    },
    color: {
        type        : String,
        default     : '#FEF8F9'
    },
    nodes : [{
        type: Schema.Types.ObjectId,
        ref: 'Node'
    }],
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
roomSchema.plugin(mongooseAdvancedHook)

/** Action Done Before Saving a Room **/
roomSchema.postUpdate(function(next, doc, query) {
    let currentDate = new Date()
    this.updated_at = currentDate

    if (!this.created_at) {
        this.created_at = currentDate
    }

    next();
})


/** Room Delelte Method **/
roomSchema.methods.delete = function(callback) {
    let currentDate = new Date()
    
    this.deleted = true
    this.deleted_at = currentDate
    return this.save(callback)
}


/** Room Restore Method **/
roomSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined
    return this.save(callback)
};

/** Overrinding toJSON to hide fields **/
roomSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** Room Model **/
let Room = mongoose.model('Room', roomSchema)


/** Export The Room Model **/
module.exports = Room