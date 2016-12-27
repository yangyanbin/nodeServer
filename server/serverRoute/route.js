var ufp = require("../urlFilePath/ufp").ufp;
var jsonFile = require("../jsonRead/jsonRead");

function run(app) {
	var getObj = ufp.get;
    //get请求
    for(var url in getObj) {
        app.get(url, function(req, res) {
        	jsonFile.read(req,res,getObj[url]);
        });
    }

    var postObj = ufp.post;
    for(var postUrl in postObj){
    	app.post(postUrl, function(req, res) {
            jsonFile.write(req,res,postObj[postUrl]);
        });
    }
}

exports.run = run;
