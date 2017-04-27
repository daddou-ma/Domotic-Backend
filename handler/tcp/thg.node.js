const THG = require('../../models/thgs.model.js')
const Node = require('./node')
let mongoose    = require('mongoose')
let Schema      = mongoose.Schema


class THGNode extends Node {
	constructor(socket, board) {
		super(socket, board)

		this.thg = {}

		let self = this

		THG.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	self.thg = doc
	    })
	    .catch((err) => {
	        console.log('ma tla9itouch')
	    })

	    this.socket.on('data', (data) => {
    		let obj = JSON.parse(data.toString('utf8'))
			self.updateData(obj)
		})
	}

	updateData(data) {
		this.thg.temperature = data.temperature
		this.thg.humidity	 = data.humidity
		this.thg.gaz		 = data.gaz
		this.thg.light		 = data.light

		this.thg.save()
	}
}

module.exports = THGNode