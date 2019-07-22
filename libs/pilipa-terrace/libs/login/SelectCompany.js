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

var _api = require('../api');

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
            dataSource: []
        };
        return _this;
    }
    Main.prototype.componentWillMount = function () {
        var _this = this;
        var token = _config2.default.token;
        (0, _api.companylist)(token).then(function (res) {
            if (res.length === 1) {
                var item = res[0];
                (0, _api.bindCompany)({
                    companyId: item.companyId,
                    token: _config2.default.token
                }).then(function () {
                    _this.history();
                });
            } else {
                _this.setState({
                    dataSource: res
                });
            }
        });
    };
    Main.prototype.history = function (url) {
        if (url === void 0) {
            url = '/';
        }
        if (_config2.default.env === 'production') {
            window.location.href = '/';
        } else {
            _config2.default.history('/');
        }
    };
    Main.prototype.render = function () {
        var _this = this;
        var dataSource = this.state.dataSource;
        return _react2.default.createElement(
            'div',
            { className: 'select-company' },
            _react2.default.createElement(
                'ul',
                null,
                dataSource.map(function (item, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: "search-company-" + index },
                        _react2.default.createElement(
                            'span',
                            { onClick: function onClick() {
                                    (0, _api.bindCompany)({
                                        companyId: item.companyId,
                                        token: _config2.default.token
                                    }).then(function (res) {
                                        _this.history();
                                    });
                                } },
                            item.companyName
                        )
                    );
                })
            )
        );
    };
    return Main;
}(_react2.default.Component);
exports.default = Main;