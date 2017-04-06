/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
const Air   = require('./airs.model')
const Curtain = require('./curtains.model')
const Switch   = require('./switchs.model')
const THG   = require('./thgs.model')

/** Board Schema Declaration **/
let boardSchema = new Schema({
    air  : {
        type        : Schema.Types.ObjectId,
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

/** Action Done After Saving a Board **/
boardSchema.post('save', function() {
    
    switch(this.type) {
        case 'air':
            let air = new Air({
                "board" : this._id,
                //"room"  : air.room,
                "name"  : 'default name',
                "level" : 1,
                "mode"  : 2,
                "degre" : 3
            })
            air.save()
        break;
        case 'curtain':
            let curtain = new Curtain({
                "board" : this._id,
                //"room"  : air.room,
                "name"  : 'default name',
                "level" : 1
            })
            curtain.save()
        break;
        case 'switch':
            let switchh = new Switch({
                "board" : this._id,
                //"room"  : air.room,
                "name"  : 'default name',
                "switch01" : true,
                "switch02" : false,
                "switch03" : true 
            })
            switchh.save()
        break;
        case 'thg':
            let thg = new THG({
                "board" : this._id,
                //"room"  : air.room,
                "name"  : 'default name',
                "level" : 1,
                "mode"  : 2,
                "degre" : 3
            })
            thg.save()
        break;
    }
});

/** Board Plug Method **/
boardSchema.methods.plug = function(callback) {
    
    this.plugged = true;
    return this.save(callback);
};

/** Board Enable Method **/
boardSchema.methods.unplug = function(callback) {
    
    this.plugged = false;
    return this.save(callback);
};

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