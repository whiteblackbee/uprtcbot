const querystring = require('querystring');
const xRequest = require('./xRequest').xRequest;
const serverHost = 'https://meeting.upyun.com';
const proxyServer = '/proxy/room';

/*
*  rooms 接口为直接代理接口
*  meetings 接口为后端接口
*/

const room = {
    async create(params, callback) {
        return xRequest(`${serverHost}/api/meetings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }, callback);
    },
    async modify(params, callback) {
        const { meetingId } = params;
        return xRequest(`${serverHost}/api/meetings/${meetingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }, callback);
    },
    async delete({ meetingId }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}`, {
            method: 'DELETE'
        }, callback);
    },
    async join({ meetingId, sec_key, type }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sec_key, type })
        }, callback);
    },
    async leave({ meetingId }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/leave`, {
            method: 'POST'
        }, callback);
    },
    async get(params, callback) {
        return xRequest(`${serverHost}/api/meetings?${querystring.stringify(params)}`, null, callback);
    },
    async getAttended(params, callback) {
        return xRequest(`${serverHost}/api/meetings/attended/?${querystring.stringify(params)}`, null, callback);
    },
    async getMine(params, callback) {
        return xRequest(`${serverHost}/api/meetings/mine/?${querystring.stringify(params)}`, null, callback);
    },
    async deletePeople(params, callback) {   //---- TODO
        return xRequest(`${serverHost}${proxyServer}/room?${querystring.stringify(params)}`, {
            method: 'DELETE',
        }, callback);
    },
    async applySecKey({ meetingId, password }, callback) {
        console.log(meetingId)
        return xRequest(`${serverHost}/api/meetings/${meetingId}/key`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        }, callback);
    },
    async setSpeaker({ meetingId, request }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/speaker`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        },callback);
    },
    async getSpeaker({ meetingId }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/speaker`, callback);
    },
    async beSpeak({ meetingId, request }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/speak`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }, callback);
    },
    async kickoff({ meetingId, request }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/kickoff`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }, callback);
    }
    
    /* 20 */
    /* /oauth2/token */
    /* /password/reset */
    /* meetings PATCH */
    /* deletePeople */
};

module.exports.room = room;
