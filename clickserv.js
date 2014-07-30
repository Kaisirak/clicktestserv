
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    port = 1337,
    url  = 'http://localhost:' + port + '/';
	
var clickedtimes = 0;
	if(process.env.IP)
	{
		url = 'http://' + process.env.IP + ':' + process.env.PORT;
	}
	server.listen(port);
	console.log("Express server listening on port " + port);
	console.log(url);
	app.get('/', function (req, res)
	{
		res.sendfile(__dirname + '/index.html');
	});
	console.log('*** SERVER STARTED ***');

io.sockets.on("connection", function (socket)
{
	console.log("GOT A CONNECTION");
    socket.on("message", function (data)
	{
		console.log(data);
		var recv_data = data.split(',');

		if (recv_data[0] == 'y')
		{
			clickedtimes++;
			socket.broadcast.emit("updc", '' + clickedtimes);
		}

    });
	socket.on('disconnect', function ()
	{
		console.log("DESTROYED");
	});
});