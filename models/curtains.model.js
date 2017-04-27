/** Includes **/
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const Node        = require('./nodes.model')
const Board       = require('./boards.model')
const CurtainHistory = require('./histories/curtain-histories.model')

const mongooseAdvancedHook  = require('mongoose-advanced-hooks')


/** Curtain Schema Declaration **/
let CurtainSchema = new Schema({
    level: {
        type        : Number    
    }
})

/* Advanced hooks */
CurtainSchema.plugin(mongooseAdvancedHook)

CurtainSchema.postUpdate(function(next, doc, query) {
    let history = new CurtainHistory({
        level       : doc.level,
        user        : this._user,
        type        : 'SwitchHistory'
    })
    history.save()
    .then((doc)=> {
        console.log(doc)
    })
    .catch((doc)=> {
        console.log(doc)
    })
    next()
})

CurtainSchema.postUpdate(function(next, doc, query) {
    Board.findOne({_id: doc.board})
    .then((doc)=> {
        console.log(doc)
        if ( tcp_nodes[doc.serial_number]) {
            tcp_nodes[doc.serial_number].sync()
        }
    })
    .catch((err)=> {
        console.log(err)
    })
    
    next()
})

let Curtain = Node.discriminator('Curtain', CurtainSchema, {discriminatorKey: 'type'});


/** Export The Curtain Model **/
module.exports = Curtain