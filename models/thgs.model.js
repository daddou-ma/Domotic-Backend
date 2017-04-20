/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let Node        = require('./node.model')
let THGHistory  = require('./thg-histories.model')


/** THG Schema Declaration **/
let THGSchema = new Schema({
    temperature: {
        type        : Number    
    },
    humidity: {
        type        : Number
    },
    gaz: {
        type        : Number
    },
    light: {
        type        : Number
    }
})

THGSchema.post('save', function() {
    let history = new THGHistory({
        temperature : this.temperature,
        humidity    : this.humidity,
        gaz         : this.gaz,
        light       : this.light,
        type        : 'THGHistory'
    })
    history.save()
})


THGSchema.post('update', function() {

    THG.findOne({_id: this._conditions._id})
    .then((thg) => {
        let history = new THGHistory({
            temperature : thg.temperature,
            humidity    : thg.humidity,
            gaz         : thg.gaz,
            light       : thg.light,
            type        : 'THGHistory'
        })
        history.save()
    })
})

let THG = Node.discriminator('THG', THGSchema, {discriminatorKey: 'type'});


/** Export The THG Model **/
module.exports = THG