const net = require('net')
const Board	= require('../../models/boards.model')
const Node 	= require('./node')
const THGNode 	= require('./thg.node')
const AirNode 	= require('./air.node')
const CurtainNode 	= require('./curtain.node')
const SwitchNode 	= require('./switch.node')

let nodes = {}

global.tcp_nodes = nodes

let server = net.createServer(function(socket) {
	let ip 				= socket.remoteAddress
	let port 			= socket.remotePort
	let board 			= undefined

	let connect = function(data){
		obj = JSON.parse(data.toString('utf8'))

		console.log(`NODE [${socket.remoteAddress} | ${obj.type}] : CONNECTED to [${obj.serial_number}]`)

		if(!obj.serial_number) {
			return
		}

		Board.findOne({serial_number : obj.serial_number})
	    .then((doc) => {
	    	if (nodes[obj.serial_number]) {
	    		return
	    	}
	    	switch(obj.type) {
	    		case 'air':
		            nodes[obj.serial_number] = new AirNode(socket, doc)
		        break;
		        case 'curtain':
		            nodes[obj.serial_number] = new CurtainNode(socket, doc)
		        break;
		        case 'switch':
		            nodes[obj.serial_number] = new SwitchNode(socket, doc)
		        break;
		        case 'thg':
		            nodes[obj.serial_number] = new THGNode(socket, doc)
		        break;
			}
	    	
	    })
	    .catch((err) => {
	        let board = new Board({
	        	serial_number	: obj.serial_number,
	        	type			: obj.type,
	        	ipv4			: ip
	        })

	        board.save()
	        .then((board)=> {
	        	nodes[obj.serial_number] = new THGNode(socket, board)		    	
	        })
	    })

	    socket.removeListener('data', connect)

	    return
	}

	socket.on('data', connect)
})

//server.listen(5000, 'local.domotique.dz')
server.listen(5000, '10.1.66.43')