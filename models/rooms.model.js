/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;


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

// TODO : Relations

/** Action Done Before Saving a Room **/
roomSchema.pre('save', function(next) {
    
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** Room Delelte Method **/
roomSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** Room Restore Method **/
roomSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
roomSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** Room Model **/
let Room = mongoose.model('Room', roomSchema);


/** Export The Room Model **/
module.exports = Room