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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
    Main.prototype.onTitleClick = function () {
        if (this.props.onTitleClick) {
            this.props.onTitleClick();
        }
    };
    Main.prototype.render = function () {
        var hidden = this.props.hidden;
        var key = this._reactInternalFiber.key;
        var openKeys = this.context.openKeys;
        return _react2.default.createElement(
            'div',
            { hidden: hidden, ref: 'submenu', className: (0, _classnames2.default)('pilipa-menu-submenu', { open: openKeys.indexOf(key) > -1 }) },
            _react2.default.createElement(
                'div',
                { className: 'pilipa-menu-submenu-title', onClick: this.onTitleClick.bind(this) },
                this.props.title,
                _react2.default.createElement('i', { className: "pilipa-menu-submenu-arrow fa " + (openKeys.indexOf(key) === -1 ? 'fa-angle-down' : 'fa-angle-up') })
            ),
            _react2.default.createElement(
                'div',
                { id: key + "Menu", ref: 'sub', className: 'pilipa-menu-sub' },
                _react2.default.createElement(
                    'div',
                    { style: { marginLeft: 12 } },
                    this.props.children
                )
            )
        );
    };
    Main.contextTypes = {
        openKeys: _propTypes2.default.array,
        selectedKeys: _propTypes2.default.array
    };
    return Main;
}(_react2.default.Component);
exports.default = Main;