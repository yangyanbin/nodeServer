var express = require("express");
var path = require("path");
var route = require("./serverRoute/route");
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
var filePath = path.resolve(__dirname, "../web");

var io = require('socket.io').listen(server);
app.use("/", express.static(filePath));
route.run(io);
server.listen(100);

console.log("Server has started prot(100)");
