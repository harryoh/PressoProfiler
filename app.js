
/**
 * Module dependencies.
 */

var express = require('express')
  , serial = require('./routes/serial')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var deviceName = process.argv[2];

if (!deviceName) {
	deviceName = "tty.usbserial-FTCD9MGQ";
}
io.set('log level', 1);


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
app.get('/serial/list', serial.list);

io.sockets.on('connection', function(socket) {
  setInterval(function() {
    var num = Math.floor(Math.random() * 250) + 1;
    socket.emit('SENDVALUE', num);
    console.log(num);
  }, 1000);
});


/*
var currentPort = new SerialPort('/dev/tty.usbserial-FTCD9MGQ', {
  baudRate: 115200
//  parser: serialport.parsers.readline("\r\n")
});

io.sockets.on('connection', function(socket) {
  currentPort.on('data', function(data) {
    console.log(data);
    socket.emit('SENDVALUE', data);
  });
  
  currentPort.on('error', function(error) {
    console.log('error:' + error);
    currentPort.close();
  });
});
*/


