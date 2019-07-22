'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

var _ajax = require('../ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajaxCount = 0;
/** 跳过loading */
/// <reference path='../global-plugin.d.ts' />
function isPass(options) {
    var url = options.url,
        type = options.type;
    var index = _filters2.default.loading.findIndex(function (test) {
        var match = test.match(/^(post|get)::/);
        var matchType = type;
        if (match) {
            matchType = match[1];
            test = test.substr(match[0].length);
        }
        var pattern = new RegExp(test);
        if (pattern.test(url) && type.toUpperCase() === matchType.toUpperCase()) {
            return true;
        }
    });
    return index > -1 ? true : false;
}
/** ajax请求前拦截 */
_ajax2.default.interceptors.request.use(function (x, ev, settings) {
    if (!isPass(settings)) {
        ajaxCount += 1;
        if (ajaxCount > 0 && !document.querySelector('.pilipa-loading')) {
            _config2.default.loading.show();
        }
    }
});
/** ajax响应后拦截 */
_ajax2.default.interceptors.response.use(function (response) {
    /** 是否跳过loading */
    if (!isPass(response.config)) {
        ajaxCount -= 1;
        if (ajaxCount <= 0) {
            _config2.default.loading.hide();
        }
    }
    var result = response.result,
        status = response.status;
    /** 401退出 */
    if (status === 401 || status === 200 && result.status === 401) {
        if (_config2.default.env === 'production') {
            window.location.href = '/logout';
        } else {
            _config2.default.history('/logout');
        }
        return response;
    }
    if (status !== 200 || status === 200 && result.status !== 200) {
        var pass_1 = true;
        var url_1 = response.config.url;
        /** 过滤错误提示 */
        _filters2.default.error.map(function (pattern) {
            if (new RegExp(pattern).test(url_1)) {
                pass_1 = false;
            }
        });
        /** 错误提示 */
        if (result.errors instanceof Array && pass_1) {
            var message_1 = [];
            result.errors.forEach(function (item) {
                message_1.push(item.message);
            });
            _config2.default.warning(message_1.join('，'));
        } else if (result.status && result.message) {
            _config2.default.warning(result.message);
            response.status = result.status;
        }
    }
    if (response.type === 'timeout') {
        _config2.default.error('系统请求超时！');
    }
    return response;
});
var http = function http(url, type, config) {
    if (type === void 0) {
        type = 'GET';
    }
    url = /^https?/.test(url) ? url : '/sys' + url;
    var finalConfig = {};
    if (typeof type !== 'string') {
        config = null;
        config = type;
        type = config.type || 'GET';
    }
    if (config instanceof Array) {
        finalConfig.data = config;
    } else {
        finalConfig = config || {};
    }
    finalConfig.headers = (0, _assign2.default)({}, {
        token: _config2.default.token,
        from: '4'
    }, finalConfig.headers);
    return (0, _ajax2.default)(url, type, finalConfig).then(function (response) {
        var result = response.result;
        return result;
    }, function (err) {
        return _promise2.default.reject(err);
    });
};
exports.default = http;