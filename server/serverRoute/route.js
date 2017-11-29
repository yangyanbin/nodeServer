var ufp = require("../urlFilePath/ufp").ufp;
function run(io) {

    var sseObj = ufp.ws;
    var users = [];
    var socketIdMap = {};
    io.on('connection', function(socket) {
        //接收并处理客户端发送的事件
        socket.on('login', function(data) {
            //将消息输出到控制台
            console.log(data+" 登录");
            if(users.indexOf(data)<0){
                users.push(data);
                //将用户信息保存在此次连接的socket对象中
                socket.userName = data;
                //将当前socket的对应缓存，以应用于私聊
                socketIdMap[data] = socket.id;

                socket.emit("loginSuccess",data);
                //在connection回调中socket单对单，只和通信的客户socket通信，通过io.socket来向所有连接的客户通信
                io.sockets.emit("system","logon",data,users);
            }else{
                socket.emit("loginFail",data);
            }
        });

        socket.on('SEND', function(from,data) {
            //会广播到除自己以外的所有人
            socket.broadcast.emit('ACCEPT',from,data);
        });
        socket.on('SINGLESEND', function(from,to,data) {
            socket.broadcast.to(socketIdMap[to]).broadcast.emit('ACCEPT',from,data);
        });

        socket.on('disconnect', function() {
            if(socket.userName||socket.userName===0){
                users.splice(users.indexOf(socket.userName),1);
                socketIdMap[socket.userName] = undefined;
                socket.broadcast.emit('system',"logout",socket.userName,users);
            }
        });
    });
}

exports.run = run;
