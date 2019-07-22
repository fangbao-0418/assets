'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _service = require('../../common/services/service');

var _service2 = _interopRequireDefault(_service);

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
/**
 * 消息服务
 */

var MessageService = /** @class */function (_super) {
    __extends(MessageService, _super);
    function MessageService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 删除
    MessageService.prototype.delListByIds = function (ids) {
        if (ids === void 0) {
            ids = [];
        }
        return _service2.default.http("/notification/v1/api/remind", 'DELETE', {
            data: ids
        });
    };
    // 标记已读
    MessageService.prototype.readListByIds = function (ids) {
        if (ids === void 0) {
            ids = [];
        }
        return _service2.default.http("/notification/v1/api/remind/read", 'PUT', {
            data: ids
        });
    };
    // 未读消息数
    MessageService.prototype.countUnreadedByUserid = function () {
        return _service2.default.http("/notification/v1/api/remind/unread");
    };
    // 最新消息
    MessageService.prototype.getCurrentByUserid = function () {
        return _service2.default.http("/notification/v1/api/remind/prompt/last");
        // .then(() => {
        //   return {
        //     title: 'xxx',
        //     content: 'xxxxxxxxx'
        //   }
        // })
    };
    // 详细详情
    MessageService.prototype.getItemById = function (id) {
        if (id === void 0) {
            id = '';
        }
        return _service2.default.http("/notification/v1/api/remind/" + id);
    };
    // 消息列表
    MessageService.prototype.getListByUserid = function (createAt, pageCurrent, pageSize) {
        if (createAt === void 0) {
            createAt = '';
        }
        if (pageCurrent === void 0) {
            pageCurrent = '1';
        }
        if (pageSize === void 0) {
            pageSize = '10';
        }
        return _service2.default.http("/notification/v1/api/remind/page?" + ("createAt=" + createAt + "&") + ("pageCurrent=" + pageCurrent + "&") + ("pageSize=" + pageSize));
    };
    return MessageService;
}(_service2.default);
exports.default = new MessageService();