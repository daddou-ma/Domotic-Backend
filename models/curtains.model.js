/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;


/** Curtain Schema Declaration **/
let curtainSchema = new Schema({
    board  : {
        type        : Schema.Types.ObjectId,
        required    : [true, __('curtain.fields.board.required')],
        unique      : [true, __('curtain.fields.board.unique')],
        ref         : 'Board'
    },
    room  : {
        type        : Schema.Types.ObjectId,
        ref         : 'Room'
    },
    name: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, __('curtain.fields.name.required')]
    },
    level: {
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

/** Action Done Before Saving a Curtain **/
curtainSchema.pre('save', function(next) {
    
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** Curtain Delelte Method **/
curtainSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** Curtain Restore Method **/
curtainSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
curtainSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** Curtain Model **/
let Curtain = mongoose.model('Curtain', curtainSchema);


/** Export The Curtain Model **/
module.exports = Curtain