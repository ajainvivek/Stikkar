var express = require('express');
var port = Number(process.env.PORT || 3200);
var server = express(); // better instead
server.configure(function(){
  server.use(express.static(__dirname + '/build'));
});

server.listen(port);