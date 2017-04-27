/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Room        = require('./rooms.model')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** History Schema Declaration **/
let historySchema = new Schema({
    node  : {
        type        : Schema.Types.ObjectId,
        ref         : 'Node'
    },
    type: {
        type        : String,
        required    : [true, __('history.fields.type.required')],
        enum        : ['AirHistory', 'THGHistory', 'SwitchHistory', 'CurtainHistory']
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
});

/* Advanced hooks */
historySchema.plugin(mongooseAdvancedHook)

/** Action Done After Saving a History **/
historySchema.post('save', function() {
    if(this.room) {
        Room.findOne({_id: this.room})
        .then((room) => {
            room.historys.push(this)
            room.save()
        })
    }
})

/** Action Done After Update a History **/
historySchema.post('update', function() {
    if(this._update.$set.room) {
        Room.findOne({_id : this._update.$set.room})
        .then((room) => {
            History.findOne({_id: this._conditions._id})
            .then((history) => {
                room.historys.push(history)
                room.save()
            })
        })
    }
})

/** Action Done Before Saving a History **/
historySchema.pre('save', function(next) {

    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** History Delelte Method **/
historySchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** History Restore Method **/
historySchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
historySchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** History Model **/
let History = mongoose.model('History', historySchema)

/** Export The History Model **/
module.exports = History