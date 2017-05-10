/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Room        = require('./rooms.model')
const scheduleHandler   = require('../handler/schedule/schedule.handler')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** Schedule Schema Declaration **/
let scheduleSchema = new Schema({
    node  : {
        type        : Schema.Types.ObjectId,
        ref         : 'Node'
    },
    user  : {
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    },
    time  : {
        type        : Date
    },
    executed : {
        type        : Boolean
    },
    type: {
        type        : String,
        required    : [true, __('schedule.fields.type.required')],
        enum        : ['AirSchedule', 'SwitchSchedule', 'CurtainSchedule']
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
scheduleSchema.plugin(mongooseAdvancedHook)

scheduleSchema.postCreate((next, doc, query) => {
    console.log('created !')
    scheduleHandler.addSchedule(doc)
    next()
})


/** Action Done Before Saving a Schedule **/
scheduleSchema.pre('save', function(next) {

    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** Schedule Delelte Method **/
scheduleSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** Schedule Restore Method **/
scheduleSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
scheduleSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** Schedule Model **/
let Schedule = mongoose.model('Schedule', scheduleSchema)

/** Export The Schedule Model **/
module.exports = Schedule