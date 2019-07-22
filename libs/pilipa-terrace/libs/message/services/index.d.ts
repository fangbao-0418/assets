/**
 * 消息服务
 */
import Service from '../../common/services/service';
declare class MessageService extends Service {
    delListByIds(ids?: any[]): Promise<any>;
    readListByIds(ids?: any[]): Promise<any>;
    countUnreadedByUserid(): Promise<any>;
    getCurrentByUserid(): Promise<any>;
    getItemById(id?: any): Promise<any>;
    getListByUserid(createAt?: any, pageCurrent?: any, pageSize?: any): Promise<any>;
}
declare const _default: MessageService;
export default _default;
