exports.ufp = {
	"get":{
		"/service/userInfo": "./server/json/user.json"
	},
	"post": {
		"/service/updateUser": "./server/json/user.json"
	},
	"sse": {
		"url":"/service/sse"
	}
};