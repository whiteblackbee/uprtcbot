const querystring = require('querystring');
const xFetch = require('./xFetch').xFetch;
const serverHost = 'https://meeting.upyun.com';
const proxyServer = '/proxy/room';

/*
*  rooms 接口为直接代理接口
*  meetings 接口为后端接口
*/

const room = {
    async create(params) {
        return xFetch(`${serverHost}/api/meetings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
    },
    async modify(params) {
        const { meetingId } = params;
        return xFetch(`${serverHost}/api/meetings/${meetingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
    },
    async delete({ meetingId }) {
        return xFetch(`${serverHost}/api/meetings/${meetingId}`, {
            method: 'DELETE'
        });
    },
    async join({ meetingId, sec_key, type }) {
        return xFetch(`${serverHost}/api/meetings/${meetingId}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sec_key, type })
        });
    },
    async leave({ meetingId }) {
        return xFetch(`${serverHost}/api/meetings/${meetingId}/leave`, {
            method: 'POST'
        });
    },
    async get(params) {
        return xFetch(`${serverHost}/api/meetings?${querystring.stringify(params)}`);
    },
    async getAttended(params) {
        return xFetch(`${serverHost}/api/meetings/attended/?${querystring.stringify(params)}`);
    },
    async getMine(params) {
        return xFetch(`${serverHost}/api/meetings/mine/?${querystring.stringify(params)}`);
    },
    async deletePeople(params) {   //---- TODO
        return xFetch(`${serverHost}${proxyServer}/room?${querystring.stringify(params)}`, {
            method: 'DELETE',
        });
    },
    async applySecKey({ meetingId, password }) {
        console.log(meetingId)
        return xFetch(`${serverHost}/api/meetings/${meetingId}/key`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
    },
    async setSpeaker({ meetingId, request }) {
        return xFetch(`${serverHost}/api/meetings/${meetingId}/speaker`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
    },
    async getSpeaker({ meetingId }) {
        return xFetch(`${serverHost}/api/meetings/${meetingId}/speaker`);
    },
    async beSpeak({ meetingId, request }) {
        return xFetch(`${serverHost}/api/meetings/${meetingId}/speak`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
    },
    async kickoff({ meetingId, request }) {
        return xFetch(`${serverHost}/api/meetings/${meetingId}/kickoff`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
    }
    
    /* 20 */
    /* /oauth2/token */
    /* /password/reset */
    /* meetings PATCH */
    /* deletePeople */
};

module.exports.room = room;
