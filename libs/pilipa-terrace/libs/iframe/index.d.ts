import React from 'react';
import { UserProps } from './ContextType';
import { RouteComponentProps } from 'react-router';
import { TypeProps, MenuItem } from '../config';
interface Props extends RouteComponentProps<{}> {
    env?: 'development' | 'production';
    token?: string;
    onChange?: (user?: UserProps) => void;
    type?: TypeProps;
    group?: string;
    defaultValue?: UserProps;
    /** 是否使用自带content布局，默认使用自带content布局 */
    content?: boolean;
    config?: {
        menu: MenuItem[];
        logo: string;
    };
}
declare const _default: React.ComponentClass<Pick<Props, "content" | "token" | "type" | "onChange" | "defaultValue" | "env" | "group" | "config">, any>;
export default _default;
