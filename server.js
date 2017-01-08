var http = require('http');
var controller = require('./controller.js');

var server = http.createServer(controller);

server.listen(8000);