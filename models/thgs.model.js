/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;


/** THG Schema Declaration **/
let thgSchema = new Schema({
    board  : {
        type        : Schema.Types.ObjectId,
        required    : [true, __('thg.fields.board.required')],
        unique      : [true, __('thg.fields.board.unique')],
        ref         : 'Board'
    },
    room  : {
        type        : Schema.Types.ObjectId,
        ref         : 'Room'
    },
    name: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, __('thg.fields.name.required')]
    },
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

/** Action Done Before Saving a THG **/
thgSchema.pre('save', function(next) {
    
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** THG Delelte Method **/
thgSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** THG Restore Method **/
thgSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
thgSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** THG Model **/
let THG = mongoose.model('THG', thgSchema);


/** Export The THG Model **/
module.exports = THG