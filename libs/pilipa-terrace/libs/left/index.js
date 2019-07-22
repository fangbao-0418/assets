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

var _pilipa = require('pilipa');

var _menu = require('../menu');

var _menu2 = _interopRequireDefault(_menu);

var _reactRouter = require('react-router');

var _config = require('./config');

var _config2 = require('../config');

var _config3 = _interopRequireDefault(_config2);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

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

var SubMenu = _menu2.default.SubMenu;
var Sider = _antd.Layout.Sider;
var Main = /** @class */function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            collapsed: false,
            selectedKeys: [],
            openKeys: []
        };
        _this.pathInfo = {};
        _this.homePage = (0, _config.getHomePage)();
        return _this;
    }
    Main.prototype.componentDidMount = function () {
        this.getActive();
    };
    Main.prototype.componentWillReceiveProps = function (props) {
        if (this.props.location.pathname !== props.location.pathname) {
            this.getActive(props.location.pathname, false);
        }
    };
    // public animate (el: any, scrollTop: number, time = 200) {
    //   const top = scrollTop
    //   const ms = top / time
    //   let currTop = 0
    //   const t = setInterval(() => {
    //     currTop += 10
    //     el.scrollTop = currTop
    //     if (currTop >= top) {
    //       clearInterval(t)
    //     }
    //   } , ms)
    // }
    Main.prototype.toFixedMenuPosition = function () {
        var openKey = this.state.openKeys[0] ? this.state.openKeys[0] : this.state.selectedKeys[0];
        var index = openKey ? openKey.match(/\d+/) ? openKey.match(/\d+/)[0] : 0 : 0;
        var el = this.refs.menu;
        if (el.children[0].children.length === 0) {
            return;
        }
        var scrollTop = el.children[0].children[index].offsetTop - 84;
        if (!scrollTop) {
            return;
        }
        (0, _pilipa.$)(el).scrollTop(scrollTop, 800);
    };
    Main.prototype.getActive = function (pathname, first) {
        var _this = this;
        if (pathname === void 0) {
            pathname = this.props.location.pathname;
        }
        if (first === void 0) {
            first = true;
        }
        var selectedKey = _cookie2.default.get('selectedKey') || '';
        for (var key in this.pathInfo) {
            if (this.pathInfo.hasOwnProperty(key)) {
                var item = this.pathInfo[key];
                var path = item.path;
                var isFullPath = /^\^/.test(path);
                path = isFullPath ? path.replace(/^\^/, '') : path;
                var pattern = new RegExp("^" + path + "[/]?$");
                if (pattern.test((item.mark && !isFullPath ? '/' + item.mark : '') + pathname) && (item.mark === _config3.default.type || !_config3.default.type)) {
                    selectedKey = key;
                    _config3.default.mark = this.pathInfo[key].mark;
                }
                _cookie2.default.set({
                    selectedKey: selectedKey
                }, {
                    expires: 24 * 3600 * 1000
                });
            }
        }
        this.setState({
            openKeys: this.getAllKeys(selectedKey, false),
            selectedKeys: selectedKey ? [selectedKey] : []
        }, function () {
            if (first) {
                _this.toFixedMenuPosition();
            }
        });
    };
    Main.prototype.toHome = function () {
        if (this.homePage.path === '/') {
            _config3.default.history('/noAccess');
            return;
        }
        this.history(this.homePage.path, this.homePage.mark);
    };
    Main.prototype.history = function (url, mark) {
        if (mark === void 0) {
            mark = _config3.default.mark;
        }
        var pattern = new RegExp("^/" + mark);
        var isFullPath = /^\^/.test(url);
        if (mark) {
            url = isFullPath ? url.replace(/^\^/, '') : url.replace(pattern, '');
        }
        if (_config3.default.env === 'development') {
            _config3.default.history(url);
            return;
        }
        if (mark === _config3.default.type) {
            this.props.history.push(url);
        } else {
            window.location.href = mark && !isFullPath ? '/' + mark + url : url;
        }
    };
    /**
     * 获取链条key
     * @param key - 当前选中key
     * @param returnParent - 是否包含当前key
     * @returns {String[]} - 返回链条key
     */
    Main.prototype.getAllKeys = function (key, containSelf) {
        if (containSelf === void 0) {
            containSelf = true;
        }
        if (!containSelf) {
            if (/^m-\d+$/.test(key)) {
                return [];
            }
            key = key.replace(/-\d+$/, '');
        }
        var arr = key.match(/-\d+/g) || [];
        var keys = [];
        var str = 'm';
        arr.map(function (item) {
            str += item;
            keys.push(str);
        });
        return keys;
    };
    Main.prototype.getMenuNodes = function (configs, prefKey) {
        var _this = this;
        if (configs === void 0) {
            configs = _config3.default.menu;
        }
        if (prefKey === void 0) {
            prefKey = 'm';
        }
        var nodes = [];
        configs.forEach(function (item, index) {
            var key = [prefKey, index].join('-');
            var path = item.path;
            _this.pathInfo[key] = item;
            var Item;
            var icon = _config3.default.env === 'development' ? "https://x-b.i-counting.cn" + item.icon : item.icon;
            if (item.children) {
                Item = _react2.default.createElement(
                    SubMenu,
                    { hidden: item.hidden, key: key, title: _react2.default.createElement(
                            'span',
                            { title: item.title, className: 'pilipa-menu-submenu-title-content' },
                            !!item.icon && _react2.default.createElement(_Icon2.default, { src: icon }),
                            _react2.default.createElement(
                                'span',
                                null,
                                item.title
                            )
                        ), onTitleClick: function onTitleClick() {
                            _this.setState({
                                openKeys: _this.state.openKeys.indexOf(key) !== -1 ? _this.getAllKeys(key, false) : _this.getAllKeys(key)
                            });
                        } },
                    _this.getMenuNodes(item.children, key)
                );
            } else {
                Item = _react2.default.createElement(
                    _menu2.default.Item,
                    { hidden: item.hidden, key: key, onClick: function onClick() {
                            if (path) {
                                _this.setState({
                                    openKeys: _this.getAllKeys(key, true),
                                    selectedKeys: [key]
                                });
                                _this.history(path, item.mark);
                            }
                        } },
                    !!item.icon && _react2.default.createElement(_Icon2.default, { src: icon }),
                    _react2.default.createElement(
                        'span',
                        { title: item.title },
                        item.title
                    )
                );
            }
            nodes.push(Item);
        });
        return nodes;
    };
    Main.prototype.render = function () {
        var _this = this;
        var logo = _config3.default.env === 'development' ? "https://x-b.i-counting.cn" + _config3.default.logo : _config3.default.logo;
        return _react2.default.createElement(
            Sider,
            { className: 'pilipa-terrace-left', trigger: null, collapsible: true, collapsed: this.state.collapsed },
            _react2.default.createElement(
                'div',
                { className: 'top' },
                _react2.default.createElement(
                    'div',
                    { onClick: function onClick() {
                            _this.toHome();
                        }, className: 'logo' },
                    _react2.default.createElement('img', { src: logo })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'menu', ref: 'menu' },
                _react2.default.createElement(
                    _menu2.default,
                    { theme: 'dark', mode: 'inline', selectedKeys: this.state.selectedKeys, openKeys: this.state.openKeys },
                    this.getMenuNodes()
                )
            )
        );
    };
    return Main;
}(_react2.default.Component);
exports.default = (0, _reactRouter.withRouter)(Main);