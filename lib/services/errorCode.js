module.exports = {
    // 401
    'ILLEGAL_PASSCODE': '验证码无效',
    'LOGON_FAILED': '手机号或密码错误',
    'INVALID_CREDENTIALS': '未登陆或登录已过期',
    'INVALID_PASSWORD': '房间密码错误',

    // 403
    'REQUIRE_MEETING_OWNER': '必须是会议创建者才有权限执行此操作',
    'CONTACT_OWNER': '请联系房间主持人',
    'INVALID_SEC_KEY': '无效的 sec_key',
    'AUDIENCE_NOT_ALLOWED': '该房间不允许以观众角色加入',

    // 404
    'USER_NOT_FOUND': '该用户不存在',
    'MEETING_NOT_FOUND': '该房间不存在',
    'NOT_FOUND': '请求不存在(defaults)',

    // 409
    'USER_EXIST': '手机号已经被注册',

    // 422
    'ILLEGAL_MOBILE': '手机号格式错误',
    'ILLEGAL_PASSWORD': '账号密码不符合要求',
    'ILLEGAL_MEETING_NAME': '会议名不符合要求',
    'ILLEGAL_USER_TYPE': '用户类型错误',

    // 500
    'PASSCODE_SERVICE_ERROR': '验证码服务异常',
    'SMS_SYSTEM_ERROR': '短信服务异常',
    'SYSTEM_ERROR': 'Upmeeting 系统异常(defaults)'
}
