import React from 'react';
import { UserProps } from './ContextType';
import { RouteComponentProps } from 'react-router';
interface Props extends RouteComponentProps {
    env?: 'development' | 'production';
    token?: string;
    onChange?: (user?: UserProps) => void;
    /** 默认userinfo */
    defaultValue?: UserProps;
    /** 是否使用自带content布局，默认使用自带content布局 */
    content?: boolean;
}
declare const _default: React.ComponentClass<Pick<Props, "content" | "token" | "onChange" | "defaultValue" | "env">, any>;
export default _default;
