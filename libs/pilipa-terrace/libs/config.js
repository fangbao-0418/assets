'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _pilipaAnalytics = require('pilipa-analytics');

var _pilipaAnalytics2 = _interopRequireDefault(_pilipaAnalytics);

var _cookie = require('./cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _notification = require('pilipa/libs/notification');

var _notification2 = _interopRequireDefault(_notification);

var _loading = require('pilipa/libs/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pa = new _pilipaAnalytics2.default('icrm', window.navigator.userAgent, {
    env: location.hostname === 'icrm.pilipa.cn' ? 'production' : 'development',
    trigger: ['icrm.pilipa.cn', 'x-b.i-counting.cn', 'dev-b.i-counting.cn'].indexOf(location.hostname) > -1 || true // 是否发送请求
});
var config = {
    from: '4',
    token: (window.localStorage ? localStorage.getItem('token') : undefined) || _cookie2.default.get('token') || undefined,
    user: undefined,
    mark: '',
    type: undefined,
    env: 'development',
    pa: pa,
    trackPageError: function trackPageError(params) {
        var user = config.user || {};
        params = (0, _assign2.default)({
            token: config.token,
            username: user.username,
            phone: user.phone,
            companyId: user.companyId,
            companyName: user.companyName,
            userType: user.userType,
            regionCompanyType: user.regionCompanyType
        }, params);
        pa.trackEvent({
            labelId: 'page-error',
            eventId: 'error',
            params: params
        });
    },
    history: function history(url) {
        window.location.href = url;
    },
    logo: '',
    menu: [],
    localStorage: {
        setItem: function setItem(key, value) {
            var _a;
            localStorage.setItem(key, value);
            var time = new Date().getTime() + 30 * 24 * 3600 * 1000;
            _cookie2.default.set((_a = {}, _a[key] = value, _a), {
                expires: new Date(time)
            });
        },
        getItem: function getItem(key) {
            return localStorage.getItem(key) || _cookie2.default.get(key);
        }
    },
    success: function success(message) {
        _notification2.default.success({
            title: '系统提示',
            message: message
        });
    },
    error: function error(message) {
        _notification2.default.error({
            title: '系统提示',
            message: message
        });
    },
    warning: function warning(message) {
        _notification2.default.warning({
            title: '系统提示',
            message: message
        });
    },
    loading: {
        show: function show() {
            _loading2.default.show();
        },
        hide: function hide() {
            _loading2.default.hide();
        }
    }
};
exports.default = config;