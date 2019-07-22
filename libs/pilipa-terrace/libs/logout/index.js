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

var _reactRouter = require('react-router');

var _api = require('../api');

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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.componentWillMount = function () {
        (0, _api.userLogout)().always(function () {
            _config2.default.token = '';
            _config2.default.user = undefined;
            if (window.localStorage) {
                localStorage.clear();
                sessionStorage.clear();
            }
            _cookie2.default.removeAll();
            _config2.default.history('/login');
        });
    };
    Main.prototype.render = function () {
        return _react2.default.createElement('div', null);
    };
    return Main;
}(_react2.default.Component);
exports.default = (0, _reactRouter.withRouter)(Main);