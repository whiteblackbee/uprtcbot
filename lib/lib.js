require('babel-polyfill');
const room = require('./services/room.js').room;
const landing = require('./services/landing.js').landing;
const lib = {
     async login(params) {
         /* TODO 此处需要找个同步框架实现 */
        res= landing.login(params);
        const { jsonResult, status } = res;
        if (status === 201) {
            const { data } = jsonResult;
            if (typeof data === 'string') {
                global.auth=data;
            }
        }

        return res;
    },
    async getAttended(params) {
        return room.getAttended(params);
    },
    async getProfile() {
        return landing.getProfile();
    },
    async applySecKey(params) {
        return room.applySecKey({params});
    },
}

module.exports.lib = lib;