/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;


/** Air Schema Declaration **/
let airSchema = new Schema({
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
        required    : [true, __('air.fields.name.required')]
    },
    temperature: {
        type        : Number    
    },
    level: {
        type        : Number
    },
    mode: {
        type        : Number
    },
    degre: {
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

/** Action Done Before Saving a Air **/
airSchema.pre('save', function(next) {
    
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** Air Delelte Method **/
airSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** Air Restore Method **/
airSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
airSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** Air Model **/
let Air = mongoose.model('Air', airSchema);


/** Export The Air Model **/
module.exports = Air