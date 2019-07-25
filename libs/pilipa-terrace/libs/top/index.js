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

var _cookie = require('../cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _message = require('../message/services/message');

var _message2 = _interopRequireDefault(_message);

var _api = require('../api');

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
// 消息提醒

var Header = _antd.Layout.Header;
var Main = /** @class */function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            msgCount: 0,
            collapsed: false,
            companyList: []
        };
        _this.toggle = function () {
            _this.setState({
                collapsed: !_this.state.collapsed
            });
        };
        return _this;
    }
    Main.prototype.componentDidMount = function () {
        var _this = this;
        // 消息初始化
        this.msg = (0, _message2.default)({}).connect();
        // 交互：获取到已读消息数
        this.msg.evAdd('service:get unreaded count data', function (data) {
            data = data ? data : 0;
            _this.setState({
                msgCount: data
            });
        });
        (0, _api.companylist)(_config2.default.token).then(function (res) {
            _this.setState({
                companyList: res
            });
        });
    };
    Main.prototype.switchCompany = function (code, onChange) {
        var token = _config2.default.token;
        (0, _api.bindCompany)({
            token: _config2.default.token,
            companyId: code
        }).then(function () {
            localStorage.clear();
            sessionStorage.clear();
            _cookie2.default.removeAll();
            localStorage.setItem('token', token);
            sessionStorage.setItem('token', token);
            _cookie2.default.set({
                token: token
            }, {
                expires: 24 * 3600 * 30 * 1000
            });
            if (onChange) {
                onChange();
            }
        });
    };
    Main.prototype.history = function (url) {
        _config2.default.history(url);
    };
    Main.prototype.getMenu = function (onChange) {
        var _this = this;
        var companyList = this.state.companyList;
        var menu = _react2.default.createElement(
            _antd.Menu,
            null,
            _react2.default.createElement(
                _antd.Menu.Item,
                { onClick: function onClick() {
                        _this.history('/permission/info');
                    } },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u8D26\u53F7\u8BBE\u7F6E'
                )
            ),
            companyList.length > 1 && _react2.default.createElement(
                _antd.Menu.SubMenu,
                { title: '\u5207\u6362\u516C\u53F8' },
                companyList.map(function (item) {
                    return _react2.default.createElement(
                        _antd.Menu.Item,
                        { onClick: function onClick(val) {
                                _this.switchCompany(val.key, onChange);
                            }, key: item.companyId },
                        _react2.default.createElement(
                            'span',
                            null,
                            item.companyName
                        )
                    );
                })
            ),
            _react2.default.createElement(
                _antd.Menu.Item,
                { onClick: function onClick() {
                        _this.history('/logout');
                    } },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u9000\u51FA'
                )
            )
        );
        return menu;
    };
    Main.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            user = _a.user,
            onChange = _a.onChange;
        return _react2.default.createElement(
            Header,
            { className: 'pilipa-terrace-top' },
            _react2.default.createElement(
                'div',
                { className: 'top-right' },
                user.codes.indexOf('im_account_authority') > -1 && _react2.default.createElement(
                    'span',
                    { className: "icon im", onClick: function onClick() {
                            window.location.href = '/tools/im/main.html';
                        } },
                    _react2.default.createElement('i', { className: 'point', style: { visibility: this.state.msgCount ? 'visible' : 'hidden' } })
                ),
                _react2.default.createElement(
                    'span',
                    { className: "icon message", onClick: function onClick() {
                            _this.msg.uiLogicLinkToList();
                        } },
                    _react2.default.createElement('i', { className: 'point', style: { visibility: this.state.msgCount ? 'visible' : 'hidden' } })
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'username', style: {
                            marginRight: '15px'
                        } },
                    user.username
                ),
                _react2.default.createElement(
                    _antd.Dropdown,
                    { overlay: this.getMenu(onChange) },
                    _react2.default.createElement('span', { className: 'icon menu' })
                )
            )
        );
    };
    return Main;
}(_react2.default.Component);
exports.default = Main;