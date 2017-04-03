/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;


/** Board Schema Declaration **/
let boardSchema = new Schema({
    _air: {
        type        : Number,
        ref         : 'Air'
    },
    serial_number: {
        type        : String,
        required    : [true, __('board.fields.serial_number.required')],
        unique      : [true, __('board.fields.serial_number.unique')]
    },
    ipv4: {
        type        : String,
        required    : [true, __('board.fields.ipv4required')]
    },
    type: {
        type        : String,
        enum        : ['air', 'curtain', 'swistch', 'thg', 'remote'],
        required    : [true, __('board.fields.type.required')]
    },
    plugged: {
        type        : Boolean,
        default     : false
    },
    enabled: {
        type        : Boolean,
        default     : true
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

/** Action Done Before Saving a Board **/
boardSchema.pre('save', function(next) {
    
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** Board Delelte Method **/
boardSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** Board Restore Method **/
boardSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
boardSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** Board Model **/
let Board = mongoose.model('Board', boardSchema);


/** Relationships **/

/** Export The Board Model **/
module.exports = Board