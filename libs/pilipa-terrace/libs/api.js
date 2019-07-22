'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uaaLogout = exports.fetchToken = exports.fetchUaaLoginUrl = exports.userLogout = exports.companylist = exports.bindCompany = exports.fetchSmsVerifyCode = exports.userLogin = exports.queryToObject = exports.fetchPermissionCode = exports.fetchUserInfo = exports.fetchConfig = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.hasPermission = hasPermission;

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasPermission(key, codes) {
    if (key !== undefined) {
        if (codes.indexOf(key) > -1) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}
function handelMenuData(menu, codes) {
    var res = [];
    menu.forEach(function (item) {
        item.hidden = !hasPermission(item.code, codes);
        if (item.children) {
            handelMenuData(item.children, codes);
        }
        res.push(item);
    });
    return res;
}
// 获取菜单
var fetchConfig = exports.fetchConfig = function fetchConfig() {
    return (0, _ajax2.default)("/json/config.json?v=" + new Date().getTime());
};
var fetchUserInfo = exports.fetchUserInfo = function fetchUserInfo() {
    return _promise2.default.all([(0, _http2.default)("/user/v1/api/user/info?token=" + _config2.default.token), fetchPermissionCode(), fetchConfig()]).then(function (_a) {
        var res = _a[0],
            _b = _a[1],
            res2 = _b === void 0 ? [] : _b,
            res3 = _a[2];
        var config = res3.result;
        res.codes = res2;
        _config2.default.menu = handelMenuData(config.menu, res2);
        _config2.default.logo = config.logo;
        _config2.default.user = res;
        return res;
    });
};
/** 获取权限codes */
var fetchPermissionCode = exports.fetchPermissionCode = function fetchPermissionCode() {
    return (0, _http2.default)("/user/v1/api/authority/code?token=" + _config2.default.token);
};
function getUaaInfo() {
    var url = 'https://x-id.i-counting.cn';
    var clientId = 'aZGUqxTga0BIHUW5';
    if (window.location.hostname === 'icrm.pilipa.cn') {
        url = 'https://id.i-counting.cn';
        clientId = 'rtnsJtnT5Lu3cdmN';
    } else if (window.location.hostname === 'dev2-b.i-counting.cn') {
        clientId = 'oGrsjwUwNugF4qFk';
    } else if (window.location.hostname === 'dev-b.i-counting.cn') {
        clientId = 'tGH6QkG10pBDcYe8';
    }
    return {
        url: url,
        clientId: clientId
    };
}
var queryToObject = exports.queryToObject = function queryToObject(querystring) {
    var arr = querystring.split('&');
    var obj = {};
    arr.map(function (item) {
        var res = item.split('=') || [];
        if (res[0]) {
            obj[res[0]] = res[1];
        }
    });
    return obj;
};
// 用户登陆
var userLogin = exports.userLogin = function userLogin(payload) {
    return (0, _http2.default)("/user/v1/api/login", 'POST', {
        data: payload
    });
};
// 获取短信验证码
var fetchSmsVerifyCode = exports.fetchSmsVerifyCode = function fetchSmsVerifyCode(phone) {
    return (0, _http2.default)("/user/v1/api/short/message/send", 'GET', {
        phone: phone
    });
};
// 绑定公司
var bindCompany = exports.bindCompany = function bindCompany(payload) {
    return (0, _http2.default)("/user/v1/api/user/company/bind", 'POST', payload);
};
// 获取公司列表
var companylist = exports.companylist = function companylist(token) {
    return (0, _http2.default)("/user/v1/api/user/company/list?token=" + token).then(function (res) {
        return res;
    }, function (err) {
        _config2.default.history('/logout');
        return err;
    });
};
// 退出
var userLogout = exports.userLogout = function userLogout() {
    return (0, _http2.default)("/user/v1/api/logout", 'POST');
};
// uaa获取token
var fetchUaaLoginUrl = exports.fetchUaaLoginUrl = function fetchUaaLoginUrl(path) {
    if (path === void 0) {
        path = '/v2/';
    }
    var CLIENT_ID = getUaaInfo().clientId;
    var ENV = _config2.default.env;
    var $REDIRECT = window.location.origin + "/token";
    // if (ENV === 'development') {
    //   $REDIRECT = `${window.location.origin}/#/token`
    // }
    var UAA_SERVER_URL = getUaaInfo().url;
    return "" + UAA_SERVER_URL + path + "?response_type=code&client_id=" + CLIENT_ID + "&scope=&redirect_uri=" + $REDIRECT;
};
// 获取token
var fetchToken = exports.fetchToken = function fetchToken(code) {
    var uri = window.location.origin + "/token";
    return (0, _http2.default)("/user/v1/api/oauth2/token?code=" + code + "&redirectURI=" + uri);
};
// uaa注销
var uaaLogout = exports.uaaLogout = function uaaLogout() {
    var UAA_SERVER_URL = getUaaInfo().url;
    return userLogout().always(function () {
        return _ajax2.default.get(UAA_SERVER_URL + "/ua/logout", {
            withCredentials: true
        });
    });
};