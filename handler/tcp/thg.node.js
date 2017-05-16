const THG = require('../../models/thgs.model.js')
const Node = require('./node')
const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const historyInterval = 1000 * 60 * 1; // 1min

class THGNode extends Node {
	constructor(socket, board) {
		super(socket, board)

		this.thg = {}

		let self = this

		THG.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	self.thg = doc

	    	self.socket.on('data', (data) => {
	    		let obj = JSON.parse(data.toString('utf8'))
				self.updateData(obj)
			})

			setInterval(self.createHistory.bind(self), historyInterval)
	    })
	    .catch((err) => {
	        console.log('ma tla9itouch')
	    })
	}

	updateData(data) {
		this.thg.temperature = data.temperature
		this.thg.humidity	 = data.humidity
		this.thg.gaz		 = data.gaz
		this.thg.light		 = data.light

		this.thg.save()
	}

	createHistory() {
		this.thg.createHistory()
	}
}

module.exports = THGNode