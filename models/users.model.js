/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')


/** User Schema Declaration **/
let userSchema = new Schema({
    name: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, __('user.fields.name.required')]
    },
    email: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, __('user.fields.email.required')],
        unique      : [true, __('user.fields.email.unique')],
        readonly    : true
    },
    password: {
        type        : String,
        required    : [true, __('user.fields.password.required')]
    },
    admin: {
        type        : Boolean,
        default     : false
    },
    token: {
        type        : String,
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
userSchema.plugin(mongooseAdvancedHook)

/** Action Done Before Saving a User **/
userSchema.preUpdate(function(next, doc, query) {
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next()
})


/** User Delelte Method **/
userSchema.methods.delete = function (callback) {
    let currentDate = new Date();
    
    this.deleted = true;
    this.deleted_at = currentDate;
    return this.save(callback);
};


/** User Restore Method **/
userSchema.methods.restore = function (callback) {
    this.deleted = false;
    this.deleted_at = undefined;
    return this.save(callback);
};


/** Overrinding toJSON to hide fields **/
userSchema.methods.toJSON = function() {
    var obj = this.toObject()
    //delete obj.password
    //delete obj.token

    return obj
}


/** User Connect Method **/
userSchema.methods.connect = function (token) {
    this.token = token;
    return this.save();
};


/** User Disconnect Method **/
userSchema.methods.disconnect = function () {
    this.token = undefined;
    return this.save();
};


/** User Model **/
let User = mongoose.model('User', userSchema);


/** Export The User Model **/
module.exports = User