import React from 'react';
import { RouteComponentProps } from 'react-router';
import { UserProps } from '../iframe/ContextType';
interface Props extends RouteComponentProps {
    user: UserProps;
}
declare const _default: React.ComponentClass<Pick<Props, "user">, any>;
export default _default;
