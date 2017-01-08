var fs = require('fs');
var gridList = [];

var redirectToIndex = function(req, res){
	res.writeHead(303,{Location:'index.html'});
	res.statusCode = 303;
	res.end();
}

var saveGrid = function(req, res){
	var data = '';
	req.on('data',function(chunk){
		data +=  chunk;
	})

	req.on('end',function(){
		var list = gridList.filter(function(grid){
			return JSON.stringify(grid) == data;
		});

		if(list.length ==0)
			gridList.push(JSON.parse(data));
		res.end();
	})
}

var loadPrevious = function(req, res){
	res.statusCode = 200;
	res.end(JSON.stringify(gridList));
}

var renderFile = function(req, res){
	var filePath = './'+req.url;
	fs.readFile(filePath, function(error, content){
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
		'/save':saveGrid,
		'/load':loadPrevious};


var controller = function(req, res){
	if(urls[req.url])
		urls[req.url](req, res);
	else
		renderFile(req, res);
};


module.exports = controller;