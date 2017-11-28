var express = require("express");
var path = require("path");
var route = require("./serverRoute/route");
var bodyParser = require('body-parser');

var app = express();
var filePath = path.resolve(__dirname, "../web");

// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json  
app.use(bodyParser.json());

route.run(app);
app.use("/", express.static(filePath));
app.listen(100);

console.log("Server has started prot(100)");
