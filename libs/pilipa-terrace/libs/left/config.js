'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHomePage = undefined;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHomePage = exports.getHomePage = function getHomePage() {
    var url = '/';
    var mark = '';
    try {
        _config2.default.menu.find(function (item) {
            if (item.hidden !== true) {
                if (item.path) {
                    url = item.path;
                    mark = item.mark;
                    return true;
                } else {
                    if (item.children) {
                        return item.children.findIndex(function (item2) {
                            if (item2.hidden !== true) {
                                url = item2.path;
                                mark = item.mark;
                                return true;
                            }
                        }) > -1;
                    }
                }
            }
        });
    } catch (e) {
        _config2.default.trackPageError({
            stack: e.stack
        });
    }
    /** 清除^开头的url */
    return {
        path: url.replace(/^\^/, ''),
        mark: mark
    };
};