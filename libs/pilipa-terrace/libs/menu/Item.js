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
    Main.prototype.handleClick = function () {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };
    Main.prototype.render = function () {
        var hidden = this.props.hidden;
        var selectedKeys = this.context.selectedKeys;
        var key = this._reactInternalFiber.key;
        return _react2.default.createElement(
            'div',
            { hidden: hidden, ref: 'el', className: (0, _classnames2.default)('pilipa-menu-item', { 'pilipa-menu-item-selected': selectedKeys.indexOf(key) > -1 }), onClick: this.handleClick.bind(this) },
            this.props.children
        );
    };
    Main.contextTypes = {
        openKeys: _propTypes2.default.array,
        selectedKeys: _propTypes2.default.array
    };
    return Main;
}(_react2.default.Component);
exports.default = Main;