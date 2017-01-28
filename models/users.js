/** Includes **/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


/** User Schema Declaration **/
let userSchema = new Schema({
    name: {
        type: String,
        match: /[a-zA-Z]+$/,
        required: true
    },
    email: {
        type: String,
        match: /[a-zA-Z]+$/,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default : Date.now
    },
    updated_at: {
        type: Date,
        default : Date.now
    },
    deleted_at: {
        type: Date
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

/** User Model **/
let User = mongoose.model('User', userSchema);

/** Export The User Model **/
module.exports = User