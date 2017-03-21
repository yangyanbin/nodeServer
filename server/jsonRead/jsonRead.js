var fs = require("fs");

function read(req,res,file){
	// var params = req.query.key;
	var result=JSON.parse(fs.readFileSync(file,"utf8"));
	res.send(result);
}

function write(req,res,file){
	// var params = req.body.key;
	var result=JSON.parse(fs.readFileSync(file,"utf8"));
	result.name = req.body.name;
	var resultStr = JSON.stringify(result);
	fs.writeFile(file,resultStr,function(e){
		if(!e){
			res.send("success");
		}
	});
}

exports.read = read;
exports.write = write;