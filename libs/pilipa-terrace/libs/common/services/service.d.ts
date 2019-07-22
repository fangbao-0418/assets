declare class Service {
    static http: <T = any>(url: string, type?: any[] | "GET" | "POST" | "DELETE" | "PUT" | "OPTION" | "HEAD" | {
        [field: string]: any;
        type?: import("../../ajax").RequestTypeProps;
        timeout?: number;
        withCredentials?: boolean;
        data?: import("../../ajax").Data;
        processData?: boolean;
        contentType?: any;
    }, config?: import("../../ajax").XHRConfigProps) => Promise<T>;
    constructor();
}
export default Service;
