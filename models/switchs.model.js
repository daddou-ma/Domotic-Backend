/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let Node        = require('./node.model')

/** Switch Schema Declaration **/
let SwitchSchema = new Schema({
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

SwitchSchema.post('save', function() {
    let history = new THGHistory({
        switch01    : this.switch01,
        switch02    : this.switch02,
        switch03    : this.switch03,
        switch04    : this.switch04,
        switch05    : this.switch05,
        switch06    : this.switch06,
        switch07    : this.switch07,
        switch08    : this.switch08,
        switch09    : this.switch09,
        switch10    : this.switch10,
        type        : 'SwitchHistory'
    })
    history.save()
})


SwitchSchema.post('update', function() {

    Switch.findOne({_id: this._conditions._id})
    .then((thg) => {
        let history = new THGHistory({
            switch01    : this.switch01,
            switch02    : this.switch02,
            switch03    : this.switch03,
            switch04    : this.switch04,
            switch05    : this.switch05,
            switch06    : this.switch06,
            switch07    : this.switch07,
            switch08    : this.switch08,
            switch09    : this.switch09,
            switch10    : this.switch10,
            type        : 'SwitchHistory'
        })
        history.save()
    })
})

let Switch = Node.discriminator('Switch', SwitchSchema, {discriminatorKey: 'type'});


/** Export The Switch Model **/
module.exports = Switch