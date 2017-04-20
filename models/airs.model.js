/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let Node        = require('./node.model')

/** Air Schema Declaration **/
let AirSchema = new Schema({
    temperature: {
        type        : Number    
    },
    level: {
        type        : Number
    },
    mode: {
        type        : Number
    },
    degre: {
        type        : Number
    }
})

AirSchema.post('save', function() {
    let history = new AirHistory({
        temperature : this.temperature,
        level       : this.level,
        mode        : this.mode,
        degre       : this.degre,
        type        : 'AirHistory'
    })
    history.save()
})


AirSchema.post('update', function() {

    Curtain.findOne({_id: this._conditions._id})
    .then((thg) => {
        let history = new CurtainHistory({
            temperature : this.temperature,
            level       : this.level,
            mode        : this.mode,
            degre       : this.degre,
            type        : 'AirHistory'
        })
        history.save()
    })
})


let Air = Node.discriminator('Air', AirSchema, {discriminatorKey : 'type'});


/** Export The Air Model **/
module.exports = Air