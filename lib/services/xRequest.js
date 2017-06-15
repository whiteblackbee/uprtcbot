const request = require('request');
const errorCodeDict = require('./errorCode.js');

function xRequest(url, options, callback) {
    let opts = options;
    let authorization = global.auth|| '';
    authorization = authorization ? `JWT ${authorization}` : '';

    if(opts){
            opts.url = url;
            opts.headers.Authorization =  authorization;
    }
    else{
        opts = {}
        opts.url = url;
        opts.headers = {Authorization: authorization};
    }
    //console.log(opts);
    request(opts, (err, response, body) => {
    if (err) return callback(err);
    
    /*TODO 此处返回方式待定 */
    if(response.statusCode === 401 || response.statusCode === 404 || response.statusCode ===202){
        let result = {};
        result.status = response.statusCode;
        result.jsonResult = JSON.parse(body);
        return callback(err, result);
    }
    //if (response.statusCode !== 200) return callback(new UPMeetingError('SYSTEM_ERROR', 'RoomKeeper 服务异常'));

    if (typeof body !== 'string') return callback(err, body);
    try {
      let result = {};
      result.status = response.statusCode;
      result.jsonResult = JSON.parse(body);
      return callback(err, result);
    }
    catch (e) {
        console.error('Invalid JSON from roomkeeper', body);
        let statusCode = response.statusCode;
        statusCode = parseInt(statusCode, 10);
        if (statusCode) {
            /* TODO */
            /*
            if (!response.headers.get('Content-Type') || response.headers.get('Content-Type').toLowerCase().indexOf('application/json') < 0) {
                return callback(err, { status: statusCode });
            }
            */
            const { error_code: errorCode } = response;
            const errorMsg = errorCodeDict[errorCode] || '';
            let result = {};
            result.status = statusCode;
            if (errorCode && errorMsg) {
                result.jsonResult = { errorCode, errorMsg};
            }
            return callback(err, result);
        }
        else {
            /*TODO*/
            //return Promise.reject();
        }
        //return callback(new UPMeetingError('SYSTEM_ERROR', 'RoomKeeper 服务异常'));
        }
    });
}

module.exports.xRequest = xRequest;
