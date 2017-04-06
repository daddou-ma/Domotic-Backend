/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;


/** Switch Schema Declaration **/
let switchSchema = new Schema({
    board  : {
        type        : Schema.Types.ObjectId,
        required    : [true, __('switch.fields.board.required')],
        unique      : [true, __('switch.fields.board.unique')],
        ref         : 'Board'
    },
    room  : {
        type        : Schema.Types.ObjectId,
        ref         : 'Room'
    },
    name: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, __('switch.fields.name.required')]
    },
    switch01: {
        type        : Boolean
    },
    switch02: {
        type        : Boolean
    },
    switch03: {
        type        : Boolean
    },
    switch04: {
        type        : Boolean
    },
    switch05: {
        type        : Boolean
    },
    switch06: {
        type        : Boolean
    },
    switch07: {
        type        : Boolean
    },
    switch08: {
        type        : Boolean
    },
    switch09: {
        type        : Boolean
    },
    switch10: {
        type        : Boolean
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

/** Action Done Before Saving a Switch **/
switchSchema.pre('save', function(next) {
    
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** Switch Delelte Method **/
switchSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** Switch Restore Method **/
switchSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
switchSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** Switch Model **/
let Switch = mongoose.model('Switch', switchSchema);


/** Export The Switch Model **/
module.exports = Switch