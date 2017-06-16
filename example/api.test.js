'use strict'
const async = require('async');
const MyRobot = require('../lib/robot.js').Robot
const info = {'mobile':'13575774591', 'password' :'123456', meetingId : 4, meetingPasswd : '123456',
                serverAddr: 'http://10.0.3.115:8088/uprtc', clientId:10010}
let robot;
async.waterfall([(callback)=>{
    robot = new MyRobot();
    /* 注册接收数据回调 */
    robot.registerRecvDataCallback((err, reslut)=>{
        if(err){
            console.log(reslut);
        }
        else{
            console.log(reslut);
        }
        
    });

    /* 注册被动关闭回调 */
    robot.registerRecvSignalCallback((err, reslut)=>{
        if(err){
            console.log(reslut);
        }
        else{
            console.log(reslut);
        }   
    }); 
    
    /* 注册被动关闭回调 */
    robot.registerClosedCallback((err, reslut)=>{
        if(err){
            console.log(reslut);
        }
        else{
            console.log(reslut);
        }   
    });  
    //regsterCloseCallback
    callback(null, null);
},(reslut, callback)=>{
    /* 加入房间 */
    robot.joinRoom(info,callback);
},(reslut, callback)=>{
        var msg = {"uprtc":"datachannel","src_client_id":12345,"action":"test","body":(new Date().getTime()).toString()};
    /* 发消息 */
    robot.sendMessage(msg, callback);
},(reslut, callback)=>{
        /* 离开房间 */
        robot.leaveRoom(callback);
}],
(err, reslut)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log(reslut);
    }
});