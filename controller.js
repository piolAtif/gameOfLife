var fs = require('fs');

var redirectToIndex = function(req, res){
	res.writeHead(303,{Location:'index.html'});
	res.statusCode = 303;
	res.end();
}

var saveCoordinate = function(){

}

var loadPrevious = function(){

}

var renderFile = function(req, res){
	var filePath = './'+req.url;
	fs.readFile(filePath, function(error, content){
	console.log('file path: ',filePath);
		if(error){
			res.statusCode = 404;
			res.end('File not found');
		}
		else{
			res.statusCode = 200;
			res.end(content, 'utf-8');
		}
	});
};



var urls = {'/': redirectToIndex,
		'/save':saveCoordinate,
		'/load':loadPrevious}


var controller = function(req, res){
	console.log(req.url);
	if(urls[req.url])
		urls[req.url](req, res);
	else
		renderFile(req, res);
};


module.exports = controller;