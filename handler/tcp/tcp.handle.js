const net = require('net')
const Board	= require('../../models/boards.model')
const Node 	= require('./node')
const THGNode 	= require('./thg.node')


let nodes = {}

let server = net.createServer(function(socket) {
	let ip 				= socket.remoteAddress
	let port 			= socket.remotePort
	let board 			= undefined

	socket.write('Salammm dfsdg \r\n')
	socket.pipe(socket)
	console.log('conenctt')
    socket.setKeepAlive(true);

	setInterval(() => {
		
		//socket.write('{"air" : "15","degree" : "16" ,"level" : "17"}' + '\r')
	}, 2000)

	let connect = function(data){
		obj = JSON.parse(data.toString('utf8'))
		//console.log(data.toString('utf8'))
		if(!obj.serial_number) {
			console.log('Unknown !')
			return
		}
		Board.findOne({serial_number : obj.serial_number})
	    .then((doc) => {
	     
	    	nodes[obj.serial_number] = new THGNode(socket, doc)
	    	console.log('Unknown !22')
	    	//socket.removeListener('data', connect)
	    	nodes[obj.serial_number].setData({
	    		temperature: 5,
	    		humidity:6,
	    		gaz:7,
	    		light:8
	    	})
	    })
	    .catch((err) => {
	    	console.log('Unknown !')
	        let board = new Board({
	        	serial_number	: obj.serial_number,
	        	type			: obj.type,
	        	ipv4			: ip
	        })

	        board.save()
	        .then((board)=> {
	        	nodes[obj.serial_number] = new THGNode(socket, board)
		    	//socket.removeListener('data', connect)
		    	nodes[obj.serial_number].setData({
		    		temperature: 5,
		    		humidity:6,
		    		gaz:7,
		    		light:8
	    		})
	        })
	    })
	    return
	}

	socket.on('data', connect)
	socket.on('end', ()=> {
		console.log('Diconneta')
	})
})

server.listen(5000, '192.168.1.2')