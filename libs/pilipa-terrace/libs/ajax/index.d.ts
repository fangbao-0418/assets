/// <reference path="../global-plugin.d.ts" />
export interface EventTarget {
    status: number;
    statusText: string;
    response: string;
}
export declare type Body = string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams;
export declare type Data = Body | object | any[];
export declare type XHRConfigProps = {
    type?: RequestTypeProps;
    timeout?: number;
    withCredentials?: boolean;
    data?: Data;
    processData?: boolean;
    /** request content-type */
    contentType?: any;
    [field: string]: any;
} | any[];
export declare type RequestTypeProps = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTION' | 'HEAD';
export interface RequestConfig {
    url: string;
    type: RequestTypeProps;
    timeout: number;
    withCredentials: boolean;
    headers: object;
    body: Body;
}
export interface ResponseProps<T = any> {
    type: 'load' | 'timeout' | 'error';
    /** http 状态码 */
    status: number;
    statusText: string;
    /** 请求返回的结果 */
    result: T;
    /** request配置信息 */
    config: RequestConfig;
}
export declare function parse(data: string): any;
export declare function param(obj: any): string;
export declare function parseQuerystring(str: string): any;
/** 合成url */
export declare function composeURL(url: string, data: object): string;
interface Interceptor {
    request: {
        readonly callback: any;
        use: (callback: (xhr: XMLHttpRequest, ev: ProgressEvent, settings: RequestConfig) => void) => void;
    };
    response: {
        readonly callback: any;
        use: (callback?: (response: ResponseProps) => ResponseProps) => void;
    };
}
declare function http<T = any>(url: string, type?: XHRConfigProps | RequestTypeProps, config?: XHRConfigProps): Promise<ResponseProps<T>>;
declare namespace http {
    var interceptors: Interceptor;
    var get: (url: string, config: XHRConfigProps) => Promise<ResponseProps<any>>;
    var post: (url: string, config: XHRConfigProps) => Promise<ResponseProps<any>>;
    var put: (url: string, config: XHRConfigProps) => Promise<ResponseProps<any>>;
}
export default http;
