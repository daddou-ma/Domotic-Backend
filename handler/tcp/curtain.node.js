const Curtain = require('../../models/curtains.model.js')
const Node = require('./node')
let mongoose    = require('mongoose')
let Schema      = mongoose.Schema


class CurtainNode extends Node {
	constructor(socket, board) {
		super(socket, board)
		
		this.curtain 		 = {}

		let self = this

		Curtain.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	console.log(doc)
	    	self.curtain = doc
	    })
	    .catch((err) => {
	        console.log('ma tla9itouch')
	    })

	   	setInterval(function() {
	   		this.socket.write(JSON.stringify({
				level		: 2
			}))
	   	}, 2000)
	}

	sync() {
		this.socket.write(JSON.stringify({
			level		: this.curtain.level
		}))
	}
}

module.exports = CurtainNode