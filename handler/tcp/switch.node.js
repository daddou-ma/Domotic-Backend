const Air = require('../../models/switchs.model.js')
const Node = require('./node')
let mongoose    = require('mongoose')
let Schema      = mongoose.Schema


class AirNode extends Node {
	constructor(socket, board) {
		super(socket, board)
		
		this.switchh 		 = {}

		let self = this

		Air.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	console.log(doc)
	    	self.switchh = doc
	    })
	    .catch((err) => {
	        console.log('ma tla9itouch')
	    })

	   	setInterval(function() {
	   		self.sync()
	   	}, 2000)
	}

	sync() {
		this.socket.write(JSON.stringify({
			switch01 : this.switch.switch01,
            switch02 : this.switch.switch02,
            switch03 : this.switch.switch03,
            switch04 : this.switch.switch04,
            switch05 : this.switch.switch05,
            switch06 : this.switch.switch06,
            switch07 : this.switch.switch07,
            switch08 : this.switch.switch08,
            switch09 : this.switch.switch09,
            switch10 : this.switch.switch10
		}))
	}
}

module.exports = AirNode