'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.parse = parse;
exports.param = param;
exports.parseQuerystring = parseQuerystring;
exports.composeURL = composeURL;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <reference path='../global-plugin.d.ts' />
function parse(data) {
    var result = null;
    try {
        result = JSON.parse(data);
    } catch (e) {
        result = data;
    }
    return result;
}
function param(obj) {
    var arr = [];
    for (var key in obj) {
        if (key in obj && obj[key] !== undefined) {
            arr.push(key + "=" + obj[key]);
        }
    }
    return arr.join('&');
}
function parseQuerystring(str) {
    var arr = str.split('&');
    var obj = {};
    arr.map(function (item) {
        var res = item.match(/^(.+?)=(.*)$/);
        if (res) {
            obj[res[1]] = res[2];
        }
    });
    return obj;
}
function optimizeData(data) {
    if (!data) {
        return null;
    }
    if (data instanceof Object) {
        ['type', 'processData', 'withCredentials', 'timeout', 'headers'].map(function (key) {
            delete data[key];
        });
    }
    if ((0, _stringify2.default)(data) === '{}') {
        data = null;
    }
    return data;
}
/** 合成url */
function composeURL(url, data) {
    if (!data) {
        return url;
    }
    var arr = url.match(/^(.+?)\?(.+)$/);
    if (arr && arr.length === 3) {
        var pathname = arr[1];
        var search = param((0, _assign2.default)({}, parseQuerystring(arr[2]), data));
        return pathname + '?' + search;
    } else if (arr === null) {
        var pathname = url;
        var search = param(data);
        return pathname + '?' + search;
    } else {
        throw new Error('the ' + url + ', is not a valid url');
    }
}
var interceptors = {
    request: {
        callback: undefined,
        use: function use(callback) {
            this.callback = callback;
            (0, _freeze2.default)(this);
        }
    },
    response: {
        callback: undefined,
        use: function use(callback) {
            this.callback = callback;
            (0, _freeze2.default)(this);
        }
    }
};
_promise2.default.prototype.always = function (callback) {
    return this.then(function (res) {
        return callback(res, undefined);
    }, function (err) {
        return callback(undefined, err);
    });
};
function http(url, type, config) {
    if (type === void 0) {
        type = 'GET';
    }
    var xhr = new XMLHttpRequest();
    var finalConfig = {};
    var data;
    if (typeof type !== 'string') {
        config = type;
        type = config.type || 'GET';
    }
    if (config instanceof Array) {
        data = config;
        finalConfig = {};
    } else {
        finalConfig = config || {};
        data = config && config.data || config;
    }
    var processData = finalConfig.processData !== undefined ? finalConfig.processData : true;
    var headers = finalConfig.headers || {};
    var contentType = headers['Content-Type'] !== undefined ? headers['Content-Type'] : finalConfig.contentType;
    headers['Content-Type'] = contentType === false ? undefined : contentType || 'application/json; charset=utf-8';
    finalConfig.withCredentials = finalConfig.withCredentials || false;
    finalConfig.timeout = finalConfig.timeout || 10000;
    if (data instanceof Object && !(data instanceof Array) && data === config) {
        data = (0, _assign2.default)({}, data);
        data = optimizeData(data);
    }
    if (type === 'GET' && data instanceof Object) {
        url = composeURL(url, data);
        data = null;
    }
    xhr.open(type, url, true);
    xhr.timeout = finalConfig.timeout;
    xhr.withCredentials = finalConfig.withCredentials;
    for (var key in headers) {
        if (key in headers && headers[key] !== undefined) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }
    var body = processData ? data && (0, _stringify2.default)(data) : data;
    var settings = {
        url: url,
        type: type,
        timeout: xhr.timeout,
        withCredentials: xhr.withCredentials,
        headers: headers,
        body: body
    };
    var p = new _promise2.default(function (resolve, reject) {
        xhr.onloadstart = function (ev) {
            if (interceptors.request.callback) {
                interceptors.request.callback(xhr, ev, settings);
            }
        };
        xhr.onload = function (ev) {
            var currentTarget = ev.currentTarget;
            var result = parse(currentTarget.response);
            var response = {
                type: ev.type,
                status: currentTarget.status,
                statusText: currentTarget.statusText,
                result: result,
                config: settings
            };
            if (interceptors.response.callback) {
                response = interceptors.response.callback(response);
            }
            var status = response.status;
            if (status === 200) {
                resolve(response);
            } else {
                reject(response);
            }
        };
        xhr.onerror = function (ev) {
            var currentTarget = ev.currentTarget;
            var response = {
                type: ev.type,
                status: currentTarget.status,
                statusText: currentTarget.statusText,
                result: null,
                config: settings
            };
            if (interceptors.response.callback) {
                response = interceptors.response.callback(response);
            }
            reject(response);
        };
        xhr.ontimeout = function (ev) {
            var currentTarget = ev.currentTarget;
            var response = {
                type: ev.type,
                status: currentTarget.status,
                statusText: currentTarget.statusText,
                result: null,
                config: settings
            };
            if (interceptors.response.callback) {
                response = interceptors.response.callback(response);
            }
            reject(response);
        };
        xhr.send(body || null);
    });
    return p;
}
http.interceptors = interceptors;
http.get = function (url, config) {
    return http(url, 'GET', config);
};
http.post = function (url, config) {
    return http(url, 'POST', config);
};
http.put = function (url, config) {
    return http(url, 'PUT', config);
};
exports.default = http;