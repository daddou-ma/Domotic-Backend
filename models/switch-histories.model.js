/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const History        = require('./history.model')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')

/** SwitchHistory Schema Declaration **/
let SwitchHistorySchema = new Schema({
    user  : {
        type        : Schema.Types.ObjectId,
        ref         : 'User'
    },
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

/* Advanced hooks */
SwitchHistorySchema.plugin(mongooseAdvancedHook)

let SwitchHistory = History.discriminator('SwitchHistory', SwitchHistorySchema, {discriminatorKey : 'type'});


/** Export The Switch Model **/
module.exports = SwitchHistory