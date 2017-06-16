/*! 
 * \file   robot.js
 * \author  <binbin.wan@upai.com>
 * \copyright
 * \brief  robot api
 * \details
 *  对外实现 robot 的 api 接口
    api list
    1. Robot()                              // 机器人构造函数 
    2. joinRoom(params, callback)           // 机器人加入房间
    3. sendMessage(msg,callback)            // 发送消息
    4. leaveRoom(callback)                  // 离开房间
    5. registerRecvDataCallback(callback)   // 设置数据接收回调函数
    6. registerRecvSignalCallback(callback) // 设置信令接收回调函数
    7. registerClosedCallback(callback)     // 设置关闭接收回调函数
    8. sendSignal(signal, callback)         // 发送信令 */
'use strict'
const async = require('async');
const lib = require('./services/app.js').lib;
const UprtcPlugin = require("../src/uprtc_broadcast");
module.exports.Robot = Robot;
/* 构造对象，需要房间信息，并且实现推 datachannel，拉所有房间内的流
   同时创建与 uprtc 的长连接，监听信令*/
function Robot(info){
    /* 私有变量 */
    this.authToken = "";
    this.room ={};
    this.room.recvCb = null;
    this.room.recvSignalCb = null;
    this.room.closeCb = null;
    this.room.uprtc = {};
    this.room.uprtc.publisher = null;
    this.room.uprtc.listeners={};
    //this.room.uprtc.clientId;
    /* 私有函数,考虑封装成一个模块 */
    this.createUprtc = function({clientRole, serverAddr, clientId, sec_Key}){
        let broadcast = new UprtcPlugin({
            clientRole: clientRole,
            httpServer: serverAddr,
            clientId: clientId,
            secKey: sec_Key,
        });
        broadcast.registerRecvDataCallback(function callback(result){
            this.room.recvCb(null, result);
            console.log("uprtc_main : recv datachannle ",result);
        })
        broadcast.registerRecvSignalCallback(function callback(result){
            this.room.recvSignalCb(null, result);
            console.log("uprtc_main : recv signal ",result);
        })
        broadcast.registerClosedCallback(function callback(result){
            this.room.closeCb(null, result);
            console.log("uprtc_main : recv closed ",result);
        })

        broadcast.start();
        return broadcast;
    }    
}
/* 公有变量 */

/* 公有函数*/
Robot.prototype.joinRoom = function(params,callback){
    let _this = this;
    async.auto({
        login: function (callback) {
            const {mobile, password} = params;
            lib.login({mobile, password},callback);
        },
        setToken: ['login', function (callback, result) {
            const { jsonResult, status } = result.login;
            if (status === 201) {
                const { data } = jsonResult;
                if (typeof data === 'string') {
                    /* 保存 token */
                    this.authToken = data;
                }
                callback(null, null);
            }else if (jsonResult['errorCode']) {
                const { errorCode, errorMsg } = jsonResult;
                console.error(errorMsg);
                callback({ errorCode, errorMsg });
            }
        }],
        applySecKey: ['setToken', function (callback, result) {
            const {meetingId, meetingPasswd} = params;
            lib.applySecKey({meetingId, password: meetingPasswd},callback);
        }],
        createUprtc: ['applySecKey', function (callback, result) {
            const { jsonResult, status } = result.applySecKey
            if (status === 200) {
                const { jsonResult, status } = result.applySecKey
                const { data } = jsonResult;
                const sec_key = data.sec_key;
                const clientRole = 1;
                const {serverAddr, clientId} = params;
                _this.room.uprtc.publisher = _this.createUprtc({clientRole, serverAddr, clientId, sec_key});
                callback(null, null);
            } else if (jsonResul['errorCode']) {
                const { errorCode, errorMsg } = jsonResult;
                console.error(errorMsg);
                callback({errorCode, errorMsg});
            }
        }],
        join: ['applySecKey','createUprtc', function (callback, result) {
            const { jsonResult, status } = result.applySecKey
            if (status === 200) {
                let type = "pub";
                const {meetingId} = params;
                const { data } = jsonResult;
                const sec_key = data.sec_key;
                lib.join({meetingId, sec_key, type},callback);
            } else if (jsonResul['errorCode']) {
            const { errorCode, errorMsg } = jsonResult;
            console.error(errorMsg);
            callback({errorCode, errorMsg});
        }
        }], 
        subListener: ['join', function (callback, result) {
            const { jsonResult, status } = result.join
            if (status === 200) {
                const {
                    data: {
                        owner,
                        room_name,
                        attendees,
                        audiences,
                        name: meetingName,
                        speaker
                    }
                } = jsonResult;
                callback(null, null);
            } else if (jsonResult['errorCode']) {
                const { errorCode, errorMsg } = jsonResult;
                console.error(errorMsg);
                callback({ errorCode, errorMsg });
            }
        }], 
    },(err, result)=>{
        if (err) {
            console.error(err);
            return callback(err);
        }else
        {
            console.log(JSON.stringify(result));
            return callback(null, 1);
        }
    });            
}

Robot.prototype.sendMessage = function(msg,callback){
    this.room.uprtc.publisher.sendData(JSON.stringify(msg));
    console.log("sendmessage");
    callback(null,null)

}

/* 离开房间, 销毁与 uprtc 的对象 */
Robot.prototype.leaveRoom = function(callback){
   return callback(null,null);
}

Robot.prototype.registerRecvDataCallback = function(callback){
    this.room.recvCb = callback;
    return;
}

Robot.prototype.registerRecvSignalCallback = function(callback){
    this.room.recvSignalCb = callback;
    return;
}

Robot.prototype.registerClosedCallback = function(callback){
    this.room.closeCb = callback;
    return;
}

/* 发送信令 */
Robot.prototype.sendSignal = function(signal, callback){
    return callback(null, null);
}