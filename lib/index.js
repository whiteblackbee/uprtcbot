const async = require('async');
const lib = require('./lib.js').lib;
/* 构造对象，需要房间信息，并且实现推 datachannel，拉所有房间内的流
   同时创建与 uprtc 的长连接，监听信令*/
function Robot(info){
    /* 私有变量 */
    var url="host: 'meeting.upyun.com'"; //私有变量

    /* 私有函数 */
    var init = function(params){
     
    }    
  
    /* 特权函数 */
    this.membername =  function (){

    }

    /* 业务构造 */
    join();
    uprtcSetup()
}
/* 公有变量 */
Robot.prototype.broadcast = 0;
/* 公有函数*/
Robot.prototype.method = function(){
 
}

Robot.prototype.init = function(params){
    const {mobile, password} = params;
    async.waterfall([(callback)=>{
        lib.login({mobile, password},callback);
    },(result, callback)=>{
        lib.getAttended({ order: 'asc', page: 1},callback);
        console.log(result);
    },(result, callback)=>{
        lib.getAttended({ order: 'desc', page: 1},callback);
        console.log(result);
    },(result, callback)=>{
        const meetingId = 4;lib.applySecKey({meetingId},callback);
        console.log(result);
    }],
    (err, result)=>{
            if (err) {
                console.error(err);
            }else
            {
                console.log(result);
            }
        })
}

Robot.prototype.sendmessage = function(){
    console.log("sendmessage")    
}

Robot.prototype.recvmessage = function(){
 
}

/* 销毁与 uprtc 的对象 */
Robot.prototype.uprtcdown = function(){
 
}

/* 销毁与 uprtc 的对象 */
Robot.prototype.destroy = function(){
    uprtcTearDown();
    leave();
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

module.exports.Robot = Robot;