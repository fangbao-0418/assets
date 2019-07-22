declare const _default: {
    set(obj: {
        [key: string]: string;
    }, options?: {
        path?: string;
        expires?: any;
        domain?: string;
        secure?: any;
    }): void;
    get(name: string): any;
    remove(names: string | string[]): void;
    removeAll(): void;
};
export default _default;
