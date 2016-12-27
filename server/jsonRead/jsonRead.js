var fs = require("fs");

function read(req,res,file){
	// var params = req.query.key;
	var result=JSON.parse(fs.readFileSync(file));
	res.send(result);
}

function write(req,res,file){
	// var params = req.body.key;
	var result=JSON.parse(fs.readFileSync(file));
	result.name = req.body.name;
	var resultStr = JSON.stringify(result);
	fs.writeFile(file,resultStr,function(e){
		res.send(e);
	});
}

exports.read = read;
exports.write = write;