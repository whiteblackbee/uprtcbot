const room = require('./services/room.js').room;
const landing = require('./services/landing.js').landing;
const async = require('async');
const lib = {
     login(params,callback) {
        async.waterfall([(callback)=>{
            /* 1.登录请求 */
            landing.login(params,callback);
        },(result, callback)=>{
            const { jsonResult, status } = result;
            if (status === 201) {
                const { data } = jsonResult;
                if (typeof data === 'string') {
                    /* 1.保存 token */
                    global.auth = data;
                 }
             }

             callback(null, result);
         }],
         (err, result)=>{
            if (err) {
                callback(res);
            }else
            {
                callback(null, result);
            }
        })
    },
    getAttended(params, callback) {
        async.waterfall([(callback)=>{
            room.getAttended(params, callback);
        }, (result, callback)=>{
            callback(null, result);
        }],
         (err, result)=>{
            if (err) {
                callback(res);
            }else
            {
                callback(null, result);
            }
        })
    },
    getProfile(callback) {
        async.waterfall([(callback)=>{
            landing.getProfile(callback);
        }],
         (err, result)=>{
            if (err) {
                callback(result);
            }else
            {
                callback(null, result);
            }
        })
    },

    applySecKey(params, callback) {
        async.waterfall([(callback)=>{
            room.applySecKey(params,callback);
        }],
         (err, result)=>{
            if (err) {
                callback(result);
            }else
            {
                callback(null, result);
            }
        })
    },
}

module.exports.lib = lib;