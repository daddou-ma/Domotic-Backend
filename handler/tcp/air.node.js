const Air = require('../../models/airs.model.js')
const Node = require('./node')
let mongoose    = require('mongoose')
let Schema      = mongoose.Schema


class AirNode extends Node {
	constructor(socket, board) {
		super(socket, board)
		
		this.air 		 = {}

		let self = this

		Air.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	console.log(doc)
	    	self.air = doc
	    })
	    .catch((err) => {
	        console.log('ma tla9itouch')
	    })

	   	setInterval(function() {
	   		this.socket.write(JSON.stringify({
				degree		: 20,
				level		: 2,
				mode 		: 3
			}))
	   	}, 2000)
	}

	sync() {
		this.socket.write(JSON.stringify({
			degree		: this.air.degree,
			level		: this.air.level,
			mode 		: this.air.mode
		}))
	}
}

module.exports = AirNode