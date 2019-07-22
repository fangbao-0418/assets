/// <reference path="../global-plugin.d.ts" />
import { RequestTypeProps, XHRConfigProps } from '../ajax';
declare const http: <T = any>(url: string, type?: any[] | "GET" | "POST" | "DELETE" | "PUT" | "OPTION" | "HEAD" | {
    [field: string]: any;
    type?: RequestTypeProps;
    timeout?: number;
    withCredentials?: boolean;
    data?: import("../ajax").Data;
    processData?: boolean;
    contentType?: any;
}, config?: XHRConfigProps) => Promise<T>;
export default http;
