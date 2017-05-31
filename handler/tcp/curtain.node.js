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
	        console.log(err)
	    })
	}

	sync() {
		this.socket.write(JSON.stringify({
			level		: this.curtain.level
		}))
	}
	sync() {
		let self = this

		Curtain.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	self.curtain = doc
	    	self.send() 	
	    })
	    .catch((err) => {
	        console.log(err)
	    })
	}

	send() {
		this.socket.write(JSON.stringify({
			level		: this.curtain.level
		}))

		this.sendToSocket(this.curtain)
	}

	sendToSocket(thg) {
		global.sockets.map((socket) => {
			socket.emit(thg._id, thg)
		})
	}

}

module.exports = CurtainNode