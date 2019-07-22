import Pa from 'pilipa-analytics';
import { UserProps } from './iframe/ContextType';
export declare type TypeProps = string;
export interface MenuItem {
    title: string;
    path?: string;
    code?: string;
    mark?: string;
    hidden?: boolean;
    icon?: string;
    children?: Array<MenuItem>;
}
interface ConfigProps {
    pa: Pa;
    from: string;
    token: string;
    user: UserProps;
    mark: string;
    env: 'development' | 'production';
    trackPageError: (params: object) => void;
    history?: (url: string) => void;
    type: TypeProps;
    logo: string;
    menu: MenuItem[];
    localStorage?: any;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    loading: {
        show: () => void;
        hide: () => void;
    };
}
declare const config: ConfigProps;
export default config;
