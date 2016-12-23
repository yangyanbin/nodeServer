var express = require("express");
var path = require("path");

var app = express();
var filePath = path.resolve(__dirname, "../web");
app.use("/", express.static(filePath));
app.listen(100);
console.log("Server has started");
