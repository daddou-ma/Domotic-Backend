/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let History        = require('./history.model')

/** SwitchHistory Schema Declaration **/
let SwitchHistorySchema = new Schema({
    switch01: {
        type        : Boolean,
        default     : false
    },
    switch02: {
        type        : Boolean,
        default     : false
    },
    switch03: {
        type        : Boolean,
        default     : false
    },
    switch04: {
        type        : Boolean,
        default     : false
    },
    switch05: {
        type        : Boolean,
        default     : false
    },
    switch06: {
        type        : Boolean,
        default     : false
    },
    switch07: {
        type        : Boolean,
        default     : false
    },
    switch08: {
        type        : Boolean,
        default     : false
    },
    switch09: {
        type        : Boolean,
        default     : false
    },
    switch10: {
        type        : Boolean,
        default     : false
    }
})

let SwitchHistory = History.discriminator('SwitchHistory', SwitchHistorySchema, {discriminatorKey : 'type'});


/** Export The Switch Model **/
module.exports = SwitchHistory