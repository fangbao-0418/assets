'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _gVerify = require('../utils/gVerify');

var _gVerify2 = _interopRequireDefault(_gVerify);

var _api = require('../api');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _cookie = require('../cookie');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();

var Main = /** @class */function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            type: 1,
            error: {},
            message: '获取验证码'
        };
        _this.values = {};
        _this.num = 0;
        return _this;
    }
    Main.prototype.componentDidMount = function () {
        this.verify = new _gVerify2.default('verify');
    };
    Main.prototype.changeType = function (type) {
        this.setState({
            type: type
        });
    };
    Main.prototype.toLogin = function () {
        var _this = this;
        var error = this.state.error;
        if (!/^1[3456789][0-9]\d{8}$/.test(this.values.phone)) {
            error.phone = '手机号码格式不正确';
        }
        if (!this.verify.validate(this.values['verify-code'] || '')) {
            error['verify-code'] = '图片验证码不匹配';
        }
        if (!this.values['sms-verify-code']) {
            error['sms-verify-code'] = '短信验证码不能为空';
        }
        this.setState({
            error: error
        });
        if (error.phone || error['verify-code'] || error['sms-verify-code']) {
            return;
        }
        (0, _api.userLogin)({
            phone: this.values.phone,
            validCode: this.values['sms-verify-code']
        }).then(function (res) {
            _config2.default.token = res.token;
            localStorage.setItem('token', res.token);
            _cookie2.default.set({
                token: res.token
            }, {
                expires: 24 * 3600 * 30 * 1000
            });
            if (_this.props.onOk) {
                _this.props.onOk();
            }
        }, function (err) {
            error.phone = err.responseJSON.errors[0].message || '登陆失败';
            _this.setState({
                error: error
            });
        });
    };
    Main.prototype.handleChange = function (field, e) {
        var error = this.state.error;
        error[field] = undefined;
        if (field === 'sms-verify-code') {
            error.phone = undefined;
        }
        this.setState({
            error: error
        });
        var target = e.target;
        var value = target.value;
        this.values[field] = value;
    };
    Main.prototype.getSmsVerifyCode = function () {
        var _this = this;
        var error = this.state.error;
        if (!/^1[3456789][0-9]\d{8}$/.test(this.values.phone)) {
            error.phone = '手机号码格式不正确';
            this.setState({
                error: error
            });
            return;
        }
        if (this.num === 0) {
            (0, _api.fetchSmsVerifyCode)(this.values.phone);
            this.num = 59;
            this.setState({
                message: '获取验证码'
            });
        } else {
            return;
        }
        this.setState({
            message: this.num + 's\u91CD\u65B0\u53D1\u9001'
        });
        var t = setInterval(function () {
            if (_this.num <= 1) {
                _this.num = 0;
                _this.setState({
                    message: '获取验证码'
                });
                clearInterval(t);
            } else {
                _this.num--;
                _this.setState({
                    message: _this.num + 's\u91CD\u65B0\u53D1\u9001'
                });
            }
        }, 1000);
    };
    Main.prototype.render = function () {
        var _a = this.state,
            error = _a.error,
            message = _a.message;
        return _react2.default.createElement(
            'div',
            { className: 'box' },
            _react2.default.createElement(
                'div',
                { className: 'title' },
                '\u567C\u91CC\u556A\u7BA1\u7406\u7CFB\u7EDF'
            ),
            _react2.default.createElement(
                'div',
                { className: 'sms', ref: 'sms' },
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        { className: (0, _classnames2.default)({ 'has-error': !!error.phone }) },
                        _react2.default.createElement(
                            'div',
                            { className: 'phone' },
                            _react2.default.createElement('input', { maxLength: 11, placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7', onChange: this.handleChange.bind(this, 'phone') })
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'error' },
                            error.phone
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: (0, _classnames2.default)({ 'has-error': !!error['verify-code'] }) },
                        _react2.default.createElement(
                            'div',
                            { className: 'verify-text' },
                            _react2.default.createElement('input', { maxLength: 4, onChange: this.handleChange.bind(this, 'verify-code'), placeholder: '\u8BF7\u8F93\u5165\u56FE\u6587\u9A8C\u8BC1\u7801' })
                        ),
                        _react2.default.createElement('div', { id: 'verify', className: 'verify-image', style: { width: '110px', height: '42px' } }),
                        _react2.default.createElement(
                            'span',
                            { className: 'error' },
                            error['verify-code']
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: (0, _classnames2.default)({ 'has-error': !!error['sms-verify-code'] }) },
                        _react2.default.createElement(
                            'div',
                            { className: 'sms-verify-text' },
                            _react2.default.createElement('input', { maxLength: 6, onChange: this.handleChange.bind(this, 'sms-verify-code'), placeholder: '\u8BF7\u8F93\u5165\u77ED\u4FE1\u9A8C\u8BC1\u7801' }),
                            _react2.default.createElement(
                                'span',
                                { style: { color: message === '获取验证码' ? null : '#cccccc' }, onClick: this.getSmsVerifyCode.bind(this) },
                                message
                            )
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'error' },
                            error['sms-verify-code']
                        )
                    )
                ),
                _react2.default.createElement(
                    _antd.Button,
                    { size: 'large', type: 'primary', className: 'login-btn', onClick: this.toLogin.bind(this) },
                    '\u767B\u5F55'
                )
            )
        );
    };
    return Main;
}(_react2.default.Component);
exports.default = Main;