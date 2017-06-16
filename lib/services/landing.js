'use strict'
const xRequest = require('./xRequest').xRequest;
const serverHost = 'https://meeting.upyun.com';
const landing = {
    async login(params, callback) {
        return xRequest(`${serverHost}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }, callback);
    },

    async guestLogin(params, callback) {
        return xRequest(`${serverHost}/guest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        },callback);
    },
    async signup(params, callback) {
        return xRequest(`${serverHost}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
    },
    async captcha(params, callback) {
        return xRequest(`${serverHost}/passcode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
    },
    async getProfile(callback) {
        return xRequest(`${serverHost}/api/users/profile`);
    },
    async queryUserName({ id }, callback) {
        return xRequest(`${serverHost}/api/users/${id}`);
    }
};

module.exports.landing = landing;
