import { MenuItem } from '../config';
export interface UserProps {
    companyName?: string;
    phone?: string;
    username?: string;
    companyId?: string;
    /** 城市编码 */
    cityCode?: string;
    city?: string;
    codes?: string[];
    menu?: MenuItem[];
    regionCompanyType?: 'Agent' | 'DirectCompany';
    userType?: 'System' | 'Agent' | 'DirectCompany';
}
export interface ValueProps {
    user: UserProps;
    onChange?: (value?: ValueProps) => void;
}
