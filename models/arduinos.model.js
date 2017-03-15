/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;


/** Arduino Schema Declaration **/
let arduinoSchema = new Schema({
    serial_number: {
        type        : String,
        required    : [true, __('arduino.fields.identificator.required')],
        unique      : [true, __('user.fields.email.unique')]
    },
    name: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, __('arduino.fields.name.required')]
    },
    serial_port: {
        type        : String,
        required    : [true, __('arduino.fields.serial_port.required')]
    },
    plugged: {
        type        : Boolean,
        default     : false
    },
    enabled: {
        type        : Boolean,
        default     : false
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

/** Action Done Before Saving a Arduino **/
arduinoSchema.pre('save', function(next) {
    
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


/** Arduino Delelte Method **/
arduinoSchema.methods.delete = function(callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** Arduino Restore Method **/
arduinoSchema.methods.restore = function(callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};

/** Overrinding toJSON to hide fields **/
arduinoSchema.methods.toJSON = function() {
    var obj = this.toObject()
    return obj
}


/** Arduino Model **/
let Arduino = mongoose.model('Arduino', arduinoSchema);


/** Export The Arduino Model **/
module.exports = Arduino