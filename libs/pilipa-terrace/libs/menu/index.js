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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _SubMenu = require('./SubMenu');

var _SubMenu2 = _interopRequireDefault(_SubMenu);

var _pilipa = require('pilipa');

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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.getChildContext = function () {
        return {
            openKeys: this.props.openKeys || [],
            selectedKeys: this.props.selectedKeys || []
        };
    };
    Main.prototype.componentDidMount = function () {
        this.init();
    };
    Main.prototype.componentDidUpdate = function () {
        this.init();
    };
    Main.prototype.init = function () {
        var openKeys = this.props.openKeys;
        this.hideAllMenu();
        openKeys.map(function (key) {
            var selector = "#" + key + "Menu";
            (0, _pilipa.$)(selector).slideDown();
        });
    };
    Main.prototype.hideAllMenu = function (cur) {
        var openKeys = this.props.openKeys;
        (0, _pilipa.$)('.pilipa-menu-sub').each(function (elem) {
            if (elem !== cur) {
                if (_pilipa.$.css(elem, 'display') !== 'none' && openKeys.indexOf(elem.id.replace('Menu', '')) === -1) {
                    (0, _pilipa.$)(elem).slideUp();
                }
            }
        });
    };
    Main.prototype.render = function () {
        return _react2.default.createElement(
            'div',
            { ref: 'menu', className: 'pilipa-menu' },
            this.props.children
        );
    };
    Main.Item = _Item2.default;
    Main.SubMenu = _SubMenu2.default;
    // 声明Context对象属性
    Main.childContextTypes = {
        openKeys: _propTypes2.default.array,
        selectedKeys: _propTypes2.default.array
    };
    return Main;
}(_react2.default.Component);
exports.default = Main;