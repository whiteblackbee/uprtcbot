const async = require('async');
const lib = require('./lib.js').lib;
const UprtcPlugin = require("../src/uprtc_broadcast");
/* 构造对象，需要房间信息，并且实现推 datachannel，拉所有房间内的流
   同时创建与 uprtc 的长连接，监听信令*/
function Robot(info){
    /* 私有变量 */
    //var url="host: 'meeting.upyun.com'"; //私有变量
    this.authToken = "";
    //this.meetingId = 0;
    this.room ={};
    this.room.recvFunc = null;
    this.room.closeFunc = null;
    this.room.uprtc = {};
    this.room.uprtc.publisher = null;
    this.room.uprtc.listeners={};
    //this.room.uprtc.clientId;
    /* 私有函数,考虑封装成一个模块 */
    this.createUprtc = function({clientRole, serverAddr, clientId}, callback){
        broadcast = new UprtcPlugin({
            clientRole: clientRole,
            httpServer: serverAddr,
            clientId: clientId,
        });
        {

        }
        
        console.log(serverAddr, clientId);
        const RECVDATA = "recvdata";
        const CLOSED = "closed";


        broadcast.on(RECVDATA,function(msg){
            console.log("uprtc_main: recv data: ",msg);
            {
                /* TODO 此处需要拼接 result 结果 */
            }
            this.room.recvFunc(err, result);
        }.bind(broadcast));

        broadcast.on(CLOSED,function(msg){
            console.log("uprtc had closed ",msg);
            callback(err, result);
            // exit
        }.bind(broadcast));

         broadcast.start();
        return broadcast;
    }    
    
    this.destroyUprtc = function(broadcast){
        broadcast.stop();
    }
    /* 特权函数 */
    this.membername =  function (){

    }
}
/* 公有变量 */
Robot.prototype.broadcast;

/*
Robot.prototype.broadcast = new UprtcPlugin({
      clientRole: role,
      serverAddr: serverAddr,
      clientId: clientId,
  });
  broadcast.start();
*/
/* 公有函数*/
Robot.prototype.method = function(){
 
}

Robot.prototype.joinRoom = function(params,callback){
    const {mobile, password} = params;
    const {meetingId, meetingPasswd} = params;
    let sec_key = 0;
    async.waterfall([(callback)=>{
        lib.login({mobile, password},callback);
        /*
        },(result, callback)=>{

            lib.getAttended({ order: 'asc', page: 1},callback);
            console.log(JSON.stringify(result));
        },(result, callback)=>{
            lib.getAttended({ order: 'desc', page: 1},callback);
            console.log(JSON.stringify(result));
        */
        },(result, callback)=>{
            const { jsonResult, status } = result;
            if (status === 201) {
                const { data } = jsonResult;
                if (typeof data === 'string') {
                    /* 保存 token */
                    this.authToken = data;
                 }
             }
             callback(null, result)
        },(result, callback)=>{
             
            lib.applySecKey({meetingId, meetingPasswd},callback);
            console.log(JSON.stringify(result));
        },(result, callback)=>{
            console.log("1111111111111", JSON.stringify(result));
            sce_key  = 0;
            const {serverAddr, clientId} = params;
            const clientRole = 1;
            console.log(serverAddr, clientId);
            this.room.uprtc.publisher = this.createUprtc({clientRole, serverAddr, clientId}, callback);
            callback(null, result);
        },(result, callback)=>{
            let tpye = 1;
            lib.join({meetingId, sec_key, tpye},callback);
            console.log("############################", JSON.stringify(result));
        
        }],
        (err, result)=>{
            if (err) {
                console.error(err);
                return callback(err);
            }else
            {
                console.log(result);
                return callback(null, result);
            }
        })
}

Robot.prototype.sendmessage = function(msg,callback){
    txt = JSON.stringify(msg);
    this.room.uprtc.publisher.SendData(txt);
    console.log("sendmessage");

    /* TODO 无返回值如何处理 */
    callback(null,null)

}

Robot.prototype.regsterRecvMsgCallback = function(callback){
this.room.recvFunc = callback;
}

Robot.prototype.regsterCloseCallback = function(callback){
this.room.closeFunc = callback;
}

Robot.prototype.regsterNotifyCallback = function(callback){
this.room.recvFunc = callback;
}

/* 离开房间, 销毁与 uprtc 的对象 */
Robot.prototype.leavRoom = function(){

}

/* 静态变量 */
Robot.value

/* 静态函数 */
Robot.method = function(){
  
}

/* 私有函数 */

/* 加入 */
function join (){
    console.log("join")
}
/* 建立链接 */
function uprtcSetup (){
    console.log("uprtcSetup")   
}

/* 销毁与 uprtc 的对象 */
function uprtcTearDown (){
    console.log("uprtcTearDown")
}

/* 离开 */
function leave (){
    console.log("leave")
}

/* 可封装接口 */
function SendData() {
   
}

module.exports.Robot = Robot;