class Node {
	constructor(socket, board) {
		this.socket = socket
		this.board 	= board
		this.type	= board.type

		board.plug()

		let disconnect = () => {
			console.log(`NODE [${socket.remoteAddress} | ${board.type}] : DISCONNECTED from [${board.serial_number}]`)
			this.socket.destroy()
			delete global.tcp_nodes[board.serial_number]
			board.unplug()
		}

		this.socket.on('end'	, disconnect)
		this.socket.on('close'	, disconnect)
		this.socket.on('error'	, disconnect)
		this.socket.on('timeout', disconnect)
	}

}

module.exports = Node