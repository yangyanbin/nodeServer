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
    //post请求
    for(var postUrl in postObj){
    	app.post(postUrl, function(req, res) {
            jsonFile.write(req,res,postObj[postUrl]);
        });
    }

    var sseObj = ufp.sse;
    //server-sent Events服务器推送事件
    app.get(sseObj.url,function(req,res){
        res.set('Content-Type', 'text/event-stream');
        res.set('Cache-Control', 'no-cache');
        //*换行符必不可少，通过换行符来断定一条消息的结束，负责浏览器会收不到事件
        res.send("data:"+Date.now()+"\n\n");
    });
}

exports.run = run;
