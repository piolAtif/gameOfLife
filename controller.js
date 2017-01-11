var fs = require('fs');
var gridList = [];
var https = require('https');
var url = require('url');

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
	var filePath = './public/'+req.url;
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

var getUserProfile = function(user_id, token, globalRes){
	var url = 'https://graph.facebook.com/'+user_id+'?field=id,name'
		+'&access_token='+token;

	var getUserProfileDetails = function(facebookRes){
		var details = '';
		facebookRes.on('data',function(chunk){
			details += chunk;
		})

		facebookRes.on('end',function(){
			globalRes.end(details);
		})
	}

	var facebookReq = https.request(url, getUserProfileDetails);
	facebookReq.end();
}

var getUserId = function(token, globalRes){
	var usedIdUrl = 'https://graph.facebook.com/debug_token?'
		+'input_token='+token+'&access_token='+token;

	var getUserDetails = function(facebookRes){
		var user_detail='';
		
		facebookRes.on('data',function(chunk){
			user_detail += chunk;
		})

		facebookRes.on('end',function(){
			var user_obj = JSON.parse(user_detail);
			var user_id = user_obj['data']['user_id'];

			getUserProfile(user_id, token, globalRes);
		})
	}

	var facebookReq = https.request(usedIdUrl, getUserDetails);
	facebookReq.end();
}

var getAccessToken = function(req, globalRes){
	var query = url.parse(req.url).query;

	var accessTokeUrl = 'https://graph.facebook.com/v2.8/oauth/access_token?'
		+'client_id='+process.env.client_id
		+'&client_secret='+process.env.client_secret
		+'&redirect_uri=http://127.0.0.1:8000/accessToken'
		+'&'+query;


	var accessToken = function(facebookRes){
		var content = '';
		facebookRes.on('data',function(chunk){
			content+= chunk;
		})

		facebookRes.on('end',function(){
			var response_obj= JSON.parse(content);
			var respond_token = response_obj['access_token'];
			getUserId(respond_token, globalRes);
		})
	};

	var facebookReq = https.request(accessTokeUrl, accessToken);
	facebookReq.end();
}

var authenticUser = function(req, res){
	res.writeHead(303, {Location:'https://www.facebook.com/v2.8/dialog/oauth?'
			+'client_id='+process.env.client_id
			+'&redirect_uri=http://127.0.0.1:8000/accessToken'});

	res.end();
}

var urls = {'/': redirectToIndex,
		'/save':saveGrid,
		'/load':loadPrevious,
		'/facebookAuth':authenticUser,
		'/accessToken':getAccessToken};


var controller = function(req, res){
	var parsedUrl = url.parse(req.url).pathname;
	if(urls[parsedUrl])
		urls[parsedUrl](req, res);
	else
		renderFile(req, res);
};


module.exports = controller;