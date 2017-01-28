/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;


/** User Schema Declaration **/
let userSchema = new Schema({
    name: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, "User Name Required"]
    },
    email: {
        type        : String,
        match       : /[a-zA-Z]+$/,
        required    : [true, "User Email Required"],
        unique      : [true, "User Email Must Be Unique"],
        readonly    : true
    },
    password: {
        type        : String,
        required    : [true, "User Password Required"]
    },
    admin: {
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

/** Action Done Before Saving a User **/
userSchema.pre('save', function(next) {
    
    let currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;   
    }

    next();
});


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
  delete obj.password
  return obj
}


/** User Model **/
let User = mongoose.model('User', userSchema);


/** Export The User Model **/
module.exports = User