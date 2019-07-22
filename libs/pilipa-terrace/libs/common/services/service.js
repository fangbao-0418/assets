'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('../../http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = /** @class */function () {
    function Service() {}
    Service.http = _http2.default;
    return Service;
}(); /**
      * 基础服务类
      */
exports.default = Service;