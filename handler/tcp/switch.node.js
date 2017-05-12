const Switch = require('../../models/switchs.model.js')
const Node = require('./node')
let mongoose    = require('mongoose')
let Schema      = mongoose.Schema


class SwitchNode extends Node {
	constructor(socket, board) {
		super(socket, board)
		
		this.switchh 		 = {}

		let self = this

		Switch.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	console.log(doc)
	    	self.switchh = doc
	    })
	    .catch((err) => {
	        console.log('ma tla9itouch')
	    })
	}

	sync() {
		let self = this

		Switch.findOne({board : this.board._id+""})
	    .then((doc) => {
	    	self.switchh = doc
	    	self.send() 	
	    })
	    .catch((err) => {
	        console.log('ma tla9itouch')
	    })
	}

	send() {
		this.socket.write(JSON.stringify({
			switch01 : this.switchh.switch01,
            switch02 : this.switchh.switch02,
            switch03 : this.switchh.switch03,
            switch04 : this.switchh.switch04,
            switch05 : this.switchh.switch05,
            switch06 : this.switchh.switch06,
            switch07 : this.switchh.switch07,
            switch08 : this.switchh.switch08,
            switch09 : this.switchh.switch09,
            switch10 : this.switchh.switch10
		}))
	}
}

module.exports = SwitchNode