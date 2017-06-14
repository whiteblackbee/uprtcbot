const xFetch = require('./xFetch').xFetch;
const serverHost = 'https://meeting.upyun.com';
const landing = {
    async login(params) {
        return xFetch(`${serverHost}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
    },
    async guestLogin(params) {
        return xFetch(`${serverHost}/guest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
    },
    async signup(params) {
        return xFetch(`${serverHost}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
    },
    async captcha(params) {
        return xFetch(`${serverHost}/passcode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
    },
    async getProfile() {
        return xFetch(`${serverHost}/api/users/profile`);
    },
    async queryUserName({ id }) {
        return xFetch(`${serverHost}/api/users/${id}`);
    }
};

module.exports.landing = landing;
