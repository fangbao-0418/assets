export declare function hasPermission(key: string, codes: string[]): boolean;
export declare const fetchConfig: () => Promise<import("./ajax").ResponseProps<any>>;
export declare const fetchUserInfo: () => Promise<any>;
/** 获取权限codes */
export declare const fetchPermissionCode: () => Promise<any>;
export declare const queryToObject: (querystring: string) => any;
export declare const userLogin: (payload: {
    phone: string;
    validCode?: string;
}) => Promise<any>;
export declare const fetchSmsVerifyCode: (phone: string) => Promise<any>;
export declare const bindCompany: (payload: {
    token: string;
    companyId: string;
}) => Promise<any>;
export declare const companylist: (token: string) => Promise<any>;
export declare const userLogout: () => Promise<any>;
export declare const fetchUaaLoginUrl: (path?: string) => string;
export declare const fetchToken: (code: string) => Promise<any>;
export declare const uaaLogout: () => Promise<any>;
