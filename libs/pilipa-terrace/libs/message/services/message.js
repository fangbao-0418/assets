'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 消息类型
var msgActions = {
    REMINDER: 'REMINDER' // 催单
}; /**
    * 提醒工具类
    *
    * 1. 通信类，支持推拉
    * 2. UI类，基于antd
    * 暂时不拆分，后期可分离协议类，授权类、通信驱动类、UI类、消息逻辑类
    */

var Msg = /** @class */function () {
    // 初始化
    function Msg(conf) {
        if (conf === void 0) {
            conf = {};
        }
        this.conf = {
            // 拉模式配置
            pullConf: {
                // duration: 1000 * 60 * 15
                duration: 1000 * 60 * 15
            }
        };
        this.conf = (0, _assign2.default)(this.conf, conf);
        this.evs = {};
    }
    // 默认使用拉形式
    Msg.prototype.connect = function (conf) {
        if (conf === void 0) {
            conf = {};
        }
        return this.pullConnect(this.conf);
    };
    Msg.prototype.onData = function (data) {
        return this.pullOnData(data);
    };
    Msg.prototype.close = function () {
        return this.pullClose();
    };
    Msg.prototype.evAdd = function (ev, fn) {
        if (!this.evs[ev]) {
            this.evs[ev] = [];
        }
        this.evs[ev].push(fn);
        return this;
    };
    Msg.prototype.evRemove = function (ev) {
        if (!this.evs[ev]) {
            return this;
        }
        delete this.evs[ev];
        return this;
    };
    Msg.prototype.evTrigger = function (ev) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.evs[ev]) {
            return this;
        }
        this.evs[ev].map(function (fn) {
            return fn.apply(void 0, args);
        });
        return this;
    };
    // 消息可视化展现方法
    Msg.prototype.uiOpen = function (conf) {
        _antd.notification.open(conf);
        return this;
    };
    Msg.prototype.uiShow = function (conf) {
        _antd.notification.info(conf);
        return this;
    };
    Msg.prototype.uiClose = function () {
        _antd.notification.destroy();
    };
    Msg.prototype.uiError = function (conf) {
        _antd.notification.error(conf);
        return this;
    };
    // ui method
    Msg.prototype.uiLogicLinkToList = function () {
        if (_config2.default.env === 'production') {
            window.location.href = '/message/list';
        } else {
            _config2.default.history('/message/list');
        }
    };
    // 拉模式的连接、中断、基础数据返回操作方法
    Msg.prototype.pullConnect = function (conf) {
        var _this = this;
        var fetchMsg = function fetchMsg() {
            // 获取单条消息提醒
            _index2.default.getCurrentByUserid().then(function (data) {
                // 手动关闭弹层,同一时刻，只保留一个
                _this.uiClose();
                // 发布获取数据消息
                _this.evTrigger('data', data);
                _this.evTrigger('service:get unreaded item data', data);
                // 通用数据交互
                _this.onData(data);
            }).catch(function (e) {
                // this.onData({title: '错误', content: '暂无提醒'})
                console.error('message error:', e);
                /* 消息默认去掉错误提醒
                this.uiError({
                  // message: '数据有误',
                  message: null,
                  description: e.toString() // 'error'
                })
                */
            });
            // 获取未读消息数
            _index2.default.countUnreadedByUserid().then(function (data) {
                _this.evTrigger('service:get unreaded count data', data);
            });
        };
        fetchMsg();
        this.looptimer = setInterval(fetchMsg, this.conf.pullConf.duration);
        // this.looptimer = fetchMsg
        return this;
    };
    Msg.prototype.pullClose = function () {
        clearInterval(this.looptimer);
        this.looptimer = null;
        this.evTrigger('close');
        return this;
    };
    // 消息驱动模式比较固定，但是ui和交互不确定，暂时放到一个方法里
    Msg.prototype.pullOnData = function (data) {
        var _this = this;
        if (!data && !data.title) {
            return;
        }
        // 标记消息为已读
        var setReaded = function setReaded(id) {
            if (id === void 0) {
                id = data.id;
            }
            return _index2.default.readListByIds([id]);
        };
        // 关闭
        var onClose = function onClose() {
            setReaded();
        };
        this.uiOpen({
            message: '消息提醒',
            description: _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h5',
                    { style: { fontSize: '14px', borderTop: '1px solid #ddd', padding: '15px 0 0' } },
                    data.title
                ),
                _react2.default.createElement(
                    'p',
                    { style: { maxHeight: 300, overflow: 'auto' } },
                    data.content
                ),
                _react2.default.createElement(
                    'div',
                    { style: { textAlign: 'right' } },
                    _react2.default.createElement(
                        _antd.Button,
                        { type: 'primary', onClick: function onClick() {
                                // 关闭弹层
                                _this.uiClose();
                                // 设为已读
                                setReaded();
                                _this.uiLogicLinkToList();
                            } },
                        '\u67E5\u770B\u8BE6\u60C5'
                    )
                )
            ),
            onClose: onClose,
            placement: 'bottomRight',
            duration: null // 不自动关闭
        });
        return this;
    };
    return Msg;
}();

exports.default = function (conf) {
    return new Msg(conf);
};