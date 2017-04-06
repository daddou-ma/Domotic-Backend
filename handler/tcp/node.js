class Node {
	constructor(socket, board) {
		this.socket = socket
		this.board 	= board
		this.type	= board.type

		/*board.plug()


		this.socket.on('end', function () {
		    board.unplug()
		})*/
	}

}

module.exports = Node