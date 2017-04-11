/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
const Air   = require('./airs.model')
const Curtain = require('./curtains.model')
const Switch   = require('./switchs.model')
const THG   = require('./thgs.model')

/** Board Schema Declaration **/
let boardSchema = new Schema({
    node  : {
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
        required    : [true, __('board.fields.ipv4.required')]
    },
    type: {
        type        : String,
        enum        : ['air', 'curtain', 'switch', 'thg', 'remote'],
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

    this.wasNew = this.isNew;

    next();
});


boardSchema.post('update', function() {
    console.log('has been initialized from the db',this);
});
/** Action Done After Saving a Board **/
boardSchema.post('save', function() {
    
    if (!this.wasNew) {
        return
    }    

    let nodeId = null

    switch(this.type) {
        case 'air':
            let air = new Air({
                "board" : this._id,
                "name"  : 'default name',
                "level" : 1,
                "mode"  : 2,
                "type"  : "Air",
                "temperature" : 3
            })

            air.save()
            nodeId = air._id
        break;
        case 'curtain':
            let curtain = new Curtain({
                "board" : this._id,
                "name"  : 'default name',
                "type"  : "Curtain",
                "level" : 1
            })
            curtain.save()
            nodeId = curtain._id
        break;
        case 'switch':
            let switchh = new Switch({
                "board" : this._id,
                "name"  : 'default name',
                "type"  : "Switch",
                "switch01" : true,
                "switch02" : false,
                "switch03" : true,
                "switch04" : false,
                "switch05" : true,
                "switch06" : false,
                "switch07" : true,
                "switch08" : false,
                "switch09" : true,
                "switch10" : false
            })
            switchh.save()
            .then((doc) => {
                console.log(doc)
            })
            .catch((err) => {
                console.log(err)
            })
            nodeId = switchh._id
        break;
        case 'thg':
            let thg = new THG({
                "board" : this._id,
                "name"  : 'default name',
                "type"  : "THG",
                "level" : 1,
                "mode"  : 2,
                "degre" : 3
            })
            thg.save()
            nodeId = thg._id
        break;
    }

    this.air = nodeId
    this.save()
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