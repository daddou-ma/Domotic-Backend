/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let Node        = require('./node.model')

/** Switch Schema Declaration **/
let Switch = Node.discriminator('Switch', new Schema({
    switch01: {
        type        : Boolean
    },
    switch02: {
        type        : Boolean
    },
    switch03: {
        type        : Boolean
    },
    switch04: {
        type        : Boolean
    },
    switch05: {
        type        : Boolean
    },
    switch06: {
        type        : Boolean
    },
    switch07: {
        type        : Boolean
    },
    switch08: {
        type        : Boolean
    },
    switch09: {
        type        : Boolean
    },
    switch10: {
        type        : Boolean
    }
}), {discriminatorKey: 'type'});


/** Export The Switch Model **/
module.exports = Switch