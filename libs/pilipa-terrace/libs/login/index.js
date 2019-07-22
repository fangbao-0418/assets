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

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _SelectCompany = require('./SelectCompany');

var _SelectCompany2 = _interopRequireDefault(_SelectCompany);

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

var Main = /** @class */function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            step: _config2.default.token ? 2 : 1
        };
        return _this;
    }
    Main.prototype.componentWillReceiveProps = function () {
        this.setState({
            step: _config2.default.token ? 2 : 1
        });
    };
    Main.prototype.render = function () {
        var _this = this;
        var step = this.state.step;
        return _react2.default.createElement(
            'div',
            { className: 'pilipa-terrace-login-container' },
            step === 1 && _react2.default.createElement(_Form2.default, { onOk: function onOk() {
                    _this.setState({
                        step: 2
                    });
                } }),
            step === 2 && _react2.default.createElement(_SelectCompany2.default, null),
            _react2.default.createElement(
                'div',
                { className: 'footer' },
                _react2.default.createElement(
                    'span',
                    null,
                    'Copyright \xA9 2018 \u567C\u91CC\u556A\u667A\u80FD\xB7\u8D22\u7A0E \u7248\u6743\u6240\u6709'
                )
            )
        );
    };
    return Main;
}(_react2.default.Component);
exports.default = Main;