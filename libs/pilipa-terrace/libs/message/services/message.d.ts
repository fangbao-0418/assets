import { ArgsProps } from 'antd/lib/notification';
declare type Method = (...args: Array<any>) => any;
interface MessageData {
    title: string;
    content: string;
    id: any;
}
interface Conf {
    token?: string;
    pullConf?: any;
}
interface MsgI {
    getToken?: Method;
    refreshToken?: Method;
    connect?: Method;
    close?: Method;
    onData?: Method;
    evAdd?: Method;
    evRemove?: Method;
    evTrigger?: Method;
    uiOpen?: Method;
    uiShow?: Method;
    uiAlert?: Method;
    uiError?: Method;
}
declare class Msg implements MsgI {
    config: any;
    private conf;
    private looptimer;
    private evs;
    constructor(conf?: Conf);
    connect(conf?: any): this;
    onData(data: MessageData): this;
    close(): this;
    evAdd(ev: string, fn: Method): this;
    evRemove(ev: string): this;
    evTrigger(ev: string, ...args: Array<any>): this;
    uiOpen(conf: ArgsProps): this;
    uiShow(conf: ArgsProps): this;
    uiClose(): void;
    uiError(conf: ArgsProps): this;
    uiLogicLinkToList(): void;
    private pullConnect;
    private pullClose;
    private pullOnData;
}
declare const _default: (conf: Conf) => Msg;
export default _default;
