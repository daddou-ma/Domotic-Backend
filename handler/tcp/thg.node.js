const THG = require('../../models/thgs.model.js')
const Node = require('./node')
let mongoose    = require('mongoose')
let Schema      = mongoose.Schema


class THGNode extends Node {
	constructor(socket, board) {
		super(socket, board)

		this.degre 		 = 0
		this.humidity	 = 0
		this.gaz		 = 0
		this.light		 = 0

		this.thg 		 = {}

		let self = this

		THG.findOne({board :'58e50e5259dbf257887ab44a'})
	    .then((doc) => {
	    	console.log(doc)
	    	self.thg = doc

	    	self.socket.on('data', (data) => {
	    		console.log(data.toString('utf8'))
				self.setData(JSON.parse(data.toString('utf8')))
			})
	    })
	    .catch((err) => {
	        console.log('ma tla9itouch')
	    })
	}

	setData(data) {
		this.degre		 = data.temperature
		this.humidity	 = data.humidity
		this.gaz		 = data.gaz
		this.light		 = 10

		this.save()
	}

	save() {
		this.thg.degre		 = this.degre
		this.thg.humidity	 = this.humidity
		this.thg.gaz		 = this.gaz
		this.thg.light		 = this.light

		this.thg.save()
	}
}

module.exports = THGNode