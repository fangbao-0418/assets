'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    set: function set(obj, options) {
        var str = '';
        if (typeof options.expires === 'number') {
            var time = new Date().getTime();
            options.expires = new Date(time + options.expires);
        }
        if (options.expires && options.expires instanceof Date === false) {
            throw new Error('options`s expires must be a Date or Number');
        }
        options.expires = options.expires.toGMTString() || '';
        options.path = options.path || '/';
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                str = key + "=" + obj[key] + ";\n        expires=" + options.expires + ";\n        path=" + options.path + ";\n        " + (options.domain !== undefined ? "domain=" + options.domain + ";" : '') + "\n        " + (options.secure !== undefined ? "secure=" + options.secure + ";" : '') + " ";
                str = str.replace(/;\s*/g, '; ').trim().slice(0, -1);
                document.cookie = str;
            }
        }
    },
    get: function get(name) {
        if (name) {
            var arr = document.cookie.split('; ');
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var item = arr_1[_i];
                if (new RegExp(name + '=').test(item)) {
                    return item.substring(name.length + 1);
                }
            }
            return undefined;
        } else {
            throw new Error('name is not empty');
        }
    },
    remove: function remove(names) {
        var type = typeof names === 'undefined' ? 'undefined' : (0, _typeof3.default)(names);
        var date = new Date();
        date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
        var expires = date.toGMTString();
        var val;
        switch (type) {
            case 'string':
                if (names === '') {
                    throw new Error('name is not empty string');
                }
                val = this.get(names);
                document.cookie = names + "=" + val + "; expires=" + expires;
                break;
            case 'object':
                if (names instanceof Array) {
                    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                        var name_1 = names_1[_i];
                        val = this.get(name_1);
                        document.cookie = name_1 + "=" + val + "; expires=" + expires;
                    }
                } else {
                    throw new Error('type is not allowed');
                }
                break;
            case 'undefined':
                this.removeAll();
                break;
            default:
                throw new Error('type is not allowed');
        }
    },
    removeAll: function removeAll() {
        var date = new Date();
        date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
        var expires = date.toGMTString();
        var cookies = document.cookie.split('; ');
        cookies.map(function (item) {
            document.cookie = item + "; expires=" + expires;
        });
    }
};