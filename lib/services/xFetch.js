const fetch = require('isomorphic-fetch');
//const cookie = require('js-cookie');
const errorCodeDict = require('./errorCode.js');
const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
    if (res.status === 401) {
        return Promise.reject(res);
    }
    return res;
}

function check404(res) {
    if (res.status === 404) {
        return Promise.reject(res);
    }
    return res;
}

function check204(res) {
    if (res.status === 204) {
        return Promise.reject(res);
    }
    return res;
}

function jsonParse(res) {
    return res.json().then(jsonResult => {
        //let result = { ...res, jsonResult, status: res.status }; //---- TODO
        
        let result = res;
        result.jsonResult = jsonResult;
        result.status = res.status;
        //let result = _extends({}, res, { jsonResult: jsonResult, status: res.status });
        if (jsonResult['error_code']) {
            const { error_code: errorCode } = jsonResult;
            const errorMsg = errorCodeDict[errorCode] || '';
            //---- TODO
            result = {
                //...result,
                result,
                jsonResult: {
                    //...result.jsonResult,
                    jsonResult,
                    errorCode,
                    errorMsg
                }
            };
            
            /*
            result = _extends({}, result, {
                jsonResult: _extends({}, result.jsonResult, {
                    errorCode: errorCode,
                    errorMsg: errorMsg
                })
            });
            */
        }
        
        console.log(jsonResult);
        return result;
    });
}

function errorHandler(res) {
    const { status, statusText } = res;
    const statusCode = parseInt(status, 10);

    if (statusCode) {
        if (!res.headers.get('Content-Type') || res.headers.get('Content-Type').toLowerCase().indexOf('application/json') < 0) {
            return { status: statusCode };
        }
        return res.json().then(jsonResult => {
            const { error_code: errorCode } = jsonResult;
            /* TODO 此处是前端的处理，node 不需要 */  //---- TODO
            // if (status === 401 && errorCode === 'INVALID_CREDENTIALS') {
            //     const { pathname } = location;
            //     if (pathname !== '/signin') {
            //         if (/^\/room\/.*/.test(pathname)) {
            //             const meetingId = pathname.split('\/')[2];
            //             let joinType = getQueryVariable('jointype');
            //             joinType = joinType ? joinType : 'pub';
            //             const redirectUrl = `/signin?meetingid=${meetingId}&jointype=${joinType}`;

            //             window.router
            //                 ? window.router.push(redirectUrl)
            //                 : location.href = redirectUrl;
            //         }
            //         else {
            //             const redirectUrl = '/signin';
            //             window.router
            //                 ? window.router.push(redirectUrl)
            //                 : location.href = redirectUrl;
            //         }
            //     }
            // }
            const errorMsg = errorCodeDict[errorCode] || '';
            let result = { status: statusCode };
            if (errorCode && errorMsg) {
                //result = { ...result, jsonResult: { errorCode, errorMsg } };  //---- TODO
               //result =  _extends({}, result, { jsonResult:{ errorCode, errorMsg } });
               result = {result, jsonResult: { errorCode, errorMsg } };
            }
            console.log(result);
            return result;
        });
    }
    else {
        return Promise.reject();
    }
}

function xFetch(url, options, timeout) {
    //const opts = { ...options };  //---- TODO
    let opts = options;
    let authorization = global.auth|| ''; /*cookie.get('authorization') || '';*/
    authorization = authorization ? `JWT ${authorization}` : '';
    /*   //---- TODO
    opts.headers = {   
        ...opts.headers,
        Authorization: authorization,
    };
    */

    if(opts){
         opts.headers.Authorization =  authorization;
    }
    else{
        opts = {}
        opts.headers = {Authorization: authorization};
    }


   
    console.log(url);
    console.log(opts);
    return fetch(url, opts)
        .then(check401)
        .then(check404)
        .then(check204)
        .then(jsonParse)
        .catch(errorHandler);
}
module.exports.xFetch = xFetch;
//module.exports.auth = auth;
