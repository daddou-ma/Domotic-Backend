/** Includes **/
let mongoose    = require('mongoose');
let Schema      = mongoose.Schema;
let Node        = require('./node.model')


/** Curtain Schema Declaration **/
let CurtainSchema = new Schema({
    level: {
        type        : Number    
    }
})

CurtainSchema.post('save', function() {
    let history = new CurtainHistory({
        level		: this.level,
        type        : 'SwitchHistory'
    })
    history.save()
})


CurtainSchema.post('update', function() {

    Curtain.findOne({_id: this._conditions._id})
    .then((thg) => {
        let history = new CurtainHistory({
            level		: this.level,
        	type        : 'SwitchHistory'
        })
        history.save()
    })
})

let Curtain = Node.discriminator('Curtain', CurtainSchema, {discriminatorKey: 'type'});


/** Export The Curtain Model **/
module.exports = Curtain