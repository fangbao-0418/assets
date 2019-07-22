'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _login = require('../uaa/login');

var _login2 = _interopRequireDefault(_login);

var _logout = require('../uaa/logout');

var _logout2 = _interopRequireDefault(_logout);

var _token = require('../uaa/token');

var _token2 = _interopRequireDefault(_token);

var _bind = require('../uaa/bind');

var _bind2 = _interopRequireDefault(_bind);

var _reactRouter = require('react-router');

var _reactRouterDom = require('react-router-dom');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

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

var Index = /** @class */function (_super) {
    __extends(Index, _super);
    function Index() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Index.prototype.componentWillMount = function () {
        _config2.default.env = this.props.env === undefined ? 'development' : this.props.env;
        var token = this.props.token || _config2.default.token;
        var config = (0, _assign2.default)({}, {
            menu: [],
            logo: ''
        }, this.props.config);
        _config2.default.token = token;
        _config2.default.menu = config.menu;
        _config2.default.logo = config.logo;
        _config2.default.type = this.props.type;
        if (_config2.default.env === 'development') {
            _config2.default.history = this.props.history.push;
        }
        if (!token && ['/login', '/token'].indexOf(this.props.location.pathname) === -1) {
            this.history('/login');
        }
    };
    Index.prototype.componentDidCatch = function (E, info) {
        this.trackError(E, info);
    };
    Index.prototype.trackError = function (E, info) {
        setTimeout(function () {
            // 页面错误事件追踪
            _config2.default.trackPageError({
                stack: E.stack,
                href: window.location.href
            });
        }, 0);
    };
    Index.prototype.history = function (url) {
        if (_config2.default.env === 'production') {
            window.location.href = url;
        } else {
            _config2.default.history(url);
        }
    };
    Index.prototype.render = function () {
        return this.props.env === 'production' ? _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _config2.default.token && _react2.default.createElement(_Main2.default, this.props)
        ) : _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(_reactRouterDom.Route, { path: '/login', component: _login2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/logout', component: _logout2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/token', component: _token2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/bind', component: _bind2.default }),
            _config2.default.token && _react2.default.createElement(_Main2.default, this.props)
        );
    };
    return Index;
}(_react2.default.Component);
exports.default = (0, _reactRouter.withRouter)(Index);