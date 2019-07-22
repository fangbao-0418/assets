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

var _top = require('../top');

var _top2 = _interopRequireDefault(_top);

var _left = require('../left');

var _left2 = _interopRequireDefault(_left);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _config3 = require('../left/config');

var _reactRouterDom = require('react-router-dom');

var _antd = require('antd');

var _errorPage = require('../error-page');

var _errorPage2 = _interopRequireDefault(_errorPage);

var _api = require('../api');

var _reactRouter = require('react-router');

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

var Content = _antd.Layout.Content;
var Main = /** @class */function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: {
                user: _this.props.defaultValue,
                onChange: _this.onChange.bind(_this)
            }
        };
        return _this;
    }
    Main.prototype.componentDidMount = function () {
        var _this = this;
        this.fetchUser().then(function () {
            _this.toHome();
            _this.trackPage();
        });
    };
    Main.prototype.toHome = function () {
        var pathname = _config2.default.env === 'production' ? window.location.pathname : this.props.location.pathname;
        if (pathname !== '/') {
            return;
        }
        var path = (0, _config3.getHomePage)().path;
        if (path === '/') {
            _config2.default.history('/noAccess');
            return;
        }
        if (_config2.default.env === 'production') {
            window.location.href = path;
        } else {
            _config2.default.history(path);
        }
    };
    Main.prototype.componentWillReceiveProps = function (props) {
        var currentUrl = props.location.pathname + props.location.search + props.location.hash;
        var oldUrl = this.props.location.pathname + this.props.location.search + this.props.location.hash;
        if (currentUrl !== oldUrl) {
            this.trackPage();
        }
    };
    Main.prototype.trackPage = function () {
        setTimeout(function () {
            // 页面追踪
            var user = _config2.default.user || {};
            _config2.default.pa.trackEvent({
                labelId: 'page',
                eventId: 'pageview',
                params: {
                    title: document.title,
                    location: window.location.href,
                    referer: document.referrer,
                    username: user.username,
                    companyId: user.companyId,
                    companyName: user.companyName,
                    phone: user.phone,
                    userType: user.userType,
                    regionCompanyType: user.regionCompanyType
                }
            });
        }, 0);
    };
    Main.prototype.onChange = function () {
        this.fetchUser().then(function () {
            var path = (0, _config3.getHomePage)().path;
            if (_config2.default.env === 'production') {
                window.location.href = path;
            }
        });
    };
    Main.prototype.fetchUser = function () {
        var _this = this;
        if (!_config2.default.token) {
            return;
        }
        return (0, _api.fetchUserInfo)().then(function (res) {
            var value = _this.state.value;
            value.user = res;
            if (_this.props.onChange) {
                _this.props.onChange(res);
            }
            _this.setState({
                value: value
            });
            return res;
        });
    };
    Main.prototype.render = function () {
        var user = this.state.value.user;
        if (user === undefined) {
            return null;
        }
        var content = this.props.content !== undefined ? this.props.content : true;
        return _react2.default.createElement(
            _antd.Layout,
            { className: 'pilipa-terrace-container' },
            _react2.default.createElement(_left2.default, { user: user }),
            _react2.default.createElement(
                _antd.Layout,
                null,
                _react2.default.createElement(_top2.default, { user: user, onChange: this.onChange.bind(this) }),
                content ? _react2.default.createElement(
                    Content,
                    { className: 'content' },
                    _react2.default.createElement(
                        _reactRouterDom.Switch,
                        null,
                        this.props.children,
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/noAccess', component: _errorPage2.default.NoAccess }),
                        _react2.default.createElement(_reactRouterDom.Route, { component: _errorPage2.default })
                    )
                ) : _react2.default.createElement(
                    _reactRouterDom.Switch,
                    null,
                    this.props.children,
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/noAccess', render: function render() {
                            return _react2.default.createElement(
                                Content,
                                { className: 'content' },
                                _react2.default.createElement(_errorPage2.default.NoAccess, null)
                            );
                        } }),
                    _react2.default.createElement(_reactRouterDom.Route, { component: _errorPage2.default })
                )
            )
        );
    };
    return Main;
}(_react2.default.Component);
exports.default = (0, _reactRouter.withRouter)(Main);