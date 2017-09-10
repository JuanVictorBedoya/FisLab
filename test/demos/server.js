
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

var http = require('http');
var path = require('path');
const fs = require('fs');

var express = require('express');

/****************************************************************************************/

var testApp = express();
var server = http.createServer(testApp);

testApp.use(express.static(path.join(__dirname, '../../dist/assets')));

testApp.use(['/', '/text-input'], function(req, res){
	fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function(err, data) {
		res.send(data);
	});
});

server.listen(8080, function(){
	console.log('INFORMACIÓN: El servidor está listo y escuchando.');
});
