'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _api = require('../api');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

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
            error: ''
        };
        return _this;
    }
    Main.prototype.componentDidMount = function () {
        var _this = this;
        var search = this.props.location.search;
        var code = '';
        try {
            code = search.match(/code=(\w+)&?/)[1];
            (0, _api.fetchToken)(code).then(function (res) {
                var token = res.access_token;
                _config2.default.token = token;
                localStorage.setItem('token', token);
                _cookie2.default.set({
                    token: token
                }, {
                    expires: 24 * 3600 * 30 * 1000
                });
                _config2.default.history('/bind');
            }, function (res) {
                var message = 'token无效';
                try {
                    message = res.responseJSON.errors[0].message;
                } catch (e) {
                    console.log(e);
                }
                _this.throwError(message);
            });
        } catch (e) {
            console.log(e, 'E');
            this.throwError();
        }
    };
    Main.prototype.throwError = function (message) {
        this.setState({
            error: '\u975E\u6CD5\u64CD\u4F5C\uFF0C' + message + '\uFF0C\u5373\u5C06\u9000\u51FA...'
        });
        if (/^(localhost|[\d\.]*)$/.test(window.location.host) === false) {
            setTimeout(function () {
                _config2.default.history('/logout');
            }, 2000);
        }
    };
    Main.prototype.render = function () {
        return _react2.default.createElement(
            'div',
            { style: {
                    margin: '15px'
                } },
            this.state.error
        );
    };
    return Main;
}(_react2.default.Component);
exports.default = (0, _reactRouter.withRouter)(Main);