const net = require('net')
const Board	= require('../../models/boards.model')
const Node 	= require('./node')
const THGNode 	= require('./thg.node')
const AirNode 	= require('./air.node')
const CurtainNode 	= require('./curtain.node')
const SwitchNode 	= require('./switch.node')

let nodes = {}

let server = net.createServer(function(socket) {
	let ip 				= socket.remoteAddress
	let port 			= socket.remotePort
	let board 			= undefined

	socket.write('Salammm dfsdg \r\n')
	console.log('conenctt')

	let connect = function(data){
		//console.log(data.toString('utf8'))
		obj = JSON.parse(data.toString('utf8'))

		console.log('h------------------------------------------------')
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

	socket.on('end', ()=> {
		console.log('Diconneta')
	})
})

server.listen(5000, '192.168.1.2')