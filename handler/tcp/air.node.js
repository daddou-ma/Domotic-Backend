const Air = require('../../models/airs.model')
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
	    	self.air = doc
	    })
	    .catch((err) => {
	        console.log(err)
	    })
	}

	sync() {
		let self = this

		Air.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	self.air = doc
	    	self.send() 	
	    })
	    .catch((err) => {
	        console.log(err)
	    })
	}

	send() {
		this.socket.write(JSON.stringify({
			power		: this.air.power,
			degree		: this.air.degree,
			level		: this.air.level,
			mode 		: this.air.mode
		}))

		this.sendToSocket(this.air)
	}

	sendToSocket(thg) {
		global.sockets.map((socket) => {
			socket.emit(thg._id, thg)
		})
	}
}

module.exports = AirNode