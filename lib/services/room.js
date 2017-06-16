'use strict'
const querystring = require('querystring');
const xRequest = require('./xRequest').xRequest;
const serverHost = 'https://meeting.upyun.com';
const proxyServer = '/proxy/room';

/*
*  rooms 接口为直接代理接口
*  meetings 接口为后端接口
*/

const room = {
    create(params, callback) {
        return xRequest(`${serverHost}/api/meetings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }, callback);
    },
    modify(params, callback) {
        const { meetingId } = params;
        return xRequest(`${serverHost}/api/meetings/${meetingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }, callback);
    },
    delete({ meetingId }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}`, {
            method: 'DELETE'
        }, callback);
    },
    join({ meetingId, sec_key, type }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sec_key, type })
        }, callback);
    },
    leave({ meetingId }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/leave`, {
            method: 'POST'
        }, callback);
    },
    get(params, callback) {
        return xRequest(`${serverHost}/api/meetings?${querystring.stringify(params)}`, null, callback);
    },
    getAttended(params, callback) {
        return xRequest(`${serverHost}/api/meetings/attended/?${querystring.stringify(params)}`, null, callback);
    },
    getMine(params, callback) {
        return xRequest(`${serverHost}/api/meetings/mine/?${querystring.stringify(params)}`, null, callback);
    },
    deletePeople(params, callback) {   //---- TODO
        return xRequest(`${serverHost}${proxyServer}/room?${querystring.stringify(params)}`, {
            method: 'DELETE',
        }, callback);
    },
    applySecKey({ meetingId, password }, callback) {
        console.log(meetingId)
        return xRequest(`${serverHost}/api/meetings/${meetingId}/key`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        }, callback);
    },
    setSpeaker({ meetingId, request }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/speaker`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        },callback);
    },
    getSpeaker({ meetingId }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/speaker`, callback);
    },
    beSpeak({ meetingId, request }, callback) {
        return xRequest(`${serverHost}/api/meetings/${meetingId}/speak`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }, callback);
    },
    kickoff({ meetingId, request }, callback) {
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
